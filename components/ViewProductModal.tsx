// components/ViewProductModal.tsx
"use client";

import { Dialog } from "primereact/dialog";
import { Product } from "@/types/product";

export default function ViewProductModal({
  product,
  visible,
  onHide,
}: {
  product: Product | null;
  visible: boolean;
  onHide: () => void;
}) {
  if (!product) return null;

  return (
    <Dialog header="View Product" visible={visible} style={{ width: "30vw" }} onHide={onHide}>
      <div className="space-y-3">
        <img src={product.image} alt={product.name} className="w-full h-auto rounded" />
        <div><strong>Name:</strong> {product.name}</div>
        <div><strong>Price:</strong> ${product.price}</div>
        <div><strong>Status:</strong> {product.status}</div>
        <div><strong>Excerpt:</strong> {product.excerpt}</div>
        <div><strong>Visible:</strong> {product.isVisible ? "Yes" : "No"}</div>
      </div>
    </Dialog>
  );
}
