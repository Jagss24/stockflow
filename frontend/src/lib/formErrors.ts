// src/lib/formErrors.ts
import { ApiErrorResponse } from "@/types/react-query";
import { isAxiosError } from "axios";
import { FieldValues, Path, UseFormSetError } from "react-hook-form";

export const setApiFormErrors = <TForm extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<TForm>,
) => {
  if (!isAxiosError<ApiErrorResponse>(error)) return;

  error.response?.data.errors?.forEach((fieldError) => {
    setError(fieldError.field as Path<TForm>, {
      type: "server",
      message: fieldError.message,
    });
  });
};
