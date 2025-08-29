const express = require('express');
const router = express.Router();
const insightsController = require('../controllers/insightsController');
const authenticateToken = require('../middleware/authMiddleware');

router.use(authenticateToken);

router.get('/', insightsController.getFinancialInsights);

module.exports = router;