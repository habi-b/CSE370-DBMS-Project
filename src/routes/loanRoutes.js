const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController');
const authenticateToken = require('../middleware/authMiddleware');

// Protect all routes in this file
router.use(authenticateToken);

// Route to get eligibility data
router.get('/eligibility', loanController.getEligibility);

// Route to submit a new loan application
router.post('/apply', loanController.applyForLoan);

module.exports = router;
