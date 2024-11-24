// Import necessary modules
import express, { Application } from 'express'  // Express and Application types for creating the app
import cors from 'cors';  // CORS middleware for enabling cross-origin resource sharing
import productRouter from './app/modules/product/bike_router';  // Router for product-related routes
import orderRouter from './app/modules/order/order_router';  // Router for order-related routes

// Initialize the Express application
const app: Application = express();

// Middleware setup
// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware to allow cross-origin requests
app.use(cors());

// API Routes setup
// Routes for product-related operations like creating and fetching products
app.use('/api/products', productRouter);

// Routes for order-related operations like creating and calculating revenue from orders
app.use('/api/orders', orderRouter);

// Root route that sends a simple "Hello, World!" message
app.get('/', (req, res) => {
    res.send('Hello, World!');
})

// Export the app to be used in other files (typically server.ts or index.ts)
export default app;
