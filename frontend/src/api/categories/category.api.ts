import { API_ENDPOINTS } from "@/constants/api";
import {
  handleDeleteRequest,
  handleGetRequest,
  handlePatchRequest,
  handlePostRequest,
  IGetRequestAPIParams,
} from "@/lib/httpMethods";
import { IApiResponse, IPaginatedResponse } from "../api-types";
import {
  ICategoryResponseSchema,
  TCategoryMutationPayload,
  TCategoryStatsResponse,
  TCategoryStatsGroupBy,
} from "./category-api.types";

const getCategoriesApi = ({
  params,
  signal,
}: {
  params: IGetRequestAPIParams["searchParams"];
  signal?: AbortSignal;
}) =>
  handleGetRequest<IPaginatedResponse<ICategoryResponseSchema>>({
    url: API_ENDPOINTS.categories.list,
    searchParams: params,
    signal,
  });

const getCategoryApi = ({
  id,
  params,
  signal,
}: {
  id: string;
  params: IGetRequestAPIParams["searchParams"];
  signal?: AbortSignal;
}) =>
  handleGetRequest<IApiResponse<ICategoryResponseSchema>>({
    url: API_ENDPOINTS.categories.single(id),
    searchParams: params,
    signal,
  });

const getCategoryStatsApi = <TGroupBy extends TCategoryStatsGroupBy>({
  groupBy,
  signal,
}: {
  groupBy: TGroupBy;
  signal?: AbortSignal;
}) =>
  handleGetRequest<TCategoryStatsResponse<TGroupBy>>({
    url: API_ENDPOINTS.categories.stats,
    searchParams: { groupBy },
    signal,
  });

const createCategoryApi = (payload: TCategoryMutationPayload) =>
  handlePostRequest<IApiResponse<ICategoryResponseSchema>>({
    url: API_ENDPOINTS.categories.list,
    payload,
  });

const updateCategoryApi = ({
  id,
  payload,
}: {
  id: number;
  payload: Partial<TCategoryMutationPayload>;
}) =>
  handlePatchRequest<IApiResponse<ICategoryResponseSchema>>({
    url: API_ENDPOINTS.categories.single(String(id)),
    payload,
  });

const deleteCategoryApi = (id: number) =>
  handleDeleteRequest<void>({
    url: API_ENDPOINTS.categories.single(String(id)),
  });

export {
  getCategoriesApi,
  getCategoryApi,
  getCategoryStatsApi,
  createCategoryApi,
  updateCategoryApi,
  deleteCategoryApi,
};
