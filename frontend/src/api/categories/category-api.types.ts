import type { IPaginatedResponse } from "../api-types";

type ICategoryResponseSchema = {
  id: number;
  name: string;
  code?: string | null;
  description: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

type ICategoryListResponse = IPaginatedResponse<ICategoryResponseSchema>;

interface ICategoryFiltersSchema {
  name: string;
  description: string;
  isActive: "true" | "false";
}

export type {
  ICategoryResponseSchema,
  ICategoryListResponse,
  ICategoryFiltersSchema,
};
