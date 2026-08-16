import type { LucideIcon } from "lucide-react";

interface IUiSummaryCardProps {
  icon: LucideIcon;
  label: string;
  value?: number;
}

const UiSummaryCard = ({ icon: Icon, label, value }: IUiSummaryCardProps) => (
  <article className="flex min-h-20 items-center gap-4 rounded-xl border border-border bg-surface px-5 py-4 shadow-card">
    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
      <Icon className="size-5" aria-hidden="true" />
    </span>
    <div className="min-w-0">
      <p className="text-sm font-medium text-text-muted">{label}</p>
      <p className="mt-0.5 text-lg font-bold tracking-tight text-heading">
        {value ?? "—"}
      </p>
    </div>
  </article>
);

export default UiSummaryCard;
