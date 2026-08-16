import { getValidatedParams } from "../helpers/validate-params.js";
import { getValidatedQuery } from "../helpers/validate-query.js";
import {
  TCreateWarehouseBody,
  TUpdateWarehouseBody,
  TWarehouseIdParams,
  TWarehouseStatsQuery,
  warehouseListQueryConfig,
} from "../schemas/warehouse.schema.js";
import {
  createNewWarehouse,
  deleteExistingWarehouse,
  getAllWarehouses,
  getWarehouseById,
  getWarehouseStats,
  updateExistingWarehouse,
} from "../services/warehouse.service.js";
import { parseListQuery } from "../utils/api-query.js";
import { asyncHandler } from "../utils/async-handler.js";

const getWarehouses = asyncHandler(async (req, res) => {
  const query = parseListQuery({
    query: req.query,
    config: warehouseListQueryConfig,
  });

  const warehouses = await getAllWarehouses(query);
  return res.status(200).json({
    data: warehouses.data,
    meta: warehouses.meta,
    success: true,
  });
});

const getWarehousesStats = asyncHandler(async (req, res) => {
  const { groupBy } = getValidatedQuery<TWarehouseStatsQuery>(req);
  const stats = await getWarehouseStats(groupBy);

  return res.status(200).json({ data: stats, success: true });
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
  const { id } = getValidatedParams<TWarehouseIdParams>(req);
  const warehouse = await updateExistingWarehouse(id, req.body);
  return res.status(200).json({ data: warehouse, success: true });
});

const deleteWarehouse = asyncHandler(async (req, res) => {
  const { id } = getValidatedParams<TWarehouseIdParams>(req);
  await deleteExistingWarehouse(id);
  return res.status(204).json({ success: true });
});

export {
  getWarehouses,
  getWarehousesStats,
  getWarehouse,
  createWarehouse,
  updateWarehouse,
  deleteWarehouse,
};
