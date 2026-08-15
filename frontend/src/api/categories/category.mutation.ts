import { QUERY_KEYS } from "@/constants/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createCategoryApi,
  deleteCategoryApi,
  updateCategoryApi,
} from "./category.api";
import { handleNetworkError } from "@/lib/toast";

const useInvalidateCategories = () => {
  const queryClient = useQueryClient();
  return () =>
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.categories });
};

const useCreateCategoryMutation = () => {
  const invalidateCategories = useInvalidateCategories();

  return useMutation({
    mutationFn: createCategoryApi,
    onSuccess: invalidateCategories,
    onError: handleNetworkError,
  });
};

const useUpdateCategoryMutation = () => {
  const invalidateCategories = useInvalidateCategories();

  return useMutation({
    mutationFn: updateCategoryApi,
    onSuccess: invalidateCategories,
    onError: handleNetworkError,
  });
};

const useDeleteCategoryMutation = () => {
  const invalidateCategories = useInvalidateCategories();

  return useMutation({
    mutationFn: deleteCategoryApi,
    onSuccess: invalidateCategories,
    onError: handleNetworkError,
  });
};

export {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
};
