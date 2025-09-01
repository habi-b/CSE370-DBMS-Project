const cron = require('node-cron');
const db = require('../config/db');


const processScheduledTransfers = async () => {
    // Get today's date in 'YYYY-MM-DD' format, respecting the server's timezone.
    const today = new Date().toISOString().slice(0, 10);
    console.log(`[${new Date().toISOString()}] Checking for scheduled transfers due on: ${today}`);

    try {
        // Find all schedules that are 'Active' and have a start_date on or before today.
        // Also, ensure noot to process transfers with an end_date that has already passed.
        const [schedules] = await db.query(
            `SELECT 
                st.schedule_id, st.user_id, st.from_account_id, st.amount, st.frequency, st.end_date,
                b.beneficiary_account_number,
                u_sender.full_name as sender_name,
                b.beneficiary_name as receiver_name
             FROM scheduled_transfers st
             JOIN beneficiaries b ON st.beneficiary_id = b.beneficiary_id
             JOIN users u_sender ON st.user_id = u_sender.user_id
             WHERE st.status = 'Active' AND st.start_date <= ? AND (st.end_date IS NULL OR st.end_date >= ?)`,
            [today, today]
        );

        if (schedules.length === 0) {
            console.log('No transfers due today.');
            return;
        }

        console.log(`Found ${schedules.length} due transfer(s). Processing...`);

        // Process each due schedule
        for (const schedule of schedules) {

            const connection = await db.getConnection();
            await connection.beginTransaction();

            try {
                // 1. Check sender's balance
                const [[senderAccount]] = await connection.query('SELECT balance FROM accounts WHERE account_id = ? FOR UPDATE', [schedule.from_account_id]);

                if (senderAccount.balance < schedule.amount) {
                    console.error(`Insufficient funds for schedule ID ${schedule.schedule_id}. Skipping.`);
                    await connection.rollback(); // Rollback if funds are insufficient
                    continue; // Move to the next schedule
                }

                // 2. Find receiver's account
                const [[receiverAccount]] = await connection.query('SELECT account_id FROM accounts WHERE account_number = ?', [schedule.beneficiary_account_number]);
                if (!receiverAccount) {
                    console.error(`Receiver account ${schedule.beneficiary_account_number} not found for schedule ID ${schedule.schedule_id}. Skipping.`);
                    await connection.rollback();
                    continue;
                }
                const receiverAccountId = receiverAccount.account_id;

                // 3. Debit sender's account
                await connection.query('UPDATE accounts SET balance = balance - ? WHERE account_id = ?', [schedule.amount, schedule.from_account_id]);

                // 4. Credit receiver's account
                await connection.query('UPDATE accounts SET balance = balance + ? WHERE account_id = ?', [schedule.amount, receiverAccountId]);

                // 5. Create transaction record for the sender (Debit)
                const debitDescription = `Scheduled transfer to ${schedule.receiver_name}`;
                await connection.query('INSERT INTO transactions (account_id, description, amount, transaction_type) VALUES (?, ?, ?, ?)', [schedule.from_account_id, debitDescription, schedule.amount, 'Debit']);

                // 6. Create transaction record for the receiver (Credit)
                const creditDescription = `Scheduled transfer from ${schedule.sender_name}`;
                await connection.query('INSERT INTO transactions (account_id, description, amount, transaction_type) VALUES (?, ?, ?, ?)', [receiverAccountId, creditDescription, schedule.amount, 'Credit']);

                // 7. Update the schedule's status if it's a 'One-time' transfer
                if (schedule.frequency === 'One-time') {
                    await connection.query('UPDATE scheduled_transfers SET status = ? WHERE schedule_id = ?', ['Completed', schedule.schedule_id]);
                }

                await connection.commit();
                console.log(`Successfully processed schedule ID ${schedule.schedule_id}.`);

            } catch (error) {
                await connection.rollback();
                console.error(`Failed to process schedule ID ${schedule.schedule_id}:`, error);
            } finally {
                connection.release();
            }
        }

    } catch (error) {
        console.error('Error fetching scheduled transfers:', error);
    }
};

const initScheduledJobs = () => {
    // Schedule the job to run daily at 1:00 AM server time
    cron.schedule('0 1 * * *', processScheduledTransfers, {
        scheduled: true,
        timezone: "Asia/Dhaka" //server's timezone
    });

    console.log('🕒 Cron job for scheduled transfers has been initialized. Will run daily at 1:00 AM.');

    // processScheduledTransfers(); 
};

module.exports = { initScheduledJobs };
