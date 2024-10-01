const User = require('../models/userModel');

// Register a new user
const registerUser = async (req, res) => {
    const { formData } = req.body; // Destructure formData from req.body

    // Extract properties from formData
    const { username, skills, tags, email, gender, country, city } = formData;

    // Check if user already exists
    const userExists = await User.findOne({ username });
    if (userExists) {
        return res.status(400).json({ message: 'Username already exists' });
    }

    // Create user
    const user = new User({
        username,   // Assign username directly
        skills,     // Assign skills directly
        tags,   // Assign profession directly
        email,
        gender,
        country,
        city,

    });

    try {
        const savedUser = await user.save();
        res.status(201).json({ message: 'User registered successfully', user: savedUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { registerUser, getAllUsers };
