import { z } from "zod";

const customerFormSchema = z.object({
  businessName: z.string().trim().min(1, "Business name is required"),
  contactPersonName: z
    .string()
    .trim()
    .min(1, "Contact person name is required"),
  email: z
    .string()
    .trim()
    .email("Enter a valid email address")
    .or(z.literal("")),
  phone: z.string().trim().min(1, "Phone number is required"),
  billingAddress: z.string().trim().min(1, "Billing address is required"),
  shippingAddress: z.string().trim().min(1, "Shipping address is required"),
  city: z.string().trim().min(1, "City is required"),
  state: z.string().trim(),
  gstNumber: z.string().trim(),
  isActive: z.boolean(),
});

type TCustomerFormSchema = z.infer<typeof customerFormSchema>;

export { customerFormSchema };
export type { TCustomerFormSchema };
