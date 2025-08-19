INSERT INTO users (full_name, email, password, phone_number, created_at) VALUES
-- Users 1-9 (full dataset)
('Anika Tabassum',     'anika.tabassum@example.com',     'password1',  '01711110001', '2024-09-01 09:00:00'),
('Rahim Uddin',        'rahim.uddin@example.com',        'password2',  '01711110002', '2024-09-02 09:10:00'),
('Fatima Akter',       'fatima.akter@example.com',       'password3',  '01711110003', '2024-09-03 09:20:00'),
('Imran Khan',         'imran.khan@example.com',         'password4',  '01711110004', '2024-09-04 09:30:00'),
('Shamima Sultana',    'shamima.sultana@example.com',    'password5',  '01711110005', '2024-09-05 09:40:00'),
('Tanvir Hossain',     'tanvir.hossain@example.com',     'password6',  '01711110006', '2024-09-06 09:50:00'),
('Mahmudul Hasan',     'mahmudul.hasan@example.com',     'password7',  '01711110007', '2024-09-07 10:00:00'),
('Jannatul Ferdous',   'jannatul.ferdous@example.com',   'password8',  '01711110008', '2024-09-08 10:10:00'),
('Abdul Karim',        'abdul.karim@example.com',        'password9',  '01711110009', '2024-09-09 10:20:00'),

-- Users 10-18 (fresh customers)
('Nusrat Jahan',       'nusrat.jahan@example.com',       'password10', '01711110010', '2025-01-05 11:00:00'),
('Ahsan Habib',        'ahsan.habib@example.com',        'password11', '01711110011', '2025-01-06 11:10:00'),
('Rasheda Khatun',     'rasheda.khatun@example.com',     'password12', '01711110012', '2025-01-07 11:20:00'),
('Hasan Mahmud',       'hasan.mahmud@example.com',       'password13', '01711110013', '2025-01-08 11:30:00'),
('Mithila Rahman',     'mithila.rahman@example.com',     'password14', '01711110014', '2025-01-09 11:40:00'),
('Shakil Ahmed',       'shakil.ahmed@example.com',       'password15', '01711110015', '2025-01-10 11:50:00'),
('Farzana Yasmin',     'farzana.yasmin@example.com',     'password16', '01711110016', '2025-01-11 12:00:00'),
('Rafiq Islam',        'rafiq.islam@example.com',        'password17', '01711110017', '2025-01-12 12:10:00'),
('Salma Begum',        'salma.begum@example.com',        'password18', '01711110018', '2025-01-13 12:20:00');


INSERT INTO accounts (user_id, account_type, account_number, balance, created_at) VALUES
-- User 1
(1, 'Checking', 'ACCT-10000001', 45000.00, '2024-09-01 09:05:00'),
(1, 'Savings',  'ACCT-20000001', 120000.00, '2024-09-01 09:06:00'),
-- User 2
(2, 'Checking', 'ACCT-10000002', 38000.00, '2024-09-02 09:15:00'),
(2, 'Savings',  'ACCT-20000002', 95000.00, '2024-09-02 09:16:00'),
-- User 3
(3, 'Checking', 'ACCT-10000003', 52000.00, '2024-09-03 09:25:00'),
(3, 'Savings',  'ACCT-20000003', 200000.00, '2024-09-03 09:26:00'),
-- User 4
(4, 'Checking', 'ACCT-10000004', 25000.00, '2024-09-04 09:35:00'),
(4, 'Savings',  'ACCT-20000004', 60000.00, '2024-09-04 09:36:00'),
-- User 5
(5, 'Checking', 'ACCT-10000005', 70000.00, '2024-09-05 09:45:00'),
(5, 'Savings',  'ACCT-20000005', 300000.00, '2024-09-05 09:46:00'),
-- User 6
(6, 'Checking', 'ACCT-10000006', 15000.00, '2024-09-06 09:55:00'),
(6, 'Savings',  'ACCT-20000006', 45000.00, '2024-09-06 09:56:00'),
-- User 7
(7, 'Checking', 'ACCT-10000007', 28000.00, '2024-09-07 10:05:00'),
(7, 'Savings',  'ACCT-20000007', 100000.00, '2024-09-07 10:06:00'),
-- User 8
(8, 'Checking', 'ACCT-10000008', 40000.00, '2024-09-08 10:15:00'),
(8, 'Savings',  'ACCT-20000008', 80000.00, '2024-09-08 10:16:00'),
-- User 9
(9, 'Checking', 'ACCT-10000009', 35000.00, '2024-09-09 10:25:00'),
(9, 'Savings',  'ACCT-20000009', 75000.00, '2024-09-09 10:26:00'),
-- Users 10-18
(10, 'Checking', 'ACCT-10000010', 8000.00, '2025-01-05 11:05:00'),
(10, 'Savings',  'ACCT-20000010', 2000.00, '2025-01-05 11:06:00'),
(11, 'Checking', 'ACCT-10000011', 7500.00, '2025-01-06 11:15:00'),
(11, 'Savings',  'ACCT-20000011', 1500.00, '2025-01-06 11:16:00'),
(12, 'Checking', 'ACCT-10000012', 6000.00, '2025-01-07 11:25:00'),
(12, 'Savings',  'ACCT-20000012', 1200.00, '2025-01-07 11:26:00'),
(13, 'Checking', 'ACCT-10000013', 9000.00, '2025-01-08 11:35:00'),
(13, 'Savings',  'ACCT-20000013', 2500.00, '2025-01-08 11:36:00'),
(14, 'Checking', 'ACCT-10000014', 5000.00, '2025-01-09 11:45:00'),
(14, 'Savings',  'ACCT-20000014', 1000.00, '2025-01-09 11:46:00'),
(15, 'Checking', 'ACCT-10000015', 9500.00, '2025-01-10 11:55:00'),
(15, 'Savings',  'ACCT-20000015', 3000.00, '2025-01-10 11:56:00'),
(16, 'Checking', 'ACCT-10000016', 7000.00, '2025-01-11 12:05:00'),
(16, 'Savings',  'ACCT-20000016', 1800.00, '2025-01-11 12:06:00'),
(17, 'Checking', 'ACCT-10000017', 5500.00, '2025-01-12 12:15:00'),
(17, 'Savings',  'ACCT-20000017', 1300.00, '2025-01-12 12:16:00'),
(18, 'Checking', 'ACCT-10000018', 6500.00, '2025-01-13 12:25:00'),
(18, 'Savings',  'ACCT-20000018', 2200.00, '2025-01-13 12:26:00');

