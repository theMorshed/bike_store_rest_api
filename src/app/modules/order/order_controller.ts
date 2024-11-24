import { Request, Response } from "express";
import { orderServices } from "./order_services";

/**
 * Create an order in MongoDB.
 * This function handles the creation of an order, validates the request body, 
 * and interacts with the service layer to perform the order creation logic.
 * @param req - Express request object containing the order data.
 * @param res - Express response object to send the result or error.
 * @returns A JSON response indicating success or failure.
 */
const createOrder = async (req: Request, res: Response): Promise<any> => {
    try {
        // Step 1: Destructure the order data from the request body
        const orderData = req.body;
        const { email, product, quantity } = req.body;

        // Step 2: Validate the request body (check if quantity is positive and if all fields are present)
        if (quantity <= 0) {
          return res.status(400).json({
            success: false,
            message: "Quantity must be greater than 0",  // Return an error if quantity is not valid
          });
        }

        // Step 3: Check if all required fields (email, product, and quantity) are present in the request body
        if (!email || !product || !quantity) {
            return res.status(400).json({
                success: false,
                message: "Email, product, and quantity are required",  // Return an error if any of these fields are missing
            });
        }

        // Step 4: Call the order service to create the order in the database
        const result = await orderServices.createOrderInMongoDB(orderData);

        // Step 5: Return success response with the created order data
        res.status(201).json({
            success: true,
            message: "Order created successfully",
            data: result,  // Send back the created order data
        });
    } catch (error: any) {
        // Step 6: Handle errors during the order creation process
        res.status(400).json({
            success: false,
            message: error.message || "Failed to create order",  // Return the error message, or a default message
            stack: new Error().stack  // Include the stack trace (helpful for debugging in development)
        });
    }
};

/**
 * Calculate the total revenue from all orders.
 * This function aggregates the total price from all orders to calculate the revenue.
 * @param req - Express request object.
 * @param res - Express response object to send the calculated revenue.
 * @returns A JSON response with the total revenue from all orders.
 */
const calculateRevenue = async (req: Request, res: Response) => {
  try {
    // Step 1: Call the service function to calculate total revenue
    const totalRevenue = await orderServices.calculateRevenue();

    // Step 2: Return success response with the calculated revenue
    res.status(200).json({
      message: "Revenue calculated successfully",
      status: true,
      data: { totalRevenue },  // Send the total revenue value
    });
  } catch (error: any) {
    // Step 3: Handle errors when calculating revenue
    res.status(500).json({
      message: "Failed to calculate revenue",
      status: false,
      error: error.message,  // Return the error message if something goes wrong
    });
  }
};

// Export the controller functions
export const orderControllers = {
  createOrder,
  calculateRevenue
};
