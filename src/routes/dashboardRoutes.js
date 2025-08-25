
const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const authenticateToken = require('../middleware/authMiddleware');

// Define the route for fetching dashboard data.
// It is protected by the authenticateToken middleware.
// A request to GET /api/dashboard will first be checked by the middleware.
// If the token is valid, it will proceed to the getData function.
router.get('/', authenticateToken, dashboardController.getData);

module.exports = router;
