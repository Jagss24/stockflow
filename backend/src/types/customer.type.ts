import { Customer } from "../generated/prisma/client.js";
import { TParsedListQuery } from "./api-query.type.js";

type TCreateCustomerData = Pick<
  Customer,
  | "businessName"
  | "contactPersonName"
  | "email"
  | "phone"
  | "billingAddress"
  | "shippingAddress"
  | "city"
  | "state"
  | "gstNumber"
  | "isActive"
>;

type TUpdateCustomerData = Partial<TCreateCustomerData>;

type TCustomerFilterKey =
  | "businessName"
  | "contactPersonName"
  | "email"
  | "phone"
  | "city"
  | "state"
  | "gstNumber"
  | "isActive";
type TCustomerIncludeKey = never;
type TCustomerListQuery = TParsedListQuery<
  TCustomerFilterKey,
  TCustomerIncludeKey
>;

export type {
  Customer as TCustomer,
  TCreateCustomerData,
  TUpdateCustomerData,
  TCustomerFilterKey,
  TCustomerIncludeKey,
  TCustomerListQuery,
};
