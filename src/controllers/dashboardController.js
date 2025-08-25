
const db = require('../config/db');

exports.getData = async (req, res) => {
    // The user's ID is available from the middleware (req.user)
    const userId = req.user.userId;

    try {
        // Fetch user's basic information
        const [userRows] = await db.query('SELECT full_name, email, created_at FROM users WHERE user_id = ?', [userId]);

        if (userRows.length === 0) {
            return res.status(404).json({ message: 'User not found.' });
        }
        const userData = userRows[0];

        // Fetch user's account information (Checking and Savings)
        const [accountRows] = await db.query('SELECT account_type, account_number, balance FROM accounts WHERE user_id = ?', [userId]);

        // Structure the data to be sent to the front-end
        const responseData = {
            fullName: userData.full_name,
            email: userData.email,
            memberSince: userData.created_at,
            accounts: accountRows
        };

        // Send the structured data as a success response
        res.status(200).json(responseData);

    } catch (error) {
        console.error('Dashboard data fetch error:', error);
        res.status(500).json({ message: 'An internal server error occurred.' });
    }
};
