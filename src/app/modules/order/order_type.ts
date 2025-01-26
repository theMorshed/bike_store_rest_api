import { ObjectId } from 'mongoose';

export type TOrder = {
    user: ObjectId;
    product: ObjectId;
    status: string;
    quantity: number;
    totalPrice: number;
}
