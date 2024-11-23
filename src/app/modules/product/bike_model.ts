import mongoose from "mongoose";

// Define the schema for the Bike product
const productSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: [true, 'Bike name is required'],
        trim: true
    },
    brand: {
        type: String,
        required: [true, 'Brand is required'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price must be a positive number'],
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: {
        values: ['Mountain', 'Road', 'Hybrid', 'Electric'],
        message: '{VALUE} is not a valid category'
        }
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [0, 'Quantity cannot be negative'],
    },
    inStock: {
        type: Boolean,
        required: [true, 'In stock status is required']
    }
},
{
    timestamps: true
}
);

// Create the model using the schema
const ProductModel = mongoose.model('Product', productSchema);

export default ProductModel;
