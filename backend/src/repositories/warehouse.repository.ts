import { prisma } from "../lib/prisma.js";
import { Prisma } from "../generated/prisma/client.js";
import {
  createPaginationMeta,
  parseBooleanQueryFilter,
} from "../utils/api-query.js";
import {
  TCreateWarehouseData,
  TUpdateWarehouseData,
  TWarehouseListQuery,
} from "../types/warehouse.type.js";

const findWarehouses = async (query: TWarehouseListQuery) => {
  const { filters, page, limit, search } = query;
  const where: Prisma.WarehouseWhereInput = {};

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { code: { contains: search, mode: "insensitive" } },
      { city: { contains: search, mode: "insensitive" } },
      { state: { contains: search, mode: "insensitive" } },
    ];
  }

  if (filters.name) {
    where.name = { contains: filters.name, mode: "insensitive" };
  }

  if (filters.code) {
    where.code = { contains: filters.code, mode: "insensitive" };
  }

  if (filters.city) {
    where.city = { contains: filters.city, mode: "insensitive" };
  }

  if (filters.state) {
    where.state = { contains: filters.state, mode: "insensitive" };
  }

  if (filters.isActive) {
    where.isActive = parseBooleanQueryFilter({
      value: filters.isActive,
      field: "filter.isActive",
    });
  }

  const [warehouses, total] = await prisma.$transaction([
    prisma.warehouse.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { updatedAt: "desc" },
    }),
    prisma.warehouse.count({ where }),
  ]);

  return {
    data: warehouses,
    meta: createPaginationMeta({ page, limit, total }),
  };
};

const findWarehouseById = async (id: number) => {
  const warehouse = await prisma.warehouse.findUnique({
    where: { id },
  });

  return warehouse;
};

const findWarehouseByCode = async (code: string) => {
  const warehouse = await prisma.warehouse.findUnique({
    where: { code },
  });

  return warehouse;
};

const createWarehouse = async (data: TCreateWarehouseData) => {
  const warehouse = await prisma.warehouse.create({
    data,
  });

  return warehouse;
};

const updateWarehouseById = async (id: number, data: TUpdateWarehouseData) => {
  const warehouse = await prisma.warehouse.update({
    where: { id },
    data,
  });

  return warehouse;
};

const deleteWarehouseById = async (id: number) => {
  const warehouse = await prisma.warehouse.delete({
    where: { id },
  });

  return warehouse;
};

export {
  findWarehouses,
  findWarehouseById,
  findWarehouseByCode,
  createWarehouse,
  updateWarehouseById,
  deleteWarehouseById,
};
