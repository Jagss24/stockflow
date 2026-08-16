import { QUERY_KEYS } from "@/constants/queryKeys";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type {
  ICustomerFiltersSchema,
  TCustomerStatsGroupBy,
} from "./customer-api.types";
import { getCustomersApi, getCustomerStatsApi } from "./customer.api";

interface ICustomersQueryParams {
  page?: number;
  limit?: number;
  filters?: Partial<ICustomerFiltersSchema>;
  search?: string;
}

const useCustomersQuery = ({
  page = 1,
  limit = 15,
  filters,
  search = "",
}: ICustomersQueryParams) => {
  const appliedFilters = Object.fromEntries(
    Object.entries(filters ?? {}).map(([key, value]) => [
      `filter[${key}]`,
      value,
    ]),
  );
  const appliedParams = { page, limit, search, ...appliedFilters };

  return useQuery({
    queryKey: [...QUERY_KEYS.customers, appliedParams],
    queryFn: ({ signal }) => getCustomersApi({ params: appliedParams, signal }),
    placeholderData: keepPreviousData,
  });
};

const useCustomerStatsQuery = (groupBy: TCustomerStatsGroupBy) =>
  useQuery({
    queryKey: [...QUERY_KEYS.customers, groupBy],
    queryFn: ({ signal }) => getCustomerStatsApi({ groupBy, signal }),
    staleTime: 30_000,
  });

export { useCustomersQuery, useCustomerStatsQuery };