INSERT INTO transactions (account_id, transaction_date, description, amount, transaction_type) VALUES
(1, '2025-07-01 10:15:00', 'Salary - August', 50000.00, 'Credit'),
(1, '2025-07-02 14:30:00', 'Daraz Purchase - Electronics', 2500.00, 'Debit'),
(1, '2025-07-03 09:10:00', 'Pathao Ride', 350.00, 'Debit'),
(1, '2025-07-04 19:00:00', 'Shwapno Grocery', 4200.00, 'Debit'),
(1, '2025-07-06 12:45:00', 'bKash Top-up', 1000.00, 'Debit'),
(1, '2025-07-07 16:20:00', 'DESCO Bill Payment', 1200.00, 'Debit'),
(1, '2025-07-08 11:50:00', 'Received from Rahim Uddin', 3000.00, 'Credit'),
(1, '2025-07-10 15:30:00', 'Pathao Ride', 280.00, 'Debit'),
(1, '2025-07-12 18:40:00', 'Bata Shoes Purchase', 3200.00, 'Debit'),
(1, '2025-07-14 10:00:00', 'Mobile Recharge', 200.00, 'Debit'),
(1, '2025-07-15 09:00:00', 'bKash Cash In', 1500.00, 'Credit'),
(1, '2025-07-18 20:00:00', 'Star Cineplex Ticket', 800.00, 'Debit'),
(1, '2025-07-20 13:30:00', 'Aarong Purchase', 2700.00, 'Debit'),
(1, '2025-07-22 11:15:00', 'Titas Gas Bill', 950.00, 'Debit'),
(1, '2025-07-25 08:00:00', 'Interest Credit', 200.00, 'Credit');

-- Account 2 (User 1 - Savings)
INSERT INTO transactions (account_id, transaction_date, description, amount, transaction_type) VALUES
(2, '2025-07-01 10:20:00', 'Savings Deposit', 20000.00, 'Credit'),
(2, '2025-07-05 15:10:00', 'Transfer to Checking', 5000.00, 'Debit'),
(2, '2025-07-12 14:40:00', 'Interest Credit', 150.00, 'Credit'),
(2, '2025-07-20 09:50:00', 'Savings Deposit', 10000.00, 'Credit'),
(2, '2025-07-28 16:20:00', 'Transfer to Checking', 3000.00, 'Debit'),
(2, '2025-06-15 09:00:00', 'Interest Credit', 125.00, 'Credit'),
(2, '2025-06-01 09:00:00', 'Savings Deposit', 5000.00, 'Credit'),
(2, '2025-05-20 12:20:00', 'Transfer to Checking', 2000.00, 'Debit'),
(2, '2025-04-15 08:10:00', 'Interest Credit', 130.00, 'Credit'),
(2, '2025-03-10 11:00:00', 'Savings Deposit', 7000.00, 'Credit'),
(2, '2025-02-05 10:30:00', 'Transfer to Checking', 4000.00, 'Debit'),
(2, '2025-01-20 09:45:00', 'Interest Credit', 110.00, 'Credit'),
(2, '2024-12-25 16:00:00', 'Year-end Bonus Deposit', 8000.00, 'Credit'),
(2, '2024-11-05 13:30:00', 'Transfer to Checking', 2500.00, 'Debit'),
(2, '2024-10-01 09:00:00', 'Interest Credit', 100.00, 'Credit');

-- Account 3 (User 2 - Checking)
INSERT INTO transactions (account_id, transaction_date, description, amount, transaction_type) VALUES
(3, '2025-07-01 09:30:00', 'Salary - July', 40000.00, 'Credit'),
(3, '2025-07-02 10:20:00', 'Daraz Purchase - Clothing', 1800.00, 'Debit'),
(3, '2025-07-03 17:00:00', 'Shwapno Grocery', 2500.00, 'Debit'),
(3, '2025-07-04 13:15:00', 'Pathao Ride', 320.00, 'Debit'),
(3, '2025-07-05 11:10:00', 'bKash Top-up', 700.00, 'Debit'),
(3, '2025-07-06 15:00:00', 'Sent to Anika Tabassum', 3000.00, 'Debit'),
(3, '2025-07-08 18:45:00', 'DESCO Bill Payment', 1100.00, 'Debit'),
(3, '2025-07-10 10:00:00', 'Interest Credit', 180.00, 'Credit'),
(3, '2025-07-14 19:20:00', 'Mobile Recharge', 250.00, 'Debit'),
(3, '2025-07-16 21:00:00', 'Star Cineplex Ticket', 800.00, 'Debit'),
(3, '2025-07-20 12:00:00', 'bKash Cash In', 1200.00, 'Credit'),
(3, '2025-07-22 14:30:00', 'Aarong Purchase', 1500.00, 'Debit'),
(3, '2025-07-24 16:15:00', 'Titas Gas Bill', 900.00, 'Debit'),
(3, '2025-07-28 08:30:00', 'Received from Nusrat Jahan', 2200.00, 'Credit'),
(3, '2025-06-01 09:00:00', 'Interest Credit', 120.00, 'Credit');

-- Account 4 (User 2 - Savings)
INSERT INTO transactions (account_id, transaction_date, description, amount, transaction_type) VALUES
(4, '2025-07-01 09:35:00', 'Savings Deposit', 15000.00, 'Credit'),
(4, '2025-07-07 12:00:00', 'Transfer to Checking', 3000.00, 'Debit'),
(4, '2025-07-14 08:30:00', 'Interest Credit', 120.00, 'Credit'),
(4, '2025-07-22 09:15:00', 'Savings Deposit', 5000.00, 'Credit'),
(4, '2025-07-26 15:45:00', 'Transfer to Checking', 2000.00, 'Debit'),
(4, '2025-06-12 10:10:00', 'Interest Credit', 110.00, 'Credit'),
(4, '2025-05-02 11:00:00', 'Savings Deposit', 4000.00, 'Credit'),
(4, '2025-04-15 10:30:00', 'Transfer to Checking', 1500.00, 'Debit'),
(4, '2025-03-10 09:00:00', 'Interest Credit', 100.00, 'Credit'),
(4, '2025-02-01 14:00:00', 'Savings Deposit', 3500.00, 'Credit'),
(4, '2024-12-30 16:00:00', 'Year-end Deposit', 6000.00, 'Credit'),
(4, '2024-11-05 12:20:00', 'Transfer to Checking', 2200.00, 'Debit'),
(4, '2024-10-08 09:10:00', 'Interest Credit', 95.00, 'Credit'),
(4, '2024-09-15 13:45:00', 'Savings Deposit', 2500.00, 'Credit'),
(4, '2024-08-01 08:00:00', 'Interest Credit', 90.00, 'Credit');

-- Account 5 (User 3 - Checking)
INSERT INTO transactions (account_id, transaction_date, description, amount, transaction_type) VALUES
(5, '2025-07-01 09:00:00', 'Salary - July', 55000.00, 'Credit'),
(5, '2025-07-02 12:15:00', 'Daraz Purchase - Home Goods', 3200.00, 'Debit'),
(5, '2025-07-03 18:40:00', 'Pathao Ride', 400.00, 'Debit'),
(5, '2025-07-04 15:00:00', 'Shwapno Grocery', 3800.00, 'Debit'),
(5, '2025-07-05 08:30:00', 'bKash Top-up', 900.00, 'Debit'),
(5, '2025-07-06 14:10:00', 'DESCO Bill Payment', 1300.00, 'Debit'),
(5, '2025-07-08 11:20:00', 'Received from Imran Khan', 2500.00, 'Credit'),
(5, '2025-07-09 16:00:00', 'Star Cineplex Ticket', 800.00, 'Debit'),
(5, '2025-07-11 13:45:00', 'Aarong Purchase', 3000.00, 'Debit'),
(5, '2025-07-13 09:50:00', 'Mobile Recharge', 300.00, 'Debit'),
(5, '2025-07-15 08:00:00', 'bKash Cash In', 2000.00, 'Credit'),
(5, '2025-07-17 17:20:00', 'Titas Gas Bill', 1000.00, 'Debit'),
(5, '2025-07-20 14:30:00', 'Bata Shoes Purchase', 3500.00, 'Debit'),
(5, '2025-07-25 10:15:00', 'Interest Credit', 200.00, 'Credit'),
(5, '2025-06-20 09:00:00', 'Received - Gift', 1200.00, 'Credit');

