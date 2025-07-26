// // components/ProductForm.tsx
// "use client";

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { InputText } from "primereact/inputtext";
// import { InputNumber } from "primereact/inputnumber";
// import { Dropdown } from "primereact/dropdown";
// import { InputTextarea } from "primereact/inputtextarea";
// import { Checkbox } from "primereact/checkbox";
// import { Button } from "primereact/button";
// import { Card } from "primereact/card";
// import { Divider } from "primereact/divider";
// import { useState, useEffect } from "react";
// import Image from "next/image";

// const schema = z.object({
//   name: z.string().min(1, "Name is required"),
//   price: z.number().positive("Price must be positive"),
//   image: z.string().url("Invalid image URL"),
//   status: z.enum(["In Stock", "Out of Stock"]),
//   excerpt: z.string().max(250, "Max 250 characters"),
//   isVisible: z.boolean(),
// });

// export type ProductFormData = z.infer<typeof schema>;

// export default function ProductForm({
//   onSubmit,
//   defaultValues = {},
//   isEdit = false,
// }: {
//   onSubmit: (data: ProductFormData) => void;
//   defaultValues?: Partial<ProductFormData>;
//   isEdit?: boolean;
// }) {
//   const [imagePreview, setImagePreview] = useState<string>("");
//   const [imageError, setImageError] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     watch,
//     formState: { errors, isValid },
//   } = useForm<ProductFormData>({
//     resolver: zodResolver(schema),
//     defaultValues: {
//       name: defaultValues.name || "",
//       price: defaultValues.price || 0,
//       image: defaultValues.image || "",
//       status: defaultValues.status || "In Stock",
//       excerpt: defaultValues.excerpt || "",
//       isVisible: defaultValues.isVisible ?? true,
//     },
//   });

//   const watchedImage = watch("image");
//   const watchedExcerpt = watch("excerpt");
//   const watchedStatus = watch("status");
//   const watchedVisible = watch("isVisible");

//   // Status options - simplified to avoid object rendering issues
//   const statusOptions = [
//     "In Stock",
//     "Out of Stock"
//   ];

//   // Update image preview when image URL changes
//   useEffect(() => {
//     if (watchedImage && watchedImage.trim()) {
//       setImagePreview(watchedImage);
//       setImageError(false);
//     } else {
//       setImagePreview("");
//       setImageError(false);
//     }
//   }, [watchedImage]);

//   const handleFormSubmit = async (data: ProductFormData) => {
//     setIsSubmitting(true);
//     try {
//       await onSubmit(data);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleImageError = () => {
//     setImageError(true);
//   };

//   const getStatusIcon = (status: string) => {
//     return status === "In Stock" ? "pi pi-check-circle" : "pi pi-times-circle";
//   };

//   const getStatusColor = (status: string) => {
//     return status === "In Stock" ? "#10b981" : "#ef4444";
//   };

//   const statusOptionTemplate = (option: string) => {
//     return (
//       <div className="flex items-center gap-2">
//         <i className={getStatusIcon(option)} style={{ color: getStatusColor(option) }}></i>
//         <span>{option}</span>
//       </div>
//     );
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50/50">
//         <div className="p-8">
//           {/* Header */}
//           <div className="text-center mb-8">
//             <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
//               <i className={`pi ${isEdit ? 'pi-pencil' : 'pi-plus'} text-white text-2xl`}></i>
//             </div>
//             <h2 className="text-3xl font-bold text-gray-800 mb-2">
//               {isEdit ? "Edit Product" : "Add New Product"}
//             </h2>
//             <p className="text-gray-600">
//               {isEdit ? "Update your product information" : "Create a new product for your inventory"}
//             </p>
//           </div>

//           <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//               {/* Left Column - Basic Information */}
//               <div className="space-y-6">
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
//                     <i className="pi pi-info-circle text-blue-500"></i>
//                     Basic Information
//                   </h3>
                  
//                   {/* Product Name */}
//                   <div className="space-y-2">
//                     <label className="block text-sm font-medium text-gray-700">
//                       Product Name *
//                     </label>
//                     <span className="p-input-icon-left w-full">
                      
//                       <InputText
//                         {...register("name")}
//                         placeholder="Enter product name..."
//                         className={`w-full ${errors.name ? 'p-invalid' : ''}`}
//                       />
//                     </span>
//                     {errors.name && (
//                       <small className="text-red-500 flex items-center gap-1">
//                         <i className="pi pi-exclamation-triangle text-xs"></i>
//                         {errors.name.message}
//                       </small>
//                     )}
//                   </div>

