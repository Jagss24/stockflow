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

export type { IPaginationMeta, IPaginatedResponse, IApiResponse };
