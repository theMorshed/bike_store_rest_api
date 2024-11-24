// Type for bike categories
// This defines the valid categories a bike can belong to.
export type BikeCategory = "Mountain" | "Road" | "Hybrid" | "Electric";

// Interface for the Product model
// This defines the structure of a bike product, with fields like name, brand, price, category, description, etc.
export interface Product {
  // Name of the bike product
  name: string;

  // Brand of the bike product (e.g., Trek, Specialized)
  brand: string;

  // Price of the bike in monetary value
  price: number;

  // Category of the bike (e.g., Mountain, Road, Hybrid, Electric)
  category: BikeCategory;

  // Description of the bike, including features, specifications, etc.
  description: string;

  // The quantity available in the inventory
  quantity: number;

  // Availability status of the bike: whether it is in stock or not
  inStock: boolean;
}

