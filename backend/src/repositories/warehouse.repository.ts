import { prisma } from "../lib/prisma.js";
import {
  TCreateWarehouseData,
  TUpdateWarehouseData,
} from "../types/warehouse.type.js";

const findWarehouses = async () => {
  const warehouses = await prisma.warehouse.findMany({
    orderBy: { createdAt: "desc" },
  });

  return warehouses;
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

const updateWarehouseById = async (
  id: number,
  data: TUpdateWarehouseData,
) => {
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
