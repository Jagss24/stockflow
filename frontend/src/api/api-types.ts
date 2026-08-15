interface IPaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

interface IApiResponse<T> {
  data: T;
}

interface IPaginatedResponse<T> {
  data: T[];
  meta: IPaginationMeta;
}

type TStatsGroupValue = string | number | boolean | null;

interface IGroupedStats<
  TResource extends string,
  TGroupBy extends string,
  TValue extends TStatsGroupValue,
> {
  resource: TResource;
  groupBy: TGroupBy;
  total: number;
  groups: {
    value: TValue;
    count: number;
  }[];
}

export type {
  IPaginationMeta,
  IPaginatedResponse,
  IApiResponse,
  IGroupedStats,
  TStatsGroupValue,
};
