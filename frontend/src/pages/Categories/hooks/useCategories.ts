import type { ICategoryResponseSchema } from "@/api/categories/category-api.types";
import { useDeleteCategoryMutation } from "@/api/categories/category.mutation";
import {
  useCategoriesQuery,
  useCategoryStatsQuery,
} from "@/api/categories/category.query";
import { useRouteHandler } from "@/hooks/useRouteHandler";
import { handleSuccessToast } from "@/lib/toast";
import { useState } from "react";

interface ICategoryFormModalState {
  isOpen: boolean;
  category?: ICategoryResponseSchema;
}

const useCategories = () => {
  const { getSearchParam } = useRouteHandler();
  const deleteCategoryMutation = useDeleteCategoryMutation();
  const [formModalState, setFormModalState] = useState<ICategoryFormModalState>(
    { isOpen: false },
  );
  const [categoryToDelete, setCategoryToDelete] =
    useState<ICategoryResponseSchema>();

  const tableSearch = getSearchParam("t-search", "") ?? "";
  const status = getSearchParam("status", "") ?? "";
  const requestedPage = Number(getSearchParam("page", "1"));
  const page =
    Number.isSafeInteger(requestedPage) && requestedPage > 0
      ? requestedPage
      : 1;

  const categoryQuery = useCategoriesQuery({
    search: tableSearch,
    page,
    filters:
      status === "active"
        ? { isActive: "true" }
        : status === "inactive"
          ? { isActive: "false" }
          : undefined,
  });
  const categoryStatsQuery = useCategoryStatsQuery("isActive");

  const categories = categoryQuery.data?.data ?? [];
  const categoryStats = categoryStatsQuery.data?.data;
  const activeCategories = categoryStats?.groups.find(
    (group) => group.value === true,
  )?.count;
  const inactiveCategories = categoryStats?.groups.find(
    (group) => group.value === false,
  )?.count;

  const openAddModal = () => setFormModalState({ isOpen: true });
  const openEditModal = (category: ICategoryResponseSchema) =>
    setFormModalState({ isOpen: true, category });
  const closeFormModal = () => setFormModalState({ isOpen: false });

  const openDeleteModal = (category: ICategoryResponseSchema) =>
    setCategoryToDelete(category);
  const closeDeleteModal = () => {
    if (!deleteCategoryMutation.isPending) setCategoryToDelete(undefined);
  };

  const confirmDeleteCategory = async () => {
    if (!categoryToDelete) return;

    await deleteCategoryMutation.mutateAsync(categoryToDelete.id);
    handleSuccessToast({ message: "Category deleted successfully." });
    setCategoryToDelete(undefined);
  };

  return {
    tableSearch,
    categoryQuery: {
      categories,
      pagination: categoryQuery.data?.meta,
      isLoading: categoryQuery.isLoading,
      isError: categoryQuery.isError,
      onRefetch: categoryQuery.refetch,
      isRefetching: categoryQuery.isRefetching,
    },
    stats: {
      total: categoryStats?.total,
      active: activeCategories,
      inactive: inactiveCategories,
    },
    formModal: {
      isOpen: formModalState.isOpen,
      category: formModalState.category,
      openAdd: openAddModal,
      openEdit: openEditModal,
      close: closeFormModal,
    },
    deleteModal: {
      category: categoryToDelete,
      open: openDeleteModal,
      close: closeDeleteModal,
      confirm: confirmDeleteCategory,
      isDeleting: deleteCategoryMutation.isPending,
    },
  };
};

export { useCategories };
