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
        products: [
            {
                product: {
                    type: Types.ObjectId,
                    ref: 'Product',
                    required: [true, 'Product is required']
                },
                quantity: {
                    type: Number,
                    required: [true, 'Quantity is required'],
                    min: [1, 'Quantity must be at least 1']
                }
            }
        ],
        status: {
            type: String,
            enum: ["Pending", "Paid", "Shipped", "Completed", "Cancelled"],
            default: 'Pending'
        },
        totalPrice: {
            type: Number,
            required: false,
            min: [0, 'Total price cannot be negative']
        },
        transaction: {
            id: String,
            transactionStatus: String,
            bank_status: String,
            sp_code: String,
            sp_message: String,
            method: String,
            date_time: String,
        },
    },
    {
        timestamps: true
    }
);

orderSchema.pre('save', async function(next) {
    try {
        let total = 0;

        for (const item of this.products) {
            const product = await ProductModel.findById(item.product);
            if (!product) {
                return next(new Error(`Product with ID ${item.product} not found`));
            }

            if (item.quantity > product.quantity) {
                return next(new Error(`Insufficient stock for product ${item.product}`));
            }

            total += product.price * item.quantity; // Price is fetched from the product model
        }

        this.totalPrice = total;

        next();
    } catch (error: any) {
        next(error);
    }
});

// Create the Order model using the schema
const OrderModel: Model<TOrder> = model<TOrder>('Order', orderSchema);

// Export the Order model to be used elsewhere in the application
export default OrderModel;
