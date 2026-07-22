type TParsedListQuery<
  TFilterKey extends string,
  TIncludeKey extends string = never,
> = {
  page: number;
  limit: number;
  search?: string;
  filters: Partial<Record<TFilterKey, string>>;
  includes: TIncludeKey[];
};

type TListQueryConfig<
  TFilterKey extends string,
  TIncludeKey extends string = never,
> = {
  allowedFilters: readonly TFilterKey[];
  allowedIncludes: readonly TIncludeKey[];
  defaultPage?: number;
  defaultLimit?: number;
  maxLimit?: number;
};

type TPaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

type TPaginatedResult<TData> = {
  data: TData[];
  meta: TPaginationMeta;
};

export type {
  TParsedListQuery,
  TListQueryConfig,
  TPaginationMeta,
  TPaginatedResult,
};
