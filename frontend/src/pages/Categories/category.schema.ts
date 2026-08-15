import { z } from "zod";

const categoryFormSchema = z.object({
  name: z.string().trim().min(1, "Category name is required"),
  description: z.string().trim(),
  isActive: z.boolean(),
});

type TCategoryFormSchema = z.infer<typeof categoryFormSchema>;

export { categoryFormSchema };
export type { TCategoryFormSchema };
