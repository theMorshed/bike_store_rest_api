import express from 'express';
import { orderControllers } from './order_controller';

const orderRouter = express.Router();

orderRouter.post('/create-order', orderControllers.createOrder);
orderRouter.get('/', orderControllers.getAllOrders);
orderRouter.get('/:orderId', orderControllers.getSingleOrder);
orderRouter.put('/:orderId', orderControllers.updateOrder);
orderRouter.delete('/:orderId', orderControllers.deleteOrder);
orderRouter.get('/customer/:customerId', orderControllers.getCustomerOrders);

export default orderRouter;
