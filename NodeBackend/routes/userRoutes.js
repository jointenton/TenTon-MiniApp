const express = require('express');
const { registerUser, getAllUsers } = require('../controllers/userController');
const router = express.Router();

router.post('/signup', registerUser);
router.get('/', getAllUsers);

module.exports = router;
