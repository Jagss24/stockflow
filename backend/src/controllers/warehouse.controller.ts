import { getValidatedParams } from "../helpers/validate-params.js";
import {
  TCreateWarehouseBody,
  TUpdateWarehouseBody,
  TWarehouseIdParams,
} from "../schemas/warehouse.schema.js";
import {
  createNewWarehouse,
  deleteExistingWarehouse,
  getAllWarehouses,
  getWarehouseById,
  updateExistingWarehouse,
} from "../services/warehouse.service.js";
import { asyncHandler } from "../utils/async-handler.js";

const getWarehouses = asyncHandler(async (_req, res) => {
  const warehouses = await getAllWarehouses();
  return res.status(200).json({ data: warehouses, success: true });
});

const getWarehouse = asyncHandler(async (req, res) => {
  const { id } = getValidatedParams<TWarehouseIdParams>(req);
  const warehouse = await getWarehouseById(id);
  return res.status(200).json({ data: warehouse, success: true });
});

const createWarehouse = asyncHandler<TCreateWarehouseBody>(async (req, res) => {
  const warehouse = await createNewWarehouse(req.body);
  return res.status(201).json({ data: warehouse, success: true });
});

const updateWarehouse = asyncHandler<TUpdateWarehouseBody>(async (req, res) => {
  const warehouse = await updateExistingWarehouse(
    Number(req.params.id),
    req.body,
  );
  return res.status(200).json({ data: warehouse, success: true });
});

const deleteWarehouse = asyncHandler(async (req, res) => {
  const warehouse = await deleteExistingWarehouse(Number(req.params.id));
  return res.status(200).json({ data: warehouse, success: true });
});

export {
  getWarehouses,
  getWarehouse,
  createWarehouse,
  updateWarehouse,
  deleteWarehouse,
};
