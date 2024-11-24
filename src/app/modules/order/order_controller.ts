import { Request, Response } from "express";
import { orderServices } from "./order_services";

const createOrder = async (req: Request, res: Response) => {
    try {
        const orderData = req.body;
        const { email, product, quantity } = req.body;
        // Step 1: Validate request body
        if (!email || !product || !quantity) {
            return res.status(400).json({
                success: false,
                message: "Email, product, and quantity are required",
            });
        }

        // if (quantity <= 0) {
        //   return res.status(400).json({
        //     success: false,
        //     message: "Quantity must be greater than 0",
        //   });
        // }

        // Step 2: Create order using service
        const result = await orderServices.createOrderInMongoDB(orderData);

        // Step 3: Respond with success
        res.status(201).json({
        success: true,
        message: "Order created successfully",
        data: result,
        });
    } catch (error: any) {
    // Step 4: Handle errors with detailed message
    res.status(400).json({
      success: false,
      message: error.message || "Failed to create order",
    //   stack: process.env.NODE_ENV === "development" ? error.stack : undefined, // Show stack trace only in development
        stack: new Error().stack
    });
  }
};

const calculateRevenue = async (req: Request, res: Response) => {
  try {
    const totalRevenue = await orderServices.calculateRevenue();

    res.status(200).json({
      message: "Revenue calculated successfully",
      status: true,
      data: { totalRevenue },
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Failed to calculate revenue",
      status: false,
      error: error.message,
    });
  }
};


export const orderControllers = {
  createOrder,
  calculateRevenue
};