-- Account 6 (User 3 - Savings)
INSERT INTO transactions (account_id, transaction_date, description, amount, transaction_type) VALUES
(6, '2025-07-01 09:05:00', 'Savings Deposit', 25000.00, 'Credit'),
(6, '2025-07-05 12:20:00', 'Transfer to Checking', 6000.00, 'Debit'),
(6, '2025-07-12 14:10:00', 'Interest Credit', 180.00, 'Credit'),
(6, '2025-07-20 15:40:00', 'Savings Deposit', 15000.00, 'Credit'),
(6, '2025-07-27 08:20:00', 'Transfer to Checking', 4000.00, 'Debit'),
(6, '2025-06-10 09:10:00', 'Interest Credit', 170.00, 'Credit'),
(6, '2025-05-09 10:20:00', 'Savings Deposit', 8000.00, 'Credit'),
(6, '2025-04-14 11:05:00', 'Transfer to Checking', 2500.00, 'Debit'),
(6, '2025-03-18 09:40:00', 'Interest Credit', 160.00, 'Credit'),
(6, '2025-02-21 10:00:00', 'Savings Deposit', 3000.00, 'Credit'),
(6, '2024-12-05 15:00:00', 'Bonus Deposit', 10000.00, 'Credit'),
(6, '2024-11-11 12:30:00', 'Transfer to Checking', 2000.00, 'Debit'),
(6, '2024-10-22 08:30:00', 'Interest Credit', 140.00, 'Credit'),
(6, '2024-09-30 09:00:00', 'Savings Deposit', 4000.00, 'Credit'),
(6, '2024-08-15 07:50:00', 'Interest Credit', 135.00, 'Credit');

-- Account 7 (User 4 - Checking)
INSERT INTO transactions (account_id, transaction_date, description, amount, transaction_type) VALUES
(7, '2025-07-01 10:00:00', 'Salary - July', 30000.00, 'Credit'),
(7, '2025-07-02 14:15:00', 'Daraz Purchase - Gadget', 2000.00, 'Debit'),
(7, '2025-07-03 09:50:00', 'Pathao Ride', 350.00, 'Debit'),
(7, '2025-07-04 18:30:00', 'Shwapno Grocery', 2800.00, 'Debit'),
(7, '2025-07-05 12:10:00', 'bKash Top-up', 500.00, 'Debit'),
(7, '2025-07-06 11:15:00', 'DESCO Bill Payment', 1000.00, 'Debit'),
(7, '2025-07-08 19:50:00', 'Received from Fatima Akter', 2500.00, 'Credit'),
(7, '2025-07-09 17:20:00', 'Star Cineplex Ticket', 800.00, 'Debit'),
(7, '2025-07-11 15:00:00', 'Aarong Purchase', 2200.00, 'Debit'),
(7, '2025-07-13 14:00:00', 'Mobile Recharge', 200.00, 'Debit'),
(7, '2025-07-16 20:30:00', 'bKash Cash In', 1500.00, 'Credit'),
(7, '2025-07-19 13:50:00', 'Titas Gas Bill', 850.00, 'Debit'),
(7, '2025-07-23 10:10:00', 'Bata Shoes Purchase', 2800.00, 'Debit'),
(7, '2025-07-28 09:15:00', 'Interest Credit', 150.00, 'Credit'),
(7, '2025-06-05 09:30:00', 'Received - Family', 2000.00, 'Credit');

-- Account 8 (User 4 - Savings)
INSERT INTO transactions (account_id, transaction_date, description, amount, transaction_type) VALUES
(8, '2025-07-01 10:05:00', 'Savings Deposit', 12000.00, 'Credit'),
(8, '2025-07-05 14:20:00', 'Transfer to Checking', 2500.00, 'Debit'),
(8, '2025-07-12 08:30:00', 'Interest Credit', 100.00, 'Credit'),
(8, '2025-07-20 10:10:00', 'Savings Deposit', 8000.00, 'Credit'),
(8, '2025-07-27 15:50:00', 'Transfer to Checking', 2000.00, 'Debit'),
(8, '2025-06-18 09:10:00', 'Interest Credit', 95.00, 'Credit'),
(8, '2025-05-12 11:20:00', 'Savings Deposit', 4000.00, 'Credit'),
(8, '2025-04-08 10:30:00', 'Transfer to Checking', 1800.00, 'Debit'),
(8, '2025-03-01 09:00:00', 'Interest Credit', 90.00, 'Credit'),
(8, '2025-02-20 15:00:00', 'Savings Deposit', 3500.00, 'Credit'),
(8, '2024-12-12 16:20:00', 'Bonus Deposit', 5000.00, 'Credit'),
(8, '2024-11-01 12:00:00', 'Transfer to Checking', 1200.00, 'Debit'),
(8, '2024-10-05 08:45:00', 'Interest Credit', 85.00, 'Credit'),
(8, '2024-09-10 07:50:00', 'Savings Deposit', 2200.00, 'Credit'),
(8, '2024-08-20 09:15:00', 'Interest Credit', 80.00, 'Credit');

-- Account 9 (User 5 - Checking)
INSERT INTO transactions (account_id, transaction_date, description, amount, transaction_type) VALUES
(9, '2025-07-30 09:00:00', 'Salary - August', 42000.00, 'Credit'),
(9, '2025-07-31 12:00:00', 'Daraz - Homeware', 3500.00, 'Debit'),
(9, '2025-07-31 13:30:00', 'Pathao Ride', 180.00, 'Debit'),
(9, '2025-08-01 10:00:00', 'Titas Gas Bill', 900.00, 'Debit'),
(9, '2025-08-02 15:30:00', 'Shwapno Grocery', 2500.00, 'Debit'),
(9, '2025-08-03 09:40:00', 'bKash Top-Up', 500.00, 'Debit'),
(9, '2025-08-05 11:10:00', 'Mobile Recharge - GP', 200.00, 'Debit'),
(9, '2025-08-07 19:00:00', 'Restaurant - Local', 750.00, 'Debit'),
(9, '2025-08-10 08:20:00', 'DESCO Bill', 1100.00, 'Debit'),
(9, '2025-06-05 09:30:00', 'Interest Credit', 120.00, 'Credit'),
(9, '2025-05-20 15:00:00', 'Received from Friend', 2000.00, 'Credit'),
(9, '2025-04-15 12:00:00', 'Shopping - Local', 1800.00, 'Debit'),
(9, '2025-03-10 10:30:00', 'bKash Cash In', 1500.00, 'Credit'),
(9, '2024-12-01 11:20:00', 'Year-end Bonus', 7000.00, 'Credit'),
(9, '2024-11-11 09:00:00', 'Utility Payment', 500.00, 'Debit');

