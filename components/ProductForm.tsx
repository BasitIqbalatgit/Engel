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
  defaultValues = {},
}: {
  onSubmit: (data: ProductFormData) => void;
  defaultValues?: Partial<ProductFormData>;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <InputText {...register("name")} placeholder="Name" className="w-full" />
        {errors.name && <small className="text-red-500">{errors.name.message}</small>}
      </div>

      <div>
        <InputNumber
          value={watch("price")}
          onValueChange={(e) => setValue("price", e.value || 0)}
          placeholder="Price"
          className="w-full"
        />
        {errors.price && <small className="text-red-500">{errors.price.message}</small>}
      </div>

      <div>
        <InputText {...register("image")} placeholder="Image URL" className="w-full" />
        {errors.image && <small className="text-red-500">{errors.image.message}</small>}
      </div>

      <div>
        <Dropdown
          value={watch("status")}
          options={["In Stock", "Out of Stock"]}
          onChange={(e) => setValue("status", e.value)}
          placeholder="Select Status"
          className="w-full"
        />
        {errors.status && <small className="text-red-500">{errors.status.message}</small>}
      </div>

      <div>
        <InputTextarea {...register("excerpt")} rows={3} placeholder="Excerpt" className="w-full" />
        {errors.excerpt && <small className="text-red-500">{errors.excerpt.message}</small>}
      </div>

      <div className="flex items-center">
        <Checkbox
          checked={watch("isVisible")}
          onChange={(e) => setValue("isVisible", !!e.checked)}
          inputId="visible"
        />
        <label htmlFor="visible" className="ml-2">Visible</label>
      </div>

      <Button type="submit" label="Submit" className="mt-4" />
    </form>
  );
}
