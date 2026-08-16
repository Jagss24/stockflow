import { Router } from "express";
import {
  createWarehouse,
  deleteWarehouse,
  getWarehouse,
  getWarehouses,
  getWarehousesStats,
  updateWarehouse,
} from "../controllers/warehouse.controller.js";
import {
  validateParams,
  validateQuery,
  validateRequest,
} from "../middlewares/validate-request.middleware.js";
import {
  createWarehouseSchema,
  updateWarehouseSchema,
  warehouseIdSchema,
  warehouseStatsQuerySchema,
} from "../schemas/warehouse.schema.js";

const warehouseRouter = Router();

warehouseRouter.get("/", getWarehouses);
warehouseRouter.get(
  "/stats",
  validateQuery(warehouseStatsQuerySchema),
  getWarehousesStats,
);
warehouseRouter.get("/:id", validateParams(warehouseIdSchema), getWarehouse);
warehouseRouter.post(
  "/",
  validateRequest(createWarehouseSchema),
  createWarehouse,
);
warehouseRouter.patch(
  "/:id",
  validateParams(warehouseIdSchema),
  validateRequest(updateWarehouseSchema),
  updateWarehouse,
);
warehouseRouter.delete(
  "/:id",
  validateParams(warehouseIdSchema),
  deleteWarehouse,
);

export default warehouseRouter;
