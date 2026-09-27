# Deployment Readiness Report — Ahmed's Photography

**Audit date:** 2026-08-10
**Project root:** the `ahmeds-photography/` folder
(contains `package.json`, `src/`, `public/`, `vite.config.ts` directly — this
is the correct repository root. Run `git init` **inside this folder**, not
its parent `photography portfolio/` folder.)

## READY FOR GITHUB: YES

All blocking issues found during this audit were fixed and re-verified after
fixing. See "Fixes made" below.

---

## Build & install

| Check | Result |
|---|---|
| Package manager | **pnpm** (`pnpm-lock.yaml` present — no `package-lock.json`, so literal `npm ci` fails; confirmed by actually running it) |
| Clean reinstall (`pnpm install --frozen-lockfile` from empty `node_modules`) | ✅ PASS (exit 0) |
| `pnpm run lint` (oxlint) | ✅ PASS (exit 0; 5 harmless warnings, all inside unused shadcn/ui scaffold files under `src/components/ui/`, not app code) |
| Typecheck (`tsc -b`, part of `build`) | ✅ PASS, zero errors |
| `pnpm run build` (`tsc -b && vite build`) | ✅ PASS, zero errors |
| `npm test` | Not run — no `test` script exists in `package.json`; not invented |
| Env var dependencies | None found (`import.meta.env` / `process.env` unused in `src/`) |

## Photographs

- **17 / 17** working, all confirmed loading with correct pixel dimensions, zero broken images, zero leftover placeholders
- **Landscape: 9, Nature: 8** (verified programmatically from `photos.ts` and via the live filter UI)
- Captions verified to match the provided text exactly (all 17)
- Format: **WebP** (originals were JPEG-encoded data with misleading `.png` extensions — confirmed via raw magic-byte inspection, not just the `file` utility)
- Conversion: resized to a **2400px max long edge** (`fit: inside`, no crop, no distortion, no upscaling), EXIF orientation baked into pixels then the orientation tag dropped, re-encoded at **WebP quality 85**
- Aspect ratio preserved to within 0.014% on every photo (integer-pixel rounding only)
- **Total production image size: ~11 MiB** (11,364,988 bytes) for all 17, down from ~127.4 MiB originals (**91.5% reduction**)
- **Largest individual image: `photo-16.webp`, ~1.26 MiB** (1,316,898 bytes) — 23.7 MiB under Cloudflare Pages' 25 MiB per-asset limit
- Original full-resolution files preserved at `../originals-archive/` (sibling to the project, outside Git) — verified byte-identical to the source files via MD5 checksum before the originals were removed from `public/images/`

## Routing

- Client-side hash routing (`window.location.hash`), no History-API router — the server only ever receives `GET /`, confirmed via network-request inspection (zero redirects)
- Direct-load and hard-reload tested on the actual production build (`vite preview`) for `/`, `/#photography`, `/#about` — all correct
- **No `_redirects` / SPA-fallback file is needed** for this project — that mechanism only matters for path-based routers requesting literal sub-paths like `/about` from the server, which this app never does

## Gallery & lightbox (tested on the production build, not `npm run dev`)

- All/Landscape/Nature filters: **17 / 9 / 8** exactly, confirmed via UI clicks and repeated cycling (6-step sequence), zero duplicates, zero missing items
- Lightbox: open, close (button + Escape), previous, next, first↔last wraparound, arrow-key navigation, and filter-scoped navigation (lightbox only cycles through the currently filtered set) — all verified via real interaction
- No broken images in the lightbox at any point

## Responsive testing (production build)

Tested at 375, 390, 430, 768, 1024, 1440px: zero horizontal overflow at every width, gallery columns progress 1→2→3→4 as expected, mobile nav menu opens/closes/navigates correctly, About page stacks correctly on mobile and goes two-column on desktop.

## Accessibility

- All 17 gallery images (and the About portrait placeholder) have real, non-empty `alt` text
- Every page has exactly one `<h1>`, correct heading order, no skipped levels
- All interactive controls are real `<button>`/`<a>` elements (zero non-semantic clickable `div`/`span` found)
- Skip-to-content link present and functional
- **Found and fixed 6 genuine WCAG AA contrast failures**: several secondary-text elements used partial-opacity muted colors that measured 1.85–3.06:1 against the charcoal background (below the 4.5:1 required for normal-size text) — the gallery category label, lightbox photo counter, footer copyright line, both lines of placeholder text, and the homepage hero description. Fixed by using the full-strength muted-foreground color (measured 6.16:1) instead of the reduced-opacity variants. Verified by measured contrast computation before and after, not assumption.

