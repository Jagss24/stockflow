import { routeMeta } from "@/components/layout/navigation";
import ResourcePage from "@/components/layout/ResourcePage/ResourcePage";
import { ROUTE_PAGES } from "@/constants/pages";

const WarehousesPage = () => {
  return (
    <ResourcePage
      title="Warehouses"
      description="Manage the locations where your organization stores inventory."
      emptyTitle="Warehouse workspace is ready"
      emptyDescription="The route and application shell are in place. Warehouse API data and management actions can be connected here next."
      icon={routeMeta[ROUTE_PAGES.warehouses].icon}
    />
  );
};

export default WarehousesPage;
