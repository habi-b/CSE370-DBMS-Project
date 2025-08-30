const express = require('express');
const router = express.Router();
const cardManagementController = require('../controllers/cardManagementController');
const authenticateToken = require('../middleware/authMiddleware');

router.use(authenticateToken);

router.get('/', cardManagementController.getUserCards);
router.get('/:cardId/transactions', cardManagementController.getCardTransactions);
router.put('/:cardId/status', cardManagementController.updateCardStatus);
router.put('/:cardId/limit', cardManagementController.updateSpendingLimit);
router.post('/:cardId/report', cardManagementController.reportCardIssue);

module.exports = router;