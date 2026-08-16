import { z } from "zod";

const warehouseFormSchema = z.object({
  name: z.string().trim().min(1, "Warehouse name is required"),
  code: z.string().trim().min(1, "Warehouse code is required"),
  address: z.string().trim(),
  city: z.string().trim().min(1, "City is required"),
  state: z.string().trim(),
  isActive: z.boolean(),
});

type TWarehouseFormSchema = z.infer<typeof warehouseFormSchema>;

export { warehouseFormSchema };
export type { TWarehouseFormSchema };
