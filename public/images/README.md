# Adding your photos

This folder holds the production-ready photographs for the site. The 17
initial photos (`photo-01.webp` … `photo-17.webp`) are here and live on the
site already, optimized for the web (resized + re-encoded as WebP — see
"About the current 17 photos" below).

## To replace a photo with a new version

1. Name your image file to match the entry in `src/data/photos.ts`, e.g.
   `photo-01.webp`, `photo-02.webp`, … `photo-17.webp`.
2. Drop it directly in this folder (`public/images/`), overwriting the
   existing file.
3. Refresh the site. No code changes needed.

If a photo referenced in `photos.ts` is ever missing from this folder, the
site automatically falls back to a tasteful numbered placeholder for that
slot instead of showing a broken image.

## To add a brand-new photo (18, 19, 20, …)

1. Add the file here, e.g. `photo-18.webp`.
2. Add a matching entry to the `photos` array in `src/data/photos.ts`
   (copy an existing entry, change the `id` and `src`, fill in the rest).

See the comment block at the top of `src/data/photos.ts` for the full
add / edit / remove / reorder instructions.

## Notes

- Any common image format works (`.webp`, `.jpg`, `.png`, …) — the only
  requirement is that the extension in `src` inside `photos.ts` exactly
  matches the real file's extension (case-sensitive). A `photo-01.webp` on
  disk referenced as `photo-01.jpg` in `photos.ts` will not load.
- Set `aspectRatio` in `photos.ts` to the photo's actual pixel width/height
  (e.g. a 1800×2400 photo is `"1800 / 2400"`) — it keeps the gallery layout
  stable as images load and avoids cropping.
- **This folder is what actually gets committed to Git and deployed** — keep
  it to web-sized files only. Don't drop full camera-resolution originals
  in here (they're unnecessary for display and bloat the repo/deploy size).
  A photo with a ~2000–2400px long edge, re-encoded as WebP at ~80–85%
  quality, is normally indistinguishable from the original in a browser at
  any screen size this site is viewed on, at a fraction of the file size.

## About the current 17 photos

The original camera files (full-resolution, ~127 MiB total) are **not** in
this folder or in Git — they're archived locally outside the project at
`../../../originals-archive/` (i.e. sibling to the project root), so they
stay off GitHub and out of the deployed site while remaining safe. The
copies here were generated from those originals with:

- resized so the long edge is at most 2400px (`fit: "inside"`, no crop, no
  upscaling, aspect ratio preserved exactly)
- EXIF orientation applied to the pixels, then the orientation tag dropped
  (so the image displays right-side-up everywhere without relying on EXIF
  support)
- re-encoded as WebP at quality 85
- resulting in ~11 MiB total for all 17, versus ~127 MiB for the originals

If you replace one of these with a new export from your own originals, aim
for the same ballpark (long edge ≈ 2000–2400px, WebP quality ≈ 80–85) to
keep the site fast.