-- Account 10 (User 5 - Savings)
INSERT INTO transactions (account_id, transaction_date, description, amount, transaction_type) VALUES
(10, '2025-08-01 09:00:00', 'Interest Credit', 120.00, 'Credit'),
(10, '2025-08-03 10:00:00', 'Transfer to Savings', 5000.00, 'Credit'),
(10, '2025-08-05 11:30:00', 'Withdrawal to Checking', 2000.00, 'Debit'),
(10, '2025-08-08 09:00:00', 'Interest Credit', 115.00, 'Credit'),
(10, '2025-08-10 16:00:00', 'Emergency Withdrawal', 1500.00, 'Debit'),
(10, '2025-06-12 09:00:00', 'Savings Deposit', 6000.00, 'Credit'),
(10, '2025-05-14 10:20:00', 'Interest Credit', 100.00, 'Credit'),
(10, '2025-04-22 12:00:00', 'Transfer to Checking', 2200.00, 'Debit'),
(10, '2025-03-09 14:00:00', 'Savings Deposit', 3000.00, 'Credit'),
(10, '2025-02-28 09:30:00', 'Interest Credit', 90.00, 'Credit'),
(10, '2024-12-24 10:00:00', 'Bonus Deposit', 8000.00, 'Credit'),
(10, '2024-11-30 11:00:00', 'Transfer to Checking', 1500.00, 'Debit'),
(10, '2024-10-10 09:40:00', 'Interest Credit', 80.00, 'Credit'),
(10, '2024-09-05 08:20:00', 'Savings Deposit', 2500.00, 'Credit'),
(10, '2024-08-03 07:50:00', 'Interest Credit', 75.00, 'Credit');

-- Account 11 (User 6 - Checking)
INSERT INTO transactions (account_id, transaction_date, description, amount, transaction_type) VALUES
(11, '2025-07-28 09:00:00', 'Salary - July', 38000.00, 'Credit'),
(11, '2025-07-29 12:00:00', 'Pathao Ride', 220.00, 'Debit'),
(11, '2025-07-29 14:00:00', 'Titas Gas Bill', 850.00, 'Debit'),
(11, '2025-07-30 10:30:00', 'Daraz Purchase - Bag', 2500.00, 'Debit'),
(11, '2025-08-01 09:15:00', 'Shwapno Grocery', 1900.00, 'Debit'),
(11, '2025-08-02 11:20:00', 'bKash Send Money', 2000.00, 'Debit'),
(11, '2025-08-03 13:10:00', 'Mobile Recharge - Robi', 300.00, 'Debit'),
(11, '2025-08-04 18:00:00', 'Restaurant - Local', 950.00, 'Debit'),
(11, '2025-08-06 09:00:00', 'DESCO Bill', 1150.00, 'Debit'),
(11, '2025-06-12 09:30:00', 'Interest Credit', 90.00, 'Credit'),
(11, '2025-05-14 10:40:00', 'Received from Family', 2500.00, 'Credit'),
(11, '2025-04-11 08:45:00', 'Shopping - Market', 1200.00, 'Debit'),
(11, '2025-03-09 07:50:00', 'bKash Cash In', 1000.00, 'Credit'),
(11, '2024-12-20 10:00:00', 'Year-end Bonus', 5000.00, 'Credit'),
(11, '2024-11-03 09:10:00', 'Utility Payment', 700.00, 'Debit');

-- Account 12 (User 6 - Savings)
INSERT INTO transactions (account_id, transaction_date, description, amount, transaction_type) VALUES
(12, '2025-08-01 09:05:00', 'Interest Credit', 90.00, 'Credit'),
(12, '2025-08-03 10:10:00', 'Transfer from Checking', 4000.00, 'Credit'),
(12, '2025-08-06 11:00:00', 'Withdrawal to Checking', 1500.00, 'Debit'),
(12, '2025-08-08 09:20:00', 'Interest Credit', 95.00, 'Credit'),
(12, '2025-08-10 15:40:00', 'Emergency Withdrawal', 1000.00, 'Debit'),
(12, '2025-06-01 09:10:00', 'Savings Deposit', 5000.00, 'Credit'),
(12, '2025-05-05 10:30:00', 'Interest Credit', 85.00, 'Credit'),
(12, '2025-04-21 11:45:00', 'Transfer to Checking', 1300.00, 'Debit'),
(12, '2025-03-14 09:50:00', 'Savings Deposit', 2500.00, 'Credit'),
(12, '2024-12-01 10:10:00', 'Bonus', 4000.00, 'Credit'),
(12, '2024-11-10 08:30:00', 'Transfer to Checking', 900.00, 'Debit'),
(12, '2024-10-02 09:00:00', 'Interest Credit', 80.00, 'Credit'),
(12, '2024-09-22 07:20:00', 'Savings Deposit', 1800.00, 'Credit'),
(12, '2024-08-18 08:45:00', 'Interest Credit', 75.00, 'Credit'),
(12, '2024-07-01 09:00:00', 'Initial Deposit', 3000.00, 'Credit');

-- Account 13 (User 7 - Checking)
INSERT INTO transactions (account_id, transaction_date, description, amount, transaction_type) VALUES
(13, '2025-07-29 09:00:00', 'Salary - July', 40000.00, 'Credit'),
(13, '2025-07-30 12:00:00', 'Daraz Online Shopping', 4200.00, 'Debit'),
(13, '2025-07-30 13:45:00', 'Pathao Ride', 160.00, 'Debit'),
(13, '2025-08-01 10:10:00', 'Titas Gas Bill', 890.00, 'Debit'),
(13, '2025-08-02 14:30:00', 'Shwapno Grocery', 2700.00, 'Debit'),
(13, '2025-08-03 11:20:00', 'bKash Top-Up', 800.00, 'Debit'),
(13, '2025-08-05 09:15:00', 'Mobile Recharge - Airtel', 250.00, 'Debit'),
(13, '2025-08-07 18:40:00', 'Restaurant - Kacchi', 950.00, 'Debit'),
(13, '2025-08-09 15:20:00', 'DESCO Bill', 1050.00, 'Debit'),
(13, '2025-06-05 09:30:00', 'Interest Credit', 110.00, 'Credit'),
(13, '2025-05-07 10:15:00', 'Received - Family', 3000.00, 'Credit'),
(13, '2025-04-03 12:20:00', 'Shopping - Clothes', 1800.00, 'Debit'),
(13, '2025-03-01 11:00:00', 'bKash Cash In', 1200.00, 'Credit'),
(13, '2024-12-31 16:00:00', 'Year-end Bonus', 8000.00, 'Credit'),
(13, '2024-11-20 09:00:00', 'Utility Payment', 600.00, 'Debit');

