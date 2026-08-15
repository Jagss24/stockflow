import { API_ENDPOINTS } from "@/constants/api";
import { handleGetRequest, IGetRequestAPIParams } from "@/lib/httpMethods";
import { IApiResponse, IPaginatedResponse } from "../api-types";
import { ICategoryResponseSchema } from "./category-api.types";

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

export { getCategoriesApi, getCategoryApi };
