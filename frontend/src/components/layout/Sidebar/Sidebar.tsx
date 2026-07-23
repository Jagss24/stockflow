import { cn } from "@/lib/clsx";
import UiButton from "@/components/ui/Buttons/UiButton";
import { Boxes, ChevronLeft, ChevronRight, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { navigationGroups } from "../navigation";

type SidebarProps = {
  collapsed: boolean;
  onToggleCollapsed: () => void;
};

const Sidebar = ({ collapsed, onToggleCollapsed }: SidebarProps) => {
  return (
    <>
      <aside
        id="app-sidebar"
        className={cn(
          "peer fixed inset-y-0 left-0 z-50 flex w-60 -translate-x-full flex-col border-r border-border bg-surface transition-[width,transform] duration-200 target:translate-x-0 lg:translate-x-0",
          collapsed ? "lg:w-16" : "lg:w-60",
        )}
      >
        <div
          className={cn(
            "relative flex h-20 shrink-0 items-center gap-3 border-b border-border px-5",
            collapsed && "lg:justify-center lg:px-8",
          )}
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-surface shadow-md shadow-primary-soft">
            <Boxes className="size-5" aria-hidden="true" />
          </div>
          <div className={cn("min-w-0", collapsed && "lg:hidden")}>
            <p className="truncate text-lg font-bold tracking-tight text-heading">
              StockFlow
            </p>
            <p className="truncate text-xs font-medium text-text-soft">
              Inventory workspace
            </p>
          </div>
          <UiButton
            aria-label={collapsed ? "Expand navigation" : "Collapse navigation"}
            title={collapsed ? "Expand navigation" : "Collapse navigation"}
            className="absolute -right-3 top-1/2 z-10 hidden size-6! -translate-y-1/2 rounded-full! p-0! lg:inline-flex"
            onClick={onToggleCollapsed}
          >
            {collapsed ? (
              <ChevronRight className="size-3" />
            ) : (
              <ChevronLeft className="size-3" />
            )}
          </UiButton>
          <a
            href="#main-content"
            aria-label="Close navigation"
            className="ml-auto flex size-9 items-center justify-center rounded-md border border-border bg-surface text-heading shadow-sm outline-none transition hover:border-border-strong hover:bg-surface-muted focus-visible:ring-3 focus-visible:ring-primary-soft lg:hidden"
          >
            <X className="size-5" />
          </a>
        </div>

        <nav className="flex-1 overflow-y-auto px-2.5 py-5">
          {navigationGroups.map((group) => (
            <div key={group.label} className="mb-5 last:mb-0">
              <p
                className={cn(
                  "mb-2 px-3 text-xs font-bold uppercase tracking-[0.12em] text-text-soft",
                  collapsed && "lg:sr-only",
                )}
              >
                {group.label}
              </p>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      title={collapsed ? item.label : undefined}
                      className={({ isActive }) =>
                        cn(
                          "relative flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-semibold text-text-muted transition-colors",
                          "hover:bg-surface-muted hover:text-heading",
                          collapsed && "lg:justify-center lg:px-2",
                          isActive &&
                            "bg-primary-soft text-primary-strong hover:bg-primary-soft hover:text-primary-strong",
                        )
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {isActive && (
                            <span className="absolute inset-y-2 left-0 w-1 rounded-r-full bg-primary" />
                          )}
                          <Icon
                            className="size-5 shrink-0"
                            aria-hidden="true"
                          />
                          <span className={cn(collapsed && "lg:hidden")}>
                            {item.label}
                          </span>
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
