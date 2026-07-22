import { Router } from "express";
import {
  createWarehouse,
  deleteWarehouse,
  getWarehouse,
  getWarehouses,
  updateWarehouse,
} from "../controllers/warehouse.controller.js";
import {
  validateParams,
  validateRequest,
} from "../middlewares/validate-request.middleware.js";
import {
  createWarehouseSchema,
  updateWarehouseSchema,
  warehouseIdSchema,
} from "../schemas/warehouse.schema.js";

const warehouseRouter = Router();

warehouseRouter.get("/", getWarehouses);
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
