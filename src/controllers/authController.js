// back-end file for login.html page

const db = require('../config/db');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//user login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]); // query to retrieve information from db
        if (rows.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }
        const user = rows[0]; // storing retrieved data in user variable
      
        // check if the password matches with the one stored in database
        if (password !== user.password) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }
        
        const payload = { userId: user.user_id, name: user.full_name, email: user.email };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful!', token, user: payload });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'An internal server error occurred.' });
    }
};

//new user registration
exports.register = async (req, res) => {
    const { fullName, phoneNumber, email, password } = req.body;

    if (!fullName || !phoneNumber || !email || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        // check if there's a existing user, array as there can be multiple results, for new user this length should be 0
        const [existingUser] = await connection.query('SELECT user_id FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            await connection.rollback();
            return res.status(409).json({ message: 'An account with this email already exists.' });
        }
      
        // The password is now stored directly without hashing.
        const [userResult] = await connection.query(
            'INSERT INTO users (full_name, email, password, phone_number) VALUES (?, ?, ?, ?)',
            [fullName, email, password, phoneNumber]
        );
        const newUserId = userResult.insertId;

        // Create Checking Account
        const checkingAccountNumber = `ACCT-1${String(newUserId).padStart(7, '0')}`;
        await connection.query(
            'INSERT INTO accounts (user_id, account_type, account_number, balance) VALUES (?, ?, ?, ?)',
            [newUserId, 'Checking', checkingAccountNumber, 0.00]
        );

        // Create Savings Account
        const savingsAccountNumber = `ACCT-2${String(newUserId).padStart(7, '0')}`;
        await connection.query(
            'INSERT INTO accounts (user_id, account_type, account_number, balance) VALUES (?, ?, ?, ?)',
            [newUserId, 'Savings', savingsAccountNumber, 0.00]
        );

        await connection.commit();
        res.status(201).json({ message: 'User registered successfully! Please log in.' });

    } catch (error) {
        await connection.rollback();
        console.error('Registration error:', error);
        res.status(500).json({ message: 'An internal server error occurred during registration.' });
    } finally {
        connection.release();
    }
};
