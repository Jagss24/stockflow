import { API_ENDPOINTS } from "@/constants/api";
import {
  handleDeleteRequest,
  handleGetRequest,
  handlePatchRequest,
  handlePostRequest,
  type IGetRequestAPIParams,
} from "@/lib/httpMethods";
import type { IApiResponse } from "../api-types";
import type {
  ICustomerListResponse,
  ICustomerResponseSchema,
  TCustomerMutationPayload,
  TCustomerStatsGroupBy,
  TCustomerStatsResponse,
} from "./customer-api.types";

const getCustomersApi = ({
  params,
  signal,
}: {
  params: IGetRequestAPIParams["searchParams"];
  signal?: AbortSignal;
}) =>
  handleGetRequest<ICustomerListResponse>({
    url: API_ENDPOINTS.customers.list,
    searchParams: params,
    signal,
  });

const getCustomerStatsApi = ({
  groupBy,
  signal,
}: {
  groupBy: TCustomerStatsGroupBy;
  signal?: AbortSignal;
}) =>
  handleGetRequest<TCustomerStatsResponse>({
    url: API_ENDPOINTS.customers.stats,
    searchParams: { groupBy },
    signal,
  });

const createCustomerApi = (payload: TCustomerMutationPayload) =>
  handlePostRequest<IApiResponse<ICustomerResponseSchema>>({
    url: API_ENDPOINTS.customers.list,
    payload,
  });

const updateCustomerApi = ({
  id,
  payload,
}: {
  id: number;
  payload: Partial<TCustomerMutationPayload>;
}) =>
  handlePatchRequest<IApiResponse<ICustomerResponseSchema>>({
    url: API_ENDPOINTS.customers.single(String(id)),
    payload,
  });

const deleteCustomerApi = (id: number) =>
  handleDeleteRequest<void>({
    url: API_ENDPOINTS.customers.single(String(id)),
  });

export {
  createCustomerApi,
  deleteCustomerApi,
  getCustomersApi,
  getCustomerStatsApi,
  updateCustomerApi,
};
