

// utils/constants.ts - Application constants
export const PRODUCT_STATUS = {
  IN_STOCK: 'In Stock' as const,
  OUT_OF_STOCK: 'Out of Stock' as const,
} as const;

export const SORT_OPTIONS = {
  NEWEST: 'newest' as const,
  NAME: 'name' as const,
  PRICE_LOW: 'price-low' as const,
  PRICE_HIGH: 'price-high' as const,
} as const;

export const FILTER_OPTIONS = {
  ALL: 'all' as const,
  IN_STOCK: 'in-stock' as const,
  OUT_OF_STOCK: 'out-of-stock' as const,
} as const;

export const QUERY_KEYS = {
  PRODUCTS: 'products',
  PRODUCT: 'product',
} as const;

export const API_ENDPOINTS = {
  PRODUCTS: '/api/products',
  PRODUCT: (id: string) => `/api/products/${id}`,
} as const;