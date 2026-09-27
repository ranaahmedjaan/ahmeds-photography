import { useCallback, useEffect, useRef } from "react";
import type { TouchEvent as ReactTouchEvent } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { Photo } from "@/data/photos";
import { PlaceholderImage } from "./PlaceholderImage";

interface LightboxProps {
  photos: Photo[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

/** Minimum horizontal finger travel (px) that counts as a swipe. */
const SWIPE_THRESHOLD = 48;

/** True while the user has pinch-zoomed the page, so one finger is panning rather than swiping. */
function isPinchZoomed() {
  return (window.visualViewport?.scale ?? 1) > 1.01;
}

/**
 * Full-screen, cinematic photo viewer. Built on the shadcn/Radix Dialog
 * primitive (for focus-trapping, Escape-to-close, and screen-reader
 * semantics) but fully restyled to a borderless full-bleed overlay.
 */
export function Lightbox({ photos, index, onClose, onNavigate }: LightboxProps) {
  const photo = photos[index];
  // The one-finger swipe being tracked (null when none). `multiTouch` stays true from
  // the moment a second finger lands until every finger has lifted, so a pinch-zoom —
  // including one that ends on a single finger — can never be read as a swipe.
  const swipe = useRef<{ id: number; x: number; y: number } | null>(null);
  const multiTouch = useRef(false);
  const hasMultiple = photos.length > 1;

  const goPrev = useCallback(() => {
    onNavigate((index - 1 + photos.length) % photos.length);
  }, [index, photos.length, onNavigate]);

  const goNext = useCallback(() => {
    onNavigate((index + 1) % photos.length);
  }, [index, photos.length, onNavigate]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goPrev, goNext]);

  function handleTouchStart(event: ReactTouchEvent) {
    if (event.touches.length === 1) {
      // Only finger on the screen: a fresh gesture.
      const touch = event.touches[0];
      multiTouch.current = false;
      swipe.current = { id: touch.identifier, x: touch.clientX, y: touch.clientY };
    } else {
      multiTouch.current = true;
      swipe.current = null;
    }
  }

  function handleTouchMove(event: ReactTouchEvent) {
    if (event.touches.length > 1) {
      multiTouch.current = true;
      swipe.current = null;
    }
  }

  function handleTouchEnd(event: ReactTouchEvent) {
    // Decide only once the last finger lifts.
    if (event.touches.length > 0) return;
    const start = swipe.current;
    const wasMultiTouch = multiTouch.current;
    swipe.current = null;
    multiTouch.current = false;
    if (!start || wasMultiTouch || isPinchZoomed()) return;

    const end = Array.from(event.changedTouches).find((touch) => touch.identifier === start.id);
    if (!end) return;
    const dx = end.clientX - start.x;
    const dy = end.clientY - start.y;
    if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
      if (dx > 0) goPrev();
      else goNext();
    }
  }

  function handleTouchCancel() {
    swipe.current = null;
    multiTouch.current = false;
  }

  if (!photo) return null;

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent
        showCloseButton={false}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchCancel}
        className="left-0 top-0 h-dvh max-h-none w-screen max-w-none translate-x-0 translate-y-0 gap-0 rounded-none border-none bg-background/[0.98] p-0 shadow-none duration-200 data-[state=closed]:slide-out-to-left-0 data-[state=closed]:slide-out-to-top-0 data-[state=open]:slide-in-from-left-0 data-[state=open]:slide-in-from-top-0 sm:rounded-none"
      >
        <DialogTitle className="sr-only">{photo.title || `Photo ${index + 1}`}</DialogTitle>
        <DialogDescription className="sr-only">{photo.caption || photo.alt}</DialogDescription>

        <DialogPrimitive.Close asChild>
          <button
            type="button"
            aria-label="Close"
            className="absolute right-3 top-3 z-10 p-3 text-foreground/70 transition-colors hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:right-6 sm:top-6"
          >
            <X className="h-6 w-6" strokeWidth={1.25} />
          </button>
        </DialogPrimitive.Close>

        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous photo"
              className="absolute left-0 top-1/2 z-10 -translate-y-1/2 p-3 text-foreground/70 transition-colors hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:left-3"
            >
              <ChevronLeft className="h-8 w-8 sm:h-9 sm:w-9" strokeWidth={1} />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next photo"
              className="absolute right-0 top-1/2 z-10 -translate-y-1/2 p-3 text-foreground/70 transition-colors hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:right-3"
            >
              <ChevronRight className="h-8 w-8 sm:h-9 sm:w-9" strokeWidth={1} />
            </button>
          </>
        )}

        <div className="flex h-full w-full flex-col items-center justify-center px-6 py-16 sm:px-20">
          <div key={photo.id} className="flex w-full flex-1 flex-col items-center justify-center animate-fade-in">
            <PlaceholderImage
              src={photo.src}
              alt={photo.alt}
              aspectRatio={photo.aspectRatio}
              label={`PHOTO ${String(photo.id).padStart(2, "0")}`}
              fit="contain"
              priority
              className="mx-auto max-h-[65vh] w-full max-w-4xl bg-transparent"
            />

            {(photo.title || photo.caption) && (
              <div className="mt-6 max-w-lg px-4 text-center">
                {photo.title && <p className="font-serif text-lg text-foreground">{photo.title}</p>}
                {photo.caption && (
                  <p className="mt-1 font-sans text-sm text-muted-foreground">{photo.caption}</p>
                )}
              </div>
            )}
          </div>

          {hasMultiple && (
            <p className="mt-6 font-sans text-xs tracking-[0.2em] text-muted-foreground">
              {index + 1} / {photos.length}
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
