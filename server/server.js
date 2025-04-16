const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./src/config/dbconfig');

// Load env variables
dotenv.config();

// Connect to MongoDB
connectDB();

// App initialization
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const carsRoutes = require('./src/routes/CarRoutes');
app.use('/api/cars', carsRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚗 Server running on port ${PORT}`));
