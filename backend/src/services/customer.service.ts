import { NotFoundError } from "../errors/app-error.js";
import {
  createCustomer,
  deleteCustomerById,
  findCustomerById,
  findCustomerStats,
  findCustomers,
  updateCustomerById,
} from "../repositories/customer.repository.js";
import {
  TCreateCustomerBody,
  TUpdateCustomerBody,
} from "../schemas/customer.schema.js";
import {
  TCustomerListQuery,
  TCustomerStatsGroupBy,
} from "../types/customer.type.js";
import { createGroupedStats } from "../utils/grouped-stats.js";

const getAllCustomers = async (query: TCustomerListQuery) => {
  const customers = await findCustomers(query);
  return customers;
};

const getCustomerById = async (id: number) => {
  const customer = await findCustomerById(id);

  if (!customer) {
    throw new NotFoundError("Customer not found");
  }

  return customer;
};

const getCustomerStats = async (groupBy: TCustomerStatsGroupBy) => {
  const groups = await findCustomerStats(groupBy);

  return createGroupedStats({
    resource: "customers",
    groupBy,
    groups,
    expectedValues: [true, false],
  });
};

const createNewCustomer = async (body: TCreateCustomerBody) => {
  const customer = await createCustomer({
    businessName: body.businessName,
    contactPersonName: body.contactPersonName,
    email: body.email || null,
    phone: body.phone,
    billingAddress: body.billingAddress,
    shippingAddress: body.shippingAddress,
    city: body.city,
    state: body.state || null,
    gstNumber: body.gstNumber || null,
    isActive: body.isActive ?? true,
  });

  return customer;
};

const updateExistingCustomer = async (
  id: number,
  body: TUpdateCustomerBody,
) => {
  const customer = await findCustomerById(id);

  if (!customer) {
    throw new NotFoundError("Customer not found");
  }

  const updatedCustomer = await updateCustomerById(id, {
    ...body,
    email: body.email === "" ? null : body.email,
    state: body.state === "" ? null : body.state,
    gstNumber: body.gstNumber === "" ? null : body.gstNumber,
  });
  return updatedCustomer;
};

const deleteExistingCustomer = async (id: number) => {
  const customer = await findCustomerById(id);

  if (!customer) {
    throw new NotFoundError("Customer not found");
  }

  await deleteCustomerById(id);
};

export {
  getAllCustomers,
  getCustomerById,
  getCustomerStats,
  createNewCustomer,
  updateExistingCustomer,
  deleteExistingCustomer,
};
