import type { ICustomerResponseSchema } from "@/api/customers/customer-api.types";
import UiBadge from "@/components/ui/Badge/UiBadge";
import UiButton from "@/components/ui/Buttons/UiButton";
import UiSummaryCard from "@/components/ui/Card/UiSummaryCard";
import UiConfirmationModal from "@/components/ui/Modal/UiConfirmationModal";
import UiTable, {
  type TModifiedColumnDef,
} from "@/components/ui/Tables/UiTable";
import { cn } from "@/lib/clsx";
import { formatDate } from "@/utils/date";
import {
  ArchiveX,
  ArrowUpDown,
  Building2,
  CircleCheck,
  Pencil,
  Plus,
  Trash2,
  Users,
} from "lucide-react";
import AddEditCustomers from "./components/AddEditCustomers";
import { useCustomers } from "./hooks/useCustomers";

const CustomersPage = () => {
  const { tableSearch, customerQuery, stats, formDrawer, deleteModal } =
    useCustomers();

  const columns: TModifiedColumnDef<ICustomerResponseSchema>[] = [
    {
      header: () => (
        <span className="inline-flex items-center gap-1">
          Customer <ArrowUpDown className="size-3" aria-hidden="true" />
        </span>
      ),
      accessorKey: "businessName",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
            <Building2 className="size-5" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="max-w-56 truncate font-semibold text-heading">
              {row.original.businessName}
            </p>
            <p className="text-xs text-text-soft">ID #{row.original.id}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Contact",
      accessorKey: "contactPersonName",
      cell: ({ row }) => (
        <div className="min-w-0">
          <p className="font-medium text-heading">
            {row.original.contactPersonName}
          </p>
          <p className="max-w-52 truncate text-xs text-text-soft">
            {row.original.email || "No email provided"}
          </p>
        </div>
      ),
    },
    {
      header: "Phone",
      accessorKey: "phone",
      cell: ({ row }) => (
        <span className="text-text-muted">{row.original.phone}</span>
      ),
    },
    {
      header: "Location",
      accessorKey: "city",
      cell: ({ row }) => (
        <span className="text-text-muted">
          {[row.original.city, row.original.state].filter(Boolean).join(", ")}
        </span>
      ),
    },
    {
      header: "Status",
      accessorKey: "isActive",
      cell: ({ row }) => (
        <UiBadge
          displayUnit={row.original.isActive ? "Active" : "Inactive"}
          className={cn(
            "p-1",
            row.original.isActive
              ? "bg-success-soft text-success"
              : "bg-error-soft text-error",
          )}
        />
      ),
    },
    {
      header: () => (
        <span className="inline-flex items-center gap-1">
          Updated <ArrowUpDown className="size-3" aria-hidden="true" />
        </span>
      ),
      accessorKey: "updatedAt",
      cell: ({ row }) => (
        <span className="text-text-muted">
          {formatDate(row.original.updatedAt, "mediumDate")}
        </span>
      ),
    },
    {
      id: "actions",
      header: () => <span className="block text-right">Actions</span>,
      cell: ({ row }) => (
        <div className="flex justify-end gap-1">
          <button
            type="button"
            aria-label={`Edit ${row.original.businessName}`}
            className="flex size-9 items-center justify-center rounded-lg text-text-muted transition hover:bg-primary-soft hover:text-primary"
            onClick={() => formDrawer.openEdit(row.original)}
          >
            <Pencil className="size-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label={`Delete ${row.original.businessName}`}
            className="flex size-9 items-center justify-center rounded-lg text-text-muted transition hover:bg-error-soft hover:text-error"
            onClick={() => deleteModal.open(row.original)}
          >
            <Trash2 className="size-4" aria-hidden="true" />
          </button>
        </div>
      ),
    },
  ];

  const summaryCardInfo = [
    { label: "Total customers", value: stats.total, icon: Users },
    { label: "Active", value: stats.active, icon: CircleCheck },
    { label: "Inactive", value: stats.inactive, icon: ArchiveX },
  ];

  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-heading">
            Customers
          </h1>
          <p className="mt-1 text-sm text-text-muted">
            Create, update and manage business customers
          </p>
        </div>
        <UiButton
          variant="primary"
          leftIcon={<Plus className="size-5" />}
          onClick={formDrawer.openAdd}
        >
          Add customer
        </UiButton>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        {summaryCardInfo.map((info) => (
          <UiSummaryCard key={info.label} {...info} />
        ))}
      </div>

      <UiTable
        data={customerQuery.customers}
        columns={columns}
        isLoading={customerQuery.isLoading}
        isError={customerQuery.isError}
        refreshAction={{
          onRefresh: customerQuery.onRefetch,
          isRefreshing: customerQuery.isRefetching,
        }}
        pagination={customerQuery.pagination}
        emptyMessage="No customers found."
        searchBarProps={{
          placeholder: "Search by business, contact, phone, or email...",
          query: tableSearch,
          "aria-label": "Search customers",
        }}
      />

      <AddEditCustomers
        isOpen={formDrawer.isOpen}
        customer={formDrawer.customer}
        onClose={formDrawer.close}
      />

      <UiConfirmationModal
        isOpen={Boolean(deleteModal.customer)}
        title="Delete customer?"
        description={
          <>
            This will permanently remove{" "}
            <strong className="font-semibold text-heading">
              {deleteModal.customer?.businessName}
            </strong>
            . This action cannot be undone.
          </>
        }
        confirmLabel="Delete"
        isLoading={deleteModal.isDeleting}
        onCancel={deleteModal.close}
        onConfirm={deleteModal.confirm}
      />
    </section>
  );
};

export default CustomersPage;
