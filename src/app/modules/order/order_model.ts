import mongoose, { Schema, Model } from 'mongoose';
import ProductModel from '../product/bike_model';
import { IOrder } from './order_interface';

// Define the schema for the Order
const orderSchema = new Schema<IOrder>(
    {
        email: {
            type: String,
            required: [true, 'Email is required'],
            match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
            trim: true
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product', // Reference to Product model
            required: [true, 'Product is required']
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
        timestamps: true,
    }
);

// Pre-save middleware for Order to calculate total price
orderSchema.pre('save', async function(next) {
  try {
    const product = await ProductModel.findById(this.product); // Find the product by ID
    if (!product) {
      return next(new Error('Product not found'));
    }
    if (this.quantity > product.quantity) {
      return next(new Error('Insufficient product quantity in stock'));
    }
    this.totalPrice = product.price * this.quantity; // Calculate total price
    next();
  } catch (error: any) {
    next(error);
  }
});

// Create the model using the schema
const OrderModel: Model<IOrder> = mongoose.model<IOrder>('Order', orderSchema);

export default OrderModel;
