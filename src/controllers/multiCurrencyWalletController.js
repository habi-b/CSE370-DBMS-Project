const db = require('../config/db');

exports.getWallets = async (req, res) => {
    const userId = req.user.userId;

    try {
        const [wallets] = await db.query('SELECT * FROM wallets WHERE user_id = ?', [userId]);
        
        const exchangeRate = await getCurrentExchangeRate();
        
        const walletsWithConverted = wallets.map(wallet => ({
            ...wallet,
            converted_balance: wallet.currency_code === 'USD' 
                ? wallet.balance * exchangeRate 
                : wallet.balance
        }));

        res.status(200).json({
            wallets: walletsWithConverted,
            exchange_rate: exchangeRate
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching wallets' });
    }
};

exports.createWallet = async (req, res) => {
    const userId = req.user.userId;
    const { currency_code } = req.body;

    try {
        const [existing] = await db.query('SELECT * FROM wallets WHERE user_id = ? AND currency_code = ?', [userId, currency_code]);
        
        if (existing.length > 0) {
            return res.status(400).json({ message: 'Wallet already exists for this currency' });
        }

        const [result] = await db.query(
            'INSERT INTO wallets (user_id, currency_code, balance) VALUES (?, ?, ?)',
            [userId, currency_code, 0]
        );

        res.status(201).json({ message: 'Wallet created successfully', walletId: result.insertId });
    } catch (error) {
        res.status(500).json({ message: 'Error creating wallet' });
    }
};

exports.convertCurrency = async (req, res) => {
    const userId = req.user.userId;
    const { from_currency, to_currency, amount } = req.body;

    try {
        const exchangeRate = await getCurrentExchangeRate();
        
        const [fromWallet] = await db.query('SELECT * FROM wallets WHERE user_id = ? AND currency_code = ?', [userId, from_currency]);
        
        if (fromWallet.length === 0 || fromWallet[0].balance < amount) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }

        let convertedAmount;
        if (from_currency === 'USD' && to_currency === 'BDT') {
            convertedAmount = amount * exchangeRate;
        } else if (from_currency === 'BDT' && to_currency === 'USD') {
            convertedAmount = amount / exchangeRate;
        } else {
            return res.status(400).json({ message: 'Unsupported currency conversion' });
        }

        await db.query('UPDATE wallets SET balance = balance - ? WHERE user_id = ? AND currency_code = ?', 
            [amount, userId, from_currency]);
        
        await db.query('UPDATE wallets SET balance = balance + ? WHERE user_id = ? AND currency_code = ?', 
            [convertedAmount, userId, to_currency]);

        res.status(200).json({ 
            message: 'Currency converted successfully',
            convertedAmount: convertedAmount,
            exchangeRate: exchangeRate
        });
    } catch (error) {
        res.status(500).json({ message: 'Error converting currency' });
    }
};

async function getCurrentExchangeRate() {
    try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await response.json();
        return data.rates.BDT || 110;
    } catch (error) {
        return 110;
    }
}
