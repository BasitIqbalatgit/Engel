
// ===========================
// components/AddProductModal.tsx
"use client";

import { Dialog } from "primereact/dialog";
import ProductForm, { ProductFormData } from "./ProductForm";

interface AddProductModalProps {
  visible: boolean;
  onHide: () => void;
  onSubmit: (data: ProductFormData) => Promise<void>;
  defaultValues?: Partial<ProductFormData>;
  loading?: boolean;
}

export default function AddProductModal({
  visible,
  onHide,
  onSubmit,
  defaultValues,
  loading = false,
}: AddProductModalProps) {
  const isEdit = !!defaultValues && Object.keys(defaultValues).length > 0;

  const handleSubmit = async (data: ProductFormData) => {
    await onSubmit(data);
  };

  const handleCancel = () => {
    onHide();
  };

  return (
    <Dialog
      visible={visible}
      style={{ width: "90vw", maxWidth: "1200px" }}
      onHide={onHide}
      closable={!loading}
      closeOnEscape={!loading}
      dismissableMask={false}
      headerStyle={{ display: "none" }}
      contentStyle={{ padding: 0 }}
      className="product-form-dialog"
    >
      <ProductForm 
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        defaultValues={defaultValues}
        isEdit={isEdit}
        loading={loading}
      />
    </Dialog>
  );
}
