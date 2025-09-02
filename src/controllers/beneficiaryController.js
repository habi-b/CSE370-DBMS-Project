const db = require('../config/db');

// Helper function to log activities
const logActivity = async (req, userId, action, severity, outcome, additionalInfo = null) => {
  try {
    const ipAddress = req.ip || req.connection.remoteAddress;
    const deviceInfo = req.get('User-Agent');
    
    await db.query(
      `INSERT INTO activity_log 
       (user_id, action, severity, outcome, ip_address, device_info, additional_info) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [userId, action, severity, outcome, ipAddress, deviceInfo, JSON.stringify(additionalInfo)]
    );
  } catch (error) {
    console.error('Error logging activity:', error);
  }
};


exports.getBeneficiaries = async (req, res) => {
    const userId = req.user.userId;
    try {
        const [beneficiaries] = await db.query(`
            SELECT * FROM beneficiaries 
            WHERE user_id = ? 
            ORDER BY beneficiary_name ASC
        `, [userId]);
        
        res.status(200).json(beneficiaries);
    } catch (error) {
        console.error('Error fetching beneficiaries:', error);
        res.status(500).json({ message: 'Server error while fetching beneficiaries.' });
    }
};

exports.addBeneficiary = async (req, res) => {
    const userId = req.user.userId;
    const { beneficiary_name, beneficiary_account_number, bank_name, relationship, nickname, notes } = req.body;

    try {
        const [existingBeneficiary] = await db.query(`
            SELECT * FROM beneficiaries 
            WHERE user_id = ? AND beneficiary_account_number = ?
        `, [userId, beneficiary_account_number]);
        
        if (existingBeneficiary.length > 0) {
            return res.status(400).json({ message: 'Beneficiary with this account number already exists.' });
        }

        const [result] = await db.query(`
            INSERT INTO beneficiaries (user_id, beneficiary_name, beneficiary_account_number, bank_name, relationship, nickname, notes)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `, [userId, beneficiary_name, beneficiary_account_number, bank_name, relationship, nickname, notes]);
        
        const [newBeneficiary] = await db.query(`
            SELECT * FROM beneficiaries 
            WHERE beneficiary_id = ?
        `, [result.insertId]);
        
        res.status(201).json(newBeneficiary[0]);
    } catch (error) {
        console.error('Error adding beneficiary:', error);
        res.status(500).json({ message: 'Server error while adding beneficiary.' });
    }
};

exports.updateBeneficiary = async (req, res) => {
    const userId = req.user.userId;
    const { beneficiaryId } = req.params;
    const { beneficiary_name, beneficiary_account_number, bank_name, relationship, nickname, notes } = req.body;

    try {
        const [beneficiary] = await db.query(`
            SELECT * FROM beneficiaries 
            WHERE beneficiary_id = ? AND user_id = ?
        `, [beneficiaryId, userId]);
        
        if (beneficiary.length === 0) {
            return res.status(404).json({ message: 'Beneficiary not found or access denied.' });
        }

        await db.query(`
            UPDATE beneficiaries 
            SET beneficiary_name = ?, beneficiary_account_number = ?, bank_name = ?, relationship = ?, nickname = ?, notes = ?
            WHERE beneficiary_id = ? AND user_id = ?
        `, [beneficiary_name, beneficiary_account_number, bank_name, relationship, nickname, notes, beneficiaryId, userId]);
        
        const [updatedBeneficiary] = await db.query(`
            SELECT * FROM beneficiaries 
            WHERE beneficiary_id = ?
        `, [beneficiaryId]);
        
        res.status(200).json(updatedBeneficiary[0]);
    } catch (error) {
        console.error('Error updating beneficiary:', error);
        res.status(500).json({ message: 'Server error while updating beneficiary.' });
    }
};

exports.deleteBeneficiary = async (req, res) => {
    const userId = req.user.userId;
    const { beneficiaryId } = req.params;

    try {
        // First check if the beneficiary exists and belongs to the user
        const [beneficiary] = await db.query(`
            SELECT * FROM beneficiaries 
            WHERE beneficiary_id = ? AND user_id = ?
        `, [beneficiaryId, userId]);
        
        if (beneficiary.length === 0) {
            return res.status(404).json({ message: 'Beneficiary not found or access denied.' });
        }

        // Check if this beneficiary is used in any scheduled transfers
        const [scheduledTransfers] = await db.query(`
            SELECT * FROM scheduled_transfers 
            WHERE beneficiary_id = ?
        `, [beneficiaryId]);
        
        // If there are scheduled transfers, delete them first
        if (scheduledTransfers.length > 0) {
            await db.query(`
                DELETE FROM scheduled_transfers 
                WHERE beneficiary_id = ?
            `, [beneficiaryId]);
        }

        // Now delete the beneficiary
        await db.query(`
            DELETE FROM beneficiaries 
            WHERE beneficiary_id = ? AND user_id = ?
        `, [beneficiaryId, userId]);
        
        res.status(200).json({ message: 'Beneficiary deleted successfully.' });
    } catch (error) {
        console.error('Error deleting beneficiary:', error);
        res.status(500).json({ message: 'Server error while deleting beneficiary.' });
    }
};
