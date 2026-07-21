import { API_ENDPOINTS } from "@/constants/api";
import { handleGetRequest, IGetRequestAPIParams } from "@/lib/httpMethods";
import { ICurrentUserResponseSchema } from "./user-api.types";

const getCurrentUserApi = (params: Omit<IGetRequestAPIParams, "url">) =>
  handleGetRequest<ICurrentUserResponseSchema>({
    url: API_ENDPOINTS.user.me,
    searchParams: params.searchParams,
    signal: params.signal,
  });

export { getCurrentUserApi };
