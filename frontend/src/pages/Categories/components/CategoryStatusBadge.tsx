interface ICategoryStatusBadgeProps {
  isActive: boolean;
}

const CategoryStatusBadge = ({ isActive }: ICategoryStatusBadgeProps) => {
  return (
    <span
      className={
        isActive
          ? "inline-flex items-center gap-1.5 rounded-full bg-success-soft px-2.5 py-1 text-xs font-semibold text-success"
          : "inline-flex items-center gap-1.5 rounded-full bg-surface-strong px-2.5 py-1 text-xs font-semibold text-text-muted"
      }
    >
      <span
        aria-hidden="true"
        className={`size-1.5 rounded-full ${isActive ? "bg-success" : "bg-text-soft"}`}
      />
      {isActive ? "Active" : "Inactive"}
    </span>
  );
};

export default CategoryStatusBadge;
