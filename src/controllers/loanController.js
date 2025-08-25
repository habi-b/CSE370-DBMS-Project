const db = require('../config/db');

// Calculates and returns a user's loan eligibility profile
exports.getEligibility = async (req, res) => {
    const userId = req.user.userId;

    try {

        // user's creation date for account age
        const [userRows] = await db.query('SELECT created_at FROM users WHERE user_id = ?', [userId]);
        if (userRows.length === 0) {
            return res.status(404).json({ message: 'User not found.' });
        }
        const accountAgeInMonths = (new Date() - new Date(userRows[0].created_at)) / (1000 * 60 * 60 * 24 * 30.44);

        // Get all account balances for the user
        const [accounts] = await db.query('SELECT balance, account_id FROM accounts WHERE user_id = ?', [userId]);
        const totalBalance = accounts.reduce((sum, acc) => sum + parseFloat(acc.balance), 0);
        const accountIds = accounts.map(acc => acc.account_id);

        // Get transaction totals for the last 30 days to calculate cash flow
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const [transactions] = await db.query(
            `SELECT transaction_type, SUM(amount) as total 
         FROM transactions 
         WHERE account_id IN (?) AND transaction_date > ? 
         GROUP BY transaction_type`,
            [accountIds, thirtyDaysAgo]
        );
        const credits = transactions.find(t => t.transaction_type === 'Credit')?.total || 0;
        const debits = transactions.find(t => t.transaction_type === 'Debit')?.total || 0;

        // Get bill payment history
        const [bills] = await db.query('SELECT status, due_date, paid_on FROM bills WHERE user_id = ?', [userId]);

        // Get loan history
        const [loans] = await db.query('SELECT created_at, purpose, amount_requested, status FROM loans WHERE user_id = ? ORDER BY created_at DESC', [userId]);

        //  CALCULATE ELIGIBILITY SCORE ---

        let eligibilityScore = 0;
        let metrics = {};

        //  Account Stability
        const stabilityScore = (accountAgeInMonths > 12 && totalBalance > 50000) ? 25 : (accountAgeInMonths > 6 && totalBalance > 20000) ? 15 : 5;
        eligibilityScore += stabilityScore;
        metrics['Account Stability'] = { value: `${accountAgeInMonths.toFixed(0)} months`, status: stabilityScore > 20 ? 'Excellent' : stabilityScore > 10 ? 'Good' : 'Fair' };

        // Cash Flow (Savings Ratio)
        const savingsRatio = credits > 0 ? (credits - debits) / credits : 0;
        const cashFlowScore = savingsRatio > 0.4 ? 35 : savingsRatio > 0.15 ? 20 : savingsRatio >= 0 ? 10 : 0;
        eligibilityScore += cashFlowScore;
        metrics['Monthly Savings Ratio'] = { value: `${(savingsRatio * 100).toFixed(1)}%`, status: cashFlowScore > 30 ? 'Excellent' : cashFlowScore > 15 ? 'Good' : 'Fair' };

        // Payment History
        const paidOnTime = bills.filter(b => b.status === 'Paid' && new Date(b.paid_on) <= new Date(b.due_date)).length;
        const pendingBills = bills.filter(b => b.status === 'Pending').length;
        const paymentScore = (pendingBills === 0 && paidOnTime > 0) ? 25 : (paidOnTime > pendingBills) ? 15 : 5;
        eligibilityScore += paymentScore;
        metrics['On-Time Payments'] = { value: bills.length > 0 ? `${((paidOnTime / bills.length) * 100).toFixed(0)}%` : '100%', status: paymentScore > 20 ? 'Excellent' : paymentScore > 10 ? 'Good' : 'Fair' };

        // Debt History
        const approvedLoans = loans.filter(l => l.status === 'Approved').length;
        const rejectedLoans = loans.filter(l => l.status === 'Rejected').length;
        const debtScore = (approvedLoans > 0 && rejectedLoans === 0) ? 15 : (approvedLoans >= rejectedLoans) ? 8 : 0;
        eligibilityScore += debtScore;
        metrics['Loan History'] = { value: `${approvedLoans} Approved`, status: debtScore > 10 ? 'Excellent' : debtScore > 5 ? 'Good' : 'Fair' };

        // DETERMINE FINAL RATING AND ASSEMBLE RESPONSE ---

        let rating = 'Poor';
        if (eligibilityScore >= 80) rating = 'Excellent';
        else if (eligibilityScore >= 60) rating = 'Good';
        else if (eligibilityScore >= 40) rating = 'Fair';

        const responsePayload = {
            eligibilityScore,
            rating,
            metrics,
            loanHistory: loans
        };

        res.status(200).json(responsePayload);

    } catch (error) {
        console.error('Error calculating loan eligibility:', error);
        res.status(500).json({ message: 'An internal server error occurred.' });
    }
};

// new loan application submission
exports.applyForLoan = async (req, res) => {
    const userId = req.user.userId;
    const { amount_requested, purpose, term_in_months } = req.body;

    // Basic validation
    if (!amount_requested || !purpose || !term_in_months) {
        return res.status(400).json({ message: 'All application fields are required.' });
    }

    try {
        // Insert the new loan application into the database with a 'Pending' status
        const [result] = await db.query(
            'INSERT INTO loans (user_id, amount_requested, purpose, term_in_months, status) VALUES (?, ?, ?, ?, ?)',
            [userId, amount_requested, purpose, term_in_months, 'Pending']
        );

        if (result.insertId) {
            res.status(201).json({ message: 'Loan application submitted successfully.', loanId: result.insertId });
        } else {
            throw new Error('Failed to create loan application.');
        }
    } catch (error) {
        console.error('Error applying for loan:', error);
        res.status(500).json({ message: 'An internal server error occurred.' });
    }
};
