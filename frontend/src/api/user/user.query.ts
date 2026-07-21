import { QUERY_KEYS } from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUserApi } from "./user.api";
import { IGetRequestQueryParams } from "@/types/api.types";

const useGetCurrentUserQuery = ({
  searchParams,
  signal,
  enabled = true,
}: IGetRequestQueryParams) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.user],
    queryFn: () => getCurrentUserApi({ searchParams, signal }),
    enabled: enabled,
  });
};

export { useGetCurrentUserQuery };
