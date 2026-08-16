import { ConflictError, NotFoundError } from "../errors/app-error.js";
import {
  createWarehouse,
  deleteWarehouseById,
  findWarehouseByCode,
  findWarehouseById,
  findWarehouseStats,
  findWarehouses,
  updateWarehouseById,
} from "../repositories/warehouse.repository.js";
import {
  TCreateWarehouseBody,
  TUpdateWarehouseBody,
} from "../schemas/warehouse.schema.js";
import {
  TWarehouseListQuery,
  TWarehouseStatsGroupBy,
} from "../types/warehouse.type.js";
import { createGroupedStats } from "../utils/grouped-stats.js";

const getAllWarehouses = async (query: TWarehouseListQuery) => {
  const warehouses = await findWarehouses(query);
  return warehouses;
};

const getWarehouseStats = async (groupBy: TWarehouseStatsGroupBy) => {
  if (groupBy === "isActive") {
    const groups = await findWarehouseStats(groupBy);

    return createGroupedStats({
      resource: "warehouses",
      groupBy,
      groups,
      expectedValues: [true, false],
    });
  }

  const groups = await findWarehouseStats(groupBy);

  return createGroupedStats({
    resource: "warehouses",
    groupBy,
    groups,
    expectedValues: groups.map((group) => group.value),
  });
};

const getWarehouseById = async (id: number) => {
  const warehouse = await findWarehouseById(id);

  if (!warehouse) {
    throw new NotFoundError("Warehouse not found");
  }

  return warehouse;
};

const createNewWarehouse = async (body: TCreateWarehouseBody) => {
  const existingWarehouse = await findWarehouseByCode(body.code);

  if (existingWarehouse) {
    throw new ConflictError("Warehouse code already exists", [
      { field: "code", message: "Warehouse code already exists" },
    ]);
  }

  const warehouse = await createWarehouse({
    name: body.name,
    code: body.code,
    address: body.address ?? null,
    city: body.city,
    state: body.state ?? null,
    isActive: body.isActive ?? true,
  });

  return warehouse;
};

const updateExistingWarehouse = async (
  id: number,
  body: TUpdateWarehouseBody,
) => {
  const warehouse = await findWarehouseById(id);

  if (!warehouse) {
    throw new NotFoundError("Warehouse not found");
  }

  if (body.code) {
    const warehouseWithSameCode = await findWarehouseByCode(body.code);

    if (warehouseWithSameCode && warehouseWithSameCode.id !== id) {
      throw new ConflictError("Warehouse code already exists", [
        { field: "code", message: "Warehouse code already exists" },
      ]);
    }
  }

  const updatedWarehouse = await updateWarehouseById(id, body);
  return updatedWarehouse;
};

const deleteExistingWarehouse = async (id: number) => {
  const warehouse = await findWarehouseById(id);

  if (!warehouse) {
    throw new NotFoundError("Warehouse not found");
  }

  await deleteWarehouseById(id);
};

export {
  getAllWarehouses,
  getWarehouseStats,
  getWarehouseById,
  createNewWarehouse,
  updateExistingWarehouse,
  deleteExistingWarehouse,
};
