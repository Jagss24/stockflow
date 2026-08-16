import { QUERY_KEYS } from "@/constants/queryKeys";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type {
  IWarehouseFiltersSchema,
  TWarehouseStatsGroupBy,
} from "./warehouse-api.types";
import { getWarehousesApi, getWarehouseStatsApi } from "./warehouse.api";

interface IWarehousesQueryParams {
  page?: number;
  limit?: number;
  filters?: Partial<IWarehouseFiltersSchema>;
  search?: string;
}

const useWarehousesQuery = ({
  page = 1,
  limit = 15,
  filters,
  search = "",
}: IWarehousesQueryParams) => {
  const appliedFilters = Object.fromEntries(
    Object.entries(filters ?? {}).map(([key, value]) => [
      `filter[${key}]`,
      value,
    ]),
  );
  const appliedParams = { page, limit, search, ...appliedFilters };

  return useQuery({
    queryKey: [...QUERY_KEYS.warehouses, "list", appliedParams],
    queryFn: ({ signal }) =>
      getWarehousesApi({ params: appliedParams, signal }),
    placeholderData: keepPreviousData,
  });
};

const useWarehouseStatsQuery = <TGroupBy extends TWarehouseStatsGroupBy>(
  groupBy: TGroupBy,
) =>
  useQuery({
    queryKey: [...QUERY_KEYS.warehouses, "stats", groupBy],
    queryFn: ({ signal }) => getWarehouseStatsApi({ groupBy, signal }),
    staleTime: 30_000,
  });

export { useWarehousesQuery, useWarehouseStatsQuery };
