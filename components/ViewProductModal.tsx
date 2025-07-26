// // components/ViewProductModal.tsx
// "use client";

// import { Dialog } from "primereact/dialog";
// import { Product } from "@/types/Product";
// import { Badge } from "primereact/badge";
// import { Tag } from "primereact/tag";

// export default function ViewProductModal({
//   product,
//   visible,
//   onHide,
// }: {
//   product: Product | null;
//   visible: boolean;
//   onHide: () => void;
// }) {
//   if (!product) return null;

//   const getStatusSeverity = (status: string) => {
//     switch (status?.toLowerCase()) {
//       case 'active':
//       case 'available':
//         return 'success';
//       case 'inactive':
//       case 'unavailable':
//         return 'danger';
//       case 'pending':
//         return 'warning';
//       default:
//         return 'info';
//     }
//   };

//   const formatPrice = (price: number) => {
//     return new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD',
//       minimumFractionDigits: 2,
//     }).format(price);
//   };

//   return (
//     <Dialog 
//       header={
//         <div className="flex items-center gap-3 pb-2">
//           <i className="pi pi-eye text-2xl text-blue-600"></i>
//           <span className="text-xl font-semibold text-gray-800">Product Details</span>
//         </div>
//       }
//       visible={visible} 
//       style={{ 
//         width: "90vw", 
//         maxWidth: "600px", 
//         height: "90vh",
//         maxHeight: "800px"
//       }} 
//       onHide={onHide}
//       className="product-modal"
//       contentClassName="p-0 h-full overflow-y-auto"
//       headerClassName="border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 sticky top-0 z-10"
//       resizable={false}
//       maximizable={false}
//     >
//       <div className="bg-white min-h-full">
//         {/* Product Image Section */}
//         <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
//           <img 
//             src={product.image} 
//             alt={product.name} 
//             className="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-300 hover:scale-105" 
//           />
//           <div className="absolute top-2 right-2 sm:top-4 sm:right-4 flex flex-col sm:flex-row gap-2">
//             <Tag 
//               severity={getStatusSeverity(product.status)} 
//               value={product.status}
//               className="font-medium shadow-lg text-xs sm:text-sm"
//             />
//             <Tag 
//               severity={product.isVisible ? "success" : "danger"}
//               value={product.isVisible ? "Visible" : "Hidden"}
//               className="font-medium shadow-lg text-xs sm:text-sm"
//             />
//           </div>
//         </div>

//         {/* Product Information Section */}
//         <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
//           {/* Title and Price */}
//           <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
//             <div className="flex-1">
//               <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 leading-tight break-words">
//                 {product.name}
//               </h2>
//               <div className="flex items-center gap-2">
//                 <i className="pi pi-dollar text-green-600"></i>
//                 <span className="text-2xl sm:text-3xl font-bold text-green-600">
//                   {formatPrice(product.price)}
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Excerpt */}
//           <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 sm:p-4 border-l-4 border-blue-500">
//             <div className="flex items-start gap-2 sm:gap-3">
//               <i className="pi pi-info-circle text-blue-600 mt-1 text-sm sm:text-base"></i>
//               <div className="flex-1 min-w-0">
//                 <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">Description</h3>
//                 <p className="text-gray-700 leading-relaxed text-sm sm:text-base break-words">
//                   {product.excerpt || "No description available"}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Product Status Grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//             <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
//               <div className="flex items-center gap-2 sm:gap-3">
//                 <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
//                   <i className="pi pi-check-circle text-blue-600 text-sm sm:text-base"></i>
//                 </div>
//                 <div className="min-w-0 flex-1">
//                   <p className="text-xs sm:text-sm text-gray-600 font-medium">Status</p>
//                   <p className="text-base sm:text-lg font-semibold text-gray-800 capitalize break-words">
//                     {product.status}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
//               <div className="flex items-center gap-2 sm:gap-3">
//                 <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
//                   <i className={`pi ${product.isVisible ? 'pi-eye' : 'pi-eye-slash'} text-purple-600 text-sm sm:text-base`}></i>
//                 </div>
//                 <div className="min-w-0 flex-1">
//                   <p className="text-xs sm:text-sm text-gray-600 font-medium">Visibility</p>
//                   <p className="text-base sm:text-lg font-semibold text-gray-800">
//                     {product.isVisible ? "Public" : "Private"}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Extra padding at bottom for scroll comfort */}
//           <div className="h-4"></div>
//         </div>
//       </div>

//       <style jsx global>{`
//         .product-modal .p-dialog-content {
//           padding: 0 !important;
//           border-radius: 0 0 8px 8px;
//           overflow-y: auto !important;
//           max-height: calc(90vh - 80px);
//         }
        
//         .product-modal .p-dialog-header {
//           border-radius: 8px 8px 0 0;
//           position: sticky;
//           top: 0;
//           z-index: 10;
//         }
        
//         .product-modal .p-dialog {
//           border-radius: 8px;
//           box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
//           margin: 2rem;
//         }
        
//         @media (max-width: 768px) {
//           .product-modal .p-dialog {
//             margin: 1rem;
//             width: calc(100vw - 2rem) !important;
//             height: calc(100vh - 2rem) !important;
//             max-width: none !important;
//             max-height: none !important;
//           }
          
//           .product-modal .p-dialog-content {
//             max-height: calc(100vh - 120px);
//           }
//         }
        
//         /* Custom scrollbar */
//         .product-modal .p-dialog-content::-webkit-scrollbar {
//           width: 6px;
//         }
        
//         .product-modal .p-dialog-content::-webkit-scrollbar-track {
//           background: #f1f5f9;
//           border-radius: 3px;
//         }
        
//         .product-modal .p-dialog-content::-webkit-scrollbar-thumb {
//           background: #cbd5e1;
//           border-radius: 3px;
//         }
        
//         .product-modal .p-dialog-content::-webkit-scrollbar-thumb:hover {
//           background: #94a3b8;
//         }
//       `}</style>
//     </Dialog>
//   );
// }


// components/ViewProductModal.tsx
"use client";

import { Dialog } from "primereact/dialog";
import { Product } from "@/types/Product";
import { Badge } from "primereact/badge";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import Image from "next/image";

export default function ViewProductModal({
  product,
  visible,
  onHide,
  onEdit, // Optional edit callback
}: {
  product: Product | null;
  visible: boolean;
  onHide: () => void;
  onEdit?: (product: Product) => void;
}) {
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
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover rounded-xl shadow-2xl"
                unoptimized
              />
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