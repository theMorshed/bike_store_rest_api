import { TOrder } from "./order_type";
import OrderModel from "./order_model";
import ProductModel from "../product/bike_model";
import AppError from "../../errors/AppError";
import { StatusCodes } from "http-status-codes";
import User from "../user/user.model";

const createOrderService = async (orderData: TOrder) => {
    // Ensure user exists
    const userExist = await User.findById(orderData.user);
    if (!userExist) {
        throw new AppError(StatusCodes.NOT_FOUND, 'User does not exist');
    }

    // Validate each product and check stock availability
    for (const item of orderData.products) {
        const productExist = await ProductModel.findById(item.product);
        if (!productExist) {
            throw new AppError(StatusCodes.NOT_FOUND, `Product with ID ${item.product} does not exist`);
        }

        // Check if there's enough stock for the product
        if (item.quantity > productExist.quantity) {
            throw new AppError(StatusCodes.BAD_REQUEST, `Insufficient stock for product ${item.product}`);
        }

        // Update the product's stock in the database
        productExist.quantity -= item.quantity;
        if (productExist.quantity === 0) {
            productExist.inStock = false;
        }
        await productExist.save();
    }

    // Create the order (totalPrice will be calculated automatically in the model)
    const order = await OrderModel.create(orderData);

    return order;
};

const getAllOrdersService = async () => {
    const orders = await OrderModel.find({}).populate('user', ['name', 'email']).populate('products.product');
    return orders;
}

const getSingleOrderService = async(orderId: string) => {
    const order = await OrderModel.findById(orderId).populate('user', ['name', 'email']).populate('products.product');
    return order;
}

const updateOrderService = async(id: string, payload: Partial<TOrder>) => {
    const existingOrder = await OrderModel.findById(id);
    const author = existingOrder?.user;

    const orderExists = await OrderModel.findOne({_id: id, user: author});
    if (!orderExists) {
        throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not the author of this blog!!');
    }

    const order = await OrderModel.findByIdAndUpdate(id, payload, { new: true });
    return order;
}

const deleteOrderService = async(id: string) => {
    const order = await OrderModel.findByIdAndDelete(id);
    return order;
}

const getCustomerOrdersService = async(customerId: string) => {
    const orders = await OrderModel.find({user: customerId}).populate('user', ['name', 'email']).populate('products.product');
    return orders;
}


// export all services
export const orderServices = {
    createOrderService,
    getAllOrdersService,
    getSingleOrderService,
    updateOrderService,
    deleteOrderService,
    getCustomerOrdersService
};
