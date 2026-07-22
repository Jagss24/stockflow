import { ConflictError, NotFoundError } from "../errors/app-error.js";
import {
  createWarehouse,
  deleteWarehouseById,
  findWarehouseByCode,
  findWarehouseById,
  findWarehouses,
  updateWarehouseById,
} from "../repositories/warehouse.repository.js";
import {
  TCreateWarehouseBody,
  TUpdateWarehouseBody,
} from "../schemas/warehouse.schema.js";

const getAllWarehouses = async () => {
  const warehouses = await findWarehouses();
  return warehouses;
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
    throw new ConflictError("Warehouse code already exists");
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
      throw new ConflictError("Warehouse code already exists");
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

  const deletedWarehouse = await deleteWarehouseById(id);
  return deletedWarehouse;
};

export {
  getAllWarehouses,
  getWarehouseById,
  createNewWarehouse,
  updateExistingWarehouse,
  deleteExistingWarehouse,
};
