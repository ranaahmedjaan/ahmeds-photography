export function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-10">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-serif text-lg text-foreground">Ahmed&rsquo;s Photography</p>
            <p className="mt-1 font-sans text-sm text-muted-foreground">
              Landscape &amp; Nature Photography
            </p>
          </div>

          <div className="flex gap-8 font-sans text-sm text-muted-foreground">
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

        <p className="mt-10 font-sans text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Ahmed&rsquo;s Photography
        </p>
      </div>
    </footer>
  );
}
