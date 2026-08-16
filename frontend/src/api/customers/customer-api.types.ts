import type {
  IApiResponse,
  IGroupedStats,
  IPaginatedResponse,
} from "../api-types";

type ICustomerResponseSchema = {
  id: number;
  businessName: string;
  contactPersonName: string;
  email: string | null;
  phone: string;
  billingAddress: string;
  shippingAddress: string;
  city: string;
  state: string | null;
  gstNumber: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

type ICustomerListResponse = IPaginatedResponse<ICustomerResponseSchema>;

type TCustomerMutationPayload = {
  businessName: string;
  contactPersonName: string;
  email?: string;
  phone: string;
  billingAddress: string;
  shippingAddress: string;
  city: string;
  state?: string;
  gstNumber?: string;
  isActive: boolean;
};

type TCustomerStatsGroupBy = "isActive";

type TCustomerStatsResponse = IApiResponse<
  IGroupedStats<"customers", TCustomerStatsGroupBy, boolean>
>;

interface ICustomerFiltersSchema {
  businessName: string;
  contactPersonName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  gstNumber: string;
  isActive: "true" | "false";
}

export type {
  ICustomerFiltersSchema,
  ICustomerListResponse,
  ICustomerResponseSchema,
  TCustomerMutationPayload,
  TCustomerStatsGroupBy,
  TCustomerStatsResponse,
};
