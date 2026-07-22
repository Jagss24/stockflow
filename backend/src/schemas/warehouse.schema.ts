import { z } from "zod";

const warehouseIdSchema = z.object({
  id: z.coerce
    .number({ error: "Warehouse id is required" })
    .int("Warehouse id must be an integer")
    .positive("Warehouse id must be positive"),
});

const createWarehouseSchema = z.object({
  name: z
    .string({ error: "Warehouse name is required" })
    .trim()
    .min(1, "Warehouse name is required"),
  code: z
    .string({ error: "Warehouse code is required" })
    .trim()
    .min(1, "Warehouse code is required")
    .transform((value) => value.toUpperCase()),
  address: z.string().trim().min(1, "Address cannot be empty").optional(),
  city: z
    .string({ error: "City is required" })
    .trim()
    .min(1, "City is required"),
  state: z.string().trim().min(1, "State cannot be empty").optional(),
  isActive: z.boolean().optional(),
});

const updateWarehouseSchema = createWarehouseSchema
  .partial()
  .refine(
    (data) => Object.keys(data).length > 0,
    "At least one warehouse field is required",
  );

type TWarehouseIdParams = z.infer<typeof warehouseIdSchema>;
type TCreateWarehouseBody = z.infer<typeof createWarehouseSchema>;
type TUpdateWarehouseBody = z.infer<typeof updateWarehouseSchema>;

export { warehouseIdSchema, createWarehouseSchema, updateWarehouseSchema };
export type { TWarehouseIdParams, TCreateWarehouseBody, TUpdateWarehouseBody };
