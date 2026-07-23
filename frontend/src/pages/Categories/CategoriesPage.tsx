import ResourcePage from "@/components/layout/ResourcePage/ResourcePage";
import { Tags } from "lucide-react";

const CategoriesPage = () => {
  return (
    <ResourcePage
      title="Categories"
      description="Create and maintain the structure of your product catalog."
      emptyTitle="Category workspace is ready"
      emptyDescription="The route and application shell are in place. Category API data and management actions can be connected here next."
      icon={Tags}
    />
  );
};

export default CategoriesPage;
