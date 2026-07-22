import { Prisma } from "../generated/prisma/client.js";
import { prisma } from "../lib/prisma.js";
import {
  createPaginationMeta,
  parseBooleanQueryFilter,
} from "../utils/api-query.js";
import {
  TCreateCustomerData,
  TCustomerListQuery,
  TUpdateCustomerData,
} from "../types/customer.type.js";

const findCustomers = async (query: TCustomerListQuery) => {
  const { filters, page, limit, search } = query;
  const where: Prisma.CustomerWhereInput = {};

  if (search) {
    where.OR = [
      { businessName: { contains: search, mode: "insensitive" } },
      { contactPersonName: { contains: search, mode: "insensitive" } },
      { phone: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
    ];
  }

  if (filters.businessName) {
    where.businessName = {
      contains: filters.businessName,
      mode: "insensitive",
    };
  }

  if (filters.contactPersonName) {
    where.contactPersonName = {
      contains: filters.contactPersonName,
      mode: "insensitive",
    };
  }

  if (filters.email) {
    where.email = { contains: filters.email, mode: "insensitive" };
  }

  if (filters.phone) {
    where.phone = { contains: filters.phone, mode: "insensitive" };
  }

  if (filters.city) {
    where.city = { contains: filters.city, mode: "insensitive" };
  }

  if (filters.state) {
    where.state = { contains: filters.state, mode: "insensitive" };
  }

  if (filters.gstNumber) {
    where.gstNumber = { contains: filters.gstNumber, mode: "insensitive" };
  }

  if (filters.isActive) {
    where.isActive = parseBooleanQueryFilter({
      value: filters.isActive,
      field: "filter.isActive",
    });
  }

  const [customers, total] = await prisma.$transaction([
    prisma.customer.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { updatedAt: "desc" },
    }),
    prisma.customer.count({ where }),
  ]);

  return {
    data: customers,
    meta: createPaginationMeta({ page, limit, total }),
  };
};

const findCustomerById = async (id: number) => {
  const customer = await prisma.customer.findUnique({
    where: { id },
  });

  return customer;
};

const createCustomer = async (data: TCreateCustomerData) => {
  const customer = await prisma.customer.create({
    data,
  });

  return customer;
};

const updateCustomerById = async (id: number, data: TUpdateCustomerData) => {
  const customer = await prisma.customer.update({
    where: { id },
    data,
  });

  return customer;
};

const deleteCustomerById = async (id: number) => {
  const customer = await prisma.customer.delete({
    where: { id },
  });

  return customer;
};

export {
  findCustomers,
  findCustomerById,
  createCustomer,
  updateCustomerById,
  deleteCustomerById,
};
