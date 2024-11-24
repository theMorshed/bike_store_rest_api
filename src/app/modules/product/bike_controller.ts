import { Request, Response } from "express";
import { prouductServices } from "./bike_services";

/**
 * Create a new bike product in the database.
 * @param req - Express request object, containing the bike data in the body
 * @param res - Express response object, to send the response back to the client
 */
const createBike = async (req: Request, res: Response) => {
    try {
        // Get the bike data from the request body
        const bikeData = req.body;
        
        // Call the service to create the product in the database
        const result = await prouductServices.createBikeIntoDB(bikeData);
        
        // Respond with a success message and the created product data
        res.status(200).json({
            success: true,
            message: 'Product created successfully',
            data: result,
        });
    } catch (error) {
        // Catch any errors and respond with an error message
        res.status(500).json({
            success: false,
            message: 'Failed to create product',
            error,
            stack: new Error().stack, // Include stack trace for debugging (useful in development)
        });
    }
};

/**
 * Get all bikes from the database, optionally filtering by a search term.
 * @param req - Express request object, containing optional search term in query
 * @param res - Express response object, to send the response back to the client
 */
const getAllBikes = async (req: Request, res: Response) => {
    try {
        // Extract the search term from the query parameters, if provided
        const searchTerm = req.query.searchTerm as string | undefined;
        
        // Call the service to retrieve all bikes, filtered by the search term if present
        const bikes = await prouductServices.getAllBikes(searchTerm);

        // Respond with a success message and the retrieved bike data
        res.status(200).json({
            message: 'Bikes retrieved successfully',
            status: true,
            data: bikes,
        });
    } catch (error) {
        // Catch any errors and respond with an error message
        res.status(500).json({
            message: 'Failed to retrieve bikes',
            status: false,
            error,
        });
    }
};

/**
 * Get a single bike by its product ID.
 * @param req - Express request object, containing the product ID in the route params
 * @param res - Express response object, to send the response back to the client
 */
const getSingleBike = async (req: Request, res: Response) => {
    try {
        // Extract the product ID from the request parameters
        const { productId } = req.params;
        
        // Call the service to get the bike by its ID
        const result = await prouductServices.getBikeByID(productId);

        // Respond with a success message and the bike data
        res.status(200).json({
            success: true,
            message: `Bike - ${productId} retrieved successfully`,
            data: result,
        });
    } catch (error) {
        // Catch any errors and respond with an error message
        res.status(500).json({
            success: false,
            message: "Failed to retrieve data",
            error: error,
        });
    }
};

/**
 * Update a bike's details by its product ID.
 * @param req - Express request object, containing the product ID in the route params and updated bike data in the body
 * @param res - Express response object, to send the response back to the client
 */
const updateBike = async (req: Request, res: Response) => {
    try {
        // Extract the product ID from the request parameters
        const { productId } = req.params;
        
        // Get the updated bike data from the request body
        const bikeData = req.body;
        
        // Call the service to update the bike by its ID
        const result = await prouductServices.updateBikeByID(productId, bikeData);

        // Respond with a success message and the updated bike data
        res.status(200).json({
            success: true,
            message: `Bike - ${productId} updated successfully`,
            data: result,
        });
    } catch (error) {
        // Catch any errors and respond with an error message
        res.status(500).json({
            success: false,
            message: "Failed to update data",
            error: error,
        });
    }
};

/**
 * Delete a bike from the database by its product ID.
 * @param req - Express request object, containing the product ID in the route params
 * @param res - Express response object, to send the response back to the client
 */
const deleteBike = async (req: Request, res: Response) => {
    try {
        // Extract the product ID from the request parameters
        const { productId } = req.params;
        
        // Call the service to delete the bike by its ID
        const result = await prouductServices.deleteBikeByID(productId);

        // Respond with a success message
        res.status(200).json({
            success: true,
            message: `Bike - ${productId} deleted successfully`,
            data: {},  // No data to return in the response body
        });
    } catch (error) {
        // Catch any errors and respond with an error message
        res.status(500).json({
            success: false,
            message: "Failed to delete data",
            error: error,
        });
    }
};

// Export the controller functions for use in routes
export const productControllers = {
    createBike,
    getAllBikes,
    getSingleBike,
    updateBike,
    deleteBike,
};
