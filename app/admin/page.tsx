
// ===========================
// Updated HomePage with TanStack Query
"use client";

import { useState } from "react";
import ProductTable from "@/components/ProductTable";
import AddProductModal from "@/components/AddProductModal";
import ViewProductModal from "@/components/ViewProductModal";
import { Button } from "primereact/button";
import { Product } from "@/types/Product";
import { ProductFormData } from "@/lib/api/products";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { 
  useProducts, 
  useCreateProduct, 
  useUpdateProduct, 
  useDeleteProduct 
} from "@/lib/hooks/useProducts";

export default function HomePage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [viewVisible, setViewVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const toast = useRef<Toast>(null);

  // TanStack Query hooks
  const { data: productsResponse, isLoading, error } = useProducts();
  const createProductMutation = useCreateProduct();
  const updateProductMutation = useUpdateProduct();
  const deleteProductMutation = useDeleteProduct();

  const products = productsResponse?.data || [];

  const showToast = (severity: 'success' | 'error' | 'info', summary: string, detail: string) => {
    toast.current?.show({ severity, summary, detail, life: 3000 });
  };

  const handleAddOrUpdate = async (data: ProductFormData) => {
    try {
      if (editProduct) {
        const result = await updateProductMutation.mutateAsync({
          id: editProduct.id,
          data
        });
        
        if (result.success) {
          showToast('success', 'Success', 'Product updated successfully');
          setFormVisible(false);
          setEditProduct(null);
        } else {
          showToast('error', 'Error', result.error || 'Failed to update product');
        }
      } else {
        const result = await createProductMutation.mutateAsync(data);
        
        if (result.success) {
          showToast('success', 'Success', 'Product created successfully');
          setFormVisible(false);
        } else {
          showToast('error', 'Error', result.error || 'Failed to create product');
        }
      }
    } catch (error) {
      console.error('Error saving product:', error);
      showToast('error', 'Error', 'An unexpected error occurred');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const result = await deleteProductMutation.mutateAsync(id);
      
      if (result.success) {
        showToast('success', 'Success', 'Product deleted successfully');
      } else {
        showToast('error', 'Error', result.error || 'Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      showToast('error', 'Error', 'An unexpected error occurred');
    }
  };

  const isAnyMutationLoading = 
    createProductMutation.isPending || 
    updateProductMutation.isPending || 
    deleteProductMutation.isPending;

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h2>
          <p className="text-gray-600">Failed to load products. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toast ref={toast} />
      <main className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Product Management</h1>
          <Button 
            label="Add New" 
            icon="pi pi-plus" 
            onClick={() => setFormVisible(true)}
            loading={isAnyMutationLoading}
            disabled={isAnyMutationLoading}
          />
        </div>

        <ProductTable
          products={products}
          onView={(p) => {
            setSelectedProduct(p);
            setViewVisible(true);
          }}
          onEdit={(p) => {
            setEditProduct(p);
            setFormVisible(true);
          }}
          onDelete={handleDelete}
          loading={isLoading || isAnyMutationLoading}
        />

        <AddProductModal
          visible={formVisible}
          onHide={() => {
            setFormVisible(false);
            setEditProduct(null);
          }}
          onSubmit={handleAddOrUpdate}
          defaultValues={editProduct || undefined}
          loading={isAnyMutationLoading}
        />

        <ViewProductModal
          visible={viewVisible}
          onHide={() => setViewVisible(false)}
          product={selectedProduct}
          onEdit={(product) => {
            setEditProduct(product);
            setFormVisible(true);
            setViewVisible(false);
          }}
        />
      </main>
    </>
  );
}