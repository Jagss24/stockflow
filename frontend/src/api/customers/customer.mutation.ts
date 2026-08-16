import { QUERY_KEYS } from "@/constants/queryKeys";
import { handleNetworkError } from "@/lib/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createCustomerApi,
  deleteCustomerApi,
  updateCustomerApi,
} from "./customer.api";

const useInvalidateCustomers = () => {
  const queryClient = useQueryClient();
  return () =>
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.customers });
};

const useCreateCustomerMutation = () => {
  const invalidateCustomers = useInvalidateCustomers();

  return useMutation({
    mutationFn: createCustomerApi,
    onSuccess: invalidateCustomers,
    onError: handleNetworkError,
  });
};

const useUpdateCustomerMutation = () => {
  const invalidateCustomers = useInvalidateCustomers();

  return useMutation({
    mutationFn: updateCustomerApi,
    onSuccess: invalidateCustomers,
    onError: handleNetworkError,
  });
};

const useDeleteCustomerMutation = () => {
  const invalidateCustomers = useInvalidateCustomers();

  return useMutation({
    mutationFn: deleteCustomerApi,
    onSuccess: invalidateCustomers,
    onError: handleNetworkError,
  });
};

export {
  useCreateCustomerMutation,
  useDeleteCustomerMutation,
  useUpdateCustomerMutation,
};
