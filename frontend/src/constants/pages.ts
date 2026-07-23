const ROUTE_PAGES = {
  login: "/login",
  dashboard: "/dashboard",
  categories: "/categories",
  warehouses: "/warehouses",
  customers: "/customers",
} as const;

type TRoutePath = (typeof ROUTE_PAGES)[keyof typeof ROUTE_PAGES];
export { ROUTE_PAGES };
export type { TRoutePath };
