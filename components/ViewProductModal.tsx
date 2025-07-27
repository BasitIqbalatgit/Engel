// components/ViewProductModal.tsx - Updated with error fixes
"use client";

import { Dialog } from "primereact/dialog";
import { Product } from "@/types/Product";
import { Badge } from "primereact/badge";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import Image from "next/image";
import { useState } from "react";

interface ViewProductModalProps {
  product: Product | null;
  visible: boolean;
  onHide: () => void;
  onEdit?: (product: Product) => void;
}

export default function ViewProductModal({
  product,
  visible,
  onHide,
  onEdit,
}: ViewProductModalProps) {
  const [imageError, setImageError] = useState(false);

  if (!product) return null;

  const getStatusSeverity = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'in stock':
        return 'success';
      case 'out of stock':
        return 'danger';
      case 'pending':
        return 'warning';
      default:
        return 'info';
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(price);
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(product);
    }
    onHide();
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Dialog 
      header={null}
      visible={visible} 
      style={{ 
        width: "95vw", 
        maxWidth: "900px",
        height: "auto"
      }} 
      onHide={onHide}
      className="product-detail-modal"
      contentClassName="p-0"
      headerClassName="hidden"
      resizable={false}
      maximizable={false}
      modal
      blockScroll
    >
      <div className="bg-white rounded-lg overflow-hidden">
        {/* Close Button */}
        <div className="absolute top-4 right-4 z-20">
          <Button
            icon="pi pi-times"
            rounded
            text
            className="close-button w-10 h-10 bg-white/90 hover:bg-white shadow-lg border border-gray-200"
            onClick={onHide}
            severity="secondary"
          />
        </div>

        {/* Main Content Grid */}
        <div className="product-grid grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[500px]">
          {/* Left Side - Image */}
          <div className="product-image-section relative bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-8">
            <div className="product-image-container relative w-full max-w-sm aspect-square">
              {!imageError ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover rounded-xl shadow-2xl"
                  onError={handleImageError}
                  unoptimized
                />
              ) : (
                <div className="w-full h-full bg-gray-200 rounded-xl shadow-2xl flex items-center justify-center">
                  <div className="text-center">
                    <i className="pi pi-image text-6xl text-gray-400 mb-4"></i>
                    <p className="text-gray-500">Image not available</p>
                  </div>
                </div>
              )}
              {/* Floating Status Badge */}
              <div className="floating-status absolute -top-2 -right-2">
                <Tag 
                  severity={getStatusSeverity(product.status)} 
                  value={product.status}
                  className="font-semibold shadow-lg text-sm px-3 py-2"
                />
              </div>
            </div>
          </div>

          {/* Right Side - Product Details */}
          <div className="product-details-section p-8 flex flex-col justify-between">
            {/* Product Header */}
            <div className="space-y-6">
              <div>
                <div className="flex items-start justify-between mb-4">
                  <h1 className="product-title text-3xl font-bold text-gray-900 leading-tight pr-4">
                    {product.name}
                  </h1>
                  <Badge 
                    value={product.isVisible ? "Visible" : "Hidden"}
                    severity={product.isVisible ? "success" : "danger"}
                    className="text-sm font-medium px-3 py-2"
                  />
                </div>
                
                <div className="flex items-center gap-3 mb-6">
                  <div className="product-price text-4xl font-bold text-green-600">
                    {formatPrice(product.price)}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <i className="pi pi-info-circle text-blue-600 text-sm"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Product Description</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {product.excerpt || "No description available"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Product Details Grid */}
              <div className="status-grid grid grid-cols-2 gap-4">
                <div className="status-card bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <i className="pi pi-dollar text-white font-bold"></i>
                    </div>
                    <div>
                      <p className="text-sm text-green-700 font-medium">Price</p>
                      <p className="text-lg font-bold text-green-800">
                        {formatPrice(product.price)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className={`status-card rounded-xl p-4 border ${
                  product.status === 'In Stock' 
                    ? 'bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200' 
                    : 'bg-gradient-to-br from-red-50 to-red-100 border-red-200'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      product.status === 'In Stock' ? 'bg-emerald-500' : 'bg-red-500'
                    }`}>
                      <i className={`pi ${
                        product.status === 'In Stock' ? 'pi-check' : 'pi-times'
                      } text-white font-bold`}></i>
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${
                        product.status === 'In Stock' ? 'text-emerald-700' : 'text-red-700'
                      }`}>
                        Stock Status
                      </p>
                      <p className={`text-lg font-bold ${
                        product.status === 'In Stock' ? 'text-emerald-800' : 'text-red-800'
                      }`}>
                        {product.status}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visibility Status */}
              <div className={`status-card rounded-xl p-4 border ${
                product.isVisible 
                  ? 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200' 
                  : 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    product.isVisible ? 'bg-blue-500' : 'bg-gray-500'
                  }`}>
                    <i className={`pi ${
                      product.isVisible ? 'pi-eye' : 'pi-eye-slash'
                    } text-white`}></i>
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${
                      product.isVisible ? 'text-blue-700' : 'text-gray-700'
                    }`}>
                      Product Visibility
                    </p>
                    <p className={`text-lg font-bold ${
                      product.isVisible ? 'text-blue-800' : 'text-gray-800'
                    }`}>
                      {product.isVisible ? "Public - Visible to customers" : "Private - Hidden from customers"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons flex gap-3 pt-6 border-t border-gray-200 mt-6">
              <Button
                label="Close"
                icon="pi pi-times"
                outlined
                className="flex-1"
                onClick={onHide}
                severity="secondary"
              />
              {onEdit && (
                <Button
                  label="Edit Product"
                  icon="pi pi-pencil"
                  className="flex-1"
                  severity="info"
                  onClick={handleEdit}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}