//                   {/* Price */}
//                   <div className="space-y-2">
//                     <label className="block text-sm font-medium text-gray-700">
//                       Price *
//                     </label>
//                     <span className="p-input-icon-left w-full">
                     
//                       <InputNumber
//                         value={watch("price")}
//                         onValueChange={(e) => setValue("price", e.value || 0)}
//                         placeholder="0.00"
//                         className={`w-full ${errors.price ? 'p-invalid' : ''}`}
//                         mode="currency"
//                         currency="USD"
//                         locale="en-US"
//                         minFractionDigits={2}
//                       />
//                     </span>
//                     {errors.price && (
//                       <small className="text-red-500 flex items-center gap-1">
//                         <i className="pi pi-exclamation-triangle text-xs"></i>
//                         {errors.price.message}
//                       </small>
//                     )}
//                   </div>

//                   {/* Status */}
//                   <div className="space-y-2">
//                     <label className="block text-sm font-medium text-gray-700">
//                       Status *
//                     </label>
//                     <Dropdown
//                       value={watchedStatus}
//                       options={statusOptions}
//                       onChange={(e) => setValue("status", e.value)}
//                       placeholder="Select Status"
//                       className={`w-full ${errors.status ? 'p-invalid' : ''}`}
//                       itemTemplate={statusOptionTemplate}
//                       valueTemplate={(value) => {
//                         if (value) {
//                           return (
//                             <div className="flex items-center gap-2">
//                               <i className={getStatusIcon(value)} style={{ color: getStatusColor(value) }}></i>
//                               <span>{value}</span>
//                             </div>
//                           );
//                         }
//                         return <span>Select Status</span>;
//                       }}
//                     />
//                     {errors.status && (
//                       <small className="text-red-500 flex items-center gap-1">
//                         <i className="pi pi-exclamation-triangle text-xs"></i>
//                         {errors.status.message}
//                       </small>
//                     )}
//                   </div>

//                   {/* Visibility Toggle */}
//                   <div className="space-y-2">
//                     <label className="block text-sm font-medium text-gray-700">
//                       Visibility Settings
//                     </label>
//                     <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
//                       <Checkbox
//                         checked={watchedVisible}
//                         onChange={(e) => setValue("isVisible", !!e.checked)}
//                         inputId="visible"
//                         className="mr-2"
//                       />
//                       <div className="flex items-center gap-2">
//                         <i className={`pi ${watchedVisible ? 'pi-eye text-green-600' : 'pi-eye-slash text-gray-400'}`}></i>
//                         <label htmlFor="visible" className="text-sm font-medium cursor-pointer">
//                           {watchedVisible ? 'Product is visible to customers' : 'Product is hidden from customers'}
//                         </label>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Right Column - Media & Description */}
//               <div className="space-y-6">
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
//                     <i className="pi pi-image text-purple-500"></i>
//                     Media & Description
//                   </h3>

//                   {/* Image URL */}
//                   <div className="space-y-2">
//                     <label className="block text-sm font-medium text-gray-700">
//                       Image URL *
//                     </label>
//                     <span className="p-input-icon-left w-full">
                     
//                       <InputText
//                         {...register("image")}
//                         placeholder="https://example.com/image.jpg"
//                         className={`w-full ${errors.image ? 'p-invalid' : ''}`}
//                       />
//                     </span>
//                     {errors.image && (
//                       <small className="text-red-500 flex items-center gap-1">
//                         <i className="pi pi-exclamation-triangle text-xs"></i>
//                         {errors.image.message}
//                       </small>
//                     )}
//                   </div>

//                   {/* Image Preview */}
//                   <div className="space-y-2">
//                     <label className="block text-sm font-medium text-gray-700">
//                       Image Preview
//                     </label>
//                     <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
//                       {imagePreview && !imageError ? (
//                         <div className="flex justify-center">
//                           <div className="relative">
//                             <Image
//                               src={imagePreview}
//                               alt="Product preview"
//                               width={200}
//                               height={200}
//                               className="rounded-lg object-cover shadow-md border border-gray-200"
//                               onError={handleImageError}
//                               unoptimized={true}
//                             />
//                             <div className="absolute top-2 right-2">
//                               <div className="bg-green-500 text-white rounded-full p-1">
//                                 <i className="pi pi-check text-xs"></i>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       ) : (
//                         <div className="text-center py-8">
//                           <i className="pi pi-image text-4xl text-gray-400 mb-2"></i>
//                           <p className="text-gray-500 text-sm">
//                             {imageError ? "Failed to load image" : "Image preview will appear here"}
//                           </p>
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   {/* Description */}
//                   <div className="space-y-2">
//                     <label className="block text-sm font-medium text-gray-700">
//                       Description ({watchedExcerpt?.length || 0}/250)
//                     </label>
//                     <InputTextarea
//                       {...register("excerpt")}
//                       rows={4}
//                       placeholder="Enter product description..."
//                       className={`w-full resize-none ${errors.excerpt ? 'p-invalid' : ''}`}
//                       maxLength={250}
//                     />
//                     {errors.excerpt && (
//                       <small className="text-red-500 flex items-center gap-1">
//                         <i className="pi pi-exclamation-triangle text-xs"></i>
//                         {errors.excerpt.message}
//                       </small>
//                     )}
//                     <div className="flex justify-between items-center">
//                       <small className="text-gray-500">
//                         Maximum 250 characters
//                       </small>
//                       <small className={`${(watchedExcerpt?.length || 0) > 200 ? 'text-orange-500' : 'text-gray-500'}`}>
//                         {250 - (watchedExcerpt?.length || 0)} characters remaining
//                       </small>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <Divider className="my-8" />

