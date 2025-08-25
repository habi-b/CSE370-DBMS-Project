const express = require('express');
const router = express.Router();
const goalsController = require('../controllers/goalsController');
const authenticateToken = require('../middleware/authMiddleware');

// the authentication middleware to all routes in this file
router.use(authenticateToken);

// CRUD for the routes
router.get('/', goalsController.getGoals);
router.post('/', goalsController.createGoal);
router.put('/:goalId/contribute', goalsController.contributeToGoal);
router.delete('/:goalId', goalsController.deleteGoal);

module.exports = router;
