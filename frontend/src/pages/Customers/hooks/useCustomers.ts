import type { ICustomerResponseSchema } from "@/api/customers/customer-api.types";
import { useDeleteCustomerMutation } from "@/api/customers/customer.mutation";
import {
  useCustomersQuery,
  useCustomerStatsQuery,
} from "@/api/customers/customer.query";
import { useRouteHandler } from "@/hooks/useRouteHandler";
import { handleSuccessToast } from "@/lib/toast";
import { useState } from "react";

interface ICustomerFormDrawerState {
  isOpen: boolean;
  customer?: ICustomerResponseSchema;
}

const useCustomers = () => {
  const { getSearchParam } = useRouteHandler();
  const deleteCustomerMutation = useDeleteCustomerMutation();
  const [formDrawerState, setFormDrawerState] =
    useState<ICustomerFormDrawerState>({ isOpen: false });
  const [customerToDelete, setCustomerToDelete] =
    useState<ICustomerResponseSchema>();

  const tableSearch = getSearchParam("t-search", "") ?? "";
  const status = getSearchParam("status", "") ?? "";
  const requestedPage = Number(getSearchParam("page", "1"));
  const page =
    Number.isSafeInteger(requestedPage) && requestedPage > 0
      ? requestedPage
      : 1;

  const customersQuery = useCustomersQuery({
    search: tableSearch,
    page,
    filters:
      status === "active"
        ? { isActive: "true" }
        : status === "inactive"
          ? { isActive: "false" }
          : undefined,
  });
  const customerStatsQuery = useCustomerStatsQuery("isActive");

  const customers = customersQuery.data?.data ?? [];
  const customerStats = customerStatsQuery.data?.data;
  const activeCustomers = customerStats?.groups.find(
    (group) => group.value === true,
  )?.count;
  const inactiveCustomers = customerStats?.groups.find(
    (group) => group.value === false,
  )?.count;

  const openAddDrawer = () => setFormDrawerState({ isOpen: true });
  const openEditDrawer = (customer: ICustomerResponseSchema) =>
    setFormDrawerState({ isOpen: true, customer });
  const closeFormDrawer = () => setFormDrawerState({ isOpen: false });

  const openDeleteModal = (customer: ICustomerResponseSchema) =>
    setCustomerToDelete(customer);
  const closeDeleteModal = () => {
    if (!deleteCustomerMutation.isPending) setCustomerToDelete(undefined);
  };

  const confirmDeleteCustomer = async () => {
    if (!customerToDelete) return;

    await deleteCustomerMutation.mutateAsync(customerToDelete.id);
    handleSuccessToast({ message: "Customer deleted successfully." });
    setCustomerToDelete(undefined);
  };

  return {
    tableSearch,
    customerQuery: {
      customers,
      pagination: customersQuery.data?.meta,
      isLoading: customersQuery.isLoading,
      isError: customersQuery.isError,
      onRefetch: customersQuery.refetch,
      isRefetching: customersQuery.isRefetching,
    },
    stats: {
      total: customerStats?.total,
      active: activeCustomers,
      inactive: inactiveCustomers,
    },
    formDrawer: {
      isOpen: formDrawerState.isOpen,
      customer: formDrawerState.customer,
      openAdd: openAddDrawer,
      openEdit: openEditDrawer,
      close: closeFormDrawer,
    },
    deleteModal: {
      customer: customerToDelete,
      open: openDeleteModal,
      close: closeDeleteModal,
      confirm: confirmDeleteCustomer,
      isDeleting: deleteCustomerMutation.isPending,
    },
  };
};

export { useCustomers };
