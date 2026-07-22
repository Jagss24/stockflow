import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from "../controllers/category.controller.js";
import {
  validateParams,
  validateRequest,
} from "../middlewares/validate-request.middleware.js";
import {
  categoryIdSchema,
  createCategorySchema,
  updateCategorySchema,
} from "../schemas/category.schema.js";

const categoryRouter = Router();

categoryRouter.get("/", getCategories);
categoryRouter.get("/:id", validateParams(categoryIdSchema), getCategory);
categoryRouter.post("/", validateRequest(createCategorySchema), createCategory);
categoryRouter.patch(
  "/:id",
  validateParams(categoryIdSchema),
  validateRequest(updateCategorySchema),
  updateCategory,
);
categoryRouter.delete(
  "/:id",
  validateParams(categoryIdSchema),
  deleteCategory,
);

export default categoryRouter;
