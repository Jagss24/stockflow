import { cn } from "@/lib/clsx";
import React from "react";

const UiBadge = ({
  className = "",
  displayUnit,
}: {
  className?: string;
  displayUnit: React.ReactNode;
}) => {
  return (
    <span
      className={cn(
        "flex justify-center items-center rounded-full bg-surface-strong p-1.5 text-xs font-semibold text-text",
        className,
      )}
    >
      {displayUnit}
    </span>
  );
};

export default UiBadge;
