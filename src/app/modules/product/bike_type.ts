export type BikeCategory = "Mountain" | "Road" | "Hybrid" | "Electric";

export type TProduct = {
  name: string;
  brand: string;
  model: string;
  price: number;
  category: BikeCategory;
  description: string;
  quantity: number;
  inStock: boolean;
}
