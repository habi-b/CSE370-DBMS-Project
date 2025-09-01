const cron = require('node-cron');
const db = require('../config/db');

/**
 * @param {Date | string} dateInput The date to format.
 * @returns {string} The formatted date string 'YYYY-MM-DD'.
 */

const formatDateForCompare = (dateInput) => {
    const d = new Date(dateInput);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};


const processScheduledTransfers = async () => {
    const today = formatDateForCompare(new Date());

    console.log(`[${new Date().toISOString()}] Checking for scheduled transfers due on: ${today}`);

    try {
        const [schedules] = await db.query(
            `SELECT 
                st.schedule_id, st.user_id, st.from_account_id, st.amount, st.frequency, st.start_date, st.end_date,
                b.beneficiary_account_number,
                u_sender.full_name as sender_name,
                b.beneficiary_name as receiver_name
             FROM scheduled_transfers st
             JOIN beneficiaries b ON st.beneficiary_id = b.beneficiary_id
             JOIN users u_sender ON st.user_id = u_sender.user_id
             WHERE st.status = 'Active' AND st.start_date <= ?`,
            [today]
        );

        if (schedules.length === 0) {
            console.log('No potential transfers to process.');
            return;
        }

        const dueSchedules = schedules.filter(schedule => {
            if (schedule.end_date && new Date(schedule.end_date) < new Date(today)) {
                return false;
            }

            const startDate = new Date(schedule.start_date);
            const todayDate = new Date(today);

            switch (schedule.frequency) {
                case 'One-time':
                    return formatDateForCompare(startDate) === today;
                case 'Weekly':
                    const diffTimeW = Math.abs(todayDate - startDate);
                    const diffDaysW = Math.floor(diffTimeW / (1000 * 60 * 60 * 24));
                    return diffDaysW > 0 && diffDaysW % 7 === 0;
                case 'Monthly':
                    const isLastDayOfMonth = todayDate.getDate() === new Date(todayDate.getFullYear(), todayDate.getMonth() + 1, 0).getDate();
                    if (startDate.getDate() > todayDate.getDate() && isLastDayOfMonth) {
                        return true;
                    }
                    return startDate.getDate() === todayDate.getDate();
                default:
                    return false;
            }
        });


        if (dueSchedules.length === 0) {
            console.log('No transfers due today.');
            return;
        }

        console.log(`Found ${dueSchedules.length} due transfer(s). Processing...`);

        for (const schedule of dueSchedules) {

            const connection = await db.getConnection();
            await connection.beginTransaction();

            try {
                const [[senderAccount]] = await connection.query('SELECT balance FROM accounts WHERE account_id = ? FOR UPDATE', [schedule.from_account_id]);

                const currentBalance = parseFloat(senderAccount.balance);
                const transferAmount = parseFloat(schedule.amount);

                console.log(`Schedule ID: ${schedule.schedule_id} | Checking Balance: ${currentBalance} | Transfer Amount: ${transferAmount}`);

                if (currentBalance < transferAmount) {
                    console.error(`Insufficient funds for schedule ID ${schedule.schedule_id}. Skipping.`);
                    await connection.rollback();
                    continue;
                }


                const [[receiverAccount]] = await connection.query('SELECT account_id FROM accounts WHERE account_number = ?', [schedule.beneficiary_account_number]);
                if (!receiverAccount) {
                    console.error(`Receiver account ${schedule.beneficiary_account_number} not found for schedule ID ${schedule.schedule_id}. Skipping.`);
                    await connection.rollback();
                    continue;
                }
                const receiverAccountId = receiverAccount.account_id;

                await connection.query('UPDATE accounts SET balance = balance - ? WHERE account_id = ?', [transferAmount, schedule.from_account_id]);
                await connection.query('UPDATE accounts SET balance = balance + ? WHERE account_id = ?', [transferAmount, receiverAccountId]);

                const debitDescription = `Scheduled transfer to ${schedule.receiver_name}`;
                await connection.query('INSERT INTO transactions (account_id, description, amount, transaction_type) VALUES (?, ?, ?, ?)', [schedule.from_account_id, debitDescription, transferAmount, 'Debit']);

                const creditDescription = `Scheduled transfer from ${schedule.sender_name}`;
                await connection.query('INSERT INTO transactions (account_id, description, amount, transaction_type) VALUES (?, ?, ?, ?)', [receiverAccountId, creditDescription, transferAmount, 'Credit']);

                if (schedule.frequency === 'One-time') {
                    await connection.query('UPDATE scheduled_transfers SET status = ? WHERE schedule_id = ?', ['Completed', schedule.schedule_id]);
                }

                await connection.commit();
                console.log(`Successfully processed schedule ID ${schedule.schedule_id}.`);

            } catch (error) {
                await connection.rollback();
                console.error(`[CRITICAL ERROR] Failed to process schedule ID ${schedule.schedule_id}:`, error);
            } finally {
                connection.release();
            }
        }

    } catch (error) {
        console.error('Error fetching scheduled transfers:', error);
    }
};


const initScheduledJobs = () => {
    cron.schedule('0 1 * * *', processScheduledTransfers, {
        scheduled: true,
        timezone: "Asia/Dhaka"
    });

    console.log('🕒 Cron job for scheduled transfers has been initialized. Will run daily at 1:00 AM.');

    // processScheduledTransfers();
};

module.exports = { initScheduledJobs };

