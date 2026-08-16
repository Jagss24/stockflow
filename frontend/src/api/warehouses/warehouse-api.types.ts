import type {
  IApiResponse,
  IGroupedStats,
  IPaginatedResponse,
} from "../api-types";

type IWarehouseResponseSchema = {
  id: number;
  name: string;
  code: string;
  address: string | null;
  city: string;
  state: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

type IWarehouseListResponse = IPaginatedResponse<IWarehouseResponseSchema>;

type TWarehouseMutationPayload = {
  name: string;
  code: string;
  address?: string;
  city: string;
  state?: string;
  isActive: boolean;
};

type TWarehouseStatsValueMap = {
  isActive: boolean;
  city: string;
};

type TWarehouseStatsGroupBy = keyof TWarehouseStatsValueMap;

type TWarehouseStatsResponse<TGroupBy extends TWarehouseStatsGroupBy> =
  IApiResponse<
    IGroupedStats<
      "warehouses",
      TGroupBy,
      TWarehouseStatsValueMap[TGroupBy]
    >
  >;

interface IWarehouseFiltersSchema {
  name: string;
  code: string;
  city: string;
  state: string;
  isActive: "true" | "false";
}

export type {
  IWarehouseFiltersSchema,
  IWarehouseListResponse,
  IWarehouseResponseSchema,
  TWarehouseMutationPayload,
  TWarehouseStatsGroupBy,
  TWarehouseStatsResponse,
};
