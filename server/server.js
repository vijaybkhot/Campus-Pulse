// server/server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

// Initialize the Express application
const app = express();

// Middleware
app.use(cors());  // Enable Cross-Origin Resource Sharing
app.use(express.json());  // Parse JSON request bodies

// Connect to MongoDB
connectDB();

// Define routes
app.use('/api/users', userRoutes);  // Route to get all users

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
