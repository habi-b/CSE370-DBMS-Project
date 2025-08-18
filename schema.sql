-- ==========================
-- Users Table
-- ==========================
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================
-- Accounts Table
-- ==========================
CREATE TABLE accounts (
    account_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    account_type ENUM('Checking', 'Savings') NOT NULL,
    account_number VARCHAR(20) NOT NULL UNIQUE,
    balance DECIMAL(12,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- ==========================
-- Transactions Table
-- ==========================
CREATE TABLE transactions (
    transaction_id INT AUTO_INCREMENT PRIMARY KEY,
    account_id INT NOT NULL,
    transaction_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    description VARCHAR(255) NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    transaction_type ENUM('Credit', 'Debit') NOT NULL,
    FOREIGN KEY (account_id) REFERENCES accounts(account_id)
);

-- ==========================
-- Savings Goals Table
-- ==========================
CREATE TABLE goals (
    goal_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    priority ENUM('High', 'Medium', 'Low') DEFAULT 'Medium',
    target_amount DECIMAL(12,2) NOT NULL,
    current_amount DECIMAL(12,2) DEFAULT 0.00,
    monthly_contribution DECIMAL(12, 2) DEFAULT 0.00,
    target_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
); 

-- ==========================
-- Beneficiaries Table
-- ==========================
CREATE TABLE beneficiaries (
    beneficiary_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    beneficiary_name VARCHAR(100) NOT NULL,
    bank_name VARCHAR(100) DEFAULT 'Panda Bank',
    relationship VARCHAR(50),
    nickname VARCHAR(50),
    notes VARCHAR(255),
    beneficiary_account_number VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- ==========================
-- Scheduled Transfers Table
-- ==========================
CREATE TABLE scheduled_transfers (
    schedule_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    from_account_id INT NOT NULL,
    beneficiary_id INT NOT NULL,
    amount DECIMAL(12, 2) NOT NULL,
    frequency ENUM('One-time', 'Daily', 'Weekly', 'Monthly') NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE, -- Can be NULL for ongoing transfers
    status ENUM('Active', 'Paused', 'Completed') DEFAULT 'Active',
    notes VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (from_account_id) REFERENCES accounts(account_id),
    FOREIGN KEY (beneficiary_id) REFERENCES beneficiaries(beneficiary_id)
);
-- ==========================
-- Cards Table
-- ==========================
CREATE TABLE cards (
    card_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    card_number VARCHAR(20) NOT NULL UNIQUE,
    card_type ENUM('Debit', 'Credit') NOT NULL,
    status ENUM('Active', 'Frozen') DEFAULT 'Active',
    spending_limit DECIMAL(12,2) DEFAULT 0.00,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- ==========================
-- Bills Table
-- ==========================
CREATE TABLE bills (
    bill_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    bill_name VARCHAR(100) NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    due_date DATE NOT NULL,
    paid_on DATE DEFAULT NULL,
    status ENUM('Pending', 'Paid') DEFAULT 'Pending',
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- ==========================
-- Loans Table
-- ==========================
CREATE TABLE loans (
    loan_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    amount_requested DECIMAL(12,2) NOT NULL,
    purpose VARCHAR(255) NOT NULL,
    term_in_months INT NOT NULL,
    status ENUM('Pending', 'Approved', 'Rejected') DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- ==========================
-- Wallets Table
-- ==========================
CREATE TABLE wallets (
    wallet_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    currency_code CHAR(3) NOT NULL,
    balance DECIMAL(12,2) DEFAULT 0.00,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- ==========================
-- Support Tickets Table
-- ==========================
CREATE TABLE tickets (
    ticket_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    subject VARCHAR(255) NOT NULL,
    status ENUM('Open', 'Closed', 'Pending') DEFAULT 'Open',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- ==========================
-- Ticket Messages Table
-- ==========================
CREATE TABLE ticket_messages (
    message_id INT AUTO_INCREMENT PRIMARY KEY,
    ticket_id INT NOT NULL,
    sender ENUM('User', 'Support') NOT NULL,
    message_text TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ticket_id) REFERENCES tickets(ticket_id)
);

-- ==========================
-- Activity Log Table
-- ==========================
CREATE TABLE activity_log (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    action VARCHAR(255) NOT NULL,
    device_info VARCHAR(255),
    ip_address VARCHAR(45),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);