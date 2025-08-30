const db = require('../config/db');

// Get all cards for user
exports.getUserCards = async (req, res) => {
    const userId = req.user.userId;
    
    try {
        const [cards] = await db.query(`
            SELECT * FROM cards 
            WHERE user_id = ? 
            ORDER BY card_type, status
        `, [userId]);
        
        res.status(200).json(cards);
    } catch (error) {
        console.error('Error fetching user cards:', error);
        res.status(500).json({ message: 'Server error while fetching cards.' });
    }
};

// Update card status (freeze/unfreeze)
exports.updateCardStatus = async (req, res) => {
    const userId = req.user.userId;
    const { cardId } = req.params;
    const { status } = req.body;

    try {
        // Verify user owns the card
        const [cards] = await db.query(`
            SELECT * FROM cards 
            WHERE card_id = ? AND user_id = ?
        `, [cardId, userId]);
        
        if (cards.length === 0) {
            return res.status(404).json({ message: 'Card not found or access denied.' });
        }

        await db.query(`
            UPDATE cards 
            SET status = ? 
            WHERE card_id = ?
        `, [status, cardId]);

        res.status(200).json({ message: `Card ${status.toLowerCase()} successfully.` });
    } catch (error) {
        console.error('Error updating card status:', error);
        res.status(500).json({ message: 'Server error while updating card status.' });
    }
};

// Update spending limit
exports.updateSpendingLimit = async (req, res) => {
    const userId = req.user.userId;
    const { cardId } = req.params;
    const { spendingLimit } = req.body;

    try {
        // Verify user owns the card
        const [cards] = await db.query(`
            SELECT * FROM cards 
            WHERE card_id = ? AND user_id = ?
        `, [cardId, userId]);
        
        if (cards.length === 0) {
            return res.status(404).json({ message: 'Card not found or access denied.' });
        }

        await db.query(`
            UPDATE cards 
            SET spending_limit = ? 
            WHERE card_id = ?
        `, [spendingLimit, cardId]);

        res.status(200).json({ message: 'Spending limit updated successfully.' });
    } catch (error) {
        console.error('Error updating spending limit:', error);
        res.status(500).json({ message: 'Server error while updating spending limit.' });
    }
};

// Get card transactions
exports.getCardTransactions = async (req, res) => {
    const userId = req.user.userId;
    const { cardId } = req.params;

    try {
        // Verify user owns the card and get card number
        const [cards] = await db.query(`
            SELECT * FROM cards 
            WHERE card_id = ? AND user_id = ?
        `, [cardId, userId]);
        
        if (cards.length === 0) {
            return res.status(404).json({ message: 'Card not found or access denied.' });
        }

        const cardNumber = cards[0].card_number;
        const lastFourDigits = cardNumber.slice(-4);
        const cardType = cards[0].card_type.toLowerCase();
        
        // Get transactions that might be related to this card
        // More specific pattern matching
        const [transactions] = await db.query(`
            SELECT t.*, a.account_number 
            FROM transactions t 
            JOIN accounts a ON t.account_id = a.account_id 
            WHERE a.user_id = ? 
            AND (
                -- Look for transactions that mention the last 4 digits
                t.description LIKE ? 
                -- Look for card-related transactions
                OR (t.description LIKE '%card%' AND t.transaction_type = 'Debit')
                -- Look for POS transactions
                OR t.description LIKE '%pos%'
                -- Look for online payments
                OR t.description LIKE '%online%'
                -- Look for specific merchants that typically show card transactions
                OR t.description LIKE '%daraz%'
                OR t.description LIKE '%amazon%'
                OR t.description LIKE '%ebay%'
                OR t.description LIKE '%payment%'
                -- For credit cards, look for payments to the card
                OR (t.description LIKE '%${cardType}%' AND t.transaction_type = 'Credit')
            )
            ORDER BY t.transaction_date DESC
            LIMIT 50
        `, [userId, `%${lastFourDigits}%`]);

        res.status(200).json(transactions);
    } catch (error) {
        console.error('Error fetching card transactions:', error);
        res.status(500).json({ message: 'Server error while fetching card transactions.' });
    }
};

// Report card as lost/stolen
exports.reportCardIssue = async (req, res) => {
    const userId = req.user.userId;
    const { cardId } = req.params;
    const { issueType, comments } = req.body;

    try {
        // Verify user owns the card
        const [cards] = await db.query(`
            SELECT * FROM cards 
            WHERE card_id = ? AND user_id = ?
        `, [cardId, userId]);
        
        if (cards.length === 0) {
            return res.status(404).json({ message: 'Card not found or access denied.' });
        }

        // Freeze the card and log the issue
        await db.query(`
            UPDATE cards 
            SET status = 'Frozen' 
            WHERE card_id = ?
        `, [cardId]);

        // Log the issue in activity log
        await db.query(`
            INSERT INTO activity_log (user_id, action, device_info, ip_address)
            VALUES (?, ?, ?, ?)
        `, [userId, `Card reported as ${issueType}: ${comments}`, 'Web Portal', req.ip]);

        res.status(200).json({ 
            message: `Card reported as ${issueType}. It has been frozen for security.` 
        });
    } catch (error) {
        console.error('Error reporting card issue:', error);
        res.status(500).json({ message: 'Server error while reporting card issue.' });
    }
};