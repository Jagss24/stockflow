import { cn } from "@/lib/clsx";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { X } from "lucide-react";
import type { ReactNode } from "react";
import UiButton from "../Buttons/UiButton";

type TUiDrawerPosition = "left" | "right";
type TUiDrawerSize = "sm" | "md" | "lg" | "xl" | "full";

interface IUiDrawerProps {
  isOpen: boolean;
  title: ReactNode;
  children: ReactNode;
  onClose: () => void;
  description?: ReactNode;
  icon?: ReactNode;
  footer?: ReactNode;
  position?: TUiDrawerPosition;
  size?: TUiDrawerSize;
  isLoading?: boolean;
  disableClose?: boolean;
  loaderComponent?: ReactNode;
  className?: string;
  bodyClassName?: string;
}

const drawerSizeClassNames: Record<TUiDrawerSize, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "max-w-none",
};

const defaultLoaderComponent = (
  <div className="h-72 w-full animate-pulse rounded-lg bg-surface-muted" />
);

const UiDrawer = ({
  isOpen,
  title,
  children,
  onClose,
  description,
  icon,
  footer,
  position = "right",
  size = "md",
  isLoading = false,
  disableClose = false,
  loaderComponent = defaultLoaderComponent,
  className,
  bodyClassName,
}: IUiDrawerProps) => {
  const closeDrawer = () => {
    if (!disableClose) onClose();
  };

  return (
    <Dialog
      as="div"
      open={isOpen}
      onClose={closeDrawer}
      className="relative z-50"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-heading/45 backdrop-blur-[2px] transition-opacity duration-200 data-closed:opacity-0"
      />

      <div
        className={cn(
          "fixed inset-0 flex",
          position === "right" ? "justify-end" : "justify-start",
        )}
      >
        <DialogPanel
          transition
          className={cn(
            "flex h-full w-full flex-col border-border bg-surface shadow-panel transition duration-200 ease-out",
            drawerSizeClassNames[size],
            position === "right"
              ? "border-l data-closed:translate-x-full"
              : "border-r data-closed:-translate-x-full",
            className,
          )}
        >
          <header className="relative flex shrink-0 items-start gap-3 border-b border-border px-5 py-4 pr-16">
            {icon && (
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary">
                {icon}
              </span>
            )}
            <div className="min-w-0">
              <DialogTitle className="text-lg font-bold text-heading">
                {title}
              </DialogTitle>
              {description && (
                <p className="mt-0.5 text-sm text-text-muted">
                  {description}
                </p>
              )}
            </div>
            {!disableClose && (
              <UiButton
                aria-label="Close drawer"
                className="absolute right-4 top-3.5 size-9! border-0! bg-transparent! p-0! text-text-muted shadow-none! hover:bg-surface-muted!"
                onClick={closeDrawer}
              >
                <X className="size-5" />
              </UiButton>
            )}
          </header>

          <div className={cn("min-h-0 flex-1 overflow-y-auto p-5", bodyClassName)}>
            {isLoading ? loaderComponent : children}
          </div>

          {footer && (
            <footer className="shrink-0 border-t border-border bg-surface-muted/40 px-5 py-4">
              {footer}
            </footer>
          )}
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default UiDrawer;
export type { IUiDrawerProps, TUiDrawerPosition, TUiDrawerSize };
