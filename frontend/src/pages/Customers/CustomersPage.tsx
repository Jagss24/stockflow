import ResourcePage from "@/components/layout/ResourcePage/ResourcePage";
import { Users } from "lucide-react";

const CustomersPage = () => {
  return (
    <ResourcePage
      title="Customers"
      description="Keep customer details organized and easy for your team to access."
      emptyTitle="Customer workspace is ready"
      emptyDescription="The route and application shell are in place. Customer API data and management actions can be connected here next."
      icon={Users}
    />
  );
};

export default CustomersPage;
