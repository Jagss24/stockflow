import type { LucideIcon } from "lucide-react";

interface ICategorySummaryCardProps {
  icon: LucideIcon;
  label: string;
  value?: number;
  helperText?: string;
}

const CategorySummaryCard = ({
  icon: Icon,
  label,
  value,
  helperText,
}: ICategorySummaryCardProps) => {
  return (
    <article className="flex min-h-20 items-center gap-4 rounded-xl border border-border bg-surface px-5 py-4 shadow-card">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-medium text-text-muted">{label}</p>
        <p className="mt-0.5 text-lg font-bold tracking-tight text-heading">
          {value ?? "—"}
        </p>
        {helperText && (
          <p className="mt-0.5 truncate text-xs text-text-soft">{helperText}</p>
        )}
      </div>
    </article>
  );
};

export default CategorySummaryCard;
