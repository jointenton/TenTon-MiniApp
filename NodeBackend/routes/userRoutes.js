import express from 'express';
import multer from 'multer';
import { registerUser, getAllUsers, signInUser } from '../controllers/userController.js';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory where files will be saved
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split('/')[1]); // Save file with unique name
    }
});

const upload = multer({ storage: storage });

// Token verification middleware
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(403).json({ success: false, message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ success: false, message: 'Failed to authenticate token' });
        }
        req.userId = decoded.id;
        next();
    });
};

// User routes
router.post('/signup', registerUser);
router.get('/', getAllUsers);
router.post('/signin', signInUser);

// Update user profile including image upload
router.put('/update', verifyToken, upload.single('image'), async (req, res) => {
    try {
        const updatedUserData = req.body;
        const userId = req.userId;

        // If an image file was uploaded, include its path in the user data
        if (req.file) {
            updatedUserData.profileImage = req.file.path; // Assuming 'profileImage' is the field in the User model
        }

        const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.json({ success: true, user: updatedUser });
    } catch (error) {
        console.error('Profile update error:', error);
        res.status(500).json({ success: false, message: 'An error occurred while updating the profile' });
    }
});

export default router;
