import express from 'express';

import { registerUser, getAllUsers, signInUser } from '../controllers/userController.js';
const router = express.Router();

router.post('/signup', registerUser);

router.get('/', getAllUsers);
router.post('/signin', signInUser);

export default router;
