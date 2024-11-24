import express from 'express';
import { orderControllers } from './order_controller';


const orderRouter = express.Router();
orderRouter.post('/', orderControllers.createOrder);
orderRouter.get('/revenue', orderControllers.calculateRevenue);

export default orderRouter;