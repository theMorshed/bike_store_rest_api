import express from 'express';
import { productControllers } from './bike_controller';

const productRouter = express.Router();
productRouter.post('/', productControllers.createProduct)
productRouter.get('/', productControllers.getAllBikes);
productRouter.get('/:productId', productControllers.getSingleBike);

export default productRouter;