import { useMemo, useState } from "react";
import { photos } from "@/data/photos";
import type { Filter } from "@/data/categories";
import { GalleryItem } from "./GalleryItem";
import { CategoryFilter } from "./CategoryFilter";
import { Lightbox } from "./Lightbox";

interface GalleryProps {
  /** Show only the first N photos (used for the homepage preview). */
  limit?: number;
  /** Show the All / Landscape / Nature filter above the grid. */
  showFilter?: boolean;
}

export function Gallery({ limit, showFilter = true }: GalleryProps) {
  const [filter, setFilter] = useState<Filter>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const visible = useMemo(() => {
    const base = filter === "All" ? photos : photos.filter((p) => p.category === filter);
    return typeof limit === "number" ? base.slice(0, limit) : base;
  }, [filter, limit]);

  return (
    <div>
      {showFilter && <CategoryFilter active={filter} onChange={setFilter} />}

      {visible.length > 0 ? (
        <div
          key={filter}
          className="animate-fade-in columns-1 gap-8 sm:columns-2 sm:gap-10 lg:columns-3 xl:columns-4"
        >
          {visible.map((photo, i) => (
            <GalleryItem key={photo.id} photo={photo} index={i} onOpen={setLightboxIndex} priority={i < 4} />
          ))}
        </div>
      ) : (
        <p className="py-16 text-center font-sans text-sm text-muted-foreground">
          No photographs in this category yet.
        </p>
      )}

      {lightboxIndex !== null && (
        <Lightbox
          photos={visible}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </div>
  );
}