-- Account 14 (User 7 - Savings)
INSERT INTO transactions (account_id, transaction_date, description, amount, transaction_type) VALUES
(14, '2025-08-01 09:05:00', 'Interest Credit', 110.00, 'Credit'),
(14, '2025-08-03 10:20:00', 'Transfer from Checking', 4500.00, 'Credit'),
(14, '2025-08-05 11:30:00', 'Withdrawal to Checking', 1700.00, 'Debit'),
(14, '2025-08-07 09:00:00', 'Interest Credit', 115.00, 'Credit'),
(14, '2025-08-10 16:10:00', 'Emergency Withdrawal', 1300.00, 'Debit'),
(14, '2025-06-15 09:00:00', 'Savings Deposit', 4000.00, 'Credit'),
(14, '2025-05-16 10:30:00', 'Interest Credit', 100.00, 'Credit'),
(14, '2025-04-10 12:00:00', 'Transfer to Checking', 2000.00, 'Debit'),
(14, '2025-03-09 09:50:00', 'Savings Deposit', 1500.00, 'Credit'),
(14, '2024-12-10 11:15:00', 'Bonus', 3000.00, 'Credit'),
(14, '2024-11-02 09:05:00', 'Transfer to Checking', 1200.00, 'Debit'),
(14, '2024-10-01 08:40:00', 'Interest Credit', 95.00, 'Credit'),
(14, '2024-09-01 09:10:00', 'Initial Deposit', 2000.00, 'Credit'),
(14, '2024-08-01 07:30:00', 'Interest Credit', 90.00, 'Credit'),
(14, '2024-07-15 08:00:00', 'Savings Deposit', 2500.00, 'Credit');

-- Account 15 (User 8 - Checking)
INSERT INTO transactions (account_id, transaction_date, description, amount, transaction_type) VALUES
(15, '2025-07-27 09:30:00', 'Salary - July', 50000.00, 'Credit'),
(15, '2025-07-28 13:10:00', 'Daraz - Smartphone', 15000.00, 'Debit'),
(15, '2025-07-29 15:00:00', 'Pathao Ride', 180.00, 'Debit'),
(15, '2025-08-01 10:20:00', 'Titas Gas Bill', 920.00, 'Debit'),
(15, '2025-08-02 14:50:00', 'Shwapno Grocery', 3100.00, 'Debit'),
(15, '2025-08-03 09:45:00', 'bKash Send Money', 1000.00, 'Debit'),
(15, '2025-08-04 11:00:00', 'Mobile Recharge - Banglalink', 200.00, 'Debit'),
(15, '2025-08-06 18:10:00', 'Restaurant - Chillox', 850.00, 'Debit'),
(15, '2025-08-09 17:30:00', 'DESCO Bill', 1120.00, 'Debit'),
(15, '2025-06-02 09:15:00', 'Interest Credit', 140.00, 'Credit'),
(15, '2025-05-05 12:00:00', 'Received - Gift', 5000.00, 'Credit'),
(15, '2025-04-14 10:40:00', 'Online Subscription', 350.00, 'Debit'),
(15, '2025-03-08 09:00:00', 'bKash Cash In', 2000.00, 'Credit'),
(15, '2024-12-20 08:30:00', 'Year-end Bonus', 9000.00, 'Credit'),
(15, '2024-11-11 10:10:00', 'Store Purchase', 2500.00, 'Debit');

-- Account 16 (User 8 - Savings)
INSERT INTO transactions (account_id, transaction_date, description, amount, transaction_type) VALUES
(16, '2025-08-01 09:00:00', 'Interest Credit', 140.00, 'Credit'),
(16, '2025-08-03 10:30:00', 'Transfer from Checking', 8000.00, 'Credit'),
(16, '2025-08-05 11:15:00', 'Withdrawal to Checking', 2500.00, 'Debit'),
(16, '2025-08-07 09:40:00', 'Interest Credit', 135.00, 'Credit'),
(16, '2025-08-10 12:20:00', 'Emergency Withdrawal', 1600.00, 'Debit'),
(16, '2025-06-10 09:10:00', 'Savings Deposit', 10000.00, 'Credit'),
(16, '2025-05-14 10:25:00', 'Interest Credit', 120.00, 'Credit'),
(16, '2025-04-22 12:10:00', 'Transfer to Checking', 3000.00, 'Debit'),
(16, '2025-03-12 09:50:00', 'Savings Deposit', 4000.00, 'Credit'),
(16, '2024-12-01 15:00:00', 'Bonus Deposit', 7000.00, 'Credit'),
(16, '2024-11-06 09:20:00', 'Transfer to Checking', 2500.00, 'Debit'),
(16, '2024-10-13 08:10:00', 'Interest Credit', 110.00, 'Credit'),
(16, '2024-09-18 07:55:00', 'Savings Deposit', 3500.00, 'Credit'),
(16, '2024-08-24 09:05:00', 'Interest Credit', 105.00, 'Credit'),
(16, '2024-07-03 08:00:00', 'Initial Deposit', 6000.00, 'Credit');

-- Account 17 (User 9 - Checking)
INSERT INTO transactions (account_id, transaction_date, description, amount, transaction_type) VALUES
(17, '2025-07-26 09:20:00', 'Salary - July', 47000.00, 'Credit'),
(17, '2025-07-27 11:10:00', 'Daraz Purchase - Clothing', 3800.00, 'Debit'),
(17, '2025-07-28 08:40:00', 'Pathao Ride', 190.00, 'Debit'),
(17, '2025-08-01 10:30:00', 'Titas Gas Bill', 880.00, 'Debit'),
(17, '2025-08-02 13:45:00', 'Shwapno Grocery', 2600.00, 'Debit'),
(17, '2025-08-03 09:10:00', 'bKash Top-Up', 600.00, 'Debit'),
(17, '2025-08-04 14:00:00', 'Mobile Recharge - Teletalk', 180.00, 'Debit'),
(17, '2025-08-06 19:30:00', 'Restaurant - Sultan', 950.00, 'Debit'),
(17, '2025-08-09 16:10:00', 'DESCO Bill', 1070.00, 'Debit'),
(17, '2025-06-01 09:05:00', 'Interest Credit', 125.00, 'Credit'),
(17, '2025-05-11 10:50:00', 'Received from Colleague', 2400.00, 'Credit'),
(17, '2025-04-05 12:00:00', 'Shopping - Local', 1700.00, 'Debit'),
(17, '2025-03-02 09:30:00', 'bKash Cash In', 1300.00, 'Credit'),
(17, '2024-12-15 11:00:00', 'Bonus', 6000.00, 'Credit'),
(17, '2024-11-07 09:10:00', 'Utility Fee', 550.00, 'Debit');

-- Account 18 (User 9 - Savings)
INSERT INTO transactions (account_id, transaction_date, description, amount, transaction_type) VALUES
(18, '2025-08-01 09:10:00', 'Interest Credit', 125.00, 'Credit'),
(18, '2025-08-03 10:05:00', 'Transfer from Checking', 6000.00, 'Credit'),
(18, '2025-08-05 11:20:00', 'Withdrawal to Checking', 2100.00, 'Debit'),
(18, '2025-08-07 09:35:00', 'Interest Credit', 120.00, 'Credit'),
(18, '2025-08-10 15:30:00', 'Emergency Withdrawal', 1400.00, 'Debit'),
(18, '2025-06-12 09:00:00', 'Savings Deposit', 5000.00, 'Credit'),
(18, '2025-05-13 10:15:00', 'Interest Credit', 110.00, 'Credit'),
(18, '2025-04-09 11:45:00', 'Transfer to Checking', 2400.00, 'Debit'),
(18, '2025-03-06 09:50:00', 'Savings Deposit', 3200.00, 'Credit'),
(18, '2024-12-05 10:00:00', 'Bonus Deposit', 4500.00, 'Credit'),
(18, '2024-11-12 08:40:00', 'Transfer to Checking', 1800.00, 'Debit'),
(18, '2024-10-08 09:30:00', 'Interest Credit', 105.00, 'Credit'),
(18, '2024-09-02 07:50:00', 'Savings Deposit', 2100.00, 'Credit'),
(18, '2024-08-11 08:25:00', 'Interest Credit', 100.00, 'Credit'),
(18, '2024-07-01 09:00:00', 'Initial Deposit', 2500.00, 'Credit');


