import { Product } from "./bike_interface";
import ProductModel from "./bike_model";

const createProuductInMongoDB = async(product: Product) => {
    const result = await ProductModel.create(product);
    return result;
}

const getAllBikes = async (searchTerm?: string): Promise<Product[]> => {
    const query: any = {};

    // Check if searchTerm is provided and build the query
    if (searchTerm) {
      const regex = new RegExp(searchTerm, 'i'); // Case-insensitive search
      query.$or = [
        { name: regex },
        { brand: regex },
        { category: regex }
      ];
    }

    return await ProductModel.find(query);
}

const getBikeByID = async(id: string) => {
    const result = await ProductModel.findById(id);
    return result;
}


export const prouductServices = {
    createProuductInMongoDB,
    getAllBikes,
    getBikeByID,
}