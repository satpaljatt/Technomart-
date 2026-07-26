import express from 'express';

import { registerUser, loginUser, updateUserProfile, getAllUsers, getUserAddresses, addAddress, deleteAddress, updateAddress } from '../controllers/userController.js';

import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/profile').put(protect, updateUserProfile);

router.route('/').get(protect, admin, getAllUsers);

router.post('/register', registerUser);

router.post('/login', loginUser);

router.route('/addresses').get(protect, getUserAddresses).post(protect, addAddress);

router.route('/addresses/:id').delete(protect, deleteAddress).put(protect, updateAddress);

export default router;
