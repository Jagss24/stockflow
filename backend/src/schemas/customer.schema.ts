import { z } from "zod";
import { TListQueryConfig } from "../types/api-query.type.js";
import {
  TCustomerFilterKey,
  TCustomerIncludeKey,
} from "../types/customer.type.js";

const customerIdSchema = z.object({
  id: z.coerce
    .number({ error: "Customer id is required" })
    .int("Customer id must be an integer")
    .positive("Customer id must be positive"),
});

const createCustomerSchema = z.object({
  businessName: z
    .string({ error: "Business name is required" })
    .trim()
    .min(1, "Business name is required"),
  contactPersonName: z
    .string({ error: "Contact person name is required" })
    .trim()
    .min(1, "Contact person name is required"),
  email: z
    .string()
    .trim()
    .email("Invalid email")
    .optional()
    .or(z.literal("")),
  phone: z
    .string({ error: "Phone is required" })
    .trim()
    .min(1, "Phone is required"),
  billingAddress: z
    .string({ error: "Billing address is required" })
    .trim()
    .min(1, "Billing address is required"),
  shippingAddress: z
    .string({ error: "Shipping address is required" })
    .trim()
    .min(1, "Shipping address is required"),
  city: z
    .string({ error: "City is required" })
    .trim()
    .min(1, "City is required"),
  state: z.string().trim().min(1, "State cannot be empty").optional(),
  gstNumber: z.string().trim().min(1, "GST number cannot be empty").optional(),
  isActive: z.boolean().optional(),
});

const updateCustomerSchema = createCustomerSchema
  .partial()
  .refine(
    (data) => Object.keys(data).length > 0,
    "At least one customer field is required",
  );

const customerListQueryConfig: TListQueryConfig<
  TCustomerFilterKey,
  TCustomerIncludeKey
> = {
  allowedFilters: [
    "businessName",
    "contactPersonName",
    "email",
    "phone",
    "city",
    "state",
    "gstNumber",
    "isActive",
  ],
  allowedIncludes: [],
};

type TCustomerIdParams = z.infer<typeof customerIdSchema>;
type TCreateCustomerBody = z.infer<typeof createCustomerSchema>;
type TUpdateCustomerBody = z.infer<typeof updateCustomerSchema>;

export {
  customerIdSchema,
  createCustomerSchema,
  updateCustomerSchema,
  customerListQueryConfig,
};
export type { TCustomerIdParams, TCreateCustomerBody, TUpdateCustomerBody };
