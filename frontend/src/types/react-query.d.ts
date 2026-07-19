// src/types/react-query.d.ts
import "@tanstack/react-query";
import { AxiosError } from "axios";

type ApiFieldError = {
  field: string;
  message: string;
};

type ApiErrorResponse = {
  success: false;
  message: string;
  errors?: ApiFieldError[];
};

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: AxiosError<ApiErrorResponse>;
  }
}

export { ApiErrorResponse };
