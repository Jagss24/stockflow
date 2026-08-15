import {
  useCategoriesQuery,
  useCategoryStatsQuery,
} from "@/api/categories/category.query";
import { useRouteHandler } from "@/hooks/useRouteHandler";

export const useCategories = () => {
  const { getSearchParam } = useRouteHandler();

  const tableSearch = getSearchParam("t-search", "") ?? "";
  const status = getSearchParam("status", "") ?? "";
  const requestedPage = Number(getSearchParam("page", "1"));
  const page =
    Number.isSafeInteger(requestedPage) && requestedPage > 0
      ? requestedPage
      : 1;

  const getCategoryQuery = useCategoriesQuery({
    search: tableSearch || "",
    page,
    filters:
      status === "active"
        ? { isActive: "true" }
        : status === "inactive"
          ? { isActive: "false" }
          : undefined,
  });

  const categoryStatsQuery = useCategoryStatsQuery("isActive");

  return {
    getCategoryQuery,
    categoryStatsQuery,
    tableSearch,
  };
};
