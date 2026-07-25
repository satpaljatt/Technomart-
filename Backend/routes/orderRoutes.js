import express from 'express';

import {
    createOrder,
    getOrderById,
    updateOrderToPaid,
    getAllOrders,
    updateOrderToDelivered
}
    from '../controllers/orderController.js';

import { protect } from '../middleware/authMiddleware.js'; 

const  router = express.Router();


router.route('/').post(protect, createOrder);

router.route('/:id').get(protect, getOrderById);

router.route('/:id/pay').put(protect, updateOrderToPaid);

router.route('/').get(getAllOrders);

router.route('/:id/deliver').put(updateOrderToDelivered);

export default router;
