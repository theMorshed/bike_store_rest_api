// Type for bike categories
export type BikeCategory = "Mountain" | "Road" | "Hybrid" | "Electric";

// Interface for the Product model
export interface Product {
  name: string;
  brand: string;
  price: number;
  category: BikeCategory;
  description: string;
  quantity: number;
  inStock: boolean;
}
