import type { IWarehouseResponseSchema } from "@/api/warehouses/warehouse-api.types";
import UiButton from "@/components/ui/Buttons/UiButton";
import UiConfirmationModal from "@/components/ui/Modal/UiConfirmationModal";
import UiTable, {
  type TModifiedColumnDef,
} from "@/components/ui/Tables/UiTable";
import { formatDate } from "@/utils/date";
import {
  ArrowUpDown,
  CircleCheck,
  MapPin,
  Pencil,
  Plus,
  Trash2,
  Warehouse,
} from "lucide-react";
import AddEditWarehouses from "./components/AddEditWarehouses";
import { useWarehouses } from "./hooks/useWarehouses";
import UiBadge from "@/components/ui/Badge/UiBadge";
import { cn } from "@/lib/clsx";
import UiSummaryCard from "@/components/ui/Card/UiSummaryCard";

const WarehousesPage = () => {
  const { tableSearch, warehouseQuery, stats, formDrawer, deleteModal } =
    useWarehouses();

  const columns: TModifiedColumnDef<IWarehouseResponseSchema>[] = [
    {
      header: () => (
        <span className="inline-flex items-center gap-1">
          Warehouse <ArrowUpDown className="size-3" aria-hidden="true" />
        </span>
      ),
      accessorKey: "name",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
            <Warehouse className="size-5" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="truncate font-semibold text-heading">
              {row.original.name}
            </p>
            <p className="max-w-56 truncate text-xs text-text-soft">
              {row.original.address || "No address provided"}
            </p>
          </div>
        </div>
      ),
    },
    {
      header: "Code",
      accessorKey: "code",
      cell: ({ row }) => (
        <span className="font-mono text-sm text-text-muted">
          {row.original.code}
        </span>
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
            aria-label={`Edit ${row.original.name}`}
            className="flex size-9 items-center justify-center rounded-lg text-text-muted transition hover:bg-primary-soft hover:text-primary"
            onClick={() => formDrawer.openEdit(row.original)}
          >
            <Pencil className="size-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label={`Delete ${row.original.name}`}
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
    { label: "Total locations", value: stats.total, icon: Warehouse },
    { label: "Active", value: stats.active, icon: CircleCheck },
    { label: "Cities covered", value: stats.cities, icon: MapPin },
  ];

  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-heading">
            Warehouses
          </h1>
          <p className="mt-1 text-sm text-text-muted">
            Create, update and manage warehouses in your inventory
          </p>
        </div>
        <UiButton
          variant="primary"
          leftIcon={<Plus className="size-5" />}
          onClick={formDrawer.openAdd}
        >
          Add warehouse
        </UiButton>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        {summaryCardInfo.map((info) => (
          <UiSummaryCard key={info.label} {...info} />
        ))}
      </div>

      <UiTable
        data={warehouseQuery.warehouses}
        columns={columns}
        isLoading={warehouseQuery.isLoading}
        isError={warehouseQuery.isError}
        refreshAction={{
          onRefresh: warehouseQuery.onRefetch,
          isRefreshing: warehouseQuery.isRefetching,
        }}
        pagination={warehouseQuery.pagination}
        emptyMessage="No warehouses found."
        searchBarProps={{
          placeholder: "Search by name, code, or city...",
          query: tableSearch,
          "aria-label": "Search warehouses",
        }}
      />

      <AddEditWarehouses
        isOpen={formDrawer.isOpen}
        warehouse={formDrawer.warehouse}
        onClose={formDrawer.close}
      />

      <UiConfirmationModal
        isOpen={Boolean(deleteModal.warehouse)}
        title="Delete warehouse?"
        description={
          <>
            This will permanently remove{" "}
            <strong className="font-semibold text-heading">
              {deleteModal.warehouse?.name}
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

export default WarehousesPage;
