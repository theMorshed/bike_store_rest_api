import { Schema, Model, Types, model } from 'mongoose';
import ProductModel from '../product/bike_model';
import { TOrder } from './order_type';

const orderSchema = new Schema<TOrder>(
    {
        user: {
            type: Types.ObjectId,
            ref: 'User',
            required: [true, 'User is required']
        },        
        product: {
            type: Types.ObjectId,
            ref: 'Product', 
            required: [true, 'Product is required'] 
        }, 
        status: {
            type: String,
            required: [true, 'Status is required'],
            default: 'pending'
        },     
        quantity: {
            type: Number,
            required: [true, 'Quantity is required'], 
            min: [1, 'Quantity must be at least 1'] 
        },
        totalPrice: {
            type: Number,
            required: [true, 'Total price is required'],
            min: [0, 'Total price cannot be negative']
        }
    },
    {
        timestamps: true
    }
);

orderSchema.pre('save', async function(next) {
    try {
        const product = await ProductModel.findById(this.product);
        if (!product) {
            return next(new Error('Product not found'));
        }

        if (this.quantity > product.quantity) {
            return next(new Error('Insufficient product quantity in stock'));
        }

        this.totalPrice = product.price * this.quantity; 

        next();
    } catch (error: any) {
        next(error);
    }
});

// Create the Order model using the schema
const OrderModel: Model<TOrder> = model<TOrder>('Order', orderSchema);

// Export the Order model to be used elsewhere in the application
export default OrderModel;