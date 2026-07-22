import { getValidatedParams } from "../helpers/validate-params.js";
import {
  categoryListQueryConfig,
  TCategoryIdParams,
  TCreateCategoryBody,
  TUpdateCategoryBody,
} from "../schemas/category.schema.js";
import {
  createNewCategory,
  deleteExistingCategory,
  getAllCategories,
  getCategoryById,
  updateExistingCategory,
} from "../services/category.service.js";
import { parseListQuery } from "../utils/api-query.js";
import { asyncHandler } from "../utils/async-handler.js";

const getCategories = asyncHandler(async (req, res) => {
  const query = parseListQuery({
    query: req.query,
    config: categoryListQueryConfig,
  });

  const categories = await getAllCategories(query);
  return res.status(200).json({
    data: categories.data,
    meta: categories.meta,
    success: true,
  });
});

const getCategory = asyncHandler(async (req, res) => {
  const { id } = getValidatedParams<TCategoryIdParams>(req);
  const category = await getCategoryById(id);
  return res.status(200).json({ data: category, success: true });
});

const createCategory = asyncHandler<TCreateCategoryBody>(async (req, res) => {
  const category = await createNewCategory(req.body);
  return res.status(201).json({ data: category, success: true });
});

const updateCategory = asyncHandler<TUpdateCategoryBody>(async (req, res) => {
  const { id } = getValidatedParams<TCategoryIdParams>(req);
  const category = await updateExistingCategory(id, req.body);
  return res.status(200).json({ data: category, success: true });
});

const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = getValidatedParams<TCategoryIdParams>(req);
  await deleteExistingCategory(id);
  return res.status(204).json({ success: true });
});

export {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
