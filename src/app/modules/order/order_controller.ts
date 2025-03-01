import { orderServices } from "./order_services";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import AppError from "../../errors/AppError";
import OrderModel from "./order_model";

export const createOrder = catchAsync(async (req, res) => {
    const user = req.user;
    const result = await orderServices.createOrderService(user, req.body, req.ip!);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.CREATED,
        message: 'Order created successfully',
        data: result
    });
});

const verifyPayment = catchAsync(async (req, res) => {
    const order = await orderServices.verifyPaymentService(req.params.order_id as string);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.CREATED,
        message: "Order verified successfully",
        data: order,
    });
});


const getAllOrders = catchAsync(async(req, res) => {
    const orders = await orderServices.getAllOrdersService();

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Orders retrieved successfully',
        data: orders
    })
});

const getSingleOrder = catchAsync(async(req, res) => {
    const { orderId } = req.params;
    const order = await orderServices.getSingleOrderService(orderId);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Order retrieved successfully',
        data: order
    })
});

const updateOrder = catchAsync(async (req, res) => {
    const {orderId} = req.params;
    const order = await orderServices.updateOrderService(orderId, req.body);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Order updated successfully',
        data: order
    })
});

const deleteOrder = catchAsync(async (req, res) => {
    const {orderId} = req.params;
    const existingOrder = await OrderModel.findById(orderId);
    const author = existingOrder?.user;

    const orderExists = await OrderModel.findOne({_id: orderId, user: author});
    if (!orderExists) {
        throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not the author of this blog!!');
    }

    await orderServices.deleteOrderService(orderId);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Order deleted successfully',
        data: null
    })
});

const getCustomerOrders = catchAsync(async(req, res) => {
    const { customerId } = req.params;
    const orders = await orderServices.getCustomerOrdersService(customerId);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Orders retrieved successfully',
        data: orders
    })
});

export const orderControllers = {
    createOrder,
    getAllOrders,
    getSingleOrder,
    updateOrder,
    deleteOrder,
    getCustomerOrders,
    verifyPayment
}