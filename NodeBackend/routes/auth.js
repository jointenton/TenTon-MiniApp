// routes/auth.js (Node.js/Express)

const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Adjust according to your User model
const router = express.Router();

// Middleware to verify the JWT token
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header
    if (!token) {
        return res.status(403).json({ isAuthenticated: false, message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ isAuthenticated: false, message: 'Failed to authenticate token' });
        }
        req.userId = decoded.id; // Store user ID from the token for further use
        next(); // Continue to the next middleware or route handler
    });
};


// Verify authentication
router.get('/verify', verifyToken, async (req, res) => {
    try {
        // Find the user by ID stored in the token
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ isAuthenticated: false, message: 'User not found' });
        }

        res.json({ isAuthenticated: true, user });
    } catch (error) {
        console.error('Verification error:', error);
        res.status(500).json({ isAuthenticated: false, message: 'An error occurred while verifying the user' });
    }
});

module.exports = router;
