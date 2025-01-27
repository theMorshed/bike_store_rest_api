import { TProduct } from "./bike_type";
import ProductModel from "./bike_model";
import QueryBuilder from "../../builder/QueryBuilder";

/**
 * Create a new product (bike) in the MongoDB database.
 * @param product - The product (bike) data to be created.
 * @returns The created product document from MongoDB.
 */
const createBikeIntoDB = async (product: TProduct) => {
  // Create and save the new product in MongoDB
  const result = await ProductModel.create(product);
  return result;
}

/**
 * Retrieve all bike products from the database.
 * Optionally filter results by searchTerm (name, brand, or category).
 * @param searchTerm - A string to search for matching bikes (optional).
 * @returns An array of bike products that match the search criteria.
 */
const getAllBikes = async (query: Record<string, unknown>): Promise<TProduct[]> => {
  const bikesQuery = new QueryBuilder(ProductModel.find(), query)
    .search(['name', 'description'])
    .sort()
    .filter();
    
  const bikes = await bikesQuery.modelQuery;
  return bikes;
}

/**
 * Retrieve a single bike product by its ID.
 * @param id - The ID of the bike to retrieve.
 * @returns The bike product with the specified ID.
 */
const getBikeByID = async (id: string) => {
  // Find and return the bike by its ID
  const result = await ProductModel.findById(id);
  return result;
}

/**
 * Update a bike product by its ID.
 * @param id - The ID of the bike to update.
 * @param bikeData - The new data to update the bike with.
 * @returns The updated bike product document.
 */
const updateBikeByID = async (id: string, bikeData: any) => {
  // Find the bike by ID and update it with the new data
  const result = await ProductModel.findByIdAndUpdate(id, bikeData, { new: true });
  return result;
}

/**
 * Delete a bike product by its ID.
 * @param id - The ID of the bike to delete.
 * @returns The result of the deletion (null if not found).
 */
const deleteBikeByID = async (id: string) => {
  // Find the bike by ID and delete it
  const result = await ProductModel.findByIdAndDelete(id);
  return result;
}

// Export all service functions for use in the controller
export const prouductServices = {
  createBikeIntoDB,
  getAllBikes,
  getBikeByID,
  updateBikeByID,
  deleteBikeByID
}