INSERT INTO goals (user_id, title, target_amount, current_amount, created_at) VALUES
(1, 'Hajj Fund', 450000.00, 75000.00, '2024-10-01 10:00:00'),
(1, 'New Mobile Phone', 35000.00, 5000.00, '2025-01-15 09:00:00'),

(2, 'Dhaka to Cox''s Bazar Trip', 30000.00, 8000.00, '2024-12-05 11:00:00'),
(2, 'Emergency Fund', 100000.00, 25000.00, '2025-02-01 10:30:00'),

(3, 'Child Education Fund', 200000.00, 40000.00, '2024-11-10 12:00:00'),
(3, 'Home Renovation', 150000.00, 20000.00, '2025-03-05 09:20:00'),

(4, 'Hajj Fund', 450000.00, 120000.00, '2024-09-20 09:40:00'),
(4, 'Car Down Payment', 800000.00, 150000.00, '2025-02-10 14:00:00'),

(5, 'Laptop Upgrade', 120000.00, 20000.00, '2024-10-12 10:50:00'),
(5, 'Dhaka to Sylhet Trip', 25000.00, 7000.00, '2025-01-09 11:20:00'),

(6, 'Wedding Savings', 500000.00, 90000.00, '2024-12-22 13:30:00'),
(6, 'Emergency Fund', 100000.00, 30000.00, '2025-03-14 08:15:00'),

(7, 'New Furniture', 85000.00, 15000.00, '2024-11-01 09:00:00'),
(7, 'Cox''s Bazar Resort Booking', 60000.00, 20000.00, '2025-01-18 10:10:00'),

(8, 'Small Business Investment', 300000.00, 50000.00, '2024-09-30 11:40:00'),
(8, 'Car Repair', 45000.00, 10000.00, '2025-02-27 09:00:00'),

(9, 'Home Appliance Upgrade', 100000.00, 25000.00, '2024-10-25 08:30:00'),
(9, 'New Mobile Phone', 30000.00, 6000.00, '2025-03-01 10:00:00');


INSERT INTO beneficiaries (user_id, beneficiary_name, beneficiary_account_number, bank_name, relationship, nickname, notes) VALUES
-- User 1 (Anika)
(1, 'Rahim Uddin', 'ACCT-10000002', 'Panda Bank', 'Family', 'Uncle Rahim', 'Monthly family support'),
(1, 'Fatima Akter', 'ACCT-10000003', 'Panda Bank', 'Friend', 'Fatima', 'College friend'),
(1, 'Imran Khan', 'ACCT-10000004', 'Other Bank', 'Business', 'IK Business', 'Business partner payments'),

-- User 2 (Rahim)
(2, 'Anika Tabassum', 'ACCT-10000001', 'Panda Bank', 'Family', 'Sister Anika', 'Sister'),
(2, 'Imran Khan', 'ACCT-10000004', 'Other Bank', 'Business', 'Imran', 'Freelance projects'),
(2, 'Nusrat Jahan', 'ACCT-10000010', 'Panda Bank', 'Family', 'Aunt Nusrat', 'Monthly support'),

-- User 3 (Fatima)
(3, 'Tanvir Hossain', 'ACCT-10000006', 'Panda Bank', 'Family', 'Brother Tanvir', 'Brother'),
(3, 'Shakil Ahmed', 'ACCT-10000015', 'Other Bank', 'Business', 'Shakil Bhai', 'Business supplier'),
(3, 'Mithila Rahman', 'ACCT-10000014', 'Panda Bank', 'Friend', 'Mithila', 'Close friend'),

-- User 4 (Imran)
(4, 'Anika Tabassum', 'ACCT-10000001', 'Panda Bank', 'Friend', 'Anika', 'University friend'),
(4, 'Fatima Akter', 'ACCT-10000003', 'Panda Bank', 'Family', 'Cousin Fatima', 'Cousin'),
(4, 'Hasan Mahmud', 'ACCT-10000013', 'Panda Bank', 'Service', 'Hasan Service', 'Service provider'),

-- User 5 (Shamima)
(5, 'Tanvir Hossain', 'ACCT-10000006', 'Panda Bank', 'Friend', 'Tanvir', NULL),
(5, 'Abdul Karim', 'ACCT-10000009', 'Other Bank', 'Business', 'AK Supplies', 'Regular supplier payments'),
(5, 'Anika Tabassum', 'ACCT-10000001', 'Panda Bank', 'Family', 'Anika', 'Family expense sharing'),

-- User 6 (Tanvir)
(6, 'Rahim Uddin', 'ACCT-10000002', 'Panda Bank', 'Family', 'Rahim Bhai', 'Monthly support payment'),
(6, 'Shamima Sultana', 'ACCT-10000005', 'Panda Bank', 'Friend', 'Shamima', NULL),

-- User 7 (Mahmudul)
(7, 'Jannatul Ferdous', 'ACCT-10000008', 'Panda Bank', 'Family', 'Jannatul', 'Spouse'),
(7, 'Fatima Akter', 'ACCT-10000003', 'Panda Bank', 'Business', 'Fatima Biz', 'Client payments'),
(7, 'Rafiq Islam', 'ACCT-10000017', 'Other Bank', 'Other', 'Rafiq Landlord', 'House Rent'),

-- User 8 (Jannatul)
(8, 'Mahmudul Hasan', 'ACCT-10000007', 'Panda Bank', 'Family', 'Hasan', 'Spouse'),
(8, 'Anika Tabassum', 'ACCT-10000001', 'Panda Bank', 'Friend', 'Anika', NULL),
(8, 'Salma Begum', 'ACCT-10000018', 'Panda Bank', 'Service', 'Salma - Utilities', 'Utility bill payments'),

-- User 9 (Abdul)
(9, 'Shamima Sultana', 'ACCT-10000005', 'Other Bank', 'Business', 'SS Corp', 'Corporate account'),
(9, 'Tanvir Hossain', 'ACCT-10000006', 'Panda Bank', 'Friend', 'Tanvir', NULL);


INSERT INTO scheduled_transfers (user_id, from_account_id, beneficiary_id, amount, frequency, start_date, end_date, status, notes) VALUES
-- User 1 (Anika) - Checking account_id: 1
(1, 1, 1, 5000.00, 'Monthly', '2025-09-15', NULL, 'Active', 'Monthly family support to Uncle Rahim'),
(1, 1, 2, 1200.00, 'Monthly', '2025-09-20', '2026-03-20', 'Active', 'Internet bill payment'),
(1, 2, 3, 10000.00, 'One-time', '2025-10-01', NULL, 'Paused', 'Business invoice payment to IK'),

-- User 2 (Rahim) - Checking account_id: 3
(2, 3, 4, 1500.00, 'Monthly', '2025-09-05', NULL, 'Active', 'Support for Sister Anika'),

