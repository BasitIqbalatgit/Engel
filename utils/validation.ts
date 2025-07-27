

// utils/validation.ts - Additional validation utilities
import { z } from 'zod';

export const ProductSchema = z.object({
  name: z.string()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters")
    .trim(),
  price: z.number()
    .positive("Price must be positive")
    .max(999999, "Price is too high")
    .min(0.01, "Price must be at least $0.01"),
  image: z.string()
    .url("Invalid image URL")
    .min(1, "Image URL is required"),
  status: z.enum(["In Stock", "Out of Stock"], {
    errorMap: () => ({ message: "Status must be either 'In Stock' or 'Out of Stock'" })
  }),
  excerpt: z.string()
    .max(250, "Description must be less than 250 characters")
    .trim(),
  isVisible: z.boolean({
    errorMap: () => ({ message: "Visibility must be a boolean value" })
  }),
});

export const ProductFiltersSchema = z.object({
  search: z.string().optional(),
  sortBy: z.enum(['name', 'price-low', 'price-high', 'newest']).optional(),
  filterBy: z.enum(['all', 'in-stock', 'out-of-stock']).optional(),
  visibleOnly: z.boolean().optional(),
});