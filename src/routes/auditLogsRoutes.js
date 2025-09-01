const express = require('express');
const router = express.Router();
const auditLogsController = require('../controllers/auditLogsController');
const authenticateToken = require('../middleware/authMiddleware');

router.use(authenticateToken);

router.get('/', auditLogsController.getAuditLogs);
router.get('/security-alerts', auditLogsController.getSecurityAlerts);
router.get('/statistics', auditLogsController.getActivityStatistics);
router.get('/export', auditLogsController.exportAuditLogs);

module.exports = router;