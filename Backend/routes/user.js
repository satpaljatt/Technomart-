import express from 'express';

import { registerUser, loginUser, updateUserProfile, getAllUsers } from '../controllers/userController.js';

import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/profile').put(protect, updateUserProfile);

router.route('/').get(protect, admin, getAllUsers);

router.post('/register', registerUser);

router.post('/login', loginUser);

export default router;
