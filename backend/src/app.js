const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/database');  // ← Make sure this path is correct
const dataRoutes = require('./routes/dataRoutes');
const resumeRoutes = require('./routes/resumeRoutes');

const app = express();

// Connect to MongoDB
connectDB();  // ← This should work now

// CORS configuration
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api', dataRoutes);
app.use('/api', resumeRoutes);

// Root route
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the API',
        endpoints: {
            'POST /api/data': 'Create new data',
            'GET /api/data': 'Get all data',
            'GET /api/data/:id': 'Get single data',
            'PUT /api/data/:id': 'Update data',
            'DELETE /api/data/:id': 'Delete data',
            'POST /api/resume': 'Create new resume',
            'GET /api/resume': 'Get all resumes',
            'GET /api/resume/:id': 'Get single resume',
            'PUT /api/resume/:id': 'Update resume',
            'DELETE /api/resume/:id': 'Delete resume'
        }
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('❌ Error:', err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: err.message
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

module.exports = app;