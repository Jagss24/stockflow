import { Prisma } from "../generated/prisma/client.js";
import { prisma } from "../lib/prisma.js";
import {
  createPaginationMeta,
  parseBooleanQueryFilter,
} from "../utils/api-query.js";
import {
  TCategoryListQuery,
  TCategoryStatsGroupBy,
  TCreateCategoryData,
  TUpdateCategoryData,
} from "../types/category.type.js";

const findCategories = async (query: TCategoryListQuery) => {
  const { filters, page, limit, search } = query;
  const where: Prisma.CategoryWhereInput = {};

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }

  if (filters.name) {
    where.name = { contains: filters.name, mode: "insensitive" };
  }

  if (filters.description) {
    where.description = {
      contains: filters.description,
      mode: "insensitive",
    };
  }

  if (filters.isActive) {
    where.isActive = parseBooleanQueryFilter({
      value: filters.isActive,
      field: "filter.isActive",
    });
  }

  const [categories, total] = await prisma.$transaction([
    prisma.category.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { updatedAt: "desc" },
    }),
    prisma.category.count({ where }),
  ]);

  return {
    data: categories,
    meta: createPaginationMeta({ page, limit, total }),
  };
};

const findCategoryStats = async (groupBy: TCategoryStatsGroupBy) => {
  const groups = await prisma.category.groupBy({
    by: [groupBy],
    _count: { _all: true },
  });

  return groups.map((group) => {
    return { value: group.isActive, count: group._count._all };
  });
};

const findCategoryById = async (id: number) => {
  const category = await prisma.category.findUnique({
    where: { id },
  });

  return category;
};

const findCategoryByName = async (name: string) => {
  const category = await prisma.category.findUnique({
    where: { name },
  });

  return category;
};

const createCategory = async (data: TCreateCategoryData) => {
  const category = await prisma.category.create({
    data,
  });

  return category;
};

const updateCategoryById = async (id: number, data: TUpdateCategoryData) => {
  const category = await prisma.category.update({
    where: { id },
    data,
  });

  return category;
};

const deleteCategoryById = async (id: number) => {
  const category = await prisma.category.delete({
    where: { id },
  });

  return category;
};

export {
  findCategories,
  findCategoryStats,
  findCategoryById,
  findCategoryByName,
  createCategory,
  updateCategoryById,
  deleteCategoryById,
};
