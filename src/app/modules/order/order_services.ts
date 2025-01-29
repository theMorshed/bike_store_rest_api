import { TOrder } from "./order_type";
import OrderModel from "./order_model";
import ProductModel from "../product/bike_model";
import AppError from "../../errors/AppError";
import { StatusCodes } from "http-status-codes";

const createOrderService = async (productData: TOrder) => {
    try {
        // Step 1: Validate the product
        const product = await ProductModel.findById(productData.product);
        if (!product) {
            throw new Error("Product not found");
        }

        // Step 2: Check stock availability
        if (productData.quantity > product.quantity) {
            throw new Error("Insufficient product quantity in stock");
        }

        // Step 3: Calculate total price
        productData.totalPrice = product.price * productData.quantity;

        // Step 4: Create the order
        const order = await OrderModel.create(productData);

        // Step 5: Update inventory
        product.quantity -= productData.quantity;
        if (product.quantity === 0) {
            product.inStock = false;
        }
        await product.save();

        return order;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

const getAllOrdersService = async () => {
    const orders = await OrderModel.find({}).populate('user', ['name', 'email']).populate('product');
    return orders;
}

const getSingleOrderService = async(orderId: string) => {
    const order = await OrderModel.findById(orderId).populate('user', ['name', 'email']).populate('product');
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
    const orders = await OrderModel.find({user: customerId}).populate('user', ['name', 'email']).populate('product');
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
