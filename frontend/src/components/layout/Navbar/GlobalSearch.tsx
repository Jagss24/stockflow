import UiInput from "@/components/ui/Input/UiInput";
import { Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { navigationItems } from "../navigation";

const GlobalSearch = () => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return navigationItems;

    return navigationItems.filter((item) =>
      [item.label, item.description, ...item.keywords]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
      }
      if (event.key === "Escape") {
        setOpen(false);
        inputRef.current?.blur();
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("pointerdown", handlePointerDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  const selectResult = (path: string) => {
    navigate(path);
    setQuery("");
    setOpen(false);
    inputRef.current?.blur();
  };

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (results[0]) selectResult(results[0].path);
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <form role="search" onSubmit={handleSubmit}>
        <UiInput
          ref={inputRef}
          type="search"
          value={query}
          aria-label="Search pages"
          aria-expanded={open}
          aria-controls="global-search-results"
          placeholder="Search pages..."
          leftIcon={<Search className="size-4" aria-hidden="true" />}
          rightIcon={
            <kbd className="hidden rounded border border-border bg-surface px-1.5 py-0.5 text-[0.65rem] font-semibold text-text-muted sm:block">
              ⌘K
            </kbd>
          }
          inputClassName="h-10 rounded-lg bg-surface-muted pr-12 font-medium shadow-none hover:border-border-strong focus:bg-surface"
          wrapperClassName="gap-0"
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
        />
      </form>

      {open && (
        <div
          id="global-search-results"
          className="absolute right-0 top-[calc(100%+0.6rem)] z-50 w-full min-w-72 overflow-hidden rounded-xl border border-border bg-surface p-2 shadow-panel"
        >
          <p className="px-3 pb-2 pt-1 text-xs font-bold uppercase tracking-wider text-text-soft">
            {query ? "Search results" : "Quick navigation"}
          </p>
          {results.length > 0 ? (
            <div className="space-y-1">
              {results.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.path}
                    type="button"
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition hover:bg-primary-soft focus:bg-primary-soft focus:outline-none"
                    onClick={() => selectResult(item.path)}
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-surface-muted text-text-muted">
                      <Icon className="size-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-semibold text-heading">
                        {item.label}
                      </span>
                      <span className="block truncate text-sm text-text-muted">
                        {item.description}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="px-3 py-8 text-center">
              <p className="font-semibold text-heading">No pages found</p>
              <p className="mt-1 text-sm text-text-muted">
                Try searching for a different workspace area.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GlobalSearch;
