require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const gameRoutes = require('./routes/gameRoutes');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Routes
app.use('/api/game', gameRoutes);

// Health check route
app.get('/health', (req, res) => {
    res.json({ status: 'OK' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});