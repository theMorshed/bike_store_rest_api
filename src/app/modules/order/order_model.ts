import mongoose, { Schema, Model } from 'mongoose';
import ProductModel from '../product/bike_model';
import { IOrder } from './order_interface';

/**
 * Define the schema for the Order collection.
 * This schema contains details like the email of the customer, the product ordered,
 * the quantity of the product, and the total price of the order.
 */
const orderSchema = new Schema<IOrder>(
    {
        // Customer's email address
        email: {
            type: String,
            required: [true, 'Email is required'], // Email is mandatory
            match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'], // Email format validation
            trim: true
        },
        
        // Product being ordered (Reference to Product collection)
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product', // Reference to the 'Product' model
            required: [true, 'Product is required'] // Product is mandatory for the order
        },
        
        // Quantity of the product ordered
        quantity: {
            type: Number,
            required: [true, 'Quantity is required'], // Quantity is mandatory
            min: [1, 'Quantity must be at least 1'] // Quantity must be at least 1
        },
        
        // Total price of the order, calculated based on product price and quantity
        totalPrice: {
            type: Number,
            required: [true, 'Total price is required'], // Total price is mandatory
            min: [0, 'Total price cannot be negative'] // Total price cannot be negative
        }
    },
    {
        timestamps: true, // Automatically adds 'createdAt' and 'updatedAt' fields
    }
);

/**
 * Pre-save middleware for the Order schema.
 * This middleware runs before saving the order and does the following:
 * - Validates if the product exists in the database.
 * - Ensures that the requested quantity does not exceed the available stock.
 * - Calculates the total price for the order based on the product's price and quantity.
 */
orderSchema.pre('save', async function(next) {
    try {
        // Step 1: Find the product in the database by its ID
        const product = await ProductModel.findById(this.product);
        
        // Step 2: If product is not found, throw an error
        if (!product) {
            return next(new Error('Product not found'));
        }

        // Step 3: Check if the requested quantity is available in stock
        if (this.quantity > product.quantity) {
            return next(new Error('Insufficient product quantity in stock')); // Return error if stock is insufficient
        }

        // Step 4: Calculate the total price for the order
        this.totalPrice = product.price * this.quantity; // Total price = price * quantity

        // Continue to the next middleware (or saving the order)
        next();
    } catch (error: any) {
        // Handle errors during the pre-save hook
        next(error); // Pass the error to the next middleware (error handler)
    }
});

// Create the Order model using the schema
const OrderModel: Model<IOrder> = mongoose.model<IOrder>('Order', orderSchema);

// Export the Order model to be used elsewhere in the application
export default OrderModel;