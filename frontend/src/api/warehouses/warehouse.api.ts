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
  IWarehouseListResponse,
  IWarehouseResponseSchema,
  TWarehouseMutationPayload,
  TWarehouseStatsGroupBy,
  TWarehouseStatsResponse,
} from "./warehouse-api.types";

const getWarehousesApi = ({
  params,
  signal,
}: {
  params: IGetRequestAPIParams["searchParams"];
  signal?: AbortSignal;
}) =>
  handleGetRequest<IWarehouseListResponse>({
    url: API_ENDPOINTS.warehouses.list,
    searchParams: params,
    signal,
  });

const getWarehouseStatsApi = <TGroupBy extends TWarehouseStatsGroupBy>({
  groupBy,
  signal,
}: {
  groupBy: TGroupBy;
  signal?: AbortSignal;
}) =>
  handleGetRequest<TWarehouseStatsResponse<TGroupBy>>({
    url: API_ENDPOINTS.warehouses.stats,
    searchParams: { groupBy },
    signal,
  });

const createWarehouseApi = (payload: TWarehouseMutationPayload) =>
  handlePostRequest<IApiResponse<IWarehouseResponseSchema>>({
    url: API_ENDPOINTS.warehouses.list,
    payload,
  });

const updateWarehouseApi = ({
  id,
  payload,
}: {
  id: number;
  payload: Partial<TWarehouseMutationPayload>;
}) =>
  handlePatchRequest<IApiResponse<IWarehouseResponseSchema>>({
    url: API_ENDPOINTS.warehouses.single(String(id)),
    payload,
  });

const deleteWarehouseApi = (id: number) =>
  handleDeleteRequest<void>({
    url: API_ENDPOINTS.warehouses.single(String(id)),
  });

export {
  createWarehouseApi,
  deleteWarehouseApi,
  getWarehousesApi,
  getWarehouseStatsApi,
  updateWarehouseApi,
};
