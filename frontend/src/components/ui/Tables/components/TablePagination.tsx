import type { IPaginationMeta } from "@/api/api-types";
import { useRouteHandler } from "@/hooks/useRouteHandler";
import { cn } from "@/lib/clsx";
import { Fragment } from "react";
import UiButton from "../../Buttons/UiButton";

interface ITablePaginationProps {
  pagination: IPaginationMeta;
  onPageChange?: (page: number) => void;
}

const getVisiblePages = (currentPage: number, totalPages: number) => {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  return [
    ...new Set([1, currentPage - 1, currentPage, currentPage + 1, totalPages]),
  ]
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b);
};

const TablePagination = ({
  pagination,
  onPageChange,
}: ITablePaginationProps) => {
  const { addSearchParams } = useRouteHandler();
  const totalPages = Math.max(pagination.totalPages, 1);
  const currentPage = Math.min(Math.max(pagination.page, 1), totalPages);
  const visiblePages = getVisiblePages(currentPage, totalPages);
  const firstItem =
    pagination.total === 0 ? 0 : (currentPage - 1) * pagination.limit + 1;
  const lastItem = Math.min(currentPage * pagination.limit, pagination.total);

  const changePage = (page: number) => {
    if (page === currentPage || page < 1 || page > totalPages) return;

    if (onPageChange) {
      onPageChange(page);
      return;
    }

    addSearchParams({ page });
  };

  return (
    <nav
      aria-label="Table pagination"
      className="flex flex-col gap-3 border-t border-border px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
    >
      <p className="text-sm text-text-muted">
        Showing{" "}
        <span className="font-medium text-text">
          {firstItem}–{lastItem}
        </span>{" "}
        of <span className="font-medium text-text">{pagination.total}</span>
      </p>

      <div className="flex items-center gap-1">
        <UiButton
          type="button"
          disabled={!pagination.hasPreviousPage}
          className="h-8 shadow-none"
          onClick={() => changePage(currentPage - 1)}
        >
          Previous
        </UiButton>

        {visiblePages.map((page, index) => {
          const previousPage = visiblePages[index - 1];
          const hasGap = previousPage !== undefined && page - previousPage > 1;

          return (
            <Fragment key={page}>
              {hasGap && (
                <span className="flex size-10 items-center justify-center text-sm text-text-soft">
                  …
                </span>
              )}
              <UiButton
                type="button"
                aria-current={page === currentPage ? "page" : undefined}
                aria-label={`Go to page ${page}`}
                className={cn(
                  "text-xs h-8 focus-visible:ring-1 focus-visible:ring-primary",
                  page === currentPage
                    ? "bg-primary text-surface hover:bg-primary"
                    : "text-text-muted hover:bg-surface-muted hover:text-heading",
                )}
                onClick={() => changePage(page)}
              >
                {page}
              </UiButton>
            </Fragment>
          );
        })}

        <UiButton
          type="button"
          disabled={!pagination.hasNextPage}
          className="h-8 shadow-none"
          onClick={() => changePage(currentPage + 1)}
        >
          Next
        </UiButton>
      </div>
    </nav>
  );
};

export default TablePagination;
export type { ITablePaginationProps };
