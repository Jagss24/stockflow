import { ICurrentUserResponseSchema } from "../user/user-api.types";

type LoginRequest = {
  email: string;
  password: string;
};

type LoginResponse = {
  data: ICurrentUserResponseSchema;
  success: boolean;
};

type LogoutResponse = {
  success: boolean;
};

export type {
  ICurrentUserResponseSchema,
  LoginRequest,
  LoginResponse,
  LogoutResponse,
};
