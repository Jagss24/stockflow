import { useGetCurrentUserQuery } from "@/api/user/user.query";
import { ROUTE_PAGES } from "@/constants/pages";
import { ArrowRight, Tags, Users, Warehouse } from "lucide-react";
import { Link } from "react-router-dom";

const DashboardPage = () => {
  const { data: user } = useGetCurrentUserQuery({});
  const firstName = user?.name.trim().split(/\s+/)[0] ?? "there";

  const workspaceAreas = [
    {
      label: "Categories",
      description: "Organize products into a catalog structure.",
      path: ROUTE_PAGES.categories,
      icon: Tags,
      iconClassName: "bg-primary-soft text-primary-strong",
    },
    {
      label: "Warehouses",
      description: "Manage locations where inventory is stored.",
      path: ROUTE_PAGES.warehouses,
      icon: Warehouse,
      iconClassName: "bg-secondary-soft text-secondary-strong",
    },
    {
      label: "Customers",
      description: "Keep customer records accurate and accessible.",
      path: ROUTE_PAGES.customers,
      icon: Users,
      iconClassName: "bg-purple-soft text-purple",
    },
  ];

  return (
    <div>
      <section className="rounded-panel border border-border bg-surface p-5 shadow-card sm:p-6">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-primary">
          Workspace overview
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-heading sm:text-3xl">
          Welcome back, {firstName}
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-text-muted sm:text-base">
          Your StockFlow workspace is ready. Use the quick links below or the
          global search to move between the modules available today.
        </p>
      </section>

      <section className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {workspaceAreas.map((area) => {
          const Icon = area.icon;
          return (
            <Link
              key={area.path}
              to={area.path}
              className="group rounded-card border border-border bg-surface p-5 shadow-card transition hover:-translate-y-0.5 hover:border-border-strong hover:shadow-panel"
            >
              <div
                className={`flex size-10 items-center justify-center rounded-lg ${area.iconClassName}`}
              >
                <Icon className="size-5" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-heading">
                {area.label}
              </h3>
              <p className="mt-2 min-h-12 text-sm leading-6 text-text-muted">
                {area.description}
              </p>
              <span className="mt-5 flex items-center gap-2 text-sm font-bold text-primary">
                Open {area.label.toLowerCase()}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          );
        })}
      </section>
    </div>
  );
};

export default DashboardPage;