//             {/* Form Actions */}
//             <div className="flex justify-end gap-4 pt-4">
//               <Button
//                 type="button"
//                 label="Cancel"
//                 icon="pi pi-times"
//                 severity="secondary"
//                 outlined
//                 className="px-6 py-3"
//                 onClick={() => window.history.back()}
//               />
//               <Button
//                 type="submit"
//                 label={isEdit ? "Update Product" : "Create Product"}
//                 icon={`pi ${isEdit ? 'pi-check' : 'pi-plus'}`}
//                 className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 border-0"
//                 loading={isSubmitting}
//                 disabled={!isValid || isSubmitting}
//               />
//             </div>
//           </form>
//         </div>
//       </Card>
//     </div>
//   );
// }


// components/ProductForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { useState, useEffect } from "react";
import Image from "next/image";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().positive("Price must be positive"),
  image: z.string().url("Invalid image URL"),
  status: z.enum(["In Stock", "Out of Stock"]),
  excerpt: z.string().max(250, "Max 250 characters"),
  isVisible: z.boolean(),
});

export type ProductFormData = z.infer<typeof schema>;

export default function ProductForm({
  onSubmit,
  onCancel,
  defaultValues = {},
  isEdit = false,
}: {
  onSubmit: (data: ProductFormData) => void;
  onCancel?: () => void;
  defaultValues?: Partial<ProductFormData>;
  isEdit?: boolean;
}) {
  const [imagePreview, setImagePreview] = useState<string>("");
  const [imageError, setImageError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<ProductFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: defaultValues.name || "",
      price: defaultValues.price || 0,
      image: defaultValues.image || "",
      status: defaultValues.status || "In Stock",
      excerpt: defaultValues.excerpt || "",
      isVisible: defaultValues.isVisible ?? true,
    },
  });

  const watchedImage = watch("image");
  const watchedExcerpt = watch("excerpt");
  const watchedStatus = watch("status");
  const watchedVisible = watch("isVisible");

  const statusOptions = ["In Stock", "Out of Stock"];

  useEffect(() => {
    if (watchedImage && watchedImage.trim()) {
      setImagePreview(watchedImage);
      setImageError(false);
    } else {
      setImagePreview("");
      setImageError(false);
    }
  }, [watchedImage]);

  const handleFormSubmit = async (data: ProductFormData) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const getStatusIcon = (status: string) => {
    return status === "In Stock" ? "pi pi-check-circle" : "pi pi-times-circle";
  };

  const getStatusColor = (status: string) => {
    return status === "In Stock" ? "#10b981" : "#ef4444";
  };

  const statusOptionTemplate = (option: string) => {
    return (
      <div className="flex items-center gap-2">
        <i className={getStatusIcon(option)} style={{ color: getStatusColor(option) }}></i>
        <span>{option}</span>
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <Card className="shadow-lg border-0">
        <div className="p-6">
          {/* Compact Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
              <i className={`pi ${isEdit ? 'pi-pencil' : 'pi-plus'} text-white text-lg`}></i>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {isEdit ? "Edit Product" : "Add New Product"}
              </h2>
              <p className="text-sm text-gray-600">
                {isEdit ? "Update product information" : "Create a new product"}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              
              {/* Column 1: Basic Info */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide border-b pb-2">
                  Basic Information
                </h3>
                
                {/* Product Name */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Product Name *
                  </label>
                  <InputText
                    {...register("name")}
                    placeholder="Enter product name"
                    className={`w-full text-sm ${errors.name ? 'p-invalid' : ''}`}
                  />
                  {errors.name && (
                    <small className="text-red-500 text-xs mt-1 block">
                      {errors.name.message}
                    </small>
                  )}
                </div>

                {/* Price */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Price *
                  </label>
                  <InputNumber
                    value={watch("price")}
                    onValueChange={(e) => setValue("price", e.value || 0)}
                    placeholder="0.00"
                    className={`w-full text-sm ${errors.price ? 'p-invalid' : ''}`}
                    mode="currency"
                    currency="USD"
                    locale="en-US"
                    minFractionDigits={2}
                  />
                  {errors.price && (
                    <small className="text-red-500 text-xs mt-1 block">
                      {errors.price.message}
                    </small>
                  )}
                </div>

                {/* Status */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Status *
                  </label>
                  <Dropdown
                    value={watchedStatus}
                    options={statusOptions}
                    onChange={(e) => setValue("status", e.value)}
                    placeholder="Select Status"
                    className={`w-full text-sm ${errors.status ? 'p-invalid' : ''}`}
                    itemTemplate={statusOptionTemplate}
                    valueTemplate={(value) => {
                      if (value) {
                        return (
                          <div className="flex items-center gap-2">
                            <i className={getStatusIcon(value)} style={{ color: getStatusColor(value) }}></i>
                            <span className="text-sm">{value}</span>
                          </div>
                        );
                      }
                      return <span className="text-sm">Select Status</span>;
                    }}
                  />
                </div>

                {/* Visibility Toggle */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">
                    Visibility
                  </label>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded border">
                    <Checkbox
                      checked={watchedVisible}
                      onChange={(e) => setValue("isVisible", !!e.checked)}
                      inputId="visible"
                    />
                    <div className="flex items-center gap-2">
                      <i className={`pi text-sm ${watchedVisible ? 'pi-eye text-green-600' : 'pi-eye-slash text-gray-400'}`}></i>
                      <label htmlFor="visible" className="text-xs cursor-pointer">
                        {watchedVisible ? 'Visible to customers' : 'Hidden from customers'}
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Column 2: Image */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide border-b pb-2">
                  Product Image
                </h3>
                
                {/* Image URL */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Image URL *
                  </label>
                  <InputText
                    {...register("image")}
                    placeholder="https://example.com/image.jpg"
                    className={`w-full text-sm ${errors.image ? 'p-invalid' : ''}`}
                  />
                  {errors.image && (
                    <small className="text-red-500 text-xs mt-1 block">
                      {errors.image.message}
                    </small>
                  )}
                </div>

                {/* Image Preview */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Preview
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 bg-gray-50 h-48 flex items-center justify-center">
                    {imagePreview && !imageError ? (
                      <div className="relative">
                        <Image
                          src={imagePreview}
                          alt="Product preview"
                          width={150}
                          height={150}
                          className="rounded-lg object-cover shadow-sm border border-gray-200 max-h-40"
                          onError={handleImageError}
                          unoptimized={true}
                        />
                        <div className="absolute -top-2 -right-2">
                          <div className="bg-green-500 text-white rounded-full p-1">
                            <i className="pi pi-check text-xs"></i>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <i className="pi pi-image text-3xl text-gray-400 mb-2"></i>
                        <p className="text-gray-500 text-xs">
                          {imageError ? "Failed to load image" : "Image preview"}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Column 3: Description */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide border-b pb-2">
                  Description
                </h3>
                
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Product Description ({watchedExcerpt?.length || 0}/250)
                  </label>
                  <InputTextarea
                    {...register("excerpt")}
                    rows={8}
                    placeholder="Enter product description..."
                    className={`w-full resize-none text-sm ${errors.excerpt ? 'p-invalid' : ''}`}
                    maxLength={250}
                  />
                  {errors.excerpt && (
                    <small className="text-red-500 text-xs mt-1 block">
                      {errors.excerpt.message}
                    </small>
                  )}
                  <div className="flex justify-between mt-1">
                    <small className="text-gray-500 text-xs">Max 250 characters</small>
                    <small className={`text-xs ${(watchedExcerpt?.length || 0) > 200 ? 'text-orange-500' : 'text-gray-500'}`}>
                      {250 - (watchedExcerpt?.length || 0)} remaining
                    </small>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="pt-4 border-t">
                  <div className="flex gap-3">
                    <Button
                      type="button"
                      label="Cancel"
                      icon="pi pi-times"
                      severity="secondary"
                      outlined
                      className="flex-1 text-sm py-2"
                      onClick={() => onCancel ? onCancel() : window.history.back()}
                    />
                    <Button
                      type="submit"
                      label={isEdit ? "Update" : "Create"}
                      icon={`pi ${isEdit ? 'pi-check' : 'pi-plus'}`}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 border-0 text-sm py-2"
                      loading={isSubmitting}
                      disabled={!isValid || isSubmitting}
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}