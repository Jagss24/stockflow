import { getValidatedParams } from "../helpers/validate-params.js";
import { getValidatedQuery } from "../helpers/validate-query.js";
import {
  customerListQueryConfig,
  TCreateCustomerBody,
  TCustomerIdParams,
  TCustomerStatsQuery,
  TUpdateCustomerBody,
} from "../schemas/customer.schema.js";
import {
  createNewCustomer,
  deleteExistingCustomer,
  getAllCustomers,
  getCustomerById,
  getCustomerStats,
  updateExistingCustomer,
} from "../services/customer.service.js";
import { parseListQuery } from "../utils/api-query.js";
import { asyncHandler } from "../utils/async-handler.js";

const getCustomers = asyncHandler(async (req, res) => {
  const query = parseListQuery({
    query: req.query,
    config: customerListQueryConfig,
  });

  const customers = await getAllCustomers(query);
  return res.status(200).json({
    data: customers.data,
    meta: customers.meta,
    success: true,
  });
});

const getCustomer = asyncHandler(async (req, res) => {
  const { id } = getValidatedParams<TCustomerIdParams>(req);
  const customer = await getCustomerById(id);
  return res.status(200).json({ data: customer, success: true });
});

const getCustomersStats = asyncHandler(async (req, res) => {
  const { groupBy } = getValidatedQuery<TCustomerStatsQuery>(req);
  const stats = await getCustomerStats(groupBy);

  return res.status(200).json({ data: stats, success: true });
});

const createCustomer = asyncHandler<TCreateCustomerBody>(async (req, res) => {
  const customer = await createNewCustomer(req.body);
  return res.status(201).json({ data: customer, success: true });
});

const updateCustomer = asyncHandler<TUpdateCustomerBody>(async (req, res) => {
  const { id } = getValidatedParams<TCustomerIdParams>(req);
  const customer = await updateExistingCustomer(id, req.body);
  return res.status(200).json({ data: customer, success: true });
});

const deleteCustomer = asyncHandler(async (req, res) => {
  const { id } = getValidatedParams<TCustomerIdParams>(req);
  await deleteExistingCustomer(id);
  return res.status(204).json({ success: true });
});

export {
  getCustomers,
  getCustomer,
  getCustomersStats,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
