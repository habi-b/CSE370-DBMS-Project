// kon api call hobe controller theke ta define korchi

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Define the route for user login
router.post('/login', authController.login);

// Define the route for user registration
router.post('/register', authController.register);

module.exports = router;
