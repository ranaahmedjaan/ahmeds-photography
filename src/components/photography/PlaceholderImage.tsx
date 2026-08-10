import { useState } from "react";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlaceholderImageProps {
  src: string;
  alt: string;
  /** CSS aspect-ratio, e.g. "3 / 2". Sizes the box before/without a real photo. */
  aspectRatio: string;
  /** Short label shown on the placeholder, e.g. "PHOTO 01" or "PORTRAIT". */
  label: string;
  className?: string;
  /** "cover" fills the box (gallery tiles). "contain" never crops (lightbox). */
  fit?: "cover" | "contain";
  /** Skip lazy loading for above-the-fold images. */
  priority?: boolean;
}

/**
 * Renders a photo from `src`, or an understated placeholder if that file
 * doesn't exist yet. As soon as a real file is dropped into public/images/
 * with a matching name, this automatically swaps the placeholder for the
 * real photo — no code changes required.
 */
export function PlaceholderImage({
  src,
  alt,
  aspectRatio,
  label,
  className,
  fit = "cover",
  priority = false,
}: PlaceholderImageProps) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");

  return (
    <div
      className={cn("relative w-full overflow-hidden bg-surface", className)}
      style={{ aspectRatio }}
    >
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setStatus("loaded")}
        onError={() => setStatus("error")}
        className={cn(
          "h-full w-full transition-opacity duration-700 ease-out",
          fit === "cover" ? "object-cover" : "object-contain",
          status === "loaded" ? "opacity-100" : "opacity-0",
        )}
      />

      {status !== "loaded" && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2 border border-border/60 px-6 text-center"
        >
          <ImageIcon className="h-5 w-5 text-muted-foreground/40" strokeWidth={1.25} />
          <span className="font-sans text-xs tracking-[0.25em] text-muted-foreground">
            {label}
          </span>
          <span className="max-w-[16rem] font-sans text-[11px] leading-relaxed text-muted-foreground">
            Replace with {src}
          </span>
        </div>
      )}
    </div>
  );
}
