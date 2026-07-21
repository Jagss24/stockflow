import { api } from "./axios";
import { createSearchParams } from "react-router";

interface IGetRequestAPIParams {
  url: string;
  searchParams?: Record<string, string | number | boolean>;
  signal?: AbortSignal;
}
/* ---------------- GET ---------------- */
const handleGetRequest = async <TResponse>({
  url,
  searchParams,
  signal,
}: IGetRequestAPIParams): Promise<TResponse> => {
  const query = searchParams
    ? `${url}?${createSearchParams(Object.entries(searchParams).reduce((acc, [k, v]) => ({ ...acc, [k]: String(v) }), {}))}`
    : url;

  const config = signal ? { signal } : {};
  const response = await api.get(query, config);
  return response.data;
};

/* ---------------- POST ---------------- */
const handlePostRequest = async <TResponse, TRequest = unknown>({
  url,
  payload,
  responseType = "json",
}: {
  url: string;
  payload?: TRequest;
  responseType?: "json" | "blob";
}): Promise<TResponse> => {
  const response = await api.post(url, payload ?? {}, {
    responseType,
  });
  return response.data;
};

/* ---------------- PUT ---------------- */
const handlePutRequest = async <TResponse, TRequest = unknown>({
  url,
  payload,
  responseType,
}: {
  url: string;
  payload?: TRequest;
  responseType?: "json" | "blob";
}): Promise<TResponse> => {
  const response = await api.put(url, payload, {
    responseType,
  });
  return response.data;
};

/* ---------------- PATCH ---------------- */
const handlePatchRequest = async <TResponse, TRequest = unknown>({
  url,
  payload,
  responseType,
}: {
  url: string;
  payload?: TRequest;
  responseType?: "json" | "blob";
}): Promise<TResponse> => {
  const response = await api.patch(url, payload, {
    responseType,
  });
  return response.data;
};

/* ---------------- DELETE ---------------- */
const handleDeleteRequest = async <TResponse, TRequest = unknown>({
  url,
  data,
}: {
  url: string;
  data?: TRequest;
}): Promise<TResponse> => {
  const response = await api.delete<TResponse>(url, { data });
  return response.data;
};

export {
  handleGetRequest,
  handlePostRequest,
  handlePutRequest,
  handlePatchRequest,
  handleDeleteRequest,
};

export type { IGetRequestAPIParams };
