import type { IWarehouseResponseSchema } from "@/api/warehouses/warehouse-api.types";
import { useDeleteWarehouseMutation } from "@/api/warehouses/warehouse.mutation";
import {
  useWarehousesQuery,
  useWarehouseStatsQuery,
} from "@/api/warehouses/warehouse.query";
import { useRouteHandler } from "@/hooks/useRouteHandler";
import { handleNetworkError, handleSuccessToast } from "@/lib/toast";
import { useState } from "react";

interface IWarehouseFormDrawerState {
  isOpen: boolean;
  warehouse?: IWarehouseResponseSchema;
}

const useWarehouses = () => {
  const { getSearchParam } = useRouteHandler();
  const deleteWarehouseMutation = useDeleteWarehouseMutation();
  const [formDrawerState, setFormDrawerState] =
    useState<IWarehouseFormDrawerState>({ isOpen: false });
  const [warehouseToDelete, setWarehouseToDelete] =
    useState<IWarehouseResponseSchema>();

  const tableSearch = getSearchParam("t-search", "") ?? "";
  const requestedPage = Number(getSearchParam("page", "1"));
  const page =
    Number.isSafeInteger(requestedPage) && requestedPage > 0
      ? requestedPage
      : 1;

  const warehouseQuery = useWarehousesQuery({ search: tableSearch, page });
  const activeStatsQuery = useWarehouseStatsQuery("isActive");
  const cityStatsQuery = useWarehouseStatsQuery("city");

  const warehouses = warehouseQuery.data?.data ?? [];
  const activeStats = activeStatsQuery.data?.data;
  const cityStats = cityStatsQuery.data?.data;
  const activeWarehouses = activeStats?.groups.find(
    (group) => group.value === true,
  )?.count;

  const openAddDrawer = () => setFormDrawerState({ isOpen: true });
  const openEditDrawer = (warehouse: IWarehouseResponseSchema) =>
    setFormDrawerState({ isOpen: true, warehouse });
  const closeFormDrawer = () => setFormDrawerState({ isOpen: false });

  const openDeleteModal = (warehouse: IWarehouseResponseSchema) =>
    setWarehouseToDelete(warehouse);
  const closeDeleteModal = () => {
    if (!deleteWarehouseMutation.isPending) setWarehouseToDelete(undefined);
  };

  const confirmDeleteWarehouse = async () => {
    if (!warehouseToDelete) return;

    try {
      await deleteWarehouseMutation.mutateAsync(warehouseToDelete.id);
      handleSuccessToast({ message: "Warehouse deleted successfully." });
      setWarehouseToDelete(undefined);
    } catch (error) {
      handleNetworkError(error);
    }
  };

  return {
    tableSearch,
    warehouseQuery: {
      warehouses,
      pagination: warehouseQuery.data?.meta,
      isLoading: warehouseQuery.isLoading,
      isError: warehouseQuery.isError,
      onRefetch: warehouseQuery.refetch,
      isRefetching: warehouseQuery.isRefetching,
    },
    stats: {
      total: activeStats?.total,
      active: activeWarehouses,
      cities: cityStats?.groups.length,
    },
    formDrawer: {
      isOpen: formDrawerState.isOpen,
      warehouse: formDrawerState.warehouse,
      openAdd: openAddDrawer,
      openEdit: openEditDrawer,
      close: closeFormDrawer,
    },
    deleteModal: {
      warehouse: warehouseToDelete,
      open: openDeleteModal,
      close: closeDeleteModal,
      confirm: confirmDeleteWarehouse,
      isDeleting: deleteWarehouseMutation.isPending,
    },
  };
};

export { useWarehouses };
