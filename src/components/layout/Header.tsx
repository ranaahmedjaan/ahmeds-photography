import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Page } from "@/App";

const NAV_ITEMS: { page: Page; label: string }[] = [
  { page: "home", label: "Home" },
  { page: "photography", label: "Photography" },
  { page: "about", label: "About" },
];

interface HeaderProps {
  page: Page;
  onNavigate: (page: Page) => void;
}

export function Header({ page, onNavigate }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the mobile menu if the viewport grows into the desktop breakpoint.
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 640) setMenuOpen(false);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function handleNavigate(target: Page) {
    onNavigate(target);
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/95 backdrop-blur-[2px]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-10">
        <button
          type="button"
          onClick={() => handleNavigate("home")}
          className="font-serif text-lg tracking-wide text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:text-xl"
        >
          Ahmed&rsquo;s Photography
        </button>

        <nav aria-label="Primary" className="hidden items-center gap-9 sm:flex">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.page}
              type="button"
              onClick={() => handleNavigate(item.page)}
              aria-current={page === item.page ? "page" : undefined}
              className={cn(
                "font-sans text-sm tracking-wide transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                page === item.page
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground/80",
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="p-2 text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:hidden"
        >
          {menuOpen ? (
            <X className="h-6 w-6" strokeWidth={1.25} />
          ) : (
            <Menu className="h-6 w-6" strokeWidth={1.25} />
          )}
        </button>
      </div>

      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Primary"
          className="border-t border-border/60 bg-background px-6 py-8 sm:hidden"
        >
          <ul className="flex flex-col gap-7">
            {NAV_ITEMS.map((item) => (
              <li key={item.page}>
                <button
                  type="button"
                  onClick={() => handleNavigate(item.page)}
                  aria-current={page === item.page ? "page" : undefined}
                  className={cn(
                    "font-sans text-xl tracking-wide",
                    page === item.page ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
