//connection with the database

const mysql = require('mysql2');
require('dotenv').config();

// A connection pool is more efficient than creating a new connection for every query.
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Export the promise-based version of the pool for async/await usage
module.exports = pool.promise();
