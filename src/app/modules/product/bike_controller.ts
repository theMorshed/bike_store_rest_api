import { prouductServices } from "./bike_services";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { StatusCodes } from 'http-status-codes';

const createBike = catchAsync(async(req, res) => {    
    const result = await prouductServices.createBikeIntoDB(req.body);

    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: 'Bike created successfully',
        data: result
    })
});

const getAllBikes = catchAsync(async(req, res) => {    
    const searchTerm = req.query.searchTerm as string | undefined;
    const bikes = await prouductServices.getAllBikes(req.query);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Bike retrieved successfully',
        data: bikes
    })
});

const getSingleBike = catchAsync(async(req, res) => { 
    const { productId } = req.params;   
    const result = await prouductServices.getBikeByID(productId);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: `Bike-${productId} retrieved successfully`,
        data: result
    })
});

const updateBike = catchAsync(async(req, res) => { 
    const { productId } = req.params;   
    const bikeData = req.body;
    const result = await prouductServices.updateBikeByID(productId, bikeData);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: `Bike-${productId} updated successfully`,
        data: result
    })
});

const deleteBike = catchAsync(async(req, res) => { 
    const { productId } = req.params;   
    const result = await prouductServices.deleteBikeByID(productId);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: `Bike-${productId} deleted successfully`,
        data: result
    })
});

export const productControllers = {
    createBike,
    getAllBikes,
    getSingleBike,
    updateBike,
    deleteBike,
};
