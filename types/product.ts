// types/product.ts
export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  status: "In Stock" | "Out of Stock";
  excerpt: string;
  isVisible: boolean;
};
