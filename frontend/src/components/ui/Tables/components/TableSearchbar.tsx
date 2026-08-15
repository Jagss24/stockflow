import { ComponentPropsWithRef } from "react";
import UiInput from "../../Input/UiInput";
import { Search } from "lucide-react";
import { cn } from "@/lib/clsx";
import { useRouteHandler } from "@/hooks/useRouteHandler";

type TTableSearchBarProps = ComponentPropsWithRef<"input"> & {
  query?: string;
  setQuery?: (val: string) => void;
};

const TableSearchbar = ({
  placeholder = "Search by any attribute...",
  className = "",
  query,
  setQuery,
  ...rest
}: TTableSearchBarProps) => {
  const { addSearchParams } = useRouteHandler();
  const handleSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    addSearchParams({ "t-search": e.target.value || null, page: 1 });
    setQuery?.(e.target.value);
  };

  return (
    <UiInput
      leftIcon={<Search className="size-4" />}
      placeholder={placeholder}
      inputClassName={cn(
        "shadow-none! bg-surface-strong/70 rounded-xl focus:bg-white focus:ring-0",
        className,
      )}
      value={query}
      onChange={handleSearchQuery}
      {...rest}
    />
  );
};

export default TableSearchbar;

export type { TTableSearchBarProps };
