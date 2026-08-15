import type { ICategoryResponseSchema } from "@/api/categories/category-api.types";
import UiButton from "@/components/ui/Buttons/UiButton";
import UiConfirmationModal from "@/components/ui/Modal/UiConfirmationModal";
import UiTable, {
  type TModifiedColumnDef,
} from "@/components/ui/Tables/UiTable";
import { formatDate } from "@/utils/date";
import {
  ArchiveX,
  ArrowUpDown,
  CircleCheck,
  Pencil,
  Plus,
  Tag,
  Tags,
  Trash2,
} from "lucide-react";
import AddEditCategories from "./components/AddEditCategories";
import CategoryStatusBadge from "./components/CategoryStatusBadge";
import CategorySummaryCard from "./components/CategorySummaryCard";
import { useCategories } from "./hooks/useCategories";

const CategoriesPage = () => {
  const {
    categories,
    pagination,
    tableSearch,
    isLoading,
    isError,
    visibleCategoriesTotal,
    stats,
    formModal,
    deleteModal,
  } = useCategories();

  const columns: TModifiedColumnDef<ICategoryResponseSchema>[] = [
    {
      header: () => (
        <span className="inline-flex items-center gap-1">
          Category <ArrowUpDown className="size-3" aria-hidden="true" />
        </span>
      ),
      accessorKey: "name",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
            <Tag className="size-5" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="truncate font-semibold text-heading">
              {row.original.name}
            </p>
            <p className="text-xs text-text-soft">ID #{row.original.id}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Description",
      accessorKey: "description",
      cell: ({ row }) => (
        <p className="max-w-xl truncate text-text-muted">
          {row.original.description || "---"}
        </p>
      ),
    },
    {
      header: "Status",
      accessorKey: "isActive",
      cell: ({ row }) => (
        <CategoryStatusBadge isActive={row.original.isActive} />
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
          {formatDate(row.original.updatedAt, "dateTime12", {
            fallback: "-0sdp-",
          })}
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
            onClick={() => formModal.openEdit(row.original)}
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
    { label: "Total categories", value: stats.total, icon: Tags },
    { label: "Active", value: stats.active, icon: CircleCheck },
    { label: "Inactive ", value: stats.inactive, icon: ArchiveX },
  ];

  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-heading">
            Categories
          </h1>
          <p className="mt-1 text-sm text-text-muted">
            {categories.length} of {visibleCategoriesTotal ?? 0} categories
          </p>
        </div>
        <UiButton
          variant="primary"
          leftIcon={<Plus className="size-5" />}
          onClick={formModal.openAdd}
        >
          Add category
        </UiButton>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        {summaryCardInfo.map((info) => (
          <CategorySummaryCard
            key={info.label}
            icon={info.icon}
            label={info.label}
            value={info.value}
          />
        ))}
      </div>

      <UiTable
        data={categories}
        columns={columns}
        isLoading={isLoading}
        isError={isError}
        pagination={pagination}
        emptyMessage="No categories found."
        searchBarProps={{
          placeholder: "Search categories by name, descirption...",
          query: tableSearch,
          "aria-label": "Search categories",
        }}
      />

      <AddEditCategories
        isOpen={formModal.isOpen}
        category={formModal.category}
        onClose={formModal.close}
      />

      <UiConfirmationModal
        isOpen={Boolean(deleteModal.category)}
        title="Delete category?"
        description={
          <>
            This will permanently remove{" "}
            <strong className="font-semibold text-heading">
              {deleteModal.category?.name}
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

export default CategoriesPage;
