import { cn } from "@/lib/clsx";
import { Asterisk } from "lucide-react";
import { ComponentPropsWithRef, ReactNode, useId } from "react";

type UiInputProps = Omit<ComponentPropsWithRef<"input">, "size"> & {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  inputClassName?: string;
  wrapperClassName?: string;
};

const UiInput = ({
  id,
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  className,
  inputClassName,
  wrapperClassName,
  required,
  disabled,
  ...props
}: UiInputProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const descriptionId = `${inputId}-description`;
  const hasDescription = Boolean(error || helperText);

  return (
    <div
      className={cn(
        "flex w-full flex-col items-start justify-center gap-1.5",
        wrapperClassName,
        className,
      )}
    >
      {label && (
        <label
          htmlFor={inputId}
          className="flex items-center justify-start gap-1.5 text-sm font-medium text-heading"
        >
          <span>{label}</span>
          {required && (
            <Asterisk aria-hidden="true" className="size-3 text-error" />
          )}
        </label>
      )}

      <div className="relative w-full">
        {leftIcon && (
          <span className="pointer-events-none absolute left-3 top-1/2 flex -translate-y-1/2 items-center text-text-soft">
            {leftIcon}
          </span>
        )}

        <input
          id={inputId}
          required={required}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={hasDescription ? descriptionId : undefined}
          className={cn(
            "h-10 w-full rounded-md border border-border bg-surface px-3 text-sm text-text shadow-sm outline-none transition placeholder:text-text-soft",
            "focus:border-primary focus:ring-3 focus:ring-primary-soft",
            "disabled:cursor-not-allowed disabled:bg-surface-muted disabled:text-text-soft",
            error && "border-error focus:border-error focus:ring-error-soft",
            leftIcon && "pl-10",
            rightIcon && "pr-10",
            inputClassName,
          )}
          {...props}
        />

        {rightIcon && (
          <span className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center text-text-soft">
            {rightIcon}
          </span>
        )}
      </div>

      {hasDescription && (
        <p
          id={descriptionId}
          className={cn("text-xs text-text-muted", error && "text-error")}
        >
          {error ?? helperText}
        </p>
      )}
    </div>
  );
};

export type { UiInputProps };
export default UiInput;
