const express = require('express');
const cors = require('cors');
const dashboardRoutes = require('./src/routes/dashboardRoutes');
const goalsRoutes = require('./src/routes/goalsRoutes');
const loanRoutes = require('./src/routes/loanRoutes');
const scheduledTransfersRoutes = require('./src/routes/scheduledTransfersRoutes');
const transactiontagsRoutes = require('./src/routes/transactiontagsRoutes');
require('dotenv').config(); // Loads environment variables from a .env file

// Import routes
const authRoutes = require('./src/routes/authRoutes');

// Initialize the Express app
const app = express();

// Middleware
app.use(cors()); // Enables Cross-Origin Resource Sharing, allowing front-end to communicate with back-end
app.use(express.json()); // Parses incoming JSON requests

// Define API routes
app.use('/api/auth', authRoutes); // All routes starting with /api/auth will be handled by authRoutes
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/goals', goalsRoutes);
app.use('/api/loans', loanRoutes);
app.use('/api/schedules', scheduledTransfersRoutes);
app.use('/api/transactiontags', transactiontagsRoutes);

// the port for the server to listen on
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`🐼 Panda Bank server is running on port ${PORT}`);
});
