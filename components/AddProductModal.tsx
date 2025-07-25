// components/AddProductModal.tsx
"use client";

import { Dialog } from "primereact/dialog";
import ProductForm, { ProductFormData } from "./ProductForm";

export default function AddProductModal({
  visible,
  onHide,
  onSubmit,
  defaultValues,
}: {
  visible: boolean;
  onHide: () => void;
  onSubmit: (data: ProductFormData) => void;
  defaultValues?: Partial<ProductFormData>;
}) {
  return (
    <Dialog
      header={defaultValues ? "Edit Product" : "Add Product"}
      visible={visible}
      style={{ width: "40vw" }}
      onHide={onHide}
    >
      <ProductForm onSubmit={onSubmit} defaultValues={defaultValues} />
    </Dialog>
  );
}
