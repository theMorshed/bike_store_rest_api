import express from 'express';
import { orderControllers } from './order_controller';

/**
 * Router for handling orders.
 * This router defines the API endpoints for creating orders and calculating revenue.
 */
const orderRouter = express.Router();

/**
 * POST /api/orders
 * Create a new order.
 * This endpoint takes the order details (email, product, quantity) and creates an order in the database.
 */
orderRouter.post('/', orderControllers.createOrder);

/**
 * GET /api/orders/revenue
 * Calculate total revenue from all orders.
 * This endpoint calculates and returns the total revenue generated from all orders placed.
 */
orderRouter.get('/revenue', orderControllers.calculateRevenue);

export default orderRouter;
