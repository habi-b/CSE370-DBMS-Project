const db = require('../config/db');

// Get filtered audit logs
exports.getAuditLogs = async (req, res) => {
    try {
        const userId = req.user.userId;
        const {
            page = 1,
            limit = 20,
            startDate,
            endDate,
            action,
            severity,
            outcome,
            ipAddress,
            deviceInfo
        } = req.query;

        const offset = (page - 1) * limit;
        
        let query = `
            SELECT al.*, u.full_name, u.email 
            FROM activity_log al
            JOIN users u ON al.user_id = u.user_id
            WHERE al.user_id = ?
        `;
        let countQuery = `
            SELECT COUNT(*) as total 
            FROM activity_log al
            WHERE al.user_id = ?
        `;
        const queryParams = [userId];
        const countParams = [userId];

        // Add filters
        if (startDate) {
            query += ' AND al.timestamp >= ?';
            countQuery += ' AND al.timestamp >= ?';
            queryParams.push(startDate);
            countParams.push(startDate);
        }

        if (endDate) {
            query += ' AND al.timestamp <= ?';
            countQuery += ' AND al.timestamp <= ?';
            queryParams.push(endDate);
            countParams.push(endDate);
        }

        if (action) {
            query += ' AND al.action LIKE ?';
            countQuery += ' AND al.action LIKE ?';
            queryParams.push(`%${action}%`);
            countParams.push(`%${action}%`);
        }

        if (severity) {
            query += ' AND al.severity = ?';
            countQuery += ' AND al.severity = ?';
            queryParams.push(severity);
            countParams.push(severity);
        }

        if (outcome) {
            query += ' AND al.outcome = ?';
            countQuery += ' AND al.outcome = ?';
            queryParams.push(outcome);
            countParams.push(outcome);
        }

        if (ipAddress) {
            query += ' AND al.ip_address LIKE ?';
            countQuery += ' AND al.ip_address LIKE ?';
            queryParams.push(`%${ipAddress}%`);
            countParams.push(`%${ipAddress}%`);
        }

        if (deviceInfo) {
            query += ' AND al.device_info LIKE ?';
            countQuery += ' AND al.device_info LIKE ?';
            queryParams.push(`%${deviceInfo}%`);
            countParams.push(`%${deviceInfo}%`);
        }

        // Add sorting and pagination
        query += ' ORDER BY al.timestamp DESC LIMIT ? OFFSET ?';
        queryParams.push(parseInt(limit), offset);

        const [logs] = await db.query(query, queryParams);
        const [countResult] = await db.query(countQuery, countParams);
        const total = countResult[0].total;
        const totalPages = Math.ceil(total / limit);

        res.status(200).json({
            logs,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                totalPages
            }
        });
    } catch (error) {
        console.error('Error fetching audit logs:', error);
        res.status(500).json({ message: 'Server error while fetching audit logs.' });
    }
};

// Get security alerts (High and Critical severity events)
exports.getSecurityAlerts = async (req, res) => {
    const userId = req.user.userId;
    
    try {
        const [alerts] = await db.query(`
            SELECT al.*, u.full_name, u.email 
            FROM activity_log al
            JOIN users u ON al.user_id = u.user_id
            WHERE al.user_id = ? 
            AND al.severity IN ('High', 'Critical')
            ORDER BY al.timestamp DESC
            LIMIT 50
        `, [userId]);

        res.status(200).json(alerts);
    } catch (error) {
        console.error('Error fetching security alerts:', error);
        res.status(500).json({ message: 'Server error while fetching security alerts.' });
    }
};

// Get activity statistics
exports.getActivityStatistics = async (req, res) => {
    const userId = req.user.userId;
    const { days = 30 } = req.query;

    try {
        // Activity count by type
        const [activityByType] = await db.query(`
            SELECT action, COUNT(*) as count 
            FROM activity_log 
            WHERE user_id = ? 
            AND timestamp >= DATE_SUB(NOW(), INTERVAL ? DAY)
            GROUP BY action 
            ORDER BY count DESC
        `, [userId, parseInt(days)]);

        // Activity count by outcome
        const [activityByOutcome] = await db.query(`
            SELECT outcome, COUNT(*) as count 
            FROM activity_log 
            WHERE user_id = ? 
            AND timestamp >= DATE_SUB(NOW(), INTERVAL ? DAY)
            GROUP BY outcome
        `, [userId, parseInt(days)]);

        // Activity count by severity
        const [activityBySeverity] = await db.query(`
            SELECT severity, COUNT(*) as count 
            FROM activity_log 
            WHERE user_id = ? 
            AND timestamp >= DATE_SUB(NOW(), INTERVAL ? DAY)
            GROUP BY severity
        `, [userId, parseInt(days)]);

        // Daily activity count
        const [dailyActivity] = await db.query(`
            SELECT DATE(timestamp) as date, COUNT(*) as count 
            FROM activity_log 
            WHERE user_id = ? 
            AND timestamp >= DATE_SUB(NOW(), INTERVAL ? DAY)
            GROUP BY DATE(timestamp) 
            ORDER BY date
        `, [userId, parseInt(days)]);

        res.status(200).json({
            byType: activityByType,
            byOutcome: activityByOutcome,
            bySeverity: activityBySeverity,
            daily: dailyActivity
        });
    } catch (error) {
        console.error('Error fetching activity statistics:', error);
        res.status(500).json({ message: 'Server error while fetching activity statistics.' });
    }
};

// Export audit logs
exports.exportAuditLogs = async (req, res) => {
    const userId = req.user.userId;
    const { format = 'json', startDate, endDate } = req.query;

    try {
        let query = `
            SELECT al.*, u.full_name, u.email 
            FROM activity_log al
            JOIN users u ON al.user_id = u.user_id
            WHERE al.user_id = ?
        `;
        const queryParams = [userId];

        if (startDate) {
            query += ' AND al.timestamp >= ?';
            queryParams.push(startDate);
        }

        if (endDate) {
            query += ' AND al.timestamp <= ?';
            queryParams.push(endDate);
        }

        query += ' ORDER BY al.timestamp DESC';

        const [logs] = await db.query(query, queryParams);

        if (format === 'csv') {
            // Convert to CSV
            const csv = convertToCSV(logs);
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader('Content-Disposition', 'attachment; filename=audit-logs.csv');
            res.status(200).send(csv);
        } else {
            res.status(200).json(logs);
        }
    } catch (error) {
        console.error('Error exporting audit logs:', error);
        res.status(500).json({ message: 'Server error while exporting audit logs.' });
    }
};

// Helper function to convert data to CSV
function convertToCSV(data) {
    if (data.length === 0) return '';
    
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => 
        Object.values(row).map(value => 
            `"${String(value || '').replace(/"/g, '""')}"`
        ).join(',')
    );
    
    return [headers, ...rows].join('\n');
}