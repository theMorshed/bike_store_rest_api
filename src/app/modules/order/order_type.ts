import { ObjectId } from 'mongoose';

export type TOrder = {
    user: ObjectId;
    products: {
        product: ObjectId;
        quantity: number;
        price: number;
    }[];
    status: string;
    totalPrice: number;
}
