import User from '../models/userModel.js';
import jwt from "jsonwebtoken";

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

// Sign in user
const signInUser = async (req, res, next) => {
    // const { formData } = req.body

    const { email } = req.body

    try {
         // check for email
        const validUser = await User.findOne({ email });

        if (!validUser) {
            return res.status(404).json({ message: "Username does not exists" })
        }

        const loggedInUser = await User.findById(validUser._id)

        // generate user token
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

        return res.status(200).json({ 
            message: "Signed in successfully", 
            user: loggedInUser,
            token: token
        })
    } catch(error) {
       next(error) 
    }
}

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { registerUser, getAllUsers, signInUser };
