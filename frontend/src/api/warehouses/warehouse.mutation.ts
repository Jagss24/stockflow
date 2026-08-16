import { QUERY_KEYS } from "@/constants/queryKeys";
import { handleNetworkError } from "@/lib/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createWarehouseApi,
  deleteWarehouseApi,
  updateWarehouseApi,
} from "./warehouse.api";

const useInvalidateWarehouses = () => {
  const queryClient = useQueryClient();
  return () =>
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.warehouses });
};

const useCreateWarehouseMutation = () => {
  const invalidateWarehouses = useInvalidateWarehouses();

  return useMutation({
    mutationFn: createWarehouseApi,
    onSuccess: invalidateWarehouses,
    onError: handleNetworkError,
  });
};

const useUpdateWarehouseMutation = () => {
  const invalidateWarehouses = useInvalidateWarehouses();

  return useMutation({
    mutationFn: updateWarehouseApi,
    onSuccess: invalidateWarehouses,
    onError: handleNetworkError,
  });
};

const useDeleteWarehouseMutation = () => {
  const invalidateWarehouses = useInvalidateWarehouses();

  return useMutation({
    mutationFn: deleteWarehouseApi,
    onSuccess: invalidateWarehouses,
    onError: handleNetworkError,
  });
};

export {
  useCreateWarehouseMutation,
  useDeleteWarehouseMutation,
  useUpdateWarehouseMutation,
};
