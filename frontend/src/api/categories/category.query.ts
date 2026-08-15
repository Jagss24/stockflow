import { QUERY_KEYS } from "@/constants/queryKeys";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { ICategoryFiltersSchema } from "./category-api.types";
import { getCategoriesApi } from "./category.api";

interface ICategoriesQueryParams {
  page?: number;
  limit?: number;
  filters?: Partial<ICategoryFiltersSchema>;
  search?: string;
}

const useCategoriesQuery = ({
  page = 1,
  limit = 2,
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

export { useCategoriesQuery };
