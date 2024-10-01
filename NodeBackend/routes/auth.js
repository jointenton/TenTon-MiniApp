// routes/auth.js (Node.js/Express)

const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Adjust according to your User model
const router = express.Router();

router.get('/verify', async (req, res) => {
    if (req.session.user) {
        res.json({ isAuthenticated: true, user: req.session.user });
      } else {
        res.json({ isAuthenticated: false });
      }
});

module.exports = router;
