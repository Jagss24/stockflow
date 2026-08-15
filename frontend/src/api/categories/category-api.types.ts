import type {
  IApiResponse,
  IGroupedStats,
  IPaginatedResponse,
} from "../api-types";

type ICategoryResponseSchema = {
  id: number;
  name: string;
  code?: string | null;
  description: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

type ICategoryListResponse = IPaginatedResponse<ICategoryResponseSchema>;

type TCategoryMutationPayload = {
  name: string;
  description?: string;
  isActive: boolean;
};

type TCategoryStatsValueMap = {
  isActive: boolean;
};
type TCategoryStatsGroupBy = keyof TCategoryStatsValueMap;

type TCategoryStatsResponse<TGroupBy extends TCategoryStatsGroupBy> =
  IApiResponse<
    IGroupedStats<
      "categories",
      TCategoryStatsGroupBy,
      TCategoryStatsValueMap[TGroupBy]
    >
  >;

interface ICategoryFiltersSchema {
  name: string;
  description: string;
  isActive: "true" | "false";
}

export type {
  ICategoryResponseSchema,
  ICategoryListResponse,
  TCategoryMutationPayload,
  TCategoryStatsResponse,
  ICategoryFiltersSchema,
  TCategoryStatsGroupBy,
};
