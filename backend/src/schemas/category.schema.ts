import { z } from "zod";
import { TListQueryConfig } from "../types/api-query.type.js";
import {
  TCategoryFilterKey,
  TCategoryIncludeKey,
} from "../types/category.type.js";

const categoryIdSchema = z.object({
  id: z.coerce
    .number({ error: "Category id is required" })
    .int("Category id must be an integer")
    .positive("Category id must be positive"),
});

const createCategorySchema = z.object({
  name: z
    .string({ error: "Category name is required" })
    .trim()
    .min(1, "Category name is required"),
  description: z
    .string()
    .trim()
    .min(1, "Description cannot be empty")
    .optional(),
  isActive: z.boolean().optional(),
});

const updateCategorySchema = createCategorySchema
  .partial()
  .refine(
    (data) => Object.keys(data).length > 0,
    "At least one category field is required",
  );

const categoryListQueryConfig: TListQueryConfig<
  TCategoryFilterKey,
  TCategoryIncludeKey
> = {
  allowedFilters: ["name", "description", "isActive"],
  allowedIncludes: [],
};

type TCategoryIdParams = z.infer<typeof categoryIdSchema>;
type TCreateCategoryBody = z.infer<typeof createCategorySchema>;
type TUpdateCategoryBody = z.infer<typeof updateCategorySchema>;

export {
  categoryIdSchema,
  createCategorySchema,
  updateCategorySchema,
  categoryListQueryConfig,
};
export type { TCategoryIdParams, TCreateCategoryBody, TUpdateCategoryBody };
