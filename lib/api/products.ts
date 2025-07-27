
// lib/api/products.ts - Updated with better error handling
import { Product } from '@/types/Product';

export type ProductFormData = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>;

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  count?: number;
}

export interface ProductFilters {
  search?: string;
  sortBy?: 'name' | 'price-low' | 'price-high' | 'newest';
  filterBy?: 'all' | 'in-stock' | 'out-of-stock';
  visibleOnly?: boolean;
}

class ProductService {
  private baseUrl = '/api/products';

  async getProducts(filters?: ProductFilters): Promise<ApiResponse<Product[]>> {
    try {
      const searchParams = new URLSearchParams();
      
      if (filters?.search) searchParams.set('search', filters.search);
      if (filters?.sortBy) searchParams.set('sortBy', filters.sortBy);
      if (filters?.filterBy) searchParams.set('filterBy', filters.filterBy);
      if (filters?.visibleOnly) searchParams.set('visibleOnly', 'true');

      const url = `${this.baseUrl}${searchParams.toString() ? '?' + searchParams.toString() : ''}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      return {
        success: false,
        error: 'Failed to fetch products',
        message: error instanceof Error ? error.message : 'Network error'
      };
    }
  }

  async getProduct(id: string): Promise<ApiResponse<Product>> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching product:', error);
      return {
        success: false,
        error: 'Failed to fetch product',
        message: error instanceof Error ? error.message : 'Network error'
      };
    }
  }

  async createProduct(productData: ProductFormData): Promise<ApiResponse<Product>> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating product:', error);
      return {
        success: false,
        error: 'Failed to create product',
        message: error instanceof Error ? error.message : 'Network error'
      };
    }
  }

  async updateProduct(id: string, productData: Partial<ProductFormData>): Promise<ApiResponse<Product>> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating product:', error);
      return {
        success: false,
        error: 'Failed to update product',
        message: error instanceof Error ? error.message : 'Network error'
      };
    }
  }

  async deleteProduct(id: string): Promise<ApiResponse<null>> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error deleting product:', error);
      return {
        success: false,
        error: 'Failed to delete product',
        message: error instanceof Error ? error.message : 'Network error'
      };
    }
  }
}

// Create and export a singleton instance
export const productService = new ProductService();

// Export individual functions for convenience
export const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = productService;