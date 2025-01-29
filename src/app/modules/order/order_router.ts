import express from 'express';
import { orderControllers } from './order_controller';
import auth from '../../middlewares/auth';

const orderRouter = express.Router();

orderRouter.get('/verify/:order_id', orderControllers.verifyPayment);
orderRouter.post('/create-order', auth('customer'), orderControllers.createOrder);
orderRouter.get('/', auth('admin', 'customer'), orderControllers.getAllOrders);
orderRouter.get('/:orderId', auth('customer'), orderControllers.getSingleOrder);
orderRouter.put('/:orderId', auth('customer'), orderControllers.updateOrder);
orderRouter.delete('/:orderId', auth('customer'), orderControllers.deleteOrder);
orderRouter.get('/customer/:customerId', auth('customer'), orderControllers.getCustomerOrders);

export default orderRouter;
