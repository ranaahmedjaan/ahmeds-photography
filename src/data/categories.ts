/**
 * The full set of photography categories.
 *
 * To add a new category later (e.g. "Wildlife"), just add it to this
 * array — the gallery filter and the TypeScript types for `photos.ts`
 * pick it up automatically, nothing else needs to change.
 */
export const CATEGORIES = ["Landscape", "Nature"] as const;

export type Category = (typeof CATEGORIES)[number];

/** Filter options shown above the gallery: "All" plus every category. */
export const FILTERS = ["All", ...CATEGORIES] as const;

export type Filter = (typeof FILTERS)[number];
