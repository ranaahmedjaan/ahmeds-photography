import type { Page } from "@/App";
import { Gallery } from "@/components/photography/Gallery";

interface HomeProps {
  onNavigate: (page: Page) => void;
}

export function Home({ onNavigate }: HomeProps) {
  return (
    <div>
      <section className="mx-auto flex max-w-3xl flex-col items-center px-6 pb-16 pt-16 text-center sm:pb-24 sm:pt-24">
        <h1 className="animate-fade-in-up font-serif text-4xl leading-[1.1] text-foreground sm:text-5xl md:text-6xl">
          Ahmed&rsquo;s Photography
        </h1>
        <p className="mt-5 font-sans text-base tracking-wide text-muted-foreground sm:text-lg">
          Landscape &amp; Nature Photography
        </p>
        <p className="mt-6 max-w-lg font-sans text-sm leading-relaxed text-muted-foreground sm:text-base">
          Exploring landscapes, light, and the natural world through photography.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 sm:px-10 sm:pb-32">
        <div className="mb-10 flex items-end justify-between gap-4 sm:mb-14">
          <h2 className="font-serif text-2xl text-foreground sm:text-3xl">Photography</h2>
          <button
            type="button"
            onClick={() => onNavigate("photography")}
            className="shrink-0 font-sans text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            View all &rarr;
          </button>
        </div>

        <Gallery limit={6} showFilter={false} />
      </section>
    </div>
  );
}
