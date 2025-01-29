import { ObjectId } from 'mongoose';

export type TOrder = {
    user: ObjectId;
    products: {
        product: ObjectId;
        quantity: number;
        price: number;
    }[];
    status: "Pending" | "Paid" | "Shipped" | "Completed" | "Cancelled";
    transaction: {
        id: string;
        transactionStatus: string;
        bank_status: string;
        sp_code: string;
        sp_message: string;
        method: string;
        date_time: string;
    };
    totalPrice: number;
}
