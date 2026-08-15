import { QUERY_KEYS } from "@/constants/queryKeys";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type {
  ICategoryFiltersSchema,
  TCategoryStatsGroupBy,
} from "./category-api.types";
import { getCategoriesApi, getCategoryStatsApi } from "./category.api";

interface ICategoriesQueryParams {
  page?: number;
  limit?: number;
  filters?: Partial<ICategoryFiltersSchema>;
  search?: string;
}

const useCategoriesQuery = ({
  page = 1,
  limit = 15,
  filters,
  search = "",
}: ICategoriesQueryParams) => {
  const appliedfilters = Object.fromEntries(
    Object.entries(filters || {}).map(([k, v]) => [`filter[${k}]`, v]),
  );

  const appliedParams = { page, limit, search, ...appliedfilters };

  return useQuery({
    queryKey: [...QUERY_KEYS.categories, appliedParams],
    queryFn: ({ signal }) =>
      getCategoriesApi({
        params: appliedParams,
        signal,
      }),
    placeholderData: keepPreviousData,
  });
};

const useCategoryStatsQuery = <TGroupBy extends TCategoryStatsGroupBy>(
  groupBy: TGroupBy,
) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.categories, groupBy],
    queryFn: ({ signal }) => getCategoryStatsApi({ groupBy, signal }),
    staleTime: 30_000,
  });
};

export { useCategoriesQuery, useCategoryStatsQuery };
