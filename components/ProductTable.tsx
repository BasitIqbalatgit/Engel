import { useState, useCallback } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Slider } from "primereact/slider";
import { Badge } from "primereact/badge";
import { Tag } from "primereact/tag";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { Product } from "@/types/product";
import Image from "next/image";
import { Tooltip } from "primereact/tooltip";
import ConfirmationDialog from "./ConfirmationDialogProps";

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
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [visibilityFilter, setVisibilityFilter] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [deleteDialog, setDeleteDialog] = useState<{
    visible: boolean;
    product: Product | null;
  }>({
    visible: false,
    product: null
  });

  // Get min and max prices from products
  const minPrice = Math.min(...products.map(p => p.price));
  const maxPrice = Math.max(...products.map(p => p.price));

  // Initialize price range only once when component mounts
  const currentPriceRange = priceRange || [minPrice, maxPrice];

  // Status options for dropdown - only specific options, no "All"
  const statusOptions = [
    { label: "In Stock", value: "In Stock" },
    { label: "Out of Stock", value: "Out of Stock" }
  ];

  const visibilityOptions = [
    { label: "Visible", value: "VISIBLE" },
    { label: "Hidden", value: "HIDDEN" }
  ];

  // Filter products based on all filters
  const filteredProducts = products.filter(product => {
    // Global search filter - matches if no filter or name contains search term
    const matchesGlobal = !globalFilter || product.name.toLowerCase().includes(globalFilter.toLowerCase());
    
    // Status filter - shows all if empty string, otherwise matches specific status
    const matchesStatus = !statusFilter || product.status === statusFilter;
    
    // Visibility filter - shows all if empty string, otherwise matches specific visibility
    let matchesVisibility = true;
    if (!visibilityFilter) {
      matchesVisibility = true; // Show both visible and hidden (default behavior)
    } else if (visibilityFilter === "VISIBLE") {
      matchesVisibility = product.isVisible === true;
    } else if (visibilityFilter === "HIDDEN") {
      matchesVisibility = product.isVisible === false;
    }
    
    // Price range filter - only applies if price range has been set
    const matchesPrice = !priceRange || (product.price >= currentPriceRange[0] && product.price <= currentPriceRange[1]);
    
    return matchesGlobal && matchesStatus && matchesVisibility && matchesPrice;
  });

  const handleDeleteClick = (product: Product) => {
    setDeleteDialog({
      visible: true,
      product: product
    });
  };

  const handleDeleteConfirm = async () => {
    if (deleteDialog.product) {
      await onDelete(deleteDialog.product.id);
      setDeleteDialog({
        visible: false,
        product: null
      });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({
      visible: false,
      product: null
    });
  };

  const actionTemplate = (rowData: Product) => (
    <div className="flex gap-1">
      <Button
        icon="pi pi-eye"
        rounded
        text
        size="small"
        severity="info"
        onClick={() => onView(rowData)}
        tooltip="View Details"
        tooltipOptions={{ position: "top" }}
        className="hover:bg-blue-50"
      />
      <Button
        icon="pi pi-pencil"
        rounded
        text
        size="small"
        severity="warning"
        onClick={() => onEdit(rowData)}
        tooltip="Edit Product"
        tooltipOptions={{ position: "top" }}
        className="hover:bg-yellow-50"
      />
      <Button
        icon="pi pi-trash"
        rounded
        text
        size="small"
        severity="danger"
        onClick={() => handleDeleteClick(rowData)}
        tooltip="Delete Product"
        tooltipOptions={{ position: "top" }}
        className="hover:bg-red-50"
      />
    </div>
  );

  const handleImageError = useCallback((productId: string) => {
    setImageErrors(prev => new Set([...prev, productId]));
  }, []);

  const handleStatusChange = (value: string | null) => {
    const newValue = value || "";
    console.log("Status changed from", statusFilter, "to", newValue);
    setStatusFilter(newValue);
  };

  const handleVisibilityChange = (value: string | null) => {
    const newValue = value || "";
    console.log("Visibility changed from", visibilityFilter, "to", newValue);
    setVisibilityFilter(newValue);
  };

  const handleSearchChange = (value: string) => {
    console.log("Search changed from", globalFilter, "to", value);
    setGlobalFilter(value);
  };

  const imageTemplate = (rowData: Product) => {
    const hasError = imageErrors.has(rowData.id);
    
    if (hasError) {
      return (
        <div className="flex justify-center items-center w-[50px] h-[50px] bg-gray-200 rounded-lg border border-gray-300">
          <i className="pi pi-image text-gray-400 text-xl"></i>
        </div>
      );
    }

    return (
      <div className="flex justify-center">
        <Image
          src={rowData.image}
          alt={rowData.name}
          width={50}
          height={50}
          className="rounded-lg object-cover shadow-sm border border-gray-200"
          onError={() => handleImageError(rowData.id)}
          unoptimized={true}
        />
      </div>
    );
  };

  const priceTemplate = (rowData: Product) => (
    <div className="font-semibold text-green-600">
      {rowData.price.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      })}
    </div>
  );

  const nameTemplate = (rowData: Product) => (
    <div className="font-medium text-gray-800">
      {rowData.name}
    </div>
  );

  const statusTemplate = (rowData: Product) => {
    const getSeverity = (status: string) => {
      switch (status.toLowerCase()) {
        case "active": return "success";
        case "inactive": return "danger";
        case "pending": return "warning";
        case "draft": return "info";
        default: return "secondary";
      }
    };

    return (
      <Tag 
        value={rowData.status} 
        severity={getSeverity(rowData.status)}
        className="text-xs px-2 py-1"
      />
    );
  };

  const excerptTemplate = (rowData: Product) => (
    <div className="text-gray-600 text-sm leading-relaxed">
      {rowData.excerpt.length > 60
        ? rowData.excerpt.substring(0, 60) + "..."
        : rowData.excerpt}
    </div>
  );

  const visibilityTemplate = (rowData: Product) => (
    <div className="flex justify-center">
      {rowData.isVisible ? (
        <Badge value="Visible" severity="success" className="text-xs" />
      ) : (
        <Badge value="Hidden" severity="danger" className="text-xs" />
      )}
    </div>
  );

  const clearFilters = () => {
    setGlobalFilter("");
    setStatusFilter("");
    setVisibilityFilter("");
    setPriceRange(null);
  };

  const activeFiltersCount = [
    globalFilter && globalFilter.trim() !== "",
    statusFilter && statusFilter !== "",
    visibilityFilter && visibilityFilter !== "",
    priceRange !== null
  ].filter(Boolean).length;

  // Debug logging for filter states
  console.log("Current filter states:", {
    globalFilter: globalFilter,
    statusFilter: statusFilter,
    visibilityFilter: visibilityFilter,
    priceRange: priceRange,
    activeFiltersCount: activeFiltersCount
  });

  return (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">Products</h2>
            <p className="text-gray-600 text-sm">
              Manage your product inventory ({filteredProducts.length} of {products.length} products)
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              icon={`pi pi-filter${activeFiltersCount > 0 ? '-fill' : ''}`}
              label={showFilters ? "Hide Filters" : "Show Filters"}
              severity={showFilters ? "secondary" : "info"}
              outlined={!showFilters}
              onClick={() => setShowFilters(!showFilters)}
              badge={activeFiltersCount > 0 ? activeFiltersCount.toString() : undefined}
              badgeClassName="bg-blue-500"
            />
            {activeFiltersCount > 0 && (
              <Button
                icon="pi pi-times"
                label="Clear"
                severity="danger"
                outlined
                onClick={clearFilters}
              />
            )}
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <Card className="mb-6 bg-gray-50 border border-gray-200">
            <div className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Search Filter */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Search Products
                  </label>
                  <span className="p-input-icon-left w-full">
                    <i className="pi pi-search" />
                    <InputText
                      placeholder="Search by name..."
                      value={globalFilter}
                      onChange={(e) => handleSearchChange(e.target.value)}
                      className="w-full"
                    />
                  </span>
                </div>

                {/* Status Filter */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <Dropdown
                    value={statusFilter || null}
                    options={statusOptions}
                    onChange={(e) => handleStatusChange(e.value)}
                    placeholder="Select status"
                    className="w-full"
                    showClear
                    resetFilterOnHide
                  />
                </div>

                {/* Visibility Filter */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Visibility
                  </label>
                  <Dropdown
                    value={visibilityFilter || null}
                    options={visibilityOptions}
                    onChange={(e) => handleVisibilityChange(e.value)}
                    placeholder="Select visibility"
                    className="w-full"
                    showClear
                    resetFilterOnHide
                  />
                </div>

                {/* Price Range Filter */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Price Range: ${currentPriceRange[0]} - ${currentPriceRange[1]}
                  </label>
                  <div className="pt-4 pb-2">
                    <Slider
                      value={currentPriceRange}
                      onChange={(e) => {
                        console.log("Price range changed from", priceRange, "to", e.value);
                        setPriceRange(e.value as [number, number]);
                      }}
                      range
                      min={minPrice}
                      max={maxPrice}
                      step={10}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        <Divider className="mb-4" />

        {/* Data Table */}
        <DataTable
          value={filteredProducts}
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25, 50]}
          scrollable
          className="border border-gray-200 rounded-lg overflow-hidden"
          stripedRows
          emptyMessage={
            <div className="text-center py-8">
              <i className="pi pi-search text-4xl text-gray-400 mb-4"></i>
              <p className="text-gray-600 text-lg mb-2">No products found</p>
              <p className="text-gray-400 text-sm">
                Try adjusting your filters or search terms
              </p>
            </div>
          }
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
        >
          <Column 
            header="Image" 
            body={imageTemplate} 
            style={{ width: "80px" }}
            className="text-center"
          />
          <Column 
            field="name" 
            header="Product Name" 
            body={nameTemplate}
            sortable 
            className="min-w-[200px]"
          />
          <Column 
            field="price" 
            header="Price" 
            body={priceTemplate} 
            sortable 
            className="min-w-[120px]"
          />
          <Column 
            field="status" 
            header="Status" 
            body={statusTemplate}
            className="min-w-[100px]"
          />
          <Column 
            field="excerpt" 
            header="Description" 
            body={excerptTemplate}
            className="min-w-[250px]"
          />
          <Column
            field="isVisible"
            header="Visibility"
            body={visibilityTemplate}
            className="text-center min-w-[100px]"
          />
          <Column 
            header="Actions" 
            body={actionTemplate}
            className="text-center min-w-[120px]"
          />
        </DataTable>

        {/* Delete Confirmation Dialog */}
        <ConfirmationDialog
          visible={deleteDialog.visible}
          onHide={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
          title="Delete Product"
          message={
            deleteDialog.product
              ? `Are you sure you want to delete "${deleteDialog.product.name}"? This action cannot be undone.`
              : "Are you sure you want to delete this product?"
          }
          confirmLabel="Delete"
          cancelLabel="Cancel"
          severity="danger"
          icon="pi pi-trash"
        />
      </div>
    </Card>
  );
}