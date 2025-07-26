// // app/page.tsx
// "use client";

// import { useEffect, useState } from "react";
// import { collection, onSnapshot, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
// import { db } from "@/lib/firebase";
// import { Product } from "@/types/product";
// import ProductTable from "@/components/ProductTable";
// import AddProductModal from "@/components/AddProductModal";
// import ViewProductModal from "@/components/ViewProductModal";
// import { Button } from "primereact/button";

// export default function HomePage() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
//   const [viewVisible, setViewVisible] = useState(false);
//   const [formVisible, setFormVisible] = useState(false);
//   const [editProduct, setEditProduct] = useState<Product | null>(null);

//   useEffect(() => {
//     const unsub = onSnapshot(collection(db, "products"), (snapshot) => {
//       const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Product));
//       setProducts(items);
//     });
//     return () => unsub();
//   }, []);

//   const handleAddOrUpdate = async (data: Product) => {
//     if (editProduct) {
//       const ref = doc(db, "products", editProduct.id);
//       await updateDoc(ref, data);
//     } else {
//       await addDoc(collection(db, "products"), data);
//     }
//     setFormVisible(false);
//     setEditProduct(null);
//   };

//   // Remove window.confirm - let the ProductTable handle confirmation with its custom dialog
//   const handleDelete = async (id: string) => {
//     await deleteDoc(doc(db, "products", id));
//   };

//   return (
//     <main className="p-6">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-xl font-bold">Product Management</h1>
//         <Button label="Add New" icon="pi pi-plus" onClick={() => setFormVisible(true)} />
//       </div>

//       <ProductTable
//         products={products}
//         onView={(p) => {
//           setSelectedProduct(p);
//           setViewVisible(true);
//         }}
//         onEdit={(p) => {
//           setEditProduct(p);
//           setFormVisible(true);
//         }}
//         onDelete={handleDelete}
//       />

//       <AddProductModal
//         visible={formVisible}
//         onHide={() => {
//           setFormVisible(false);
//           setEditProduct(null);
//         }}
//         onSubmit={handleAddOrUpdate}
//         defaultValues={editProduct || undefined}
//       />

//       <ViewProductModal
//         visible={viewVisible}
//         onHide={() => setViewVisible(false)}
//         product={selectedProduct}
//       />
//     </main>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Product } from "@/types/product";
import ProductTable from "@/components/ProductTable";
import AddProductModal from "@/components/AddProductModal";
import ViewProductModal from "@/components/ViewProductModal";
import { Button } from "primereact/button";

// Type for form data without the id field
type ProductFormData = Omit<Product, 'id'>;

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [viewVisible, setViewVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "products"), (snapshot) => {
      const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Product));
      setProducts(items);
    });
    return () => unsub();
  }, []);

  const handleAddOrUpdate = async (data: ProductFormData) => {
    if (editProduct) {
      const ref = doc(db, "products", editProduct.id);
      await updateDoc(ref, data);
    } else {
      await addDoc(collection(db, "products"), data);
    }
    setFormVisible(false);
    setEditProduct(null);
  };

  // Remove window.confirm - let the ProductTable handle confirmation with its custom dialog
  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "products", id));
  };

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Product Management</h1>
        <Button label="Add New" icon="pi pi-plus" onClick={() => setFormVisible(true)} />
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
      />

      <AddProductModal
        visible={formVisible}
        onHide={() => {
          setFormVisible(false);
          setEditProduct(null);
        }}
        onSubmit={handleAddOrUpdate}
        defaultValues={editProduct || undefined}
      />

      <ViewProductModal
        visible={viewVisible}
        onHide={() => setViewVisible(false)}
        product={selectedProduct}
      />
    </main>
  );
}