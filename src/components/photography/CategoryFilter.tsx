import { FILTERS, type Filter } from "@/data/categories";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  active: Filter;
  onChange: (filter: Filter) => void;
}

export function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  return (
    <div
      role="group"
      aria-label="Filter photography by category"
      className="mb-10 flex flex-wrap items-center gap-6 sm:mb-14 sm:gap-8"
    >
      {FILTERS.map((filter) => {
        const isActive = filter === active;
        return (
          <button
            key={filter}
            type="button"
            onClick={() => onChange(filter)}
            aria-pressed={isActive}
            className={cn(
              "group py-1 font-sans text-sm tracking-wide transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground/80",
            )}
          >
            {filter}
            <span
              className={cn(
                "mt-1 block h-px bg-accent transition-all duration-200",
                isActive ? "w-full" : "w-0 group-hover:w-1/2",
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
