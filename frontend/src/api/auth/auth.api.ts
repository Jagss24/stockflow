import { API_ENDPOINTS } from "@/constants/api";
import { handlePostRequest } from "@/lib/httpMethods";
import {
  LoginRequest,
  LoginResponse,
  LogoutResponse,
} from "./auth-api.types";

const loginUserAPI = (payload: LoginRequest) => {
  return handlePostRequest<LoginResponse, LoginRequest>({
    url: API_ENDPOINTS.auth.login,
    payload,
  });
};

const logoutUserAPI = () =>
  handlePostRequest<LogoutResponse>({
    url: API_ENDPOINTS.auth.logout,
  });

export { loginUserAPI, logoutUserAPI };
