import { Router } from "express";
import {
  createCustomer,
  deleteCustomer,
  getCustomer,
  getCustomers,
  getCustomersStats,
  updateCustomer,
} from "../controllers/customer.controller.js";
import {
  validateParams,
  validateQuery,
  validateRequest,
} from "../middlewares/validate-request.middleware.js";
import {
  createCustomerSchema,
  customerIdSchema,
  customerStatsQuerySchema,
  updateCustomerSchema,
} from "../schemas/customer.schema.js";

const customerRouter = Router();

customerRouter.get("/", getCustomers);
customerRouter.get(
  "/stats",
  validateQuery(customerStatsQuerySchema),
  getCustomersStats,
);
customerRouter.get("/:id", validateParams(customerIdSchema), getCustomer);
customerRouter.post("/", validateRequest(createCustomerSchema), createCustomer);
customerRouter.patch(
  "/:id",
  validateParams(customerIdSchema),
  validateRequest(updateCustomerSchema),
  updateCustomer,
);
customerRouter.delete("/:id", validateParams(customerIdSchema), deleteCustomer);

export default customerRouter;
