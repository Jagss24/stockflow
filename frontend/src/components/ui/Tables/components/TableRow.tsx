import { cn } from "@/lib/clsx";
import React, { ComponentPropsWithRef } from "react";

type ITableRowProps = ComponentPropsWithRef<"tr"> & {
  children: React.ReactNode;
};

type ITableCellProps = ComponentPropsWithRef<"td"> & {
  header?: boolean;
  children: React.ReactNode;
};

const TableRow = ({ children, className = "", ...rest }: ITableRowProps) => {
  return (
    <tr className={cn("p-1 text-left", className)} {...rest}>
      {children}
    </tr>
  );
};

const TableCell = ({
  header = false,
  children,
  className = "",
  ...rest
}: ITableCellProps) => {
  const Element = header ? "th" : "td";
  return (
    <Element
      className={cn(
        "whitespace-nowrap truncate transition-colors text-left px-4 py-3",
        className,
      )}
      {...rest}
    >
      {children}
    </Element>
  );
};

export { TableRow, TableCell };
