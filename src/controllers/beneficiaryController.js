const db = require('../config/db');

exports.getBeneficiaries = async (req, res) => {
    const userId = req.user.userId;
    try {
        const [beneficiaries] = await db.query(`
            SELECT * FROM beneficiaries 
            WHERE user_id = ? 
            ORDER BY name ASC
        `, [userId]);
        
        res.status(200).json(beneficiaries);
    } catch (error) {
        console.error('Error fetching beneficiaries:', error);
        res.status(500).json({ message: 'Server error while fetching beneficiaries.' });
    }
};

exports.addBeneficiary = async (req, res) => {
    const userId = req.user.userId;
    const { name, accountNumber, bankName, branchName, ifscCode } = req.body;

    try {
        const [existingBeneficiary] = await db.query(`
            SELECT * FROM beneficiaries 
            WHERE user_id = ? AND account_number = ?
        `, [userId, accountNumber]);
        
        if (existingBeneficiary.length > 0) {
            return res.status(400).json({ message: 'Beneficiary with this account number already exists.' });
        }

        const [result] = await db.query(`
            INSERT INTO beneficiaries (user_id, name, account_number, bank_name, branch_name, ifsc_code)
            VALUES (?, ?, ?, ?, ?, ?)
        `, [userId, name, accountNumber, bankName, branchName, ifscCode]);
        
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
    const { name, accountNumber, bankName, branchName, ifscCode } = req.body;

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
            SET name = ?, account_number = ?, bank_name = ?, branch_name = ?, ifsc_code = ?
            WHERE beneficiary_id = ? AND user_id = ?
        `, [name, accountNumber, bankName, branchName, ifscCode, beneficiaryId, userId]);
        
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
        const [beneficiary] = await db.query(`
            SELECT * FROM beneficiaries 
            WHERE beneficiary_id = ? AND user_id = ?
        `, [beneficiaryId, userId]);
        
        if (beneficiary.length === 0) {
            return res.status(404).json({ message: 'Beneficiary not found or access denied.' });
        }

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
