import { cn } from "@/lib/clsx";
import { Asterisk } from "lucide-react";
import { useId } from "react";
import type { ComponentPropsWithRef } from "react";

type TUiTextareaProps = ComponentPropsWithRef<"textarea"> & {
  label?: string;
  error?: string;
  helperText?: string;
  textareaClassName?: string;
};

const UiTextarea = ({
  id,
  label,
  error,
  helperText,
  className,
  textareaClassName,
  required,
  ...props
}: TUiTextareaProps) => {
  const generatedId = useId();
  const textareaId = id ?? generatedId;
  const descriptionId = `${textareaId}-description`;
  const hasDescription = Boolean(error || helperText);

  return (
    <div className={cn("flex w-full flex-col gap-1.5", className)}>
      {label && (
        <label
          htmlFor={textareaId}
          className="flex items-center gap-1.5 text-sm font-medium text-heading"
        >
          {label}
          {required && <Asterisk className="size-3 text-error" />}
        </label>
      )}
      <textarea
        id={textareaId}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={hasDescription ? descriptionId : undefined}
        className={cn(
          "min-h-28 w-full resize-y rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-text shadow-sm outline-none transition placeholder:text-text-soft",
          "focus:border-primary focus:ring-3 focus:ring-primary-soft disabled:cursor-not-allowed disabled:bg-surface-muted disabled:text-text-soft",
          error && "border-error focus:border-error focus:ring-error-soft",
          textareaClassName,
        )}
        {...props}
      />
      {hasDescription && (
        <p
          id={descriptionId}
          className={cn("text-xs text-text-muted", error && "text-error!")}
        >
          {error ?? helperText}
        </p>
      )}
    </div>
  );
};

export default UiTextarea;
export type { TUiTextareaProps };
