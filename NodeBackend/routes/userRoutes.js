import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { registerUser, getAllUsers, signInUser } from '../controllers/userController.js';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import rateLimit from 'express-rate-limit';

const router = express.Router();

// Set upload directory to be local to the project
const UPLOAD_DIR = './uploads';

// Create uploads directory if it doesn't exist
try {
    if (!fs.existsSync(UPLOAD_DIR)) {
        fs.mkdirSync(UPLOAD_DIR, { recursive: true });
        console.log('Created uploads directory at:', UPLOAD_DIR);
    }
} catch (err) {
    console.error('Error creating upload directory:', err);
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB limit

// Multer configuration with file validation
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOAD_DIR);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        const ext = path.extname(file.originalname).toLowerCase();
        const filename = `profile-${uniqueSuffix}${ext}`;
        console.log('Saving file as:', filename);
        cb(null, filename);
    }
});

// File filter for images
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG and GIF images are allowed.'), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: MAX_FILE_SIZE
    }
});

// Serve static files with security headers
router.use('/uploads', (req, res, next) => {
    res.setHeader('Content-Security-Policy', "default-src 'self'");
    res.setHeader('X-Content-Type-Options', 'nosniff');
    next();
}, express.static(UPLOAD_DIR));

// Token verification middleware with error handling
const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith('Bearer ')) {
            return res.status(403).json({
                success: false,
                message: 'Authentication required. Please provide a valid token.'
            });
        }

        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({
                        success: false,
                        message: 'Token has expired. Please sign in again.'
                    });
                }
                return res.status(401).json({
                    success: false,
                    message: 'Invalid token. Please sign in again.'
                });
            }
            req.userId = decoded.id;
            next();
        });
    } catch (error) {
        console.error('Token verification error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred during authentication.'
        });
    }
};

// Rate limiting middleware
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 requests per window
    message: { success: false, message: 'Too many attempts. Please try again later.' }
});

// User routes with rate limiting
router.post('/signup', authLimiter, registerUser);
router.post('/signin', authLimiter, signInUser);
router.get('/', verifyToken, getAllUsers);

// Update user profile with image upload
router.put('/update', verifyToken, upload.single('image'), async (req, res) => {
    try {
        const { userId } = req;
        const updatedUserData = req.body;

        // Sanitize and validate input data
        const allowedUpdates = ['name', 'email', 'bio'];
        Object.keys(updatedUserData).forEach(key => {
            if (!allowedUpdates.includes(key)) {
                delete updatedUserData[key];
            }
        });

        // Handle file upload
        if (req.file) {
            // Store the path relative to the API endpoint
            updatedUserData.profileImage = `/uploads/${req.file.filename}`;
            console.log('Stored profile image path:', updatedUserData.profileImage);
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updatedUserData,
            {
                new: true,
                runValidators: true,
                context: 'query'
            }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            user: updatedUser
        });
    } catch (error) {
        console.error('Profile update error:', error);
        
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid input data',
                errors: Object.values(error.errors).map(err => err.message)
            });
        }

        res.status(500).json({
            success: false,
            message: 'An error occurred while updating the profile'
        });
    }
});

// Error handling middleware
router.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                success: false,
                message: `File size should not exceed ${MAX_FILE_SIZE / (1024 * 1024)}MB`
            });
        }
        return res.status(400).json({
            success: false,
            message: 'File upload error'
        });
    }
    next(err);
});

export default router;