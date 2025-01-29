import { TOrder } from "./order_type";
import OrderModel from "./order_model";
import ProductModel from "../product/bike_model";
import AppError from "../../errors/AppError";
import { StatusCodes } from "http-status-codes";
import User from "../user/user.model";
import { IUser } from "../user/user.types";
import { orderUtils } from "./order_utils";

const createOrderService = async (user: IUser, payload: { products: { product: string; quantity: number }[] }, client_ip: string) => {
    if (!payload?.products?.length) {
        throw new AppError(StatusCodes.NOT_ACCEPTABLE, "Order is not specified");
    }

    const products = payload.products;

    let totalPrice = 0;
    const productDetails = await Promise.all(
        products.map(async (item) => {
            const product = await ProductModel.findById(item.product);
            if (product) {
                const subtotal = product ? (product.price || 0) * item.quantity : 0;
                totalPrice += subtotal;
                return item;
            }
        })
    );

    let order = await OrderModel.create({
        user,
        products: productDetails,
        totalPrice,
    });
    // payment integration
    const shurjopayPayload = {
        amount: totalPrice,
        order_id: order._id,
        currency: "BDT",
        customer_name: user.name,
        customer_address: "Chandanaish, chattagram",
        customer_email: user.email,
        customer_phone: "123456789",
        customer_city: "Chattagram",
        client_ip,
    };

    const payment = await orderUtils.makePaymentAsync(shurjopayPayload);
    console.log(payment);

    if (payment?.transactionStatus) {
        order = await order.updateOne({
            transaction: {
                id: payment.sp_order_id,
                transactionStatus: payment.transactionStatus,
            },
        });
    }

    return payment.checkout_url;
};

const verifyPaymentService = async (order_id: string) => {
  const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);

  if (verifiedPayment.length) {
    await OrderModel.findOneAndUpdate(
      {
        "transaction.id": order_id,
      },
      {
        "transaction.bank_status": verifiedPayment[0].bank_status,
        "transaction.sp_code": verifiedPayment[0].sp_code,
        "transaction.sp_message": verifiedPayment[0].sp_message,
        "transaction.transactionStatus": verifiedPayment[0].transaction_status,
        "transaction.method": verifiedPayment[0].method,
        "transaction.date_time": verifiedPayment[0].date_time,
        status:
          verifiedPayment[0].bank_status == "Success"
            ? "Paid"
            : verifiedPayment[0].bank_status == "Failed"
            ? "Pending"
            : verifiedPayment[0].bank_status == "Cancel"
            ? "Cancelled"
            : "",
      }
    );
  }

  return verifiedPayment;
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
    getCustomerOrdersService,
    verifyPaymentService
};
