import type { LucideIcon } from "lucide-react";

type ResourcePageProps = {
  title: string;
  description: string;
  emptyTitle: string;
  emptyDescription: string;
  icon: LucideIcon;
};

const ResourcePage = ({
  title,
  description,
  emptyTitle,
  emptyDescription,
  icon: Icon,
}: ResourcePageProps) => {
  return (
    <div>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-heading">
            {title}
          </h2>
          <p className="mt-2 text-base text-text-muted">{description}</p>
        </div>
      </div>

      <section className="mt-5 overflow-hidden rounded-panel border border-border bg-surface shadow-card">
        <div className="flex min-h-72 flex-col items-center justify-center px-6 py-12 text-center">
          <div className="flex size-12 items-center justify-center rounded-xl bg-primary-soft text-primary-strong">
            <Icon className="size-6" />
          </div>
          <h3 className="mt-5 text-lg font-bold text-heading">{emptyTitle}</h3>
          <p className="mt-2 max-w-md text-sm leading-6 text-text-muted">
            {emptyDescription}
          </p>
        </div>
      </section>
    </div>
  );
};

export default ResourcePage;
