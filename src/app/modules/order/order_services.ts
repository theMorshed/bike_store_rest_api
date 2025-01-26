import { TOrder } from "./order_type";
import OrderModel from "./order_model";
import ProductModel from "../product/bike_model";

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
    // Step 1: Validate the product
    const existingOrder = await OrderModel.findById(id);
    const orderExistingQuantity = existingOrder?.quantity;
    const newQuantity = orderExistingQuantity! + payload?.quantity!;
    const product = await ProductModel.findById(existingOrder?.product);

    // Step 2: Check stock availability
    if (payload.quantity! > product?.quantity!) {
        throw new Error("Insufficient product quantity in stock");
    }

    // Step 3: Calculate total price
    const totalPrice = product?.price! * newQuantity; 

    const orderToUpdate = {
        quantity: newQuantity,
        totalPrice: totalPrice
    }
    const productQuantity = product?.quantity! - payload.quantity!;

    await ProductModel.findByIdAndUpdate(existingOrder?.product, {quantity: productQuantity});
    const order = await OrderModel.findByIdAndUpdate(id, orderToUpdate, { new: true });
    return order;
}

const deleteOrderService = async(id: string) => {
    const order = await OrderModel.findByIdAndDelete(id);
    return order;
}


// export all services
export const orderServices = {
    createOrderService,
    getAllOrdersService,
    getSingleOrderService,
    updateOrderService,
    deleteOrderService
};
