import { Gallery } from "@/components/photography/Gallery";

export function Photography() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-14 sm:px-10 sm:py-20">
      <header className="mb-12 max-w-2xl sm:mb-16">
        <h1 className="font-serif text-3xl text-foreground sm:text-4xl">Photography</h1>
        <p className="mt-4 font-sans text-sm leading-relaxed text-muted-foreground sm:text-base">
          A collection of landscape and nature photographs.
        </p>
      </header>

      <Gallery />
    </div>
  );
}
