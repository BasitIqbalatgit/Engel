// // components/AddProductModal.tsx
// "use client";

// import { Dialog } from "primereact/dialog";
// import ProductForm, { ProductFormData } from "./ProductForm";

// export default function AddProductModal({
//   visible,
//   onHide,
//   onSubmit,
//   defaultValues,
// }: {
//   visible: boolean;
//   onHide: () => void;
//   onSubmit: (data: ProductFormData) => void;
//   defaultValues?: Partial<ProductFormData>;
// }) {
//   const isEdit = !!defaultValues && Object.keys(defaultValues).length > 0;

//   const handleSubmit = async (data: ProductFormData) => {
//     await onSubmit(data);
//     onHide(); // Close modal after successful submission
//   };

//   return (
//     <Dialog
//       visible={visible}
//       style={{ width: "90vw", maxWidth: "1200px" }}
//       onHide={onHide}
//       closable={true}
//       closeOnEscape={true}
//       dismissableMask={false}
//       headerStyle={{ display: "none" }} // Hide default header since we have custom header in form
//       contentStyle={{ padding: 0 }}
//       className="product-form-dialog"
//     >
//       <ProductForm 
//         onSubmit={handleSubmit} 
//         defaultValues={defaultValues} 
//         isEdit={isEdit}
//       />
//     </Dialog>
//   );
// }


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
  const isEdit = !!defaultValues && Object.keys(defaultValues).length > 0;

  const handleSubmit = async (data: ProductFormData) => {
    await onSubmit(data);
    onHide(); // Close modal after successful submission
  };

  const handleCancel = () => {
    onHide(); // Close modal when cancel is clicked
  };

  return (
    <Dialog
      visible={visible}
      style={{ width: "90vw", maxWidth: "1200px" }}
      onHide={onHide}
      closable={true}
      closeOnEscape={true}
      dismissableMask={false}
      headerStyle={{ display: "none" }} // Hide default header since we have custom header in form
      contentStyle={{ padding: 0 }}
      className="product-form-dialog"
    >
      <ProductForm 
        onSubmit={handleSubmit}
        onCancel={handleCancel} // Pass the cancel handler
        defaultValues={defaultValues}
        isEdit={isEdit}
      />
    </Dialog>
  );
}