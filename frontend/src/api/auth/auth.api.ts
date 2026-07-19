import { API_ENDPOINTS } from "@/constants/api";
import { handlePostRequest } from "@/lib/httpMethods";
import { LoginRequest, LoginResponse } from "./auth-api.types";

const loginUserAPI = (payload: LoginRequest) => {
  return handlePostRequest<LoginResponse, LoginRequest>({
    url: API_ENDPOINTS.auth.login,
    payload,
  });
};

export { loginUserAPI };
