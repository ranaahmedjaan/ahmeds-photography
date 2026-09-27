import { PlaceholderImage } from "@/components/photography/PlaceholderImage";

export function About() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-14 sm:px-10 sm:py-20">
      <h1 className="font-serif text-3xl text-foreground sm:text-4xl">About</h1>

      <div className="mt-12 flex flex-col gap-10 sm:mt-16 sm:flex-row sm:gap-16">
        <div className="sm:w-2/5 sm:shrink-0">
          <PlaceholderImage
            src="/images/portrait.webp"
            alt="Portrait of Ahmed Jaan"
            aspectRatio="1156 / 1542"
            label="PORTRAIT"
            className="w-full"
          />
        </div>

        <div className="max-w-xl sm:pt-1">
          {/* BIO — edit these paragraphs freely. */}
          <div className="space-y-5 font-sans text-base leading-relaxed text-foreground/90 sm:text-lg">
            <p>
              Hi, I&rsquo;m Ahmed Jaan, a student at the University of Toronto
              pursuing a double major in Statistics and Geospatial Data Science,
              along with a minor in Computer Science. I&rsquo;m especially
              interested in ecology, and in how data science, statistics, and
              spatial analysis can be used to better understand environmental
              patterns and natural systems.
            </p>
            <p>
              Outside of academics and coding, one of my biggest interests is
              photography. I enjoy capturing moments, places, and details in
              nature that might otherwise go unnoticed.
            </p>
            <p>
              My photography mainly focuses on landscape and nature
              photography, including open spaces, natural scenery, forests,
              rivers, lakes, skies, and unique landforms. I especially enjoy
              photographing scenes where lighting, weather, and the
              environment come together to create something memorable. For
              me, photography is not only about taking a good-looking
              picture, but also about capturing the atmosphere and feeling of
              a place.
            </p>
            <p>
              I created this portfolio to showcase some of my favourite
              photographs and document my progress as I continue improving my
              photography skills. At the same time, I wanted this website to
              combine two of my interests: photography and computer science.
            </p>
            <p>
              I designed and coded this portfolio myself using TypeScript,
              JavaScript, HTML, CSS, Tailwind CSS, and Vite, allowing me to
              practice my web development skills while building something
              that represents my creativity and interests. As I continue
              learning more about programming and photography, I hope to keep
              improving this website, experimenting with new techniques, and
              adding more of my work.
            </p>
            <p>Thanks for checking out my portfolio!</p>
          </div>

          <div className="mt-12 flex gap-8 border-t border-border/60 pt-8 font-sans text-sm text-muted-foreground">
            <a
              href="https://github.com/ranaahmedjaan"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
