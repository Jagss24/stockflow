import { Button } from "@headlessui/react";
import { cn } from "@/lib/clsx";
import { ComponentPropsWithRef, ReactNode } from "react";

type UIButtonVariant = "primary" | "secondary" | "default" | "danger";

type UIButtonProps = Omit<ComponentPropsWithRef<"button">, "type"> & {
  variant?: UIButtonVariant;
  type?: "button" | "submit" | "reset";
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  isLoading?: boolean;
  fullWidth?: boolean;
};

const variantClassNames: Record<UIButtonVariant, string> = {
  primary:
    "border-primary bg-primary text-surface shadow-sm hover:border-primary-hover hover:bg-primary-hover focus-visible:ring-primary-soft",
  secondary:
    "border-secondary bg-secondary text-surface shadow-sm hover:border-secondary-hover hover:bg-secondary-hover focus-visible:ring-secondary-soft",
  default:
    "border-border bg-surface text-heading shadow-sm hover:border-border-strong hover:bg-surface-muted focus-visible:ring-primary-soft",
  danger:
    "border-transparent bg-surface text-error shadow-none hover:bg-error-soft focus-visible:ring-error-soft",
};

const UiButton = ({
  variant = "default",
  type = "button",
  leftIcon,
  rightIcon,
  isLoading = false,
  fullWidth = false,
  disabled,
  className,
  children,
  ...props
}: UIButtonProps) => {
  const isDisabled = disabled || isLoading;

  return (
    <Button
      type={type}
      disabled={isDisabled}
      className={cn(
        "inline-flex h-10 items-center justify-center gap-2 rounded-md border px-4 text-sm font-semibold outline-none transition",
        "focus-visible:ring-3 disabled:cursor-not-allowed disabled:border-border disabled:bg-surface-muted disabled:text-text-soft disabled:shadow-none",
        "data-active:scale-[0.99]",
        fullWidth && "w-full",
        variantClassNames[variant],
        className,
      )}
      {...props}
    >
      {isLoading && (
        <span
          aria-hidden="true"
          className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      )}
      {!isLoading && leftIcon && (
        <span className="flex shrink-0 items-center">{leftIcon}</span>
      )}
      <span className="truncate">{children}</span>
      {!isLoading && rightIcon && (
        <span className="flex shrink-0 items-center">{rightIcon}</span>
      )}
    </Button>
  );
};

UiButton.displayName = "UiButton";

export type { UIButtonProps, UIButtonVariant };
export default UiButton;
