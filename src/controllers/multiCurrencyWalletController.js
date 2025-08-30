const db = require('../config/db');

exports.getWallets = async (req, res) => {
    const userId = req.user.userId;

    try {
        const [wallets] = await db.query('SELECT * FROM wallets WHERE user_id = ?', [userId]);
        
        const exchangeRates = await getCurrentExchangeRates();
        
        const walletsWithConverted = wallets.map(wallet => ({
            ...wallet,
            converted_balance: wallet.currency_code === 'USD' 
                ? wallet.balance * exchangeRates.USD_BDT 
                : wallet.currency_code === 'EUR'
                ? wallet.balance * exchangeRates.EUR_BDT
                : wallet.balance
        }));

        res.status(200).json({
            wallets: walletsWithConverted,
            exchange_rates: exchangeRates
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

exports.deleteWallet = async (req, res) => {
    const userId = req.user.userId;
    const { wallet_id } = req.params;

    try {
        const [wallet] = await db.query('SELECT * FROM wallets WHERE wallet_id = ? AND user_id = ?', [wallet_id, userId]);
        
        if (wallet.length === 0) {
            return res.status(404).json({ message: 'Wallet not found' });
        }

        if (parseFloat(wallet[0].balance) > 0) {
            return res.status(400).json({ message: 'Cannot delete wallet with balance. Please transfer funds first.' });
        }

        await db.query('DELETE FROM wallets WHERE wallet_id = ? AND user_id = ?', [wallet_id, userId]);

        res.status(200).json({ message: 'Wallet deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting wallet' });
    }
};

exports.convertCurrency = async (req, res) => {
    const userId = req.user.userId;
    const { from_currency, to_currency, amount } = req.body;

    try {
        const exchangeRates = await getCurrentExchangeRates();
        
        const [fromWallet] = await db.query('SELECT * FROM wallets WHERE user_id = ? AND currency_code = ?', [userId, from_currency]);
        
        if (fromWallet.length === 0 || fromWallet[0].balance < amount) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }

        let convertedAmount;
        
        if (from_currency === 'USD' && to_currency === 'BDT') {
            convertedAmount = amount * exchangeRates.USD_BDT;
        } else if (from_currency === 'BDT' && to_currency === 'USD') {
            convertedAmount = amount / exchangeRates.USD_BDT;
        } else if (from_currency === 'EUR' && to_currency === 'BDT') {
            convertedAmount = amount * exchangeRates.EUR_BDT;
        } else if (from_currency === 'BDT' && to_currency === 'EUR') {
            convertedAmount = amount / exchangeRates.EUR_BDT;
        } else if (from_currency === 'USD' && to_currency === 'EUR') {
            convertedAmount = amount * (exchangeRates.USD_BDT / exchangeRates.EUR_BDT);
        } else if (from_currency === 'EUR' && to_currency === 'USD') {
            convertedAmount = amount * (exchangeRates.EUR_BDT / exchangeRates.USD_BDT);
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
            exchangeRates: exchangeRates
        });
    } catch (error) {
        res.status(500).json({ message: 'Error converting currency' });
    }
};

async function getCurrentExchangeRates() {
    try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await response.json();
        
        const usdToBdt = data.rates.BDT || 110;
        const eurToBdt = data.rates.EUR ? (1 / data.rates.EUR) * usdToBdt : 120;
        
        return {
            USD_BDT: usdToBdt,
            EUR_BDT: eurToBdt
        };
    } catch (error) {
        return {
            USD_BDT: 110,
            EUR_BDT: 120
        };
    }
}
