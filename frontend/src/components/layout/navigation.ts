import { TRoutePath, ROUTE_PAGES } from "@/constants/pages";
import {
  LayoutDashboard,
  Tags,
  Users,
  Warehouse,
  LucideIcon,
} from "lucide-react";

type NavigationItem = {
  label: string;
  description: string;
  path: TRoutePath;
  icon: LucideIcon;
  keywords: string[];
};

type NavigationGroup = {
  label: string;
  items: NavigationItem[];
};

const navigationGroups: NavigationGroup[] = [
  {
    label: "Overview",
    items: [
      {
        label: "Dashboard",
        description: "Workspace overview and recent activity",
        path: ROUTE_PAGES.dashboard,
        icon: LayoutDashboard,
        keywords: ["home", "overview", "analytics"],
      },
    ],
  },
  {
    label: "Catalog",
    items: [
      {
        label: "Categories",
        description: "Organize and manage product categories",
        path: ROUTE_PAGES.categories,
        icon: Tags,
        keywords: ["catalog", "product groups"],
      },
      {
        label: "Warehouses",
        description: "Manage inventory locations",
        path: ROUTE_PAGES.warehouses,
        icon: Warehouse,
        keywords: ["locations", "stock", "inventory"],
      },
    ],
  },
  {
    label: "Relationships",
    items: [
      {
        label: "Customers",
        description: "View and manage customer records",
        path: ROUTE_PAGES.customers,
        icon: Users,
        keywords: ["people", "buyers", "contacts"],
      },
    ],
  },
];

const navigationItems = navigationGroups.flatMap((group) => group.items);

const routeMeta = Object.fromEntries(
  navigationItems.map((item) => [
    item.path,
    { title: item.label, icon: item.icon },
  ]),
) as Record<TRoutePath, { title: string; icon: LucideIcon }>;

export { navigationGroups, navigationItems, routeMeta };
export type { NavigationGroup, NavigationItem };
