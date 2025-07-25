// components/ProductTable.tsx
"use client";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Product } from "@/types/product";
import { useState } from "react";

export default function ProductTable({
  products,
  onView,
  onEdit,
  onDelete,
}: {
  products: Product[];
  onView: (p: Product) => void;
  onEdit: (p: Product) => void;
  onDelete: (id: string) => void;
}) {
  const [globalFilter, setGlobalFilter] = useState("");

  const actionTemplate = (rowData: Product) => (
    <div className="space-x-2">
      <Button icon="pi pi-eye" onClick={() => onView(rowData)} />
      <Button icon="pi pi-pencil" severity="warning" onClick={() => onEdit(rowData)} />
      <Button icon="pi pi-trash" severity="danger" onClick={() => onDelete(rowData.id)} />
    </div>
  );

  return (
    <div className="card">
      <InputText
        placeholder="Search by name"
        onInput={(e) => setGlobalFilter(e.currentTarget.value)}
        className="mb-2"
      />
      <DataTable
        value={products}
        paginator
        rows={5}
        globalFilterFields={["name"]}
        filters={{ name: { value: globalFilter, matchMode: "contains" } }}
      >
        <Column field="name" header="Name" sortable />
        <Column field="price" header="Price" sortable />
        <Column field="status" header="Status" />
        <Column field="excerpt" header="Excerpt" />
        <Column
          field="isVisible"
          header="Visible"
          body={(row) => (row.isVisible ? "Yes" : "No")}
        />
        <Column header="Actions" body={actionTemplate} />
      </DataTable>
    </div>
  );
}