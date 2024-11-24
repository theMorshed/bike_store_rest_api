import { Request, Response } from "express";
import { prouductServices } from "./bike_services";

const createProduct = async(req: Request, res: Response) => {
    try {
        const bikeData = req.body;
        const result = await prouductServices.createProuductInMongoDB(bikeData);
        res.status(200).json({
            success: true,
            message: 'Product created successfully',
            data: result,
        })
    }catch(error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create product',
            error,
            stack: new Error().stack
        })
    }
}

const getAllBikes = async (req: Request, res: Response) => {
    try {
      const searchTerm = req.query.searchTerm as string | undefined;
      const bikes = await prouductServices.getAllBikes(searchTerm);

      res.status(200).json({
        message: 'Bikes retrieved successfully',
        status: true,
        data: bikes
      });
    } catch (error) {
      res.status(500).json({
        message: 'Failed to retrieve bikes',
        status: false,
        error
      });
    }
}

const getSingleBike = async(req: Request, res: Response) => {
    try {
        const {productId} = req.params;
        const result = await prouductServices.getBikeByID(productId);
        res.status(200).json({
            success: true,
            message: `Bike - ${productId} retrieved successfully`,
            data: result
        })
    }catch(error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve data",
            error: error,
        })
    }
}

const updateBike = async(req: Request, res: Response) => {
    try {
        const {productId} = req.params;
        const bikeData = req.body;
        const result = await prouductServices.updateBikeByID(productId, bikeData);
        res.status(200).json({
            success: true,
            message: `Bike - ${productId} update successfully`,
            data: result
        })
    } catch(error) {
        res.status(500).json({
            success: false,
            message: "Failed to update data",
            error: error,
        })
    }
}

const deleteBike = async(req: Request, res: Response) => {
    try {
        const {productId} = req.params;
        const result = await prouductServices.deleteBikeByID(productId);
        res.status(200).json({
            success: true,
            message: `Bike - ${productId} deleted successfully`,
            data: {}
        })
    } catch(error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete data",
            error: error,
        })
    }
}

export const productControllers = {
    createProduct,
    getAllBikes,
    getSingleBike,
    updateBike,
    deleteBike,
}