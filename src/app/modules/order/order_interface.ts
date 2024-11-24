import { ObjectId } from 'mongoose';

/**
 * Interface representing an order.
 * This interface defines the structure of the order data that is expected when creating an order.
 */
export interface IOrder {
  /**
   * Email address of the customer placing the order.
   * This field is required and should be a valid email format.
   */
  email: string;

  /**
   * The product being ordered.
   * This field is a reference to the 'Product' model by its ObjectId.
   * The product must exist in the database, and the quantity must be available in stock.
   */
  product: ObjectId;

  /**
   * The quantity of the product being ordered.
   * This field is required and must be at least 1.
   */
  quantity: number;

  /**
   * The total price of the order, which is calculated by multiplying the product price with the ordered quantity.
   * This field is automatically calculated in the pre-save middleware in the order schema.
   */
  totalPrice: number;
}
