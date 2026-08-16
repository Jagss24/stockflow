import {
  ColumnDef,
  RowData,
  tableFeatures,
  useTable,
} from "@tanstack/react-table";
import { IPaginationMeta } from "@/api/api-types";
import { TableCell, TableRow } from "./components/TableRow";
import TableSearchbar, {
  TTableSearchBarProps,
} from "./components/TableSearchbar";
import TableEmptyState from "./components/TableEmptyState";
import TableErrorState, {
  ITableErrorStateProps,
  ITableRefreshAction,
} from "./components/TableErrorState";
import TableLoadingState from "./components/TableLoadingState";
import TablePagination from "./components/TablePagination";
import UiButton from "../Buttons/UiButton";
import { RefreshCcw } from "lucide-react";
import { cn } from "@/lib/clsx";

const uiTableFeatures = tableFeatures({});

type TModifiedColumnDef<T extends RowData> = ColumnDef<
  typeof uiTableFeatures,
  T
>;

interface IUiTableProps<T extends RowData> {
  columns: TModifiedColumnDef<T>[];
  data: T[];
  searchBarProps?: TTableSearchBarProps;
  errorState?: Omit<ITableErrorStateProps, "colSpan" | "refreshAction">;
  isLoading?: boolean;
  isError?: boolean;
  emptyMessage?: string;
  pagination?: IPaginationMeta;
  onPageChange?: (page: number) => void;
  refreshAction?: ITableRefreshAction;
}
const UiTable = <T extends RowData>({
  columns,
  data,
  searchBarProps,
  isLoading = false,
  errorState,
  isError = false,
  emptyMessage = "No data found.",
  pagination,
  onPageChange,
  refreshAction,
}: IUiTableProps<T>) => {
  const table = useTable({
    data,
    columns,
    features: uiTableFeatures,
  });

  const rows = table.getRowModel().rows;
  const colSpan = Math.max(columns.length, 1);

  const renderTableBody = () => {
    if (isLoading) {
      return <TableLoadingState colSpan={colSpan} />;
    }

    if (isError) {
      return (
        <TableErrorState
          colSpan={colSpan}
          refreshAction={refreshAction}
          {...errorState}
        />
      );
    }

    if (rows.length === 0) {
      return <TableEmptyState colSpan={colSpan} message={emptyMessage} />;
    }

    return rows.map((row) => (
      <TableRow key={row.id} className="hover:bg-surface-strong/40">
        {row.getAllCells().map((cell) => (
          <TableCell key={cell.id} className="whitespace-nowrap text-sm">
            <table.FlexRender cell={cell} />
          </TableCell>
        ))}
      </TableRow>
    ));
  };

  return (
    <div
      role="region"
      className="w-full overflow-hidden rounded-xl border border-border bg-surface shadow-card"
    >
      <div className="flex items-center gap-2 p-3 border-b border-border">
        <TableSearchbar {...searchBarProps} />
        {refreshAction && (
          <UiButton
            className=""
            onClick={refreshAction.onRefresh}
            disabled={refreshAction.isRefreshing}
            aria-label="Refresh table"
          >
            <RefreshCcw
              className={cn(
                "size-4 text-text-muted",
                refreshAction.isRefreshing && "animate-spin",
              )}
            />
          </UiButton>
        )}
      </div>
      <table className="w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => {
            return (
              <TableRow key={headerGroup.id} className="">
                {headerGroup.headers.map((header) => (
                  <TableCell
                    key={header.id}
                    header
                    className="text-xs font-semibold! text-text-soft"
                  >
                    {header.isPlaceholder ? null : (
                      <table.FlexRender header={header} />
                    )}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </thead>
        <tbody className="divide-y divide-border">{renderTableBody()}</tbody>
      </table>
      {pagination && (
        <TablePagination pagination={pagination} onPageChange={onPageChange} />
      )}
    </div>
  );
};

export default UiTable;

export type { IUiTableProps, TModifiedColumnDef };
