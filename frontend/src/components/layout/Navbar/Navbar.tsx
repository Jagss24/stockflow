import { Menu as MenuIcon } from "lucide-react";
import { useLocation } from "react-router-dom";
import type { TRoutePath } from "@/constants/pages";
import { routeMeta } from "../navigation";
import GlobalSearch from "./GlobalSearch";
import UserMenu from "./UserMenu";

const Navbar = () => {
  const { pathname } = useLocation();
  const currentRoute = routeMeta[pathname as TRoutePath] ?? {
    title: "StockFlow",
  };

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center gap-3 border-b border-border bg-surface/95 px-4 backdrop-blur sm:px-5 lg:px-6">
      <a
        href="#app-sidebar"
        aria-label="Open navigation"
        aria-controls="app-sidebar"
        className="flex size-10 shrink-0 items-center justify-center rounded-md border border-border bg-surface text-heading shadow-sm outline-none transition hover:border-border-strong hover:bg-surface-muted focus-visible:ring-3 focus-visible:ring-primary-soft lg:hidden"
      >
        <MenuIcon className="size-5" />
      </a>

      <div className="hidden min-w-44 lg:block">
        <div className="flex items-center gap-2 text-sm font-medium text-text-soft">
          <span>Home</span>
          <span aria-hidden="true">{">"}</span>
          <span className="text-text-muted">{currentRoute.title}</span>
        </div>
      </div>

      <div className="ml-auto flex min-w-0 flex-1 items-center justify-end gap-2 sm:gap-3">
        <GlobalSearch />
        <div className="hidden h-8 w-px bg-border sm:block" />
        <UserMenu />
      </div>
    </header>
  );
};

export default Navbar;
