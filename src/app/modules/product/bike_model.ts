import mongoose from "mongoose";
import { IProduct } from "./bike_interface";

// Define the schema for the Bike product
const productSchema = new mongoose.Schema<IProduct>(
  {
  // The name of the bike
  name: {
    type: String,
    required: [true, 'Bike name is required'],  // Bike name must be provided
    trim: true  // Trim spaces around the name
  },

  // The brand of the bike
  brand: {
    type: String,
    required: [true, 'Brand is required'],  // Bike brand must be provided
    trim: true  // Trim spaces around the brand name
  },

  // The price of the bike
  price: {
    type: Number,
    required: [true, 'Price is required'],  // Price must be provided
    min: [0, 'Price must be a positive number'],  // Price must be greater than or equal to 0
  },

  // The category of the bike (e.g., Mountain, Road, etc.)
  category: {
    type: String,
    required: [true, 'Category is required'],  // Category must be provided
    enum: {
      values: ['Mountain', 'Road', 'Hybrid', 'Electric'],  // Valid categories
      message: '{VALUE} is not a valid category'  // Error message if an invalid category is provided
    }
  },

  // The description of the bike
  description: {
    type: String,
    required: [true, 'Description is required'],  // Description must be provided
    trim: true  // Trim spaces around the description
  },

  // The available quantity of the bike
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],  // Quantity must be provided
    min: [0, 'Quantity cannot be negative'],  // Quantity cannot be negative
  },

  // Whether the bike is in stock or not
  inStock: {
    type: Boolean,
    required: [true, 'In stock status is required']  // In stock status must be provided
  }
  },
  {
      timestamps: true  // Automatically create "createdAt" and "updatedAt" fields
  }
);

// Create the model using the schema
const ProductModel = mongoose.model('Product', productSchema);

// Export the ProductModel to use it in other parts of the application
export default ProductModel;
