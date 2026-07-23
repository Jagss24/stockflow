import { useLogoutMutation } from "@/api/auth/auth.mutations";
import { useGetCurrentUserQuery } from "@/api/user/user.query";
import { ROUTE_PAGES } from "@/constants/pages";
import queryClient from "@/lib/queryClient";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDown, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import UiButton from "@/components/ui/Buttons/UiButton";

const roleLabels = {
  OWNER: "Owner",
  ADMIN: "Administrator",
  SALES_MANAGER: "Sales manager",
  INVENTORY_MANAGER: "Inventory manager",
} as const;

const getInitials = (name: string) => {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return initials || "SF";
};

const UserMenu = () => {
  const getCurrentUser = useGetCurrentUserQuery({});
  const logoutMutation = useLogoutMutation();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    queryClient.clear();
    navigate(ROUTE_PAGES.login, { replace: true });
  };

  const user = getCurrentUser?.data?.data;
  const name = user?.name ?? "StockFlow user";
  const role = user ? roleLabels[user.role] : "Workspace member";

  return (
    <Menu as="div" className="relative shrink-0">
      <MenuButton className="group flex items-center gap-2 rounded-xl p-1.5 outline-none transition hover:bg-surface-muted focus-visible:ring-3 focus-visible:ring-primary-soft">
        <span className="flex size-9 items-center justify-center rounded-full border border-border bg-primary-soft text-sm font-bold text-primary">
          {getInitials(name)}
        </span>
        <ChevronDown className="hidden size-4 text-text-soft transition group-data-open:rotate-180 sm:block" />
        <span className="sr-only">Open user menu</span>
      </MenuButton>

      <MenuItems
        anchor="bottom end"
        transition
        className="z-60 mt-2 w-[min(20rem,calc(100vw-2rem))] origin-top-right rounded-xl border border-border bg-surface p-2 shadow-panel outline-none transition duration-150 data-closed:scale-95 data-closed:opacity-0"
      >
        <div className="flex items-center gap-4 px-3 py-4">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-border bg-primary-soft font-bold text-primary">
            {getInitials(name)}
          </span>
          <div className="min-w-0">
            <p className="truncate text-base font-bold text-heading">{name}</p>
            <p className="truncate text-sm text-text-muted">
              {user?.email ?? "Loading account..."}
            </p>
            <span className="mt-1.5 inline-flex rounded-md bg-primary-soft px-2 py-1 text-xs font-semibold text-primary-strong">
              {role}
            </span>
          </div>
        </div>

        <div className="my-2 border-t border-border" />

        <MenuItem>
          <UiButton
            variant="danger"
            fullWidth
            leftIcon={
              logoutMutation.isPending ? (
                <span className="size-4 animate-spin rounded-full border-2 border-error border-t-transparent" />
              ) : (
                <LogOut className="size-4" />
              )
            }
            disabled={logoutMutation.isPending}
            className="justify-start"
            onClick={handleLogout}
          >
            {logoutMutation.isPending ? "Logging out..." : "Log out"}
          </UiButton>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
};

export default UserMenu;
