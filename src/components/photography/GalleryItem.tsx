import type { Photo } from "@/data/photos";
import { PlaceholderImage } from "./PlaceholderImage";

interface GalleryItemProps {
  photo: Photo;
  index: number;
  onOpen: (index: number) => void;
  priority?: boolean;
}

export function GalleryItem({ photo, index, onOpen, priority }: GalleryItemProps) {
  return (
    <div className="mb-8 break-inside-avoid sm:mb-10">
      <button
        type="button"
        onClick={() => onOpen(index)}
        aria-label={`Open ${photo.title || `photo ${index + 1}`} in full screen`}
        className="group block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <PlaceholderImage
          src={photo.src}
          alt={photo.alt}
          aspectRatio={photo.aspectRatio}
          label={`PHOTO ${String(photo.id).padStart(2, "0")}`}
          priority={priority}
          className="transition-opacity duration-300 ease-out group-hover:opacity-90"
        />

        {(photo.title || photo.caption) && (
          <div className="mt-3 flex items-start justify-between gap-4">
            <div className="min-w-0">
              {photo.title && (
                <p className="truncate font-sans text-sm text-foreground/90">{photo.title}</p>
              )}
              {photo.caption && (
                <p className="mt-0.5 truncate font-sans text-xs text-muted-foreground">
                  {photo.caption}
                </p>
              )}
            </div>
            <span className="shrink-0 pt-px font-sans text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
              {photo.category}
            </span>
          </div>
        )}
      </button>
    </div>
  );
}