-- User 3 (Fatima) - Checking account_id: 5
(3, 5, 7, 2500.00, 'Weekly', '2025-09-12', NULL, 'Active', 'Weekly allowance for brother'),
(3, 5, 8, 25000.00, 'One-time', '2025-09-30', NULL, 'Active', 'Supplier payment to Shakil Bhai'),

-- User 4 (Imran) - Checking account_id: 7
(4, 7, 11, 2000.00, 'Monthly', '2025-09-25', '2026-09-25', 'Active', 'Gift for Cousin Fatima'),

-- User 5 (Shamima) - Checking account_id: 9
(5, 9, 14, 50000.00, 'Monthly', '2025-09-15', NULL, 'Active', 'Payment to AK Supplies'),

-- User 6 (Tanvir) - Checking account_id: 11
(6, 11, 16, 3000.00, 'Monthly', '2025-09-10', NULL, 'Paused', 'Support payment to Rahim Bhai'),
(6, 11, 17, 5000.00, 'One-time', '2025-10-15', NULL, 'Active', 'Loan payback to Shamima'),

-- User 7 (Mahmudul) - Checking account_id: 13
(7, 13, 19, 20000.00, 'Monthly', '2025-09-01', NULL, 'Active', 'Rent payment to Rafiq Landlord'),

-- User 8 (Jannatul) - Checking account_id: 15
(8, 15, 23, 750.00, 'Monthly', '2025-09-07', NULL, 'Active', 'Utility split with Salma'),

-- User 9 (Abdul) - Checking account_id: 17
(9, 17, 24, 75000.00, 'One-time', '2025-09-28', NULL, 'Active', 'Invoice payment to SS Corp');

INSERT INTO cards (user_id, card_number, card_type, status, spending_limit) VALUES
(1, '4111111111111234', 'Debit', 'Active', 100000.00),
(1, '5500000000009876', 'Credit', 'Active', 150000.00),

(2, '4111111111115678', 'Debit', 'Active', 80000.00),
(2, '5500000000003456', 'Credit', 'Frozen', 120000.00),

(3, '4111111111119012', 'Debit', 'Active', 90000.00),
(3, '5500000000007890', 'Credit', 'Active', 200000.00),

(4, '4111111111111122', 'Debit', 'Active', 60000.00),
(5, '4111111111113344', 'Debit', 'Active', 75000.00),
(5, '5500000000005566', 'Credit', 'Frozen', 100000.00),
(6, '4111111111117788', 'Debit', 'Active', 50000.00),
(7, '4111111111119900', 'Debit', 'Active', 70000.00),
(7, '5500000000001122', 'Credit', 'Active', 90000.00),
(8, '4111111111112233', 'Debit', 'Active', 95000.00),
(9, '4111111111114455', 'Debit', 'Active', 85000.00),
(9, '5500000000006677', 'Credit', 'Active', 130000.00);


INSERT INTO bills (user_id, bill_name, amount, due_date, status, paid_on) VALUES
-- User 1
(1, 'DESCO Electricity', 1200.00, '2025-08-25', 'Pending', NULL),
(1, 'Internet (Fiber)', 1500.00, '2025-08-18', 'Paid', '2025-08-15'),

-- User 2
(2, 'WASA Water', 500.00, '2025-08-22', 'Pending', NULL),
(2, 'Rent', 15000.00, '2025-08-15', 'Pending', NULL),

-- User 3
(3, 'DESCO Electricity', 1300.00, '2025-08-21', 'Pending', NULL),
(3, 'Internet (Fiber)', 1400.00, '2025-08-17', 'Paid', '2025-08-11'),

-- User 4
(4, 'Rent', 12000.00, '2025-08-19', 'Pending', NULL),
(4, 'Internet (Fiber)', 1500.00, '2025-08-20', 'Pending', NULL),

-- User 5
(5, 'Titas Gas', 750.00, '2025-08-23', 'Pending', NULL),
(5, 'DESCO Electricity', 1250.00, '2025-08-18', 'Paid', '2025-08-16'),

-- User 6
(6, 'WASA Water', 600.00, '2025-08-26', 'Pending', NULL),
(6, 'Internet (Fiber)', 1400.00, '2025-08-16', 'Paid', '2025-08-10'),
(6, 'Rent', 14000.00, '2025-08-14', 'Pending', NULL),

-- User 7
(7, 'Titas Gas', 800.00, '2025-08-24', 'Pending', NULL),
(7, 'DESCO Electricity', 1300.00, '2025-08-19', 'Paid', '2025-08-19'),

-- User 8
(8, 'Internet (Fiber)', 1500.00, '2025-08-17', 'Pending', NULL),
(8, 'WASA Water', 550.00, '2025-08-27', 'Pending', NULL),

-- User 9
(9, 'Rent', 16000.00, '2025-08-15', 'Pending', NULL),
(9, 'DESCO Electricity', 1250.00, '2025-08-20', 'Paid', '2025-08-18'),
(9, 'Titas Gas', 900.00, '2025-08-25', 'Pending', NULL);


INSERT INTO loans (user_id, amount_requested, purpose, term_in_months, status, created_at) VALUES
(1, 150000.00, 'Home Renovation', 24, 'Approved', '2025-02-10 10:00:00'),
(1, 50000.00,  'Education', 12, 'Pending', '2025-05-01 12:00:00'),

(2, 200000.00, 'Small Business Expansion', 36, 'Rejected', '2024-11-12 09:00:00'),
(2, 120000.00, 'Travel', 18, 'Pending', '2025-04-22 11:30:00'),

(3, 300000.00, 'Car Purchase', 36, 'Approved', '2024-12-01 14:10:00'),

(4, 250000.00, 'Wedding', 24, 'Pending', '2025-03-15 16:20:00'),
(4, 100000.00, 'Medical Expense', 12, 'Approved', '2025-01-10 09:45:00'),

(5, 180000.00, 'Personal', 18, 'Rejected', '2024-10-05 10:30:00'),

(6, 400000.00, 'House Construction', 36, 'Approved', '2024-09-20 08:00:00'),
(6, 75000.00,  'Education', 12, 'Pending', '2025-06-12 13:30:00'),

(7, 220000.00, 'Business Startup', 24, 'Pending', '2025-04-01 10:00:00'),

(8, 95000.00,  'Laptop Purchase', 12, 'Approved', '2025-02-18 09:20:00'),
(8, 150000.00, 'Travel', 18, 'Rejected', '2024-11-25 15:40:00'),

(9, 300000.00, 'Home Renovation', 24, 'Pending', '2025-03-30 12:00:00');


INSERT INTO wallets (user_id, currency_code, balance) VALUES
(1, 'BDT', 85000.00), (1, 'USD', 500.00), (1, 'EUR', 300.00),
(2, 'BDT', 120000.00),(2, 'USD', 1000.00),(2, 'GBP', 200.00),
(3, 'BDT', 60000.00), (3, 'EUR', 250.00), (3, 'USD', 750.00),
(4, 'BDT', 40000.00), (4, 'USD', 1500.00),(4, 'GBP', 100.00),
(5, 'BDT', 95000.00), (5, 'EUR', 350.00), (5, 'USD', 800.00),
(6, 'BDT', 70000.00), (6, 'USD', 1200.00),(6, 'GBP', 250.00),
(7, 'BDT', 55000.00), (7, 'EUR', 200.00), (7, 'USD', 900.00),
(8, 'BDT', 130000.00),(8, 'USD', 650.00), (8, 'GBP', 300.00),
(9, 'BDT', 48000.00), (9, 'EUR', 400.00), (9, 'USD', 500.00);


