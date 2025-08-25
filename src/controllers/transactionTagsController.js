const db = require('../config/db');

exports.getTransactionsWithTags = async (req, res) => {
    const userId = req.user.userId;
    try {
        const [transactions] = await db.query(`
            SELECT t.*, a.account_number 
            FROM transactions t 
            JOIN accounts a ON t.account_id = a.account_id 
            WHERE a.user_id = ? 
            ORDER BY t.transaction_date DESC
        `, [userId]);
        
        const processedTransactions = transactions.map(transaction => {
            const cleanDescription = transaction.description.replace(/\s*\[TAGS:[^\]]+\]\s*/, '');
            const tagMatch = transaction.description.match(/\[TAGS:([^\]]+)\]/);
            const tags = tagMatch ? tagMatch[1] : '';
            
            return {
                ...transaction,
                description: cleanDescription,
                tags: tags
            };
        });
        
        res.status(200).json(processedTransactions);
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ message: 'Server error while fetching transactions.' });
    }
};

exports.updateTransactionTags = async (req, res) => {
    const userId = req.user.userId;
    const { transactionId } = req.params;
    const { tags } = req.body;

    try {
        const [transactions] = await db.query(`
            SELECT t.* 
            FROM transactions t 
            JOIN accounts a ON t.account_id = a.account_id 
            WHERE t.transaction_id = ? AND a.user_id = ?
        `, [transactionId, userId]);
        
        if (transactions.length === 0) {
            return res.status(404).json({ message: 'Transaction not found or access denied.' });
        }

        const transaction = transactions[0];
        const cleanDescription = transaction.description.replace(/\s*\[TAGS:[^\]]+\]\s*/, '');
        
        let finalTags = '';
        if (tags && tags.trim()) {
            const tagArray = tags.split(',')
                .map(tag => tag.trim())
                .filter(tag => tag !== '');
            
            const uniqueTags = [...new Set(tagArray)];
            
            if (uniqueTags.length !== tagArray.length) {
                return res.status(400).json({ 
                    message: 'Same tags cannot be saved twice. Please remove duplicate tags.' 
                });
            }
            
            finalTags = uniqueTags.join(',');
        }

        const newDescription = finalTags ? `${cleanDescription} [TAGS:${finalTags}]` : cleanDescription;

        await db.query(
            'UPDATE transactions SET description = ? WHERE transaction_id = ?',
            [newDescription, transactionId]
        );

        const [updatedTransaction] = await db.query(`
            SELECT t.*, a.account_number 
            FROM transactions t 
            JOIN accounts a ON t.account_id = a.account_id 
            WHERE t.transaction_id = ?
        `, [transactionId]);
        
        res.status(200).json(updatedTransaction[0]);
    } catch (error) {
        console.error('Error updating transaction tags:', error);
        res.status(500).json({ message: 'Server error while updating transaction tags.' });
    }
};

exports.getTransactionsByTag = async (req, res) => {
    const userId = req.user.userId;
    const { tag } = req.params;

    try {
        const [transactions] = await db.query(`
            SELECT t.*, a.account_number 
            FROM transactions t 
            JOIN accounts a ON t.account_id = a.account_id 
            WHERE a.user_id = ? AND t.description LIKE ?
            ORDER BY t.transaction_date DESC
        `, [userId, `%[TAGS:${tag}]%`]);
        
        res.status(200).json(transactions);
    } catch (error) {
        console.error('Error fetching transactions by tag:', error);
        res.status(500).json({ message: 'Server error while fetching transactions by tag.' });
    }
};

exports.getAllTags = async (req, res) => {
    const userId = req.user.userId;

    try {
        const [transactions] = await db.query(`
            SELECT t.description 
            FROM transactions t 
            JOIN accounts a ON t.account_id = a.account_id 
            WHERE a.user_id = ? AND t.description LIKE '%[TAGS:%]%'
        `, [userId]);
        
        const allTags = new Set();
        
        transactions.forEach(transaction => {
            const tagMatch = transaction.description.match(/\[TAGS:([^\]]+)\]/);
            if (tagMatch && tagMatch[1]) {
                tagMatch[1].split(',').forEach(tag => {
                    const cleanedTag = tag.trim();
                    if (cleanedTag) allTags.add(cleanedTag);
                });
            }
        });
        
        res.status(200).json(Array.from(allTags).sort());
    } catch (error) {
        console.error('Error fetching all tags:', error);
        res.status(500).json({ message: 'Server error while fetching all tags.' });
    }
};
