const express = require('express');
const router = express.Router();
const scheduledTransfersController = require('../controllers/scheduledTransfersController');
const authenticateToken = require('../middleware/authMiddleware');

// Protect all routes in this file
router.use(authenticateToken);

// Route to get data needed for the form (accounts and beneficiaries)
router.get('/form-options', scheduledTransfersController.getFormOptions);

// CRUD routes for scheduled transfers
router.get('/', scheduledTransfersController.getScheduledTransfers);
router.post('/', scheduledTransfersController.createScheduledTransfer);
router.put('/:scheduleId/status', scheduledTransfersController.updateScheduleStatus);
router.delete('/:scheduleId', scheduledTransfersController.deleteSchedule);

module.exports = router;