INSERT INTO tickets (user_id, subject, status, created_at) VALUES
(1, 'Unable to log in on mobile app', 'Open', '2025-08-05 10:00:00'),
(1, 'Query about loan application', 'Closed', '2025-08-03 15:30:00'),
(2, 'Incorrect bill amount displayed', 'Pending', '2025-08-04 11:15:00'),
(3, 'Card not working for online purchases', 'Open', '2025-08-06 09:45:00'),
(4, 'Need to increase card spending limit', 'Closed', '2025-08-02 14:20:00'),
(5, 'Can’t add a new beneficiary', 'Open', '2025-08-07 16:00:00'),
(6, 'Currency conversion issue', 'Pending', '2025-08-05 13:40:00'),
(7, 'Bill payment failed', 'Closed', '2025-08-01 08:55:00'),
(8, 'Need statement for visa application', 'Open', '2025-08-08 12:25:00'),
(9, 'Suspicious login detected', 'Open', '2025-08-06 17:10:00');


INSERT INTO ticket_messages (ticket_id, sender, message_text, sent_at) VALUES
-- Ticket 1 (ticket_id 1)
(1, 'User', 'I can’t log into the mobile app since yesterday.', '2025-08-05 10:05:00'),
(1, 'Support', 'Please try resetting your password. Let us know if it works.', '2025-08-05 10:20:00'),
(1, 'User', 'Password reset worked. Thank you!', '2025-08-05 11:00:00'),

-- Ticket 2 (ticket_id 2)
(2, 'User', 'I have a question about my loan application status.', '2025-08-03 15:35:00'),
(2, 'Support', 'Your loan was approved yesterday.', '2025-08-03 15:50:00'),

-- Ticket 3 (ticket_id 3)
(3, 'User', 'I see a higher bill than usual for electricity.', '2025-08-04 11:20:00'),
(3, 'Support', 'We are checking with DESCO and will update soon.', '2025-08-04 11:40:00'),

-- Ticket 4 (ticket_id 4)
(4, 'User', 'Card transactions are being declined online.', '2025-08-06 09:50:00'),
(4, 'Support', 'Please check if your card is active and not frozen.', '2025-08-06 10:10:00'),

-- Ticket 5 (ticket_id 5)
(5, 'User', 'Need to increase my card limit from 90k to 150k.', '2025-08-02 14:25:00'),
(5, 'Support', 'Limit increased as requested.', '2025-08-02 14:50:00'),

-- Ticket 6 (ticket_id 6)
(6, 'User', 'I cannot add my cousin as a beneficiary.', '2025-08-07 16:05:00'),
(6, 'Support', 'Could you share their account number? We will assist.', '2025-08-07 16:20:00'),

-- Ticket 7 (ticket_id 7)
(7, 'User', 'Conversion from USD to BDT seems incorrect.', '2025-08-05 13:45:00'),
(7, 'Support', 'We use fixed demo rates for now. Please check again.', '2025-08-05 14:00:00'),

-- Ticket 8 (ticket_id 8)
(8, 'User', 'Bill payment failed for Titas Gas.', '2025-08-01 09:00:00'),
(8, 'Support', 'It was a server glitch. Please try again.', '2025-08-01 09:15:00'),

-- Ticket 9 (ticket_id 9)
(9, 'User', 'I need my last 6 months statement for visa purposes.', '2025-08-08 12:30:00'),
(9, 'Support', 'Statement emailed to your registered address.', '2025-08-08 12:50:00'),

(10, 'User', 'I got an alert about suspicious login.', '2025-08-06 17:15:00');


INSERT INTO activity_log (user_id, action, device_info, ip_address, timestamp) VALUES
(1, 'Login from new IP', 'Chrome on Android', '103.120.56.12', '2025-08-05 09:15:00'),
(1, 'Beneficiary Added', 'Web portal', '103.120.56.12', '2025-08-05 09:17:00'),
(1, 'Bill Paid - Internet', 'Web portal', '103.120.56.12', '2025-08-06 14:20:00'),

(2, 'Login from new IP', 'Chrome on iOS', '103.77.21.45', '2025-08-04 08:50:00'),
(2, 'Money Transfer to Rahima Khatun', 'Mobile App', '103.77.21.45', '2025-08-04 09:05:00'),
(2, 'Bill Payment - Rent', 'Web portal', '103.77.21.45', '2025-08-14 10:00:00'),

(3, 'Login from known device', 'Firefox on Ubuntu', '103.120.77.33', '2025-08-07 10:10:00'),
(3, 'Card Frozen', 'Mobile App', '103.120.77.33', '2025-08-07 10:15:00'),
(3, 'Password Changed', 'Web portal', '103.120.77.33', '2025-08-08 08:30:00'),

(4, 'Login from new IP', 'Chrome desktop', '103.50.65.78', '2025-08-03 07:45:00'),
(4, 'Bill Paid - Rent', 'Web portal', '103.50.65.78', '2025-08-03 08:05:00'),
(4, 'Beneficiary Added', 'Mobile App', '103.50.65.78', '2025-08-04 09:00:00'),

(5, 'Login from new IP', 'Safari on iPhone', '103.22.33.44', '2025-08-06 12:00:00'),
(5, 'Beneficiary Added', 'Web portal', '103.22.33.44', '2025-08-06 12:10:00'),
(5, 'Password Changed', 'Mobile App', '103.22.33.44', '2025-08-07 09:40:00'),

(6, 'Login from known device', 'Chrome on Windows', '103.66.77.88', '2025-08-04 11:20:00'),
(6, 'Money Transfer to Farhana Akter', 'Mobile App', '103.66.77.88', '2025-08-04 11:35:00'),
(6, 'Bill Paid - Internet', 'Web portal', '103.66.77.88', '2025-08-05 15:00:00'),

(7, 'Login from new IP', 'Android App', '103.12.45.67', '2025-08-08 08:50:00'),
(7, 'Card Frozen', 'Mobile App', '103.12.45.67', '2025-08-08 09:00:00'),
(7, 'Beneficiary Added', 'Web portal', '103.12.45.67', '2025-08-09 10:00:00'),

(8, 'Login from known device', 'Edge on Windows', '103.89.56.34', '2025-08-05 15:10:00'),
(8, 'Bill Paid - WASA', 'Web portal', '103.89.56.34', '2025-08-05 15:20:00'),
(8, 'Money Transfer to Supplier', 'Mobile App', '103.89.56.34', '2025-08-07 09:30:00'),

(9, 'Login from new IP', 'Firefox on Mac', '103.90.12.23', '2025-08-07 07:50:00'),
(9, 'Beneficiary Added', 'Web portal', '103.90.12.23', '2025-08-07 08:00:00'),
(9, 'Money Transfer to Imran Khan', 'Web portal', '103.90.12.23', '2025-08-07 08:15:00');

