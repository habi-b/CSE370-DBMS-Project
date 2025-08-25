const db = require('../config/db');

// Get all scheduled transfers for the logged-in user
exports.getScheduledTransfers = async (req, res) => {
    const userId = req.user.userId;
    try {
        // We join with beneficiaries and accounts to get the names/numbers for display
        const query = `
            SELECT 
                st.schedule_id,
                st.from_account_id,
                a.account_number AS from_account_number,
                st.beneficiary_id,
                b.beneficiary_name,
                st.amount,
                st.frequency,
                st.start_date,
                st.end_date,
                st.status,
                st.notes
            FROM scheduled_transfers st
            JOIN accounts a ON st.from_account_id = a.account_id
            JOIN beneficiaries b ON st.beneficiary_id = b.beneficiary_id
            WHERE st.user_id = ?
        `;
        const [schedules] = await db.query(query, [userId]);
        res.status(200).json(schedules);
    } catch (error) {
        console.error('Error fetching scheduled transfers:', error);
        res.status(500).json({ message: 'Server error while fetching schedules.' });
    }
};

// Create a new scheduled transfer
exports.createScheduledTransfer = async (req, res) => {
    const userId = req.user.userId;
    const { from_account_id, beneficiary_id, amount, frequency, start_date, end_date, notes } = req.body;

    if (!from_account_id || !beneficiary_id || !amount || !frequency || !start_date) {
        return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    try {
        const [result] = await db.query(
            'INSERT INTO scheduled_transfers (user_id, from_account_id, beneficiary_id, amount, frequency, start_date, end_date, notes, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [userId, from_account_id, beneficiary_id, amount, frequency, start_date, end_date || null, notes, 'Active']
        );
        res.status(201).json({ message: 'Schedule created successfully', scheduleId: result.insertId });
    } catch (error) {
        console.error('Error creating schedule:', error);
        res.status(500).json({ message: 'Server error while creating schedule.' });
    }
};

// Update the status of a schedule (Pause/Resume)
exports.updateScheduleStatus = async (req, res) => {
    const userId = req.user.userId;
    const { scheduleId } = req.params;
    const { status } = req.body;

    if (!status || !['Active', 'Paused'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status provided.' });
    }

    try {
        const [result] = await db.query(
            'UPDATE scheduled_transfers SET status = ? WHERE schedule_id = ? AND user_id = ?',
            [status, scheduleId, userId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Schedule not found or permission denied.' });
        }
        res.status(200).json({ message: `Schedule status updated to ${status}.` });
    } catch (error) {
        console.error('Error updating schedule status:', error);
        res.status(500).json({ message: 'Server error while updating status.' });
    }
};

// Delete a scheduled transfer
exports.deleteSchedule = async (req, res) => {
    const userId = req.user.userId;
    const { scheduleId } = req.params;

    try {
        const [result] = await db.query('DELETE FROM scheduled_transfers WHERE schedule_id = ? AND user_id = ?', [scheduleId, userId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Schedule not found or permission denied.' });
        }
        res.status(200).json({ message: 'Schedule deleted successfully.' });
    } catch (error) {
        console.error('Error deleting schedule:', error);
        res.status(500).json({ message: 'Server error while deleting schedule.' });
    }
};

// function to get data for form dropdowns
exports.getFormOptions = async (req, res) => {
    const userId = req.user.userId;
    try {
        const [accounts] = await db.query('SELECT account_id, account_type, account_number FROM accounts WHERE user_id = ?', [userId]);
        const [beneficiaries] = await db.query('SELECT beneficiary_id, beneficiary_name, beneficiary_account_number FROM beneficiaries WHERE user_id = ?', [userId]);
        res.status(200).json({ accounts, beneficiaries });
    } catch (error) {
        console.error('Error fetching form options:', error);
        res.status(500).json({ message: 'Server error while fetching form options.' });
    }
};
