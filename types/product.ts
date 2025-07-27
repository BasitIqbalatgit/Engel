
// types/Product.ts - Updated with better type safety
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  status: "In Stock" | "Out of Stock";
  excerpt: string;
  isVisible: boolean;
  createdAt?: string;
  updatedAt?: string;
}