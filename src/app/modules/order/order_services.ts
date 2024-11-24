import { IOrder } from "./order_interface";
import OrderModel from "./order_model";
import ProductModel from "../product/bike_model";

/**
 * Create an order in MongoDB with inventory management.
 * @param productData - Order data (email, product, quantity)
 * @returns Created order documenta
 */
const createOrderInMongoDB = async (productData: IOrder) => {
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

/**
 * Calculate total revenue from all orders.
 * @returns Total revenue
 */
const calculateRevenue = async () => {
    const result = await OrderModel.aggregate([
        {
            $group: {
                _id: null, // get all documents
                totalRevenue: { $sum: "$totalPrice" }, // Sum up the totalPrice from all orders
            },
        },
        {
            $project: {
                _id: 0, // Exclude the _id field from the output
                totalRevenue: 1,
            },
        },
    ]);

    // If no orders exist, return totalRevenue as 0
    return result.length > 0 ? result[0].totalRevenue : 0;
};

// export all services
export const orderServices = {
    createOrderInMongoDB,
    calculateRevenue
};
