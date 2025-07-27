// ===========================
// Updated ProductForm with better error handling
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
  name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  price: z.number().positive("Price must be positive").max(999999, "Price is too high"),
  image: z.string().url("Invalid image URL"),
  status: z.enum(["In Stock", "Out of Stock"]),
  excerpt: z.string().max(250, "Max 250 characters"),
  isVisible: z.boolean(),
});

export type ProductFormData = z.infer<typeof schema>;

interface ProductFormProps {
  onSubmit: (data: ProductFormData) => Promise<void>;
  onCancel?: () => void;
  defaultValues?: Partial<ProductFormData>;
  isEdit?: boolean;
  loading?: boolean;
}

export default function ProductForm({
  onSubmit,
  onCancel,
  defaultValues = {},
  isEdit = false,
  loading = false,
}: ProductFormProps) {
  const [imagePreview, setImagePreview] = useState<string>("");
  const [imageError, setImageError] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isValid, isSubmitting },
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

  // Reset form when defaultValues change
  useEffect(() => {
    if (defaultValues && Object.keys(defaultValues).length > 0) {
      reset({
        name: defaultValues.name || "",
        price: defaultValues.price || 0,
        image: defaultValues.image || "",
        status: defaultValues.status || "In Stock",
        excerpt: defaultValues.excerpt || "",
        isVisible: defaultValues.isVisible ?? true,
      });
    }
  }, [defaultValues, reset]);

  const handleFormSubmit = async (data: ProductFormData) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Form submission error:', error);
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

  const isFormLoading = loading || isSubmitting;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <Card className="shadow-lg border-0">
        <div className="p-6">
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
                
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Product Name *
                  </label>
                  <InputText
                    {...register("name")}
                    placeholder="Enter product name"
                    className={`w-full text-sm ${errors.name ? 'p-invalid' : ''}`}
                    disabled={isFormLoading}
                  />
                  {errors.name && (
                    <small className="text-red-500 text-xs mt-1 block">
                      {errors.name.message}
                    </small>
                  )}
                </div>

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
                    min={0}
                    max={999999}
                    disabled={isFormLoading}
                  />
                  {errors.price && (
                    <small className="text-red-500 text-xs mt-1 block">
                      {errors.price.message}
                    </small>
                  )}
                </div>

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
                    disabled={isFormLoading}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">
                    Visibility
                  </label>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded border">
                    <Checkbox
                      checked={watchedVisible}
                      onChange={(e) => setValue("isVisible", !!e.checked)}
                      inputId="visible"
                      disabled={isFormLoading}
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
                
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Image URL *
                  </label>
                  <InputText
                    {...register("image")}
                    placeholder="https://example.com/image.jpg"
                    className={`w-full text-sm ${errors.image ? 'p-invalid' : ''}`}
                    disabled={isFormLoading}
                  />
                  {errors.image && (
                    <small className="text-red-500 text-xs mt-1 block">
                      {errors.image.message}
                    </small>
                  )}
                </div>

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
                    disabled={isFormLoading}
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
                      disabled={isFormLoading}
                    />
                    <Button
                      type="submit"
                      label={isEdit ? "Update" : "Create"}
                      icon={`pi ${isEdit ? 'pi-check' : 'pi-plus'}`}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 border-0 text-sm py-2"
                      loading={isFormLoading}
                      disabled={!isValid || isFormLoading}
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