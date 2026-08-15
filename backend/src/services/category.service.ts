import { ConflictError, NotFoundError } from "../errors/app-error.js";
import {
  createCategory,
  deleteCategoryById,
  findCategories,
  findCategoryStats,
  findCategoryById,
  findCategoryByName,
  updateCategoryById,
} from "../repositories/category.repository.js";
import {
  TCreateCategoryBody,
  TUpdateCategoryBody,
} from "../schemas/category.schema.js";
import {
  TCategoryListQuery,
  TCategoryStatsGroupBy,
} from "../types/category.type.js";
import { createGroupedStats } from "../utils/grouped-stats.js";

const getAllCategories = async (query: TCategoryListQuery) => {
  const categories = await findCategories(query);
  return categories;
};

const getCategoryStats = async (groupBy: TCategoryStatsGroupBy) => {
  const groups = await findCategoryStats(groupBy);

  return createGroupedStats({
    resource: "categories",
    groupBy,
    groups,
    expectedValues: [true, false],
  });
};

const getCategoryById = async (id: number) => {
  const category = await findCategoryById(id);

  if (!category) {
    throw new NotFoundError("Category not found");
  }

  return category;
};

const createNewCategory = async (body: TCreateCategoryBody) => {
  const existingCategory = await findCategoryByName(body.name);

  if (existingCategory) {
    throw new ConflictError("Category name already exists");
  }

  const category = await createCategory({
    name: body.name,
    description: body.description ?? null,
    isActive: body.isActive ?? true,
  });

  return category;
};

const updateExistingCategory = async (
  id: number,
  body: TUpdateCategoryBody,
) => {
  const category = await findCategoryById(id);

  if (!category) {
    throw new NotFoundError("Category not found");
  }

  if (body.name) {
    const categoryWithSameName = await findCategoryByName(body.name);

    if (categoryWithSameName && categoryWithSameName.id !== id) {
      throw new ConflictError("Category name already exists");
    }
  }

  const updatedCategory = await updateCategoryById(id, body);
  return updatedCategory;
};

const deleteExistingCategory = async (id: number) => {
  const category = await findCategoryById(id);

  if (!category) {
    throw new NotFoundError("Category not found");
  }

  await deleteCategoryById(id);
};

export {
  getAllCategories,
  getCategoryStats,
  getCategoryById,
  createNewCategory,
  updateExistingCategory,
  deleteExistingCategory,
};
