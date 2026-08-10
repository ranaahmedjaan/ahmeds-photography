import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Home } from "@/pages/Home";
import { Photography } from "@/pages/Photography";
import { About } from "@/pages/About";

export type Page = "home" | "photography" | "about";

const PAGES: Page[] = ["home", "photography", "about"];

function pageFromHash(): Page {
  const hash = window.location.hash.replace("#", "");
  return (PAGES as string[]).includes(hash) ? (hash as Page) : "home";
}

function App() {
  const [page, setPage] = useState<Page>(() => pageFromHash());

  // Keep the page in sync with the URL hash so back/forward and
  // refresh behave sensibly, without pulling in a router dependency.
  useEffect(() => {
    function handleHashChange() {
      setPage(pageFromHash());
    }
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [page]);

  function navigate(next: Page) {
    setPage(next);
    window.location.hash = next === "home" ? "" : next;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:text-foreground focus:ring-2 focus:ring-ring"
      >
        Skip to content
      </a>

      <Header page={page} onNavigate={navigate} />

      <main id="main-content" className="flex-1">
        {page === "home" && <Home onNavigate={navigate} />}
        {page === "photography" && <Photography />}
        {page === "about" && <About />}
      </main>

      <Footer />
    </div>
  );
}

export default App;
