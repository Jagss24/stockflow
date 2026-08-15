import { cn } from "@/lib/clsx";
import { Switch } from "@headlessui/react";

interface IUiSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
  disabled?: boolean;
  className?: string;
}

const UiSwitch = ({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  className,
}: IUiSwitchProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 rounded-xl border border-border bg-surface-muted/50 p-4",
        className,
      )}
    >
      <div>
        <p className="font-semibold text-heading">{label}</p>
        {description && (
          <p className="mt-0.5 text-sm text-text-muted">{description}</p>
        )}
      </div>
      <Switch
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="group relative inline-flex h-7 w-12 shrink-0 rounded-full bg-border-strong outline-none transition data-checked:bg-primary focus-visible:ring-3 focus-visible:ring-primary-soft disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span className="sr-only">{label}</span>
        <span className="m-1 size-5 rounded-full bg-surface shadow-sm transition-transform group-data-checked:translate-x-5" />
      </Switch>
    </div>
  );
};

export default UiSwitch;
export type { IUiSwitchProps };