## Fonts & external resources

- Google Fonts (Playfair Display, Work Sans) load correctly in production — confirmed via `document.fonts.status === "loaded"` (28 font faces) and the computed `font-family` on rendered text
- Fallback chain configured (`ui-serif, Georgia, serif` / `ui-sans-serif, system-ui, sans-serif`) in case the CDN is ever unreachable
- Favicon is a self-contained inline `data:` URI SVG — cannot 404
- No other third-party scripts, CDNs, or trackers

## Meta / title

- Title: `Ahmed's Photography | Landscape & Nature Photography` ✅
- Description: `A photography portfolio by Ahmed featuring landscape and nature photography.` ✅
- Viewport meta present, `lang="en"` set, single title tag
- `og:image` enabled (previously commented out because no real photo existed yet) — now points at `/images/photo-01.webp`

## Console / network

Zero console errors and zero failed/404 requests observed across the entire testing session on the production build. One documented non-issue: Vite's **preview server only** (not Cloudflare) returns `200 text/html` instead of a real `404` for the still-unfilled About-page portrait placeholder — this doesn't affect the app (the `<img>` still fails to parse the response as image data and shows the graceful placeholder either way), and Cloudflare Pages returns genuine 404s for missing assets, producing the identical correct outcome.

## What could NOT be verified

- Actual behavior on Cloudflare Pages itself (no live Cloudflare account/deployment available from this environment). The build-command/root-directory recommendations below are based on inspecting this project's real configuration plus Cloudflare's documented lockfile-based package-manager detection — flagged explicitly rather than presented as tested.
- The real GitHub push/PR/connect-to-Cloudflare workflow — out of scope per your explicit instructions not to push or create anything remote.

## Cloudflare Pages settings

| Setting | Value | Note |
|---|---|---|
| Production branch | `main` | As planned — nothing in the project requires a different branch name |
| Build command | `pnpm install && pnpm run build` | **Corrected from the assumed `npm run build`.** This project uses pnpm (`pnpm-lock.yaml`, no `package-lock.json` — confirmed `npm ci` fails outright). Cloudflare auto-detects pnpm from the lockfile for its install step, so plain `npm run build` would likely also work, but this explicit form removes all ambiguity. |
| Build output directory | `dist` | Confirmed via actual build inspection |
| Root directory | *(blank / repo root)* | Correct **only if you `git init` inside `ahmeds-photography/` itself**, not its parent folder |

## Git readiness

- `.gitignore` updated: added `.parcel-cache/`, `bundle.html` (with an explanatory comment — it's a generated artifact from the optional single-file workflow, not the deployment target), `.env*` patterns, OS junk files, on top of the existing `node_modules`/`dist`/logs/editor exclusions
- Verified (via a temporary `git init` → `git add .` → `git status`, then removed again so `git init` is genuinely your first step): **92 files** would be staged — all source code, all 17 production WebP photos, configs, `package.json`, `pnpm-lock.yaml`. `node_modules`, `dist`, `.parcel-cache`, and `bundle.html` correctly excluded.
- Secret scan across every staged file: **none found** (API keys, tokens, passwords, private keys, absolute Windows paths all checked)
- Largest staged file: 1.32 MiB — 76× under GitHub's 100 MB limit
- Total staged content: ~11.7 MB

## Fixes made during this audit

1. Converted all 17 photos from JPEG-encoded `.png` files (~127.4 MiB) to properly-encoded WebP (~11 MiB), resized to a sane web-delivery resolution, originals archived safely outside the project and outside Git
2. Updated `src/data/photos.ts`: all 17 `src` paths and `aspectRatio` values to match the new WebP files
3. Updated `public/images/README.md` for the WebP-based workflow
4. Enabled the `og:image` meta tag (previously disabled because no real photo existed yet)
5. Fixed 6 genuine WCAG AA text-contrast failures (see Accessibility above)
6. Removed the temporary `sharp` devDependency (only needed for the one-time conversion, not for building/running the site)
7. Updated `.gitignore` for a clean, correct Git commit
8. Removed the disposable 57 MB `.parcel-cache/` directory (regenerates automatically if you rebuild `bundle.html` later)

## Anything still needed before GitHub

Nothing code- or config-related. The remaining steps are the ones only you can take:

```bash
cd ahmeds-photography
git init
git add .
git status
git commit -m "Initial Ahmed's Photography portfolio"
```

Then push to GitHub and connect the repo to Cloudflare Pages using the
settings table above.
