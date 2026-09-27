import type { Category } from "./categories";

export interface Photo {
  id: number;
  /** Path to the image file, served from /public/images. */
  src: string;
  /** Optional short title shown under the photo. Leave "" to omit. */
  title: string;
  /** Understated one-line caption shown under the photo. Leave "" to omit. */
  caption: string;
  category: Category;
  /** Accessibility + SEO description of the photo. Always required. */
  alt: string;
  /**
   * CSS aspect-ratio ("width / height") for the photo. Keeps the gallery
   * from jumping around as images load. Match this to the real photo's
   * actual pixel dimensions — e.g. a 3024x4032 image is "3024 / 4032".
   */
  aspectRatio: string;
}

/**
 * ============================================================
 *  PHOTOGRAPHY DATA — single source of truth for the whole site
 * ============================================================
 *
 * The gallery, the homepage preview, and the lightbox all render
 * from this array. Nothing else in the codebase should hardcode a
 * photo — this is the only file you should need to touch to manage
 * the portfolio's content.
 *
 * ADD A NEW PHOTO
 *   1. Drop the file in `public/images/` as the next number in
 *      sequence, e.g. `photo-18.webp` (see public/images/README.md).
 *      Any common image format works (.webp, .jpg, .png, ...) as
 *      long as the extension below matches the real file exactly.
 *      WebP is recommended — see the README for how the current 17
 *      were generated (resized + re-encoded from the originals).
 *   2. Copy one of the objects below, set `id: 18`, and set
 *      `src: "/images/photo-18.webp"` (or whatever extension you used).
 *   3. Fill in `title` (optional — leave "" to hide it), `caption`,
 *      `category`, `alt`, and `aspectRatio` (use the photo's real
 *      width/height so the layout doesn't shift as it loads).
 *   4. Save. It appears in the gallery automatically — no other
 *      file needs to change.
 *
 * EDIT A PHOTO
 *   Change the matching object's fields below — `src` to swap the
 *   image itself, or `title` / `caption` / `category` / `alt`.
 *
 * REMOVE A PHOTO
 *   Delete its object from the array below.
 *
 * REORDER PHOTOS
 *   The gallery renders in array order — move entries up or down.
 *
 * If `src` doesn't point at a file that exists yet, that photo renders
 * as a tasteful numbered placeholder (see
 * src/components/photography/PlaceholderImage.tsx) until you add one —
 * no code changes needed once the real file shows up.
 */
export const photos: Photo[] = [
  {
    id: 1,
    src: "/images/photo-01.webp",
    title: "",
    caption: "The last light of day fades into soft shades of pink and violet over the horizon.",
    category: "Landscape",
    alt: "Sunset sky with pink and violet colours over the horizon.",
    aspectRatio: "2400 / 1800",
  },
  {
    id: 2,
    src: "/images/photo-02.webp",
    title: "",
    caption:
      "A pastel evening sky settles over distant mountains as the road stretches toward the horizon.",
    category: "Landscape",
    alt: "Pastel-coloured evening sky over distant mountains with a road leading toward the horizon.",
    aspectRatio: "1800 / 2400",
  },
  {
    id: 3,
    src: "/images/photo-03.webp",
    title: "",
    caption:
      "Golden sunlight breaks through the trees, bathing the surrounding greenery in a warm evening glow.",
    category: "Nature",
    alt: "Sunlight breaking through trees onto green foliage in the evening.",
    aspectRatio: "1800 / 2400",
  },
  {
    id: 4,
    src: "/images/photo-04.webp",
    title: "",
    caption: "Endless blue water meets a sea of green beneath a clear summer sky.",
    category: "Landscape",
    alt: "A body of blue water bordered by green land under a clear sky.",
    aspectRatio: "1800 / 2400",
  },
  {
    id: 5,
    src: "/images/photo-05.webp",
    title: "",
    caption: "Power and serenity collide as turquoise waters carve their way through towering cliffs.",
    category: "Landscape",
    alt: "Turquoise river water flowing through a canyon between tall cliffs.",
    aspectRatio: "1800 / 2400",
  },
  {
    id: 6,
    src: "/images/photo-06.webp",
    title: "",
    caption: "Crystal-blue water gently meets the rugged shoreline, revealing the textures beneath the surface.",
    category: "Nature",
    alt: "Clear blue water meeting a rocky shoreline.",
    aspectRatio: "1800 / 2400",
  },
  {
    id: 7,
    src: "/images/photo-07.webp",
    title: "",
    caption: "A lone signpost stands beneath an endless blue sky, pointing toward journeys yet to come.",
    category: "Landscape",
    alt: "A signpost standing against a bright blue sky.",
    aspectRatio: "1800 / 2400",
  },
  {
    id: 8,
    src: "/images/photo-08.webp",
    title: "",
    caption: "A winding road disappears into the stillness of a freshly snow-covered landscape.",
    category: "Landscape",
    alt: "A winding road through a snow-covered landscape.",
    aspectRatio: "1800 / 2400",
  },
  {
    id: 9,
    src: "/images/photo-09.webp",
    title: "",
    caption: "A quiet forest rests beneath a blanket of untouched winter snow.",
    category: "Nature",
    alt: "A forest covered in fresh winter snow.",
    aspectRatio: "1800 / 2400",
  },
  {
    id: 10,
    src: "/images/photo-10.webp",
    title: "",
    caption: "Warm architecture contrasts against the cold stillness of a Canadian winter.",
    category: "Landscape",
    alt: "Buildings with warm-toned architecture in a snowy winter setting.",
    aspectRatio: "1800 / 2400",
  },
  {
    id: 11,
    src: "/images/photo-11.webp",
    title: "",
    caption: "A delicate crescent moon emerges through drifting clouds in the darkness above.",
    category: "Nature",
    alt: "A crescent moon visible through drifting clouds at night.",
    aspectRatio: "1800 / 2400",
  },
  {
    id: 12,
    src: "/images/photo-12.webp",
    title: "",
    caption: "Moonlight glows through a hazy night sky above wild grasses and distant evergreens.",
    category: "Nature",
    alt: "A hazy night sky with moonlight over grasses and evergreen trees.",
    aspectRatio: "1800 / 2400",
  },
  {
    id: 13,
    src: "/images/photo-13.webp",
    title: "",
    caption: "A solitary tree glows beneath the moon, standing vivid against the darkness of night.",
    category: "Nature",
    alt: "A solitary tree lit by moonlight against a dark night sky.",
    aspectRatio: "1800 / 2400",
  },
  {
    id: 14,
    src: "/images/photo-14.webp",
    title: "",
    caption: "Moonlight filters through the clouds as the treetops reach toward the night sky.",
    category: "Nature",
    alt: "Moonlight filtering through clouds above treetops at night.",
    aspectRatio: "1800 / 2400",
  },
  {
    id: 15,
    src: "/images/photo-15.webp",
    title: "",
    caption: "The setting sun burns along the horizon, casting a final orange glow across the field.",
    category: "Landscape",
    alt: "The sun setting over an open field, casting an orange glow.",
    aspectRatio: "1800 / 2400",
  },
  {
    id: 16,
    src: "/images/photo-16.webp",
    title: "",
    caption: "Sunlit trees and blooming flowers bring a quiet garden landscape to life.",
    category: "Nature",
    alt: "Sunlit trees and flowers in a garden landscape.",
    aspectRatio: "1800 / 2400",
  },
  {
    id: 17,
    src: "/images/photo-17.webp",
    title: "",
    caption: "Soft evening colours reflect across calm water as the landscape settles into dusk.",
    category: "Landscape",
    alt: "Calm water reflecting soft evening colours at dusk.",
    aspectRatio: "1800 / 2400",
  },
  {
    id: 18,
    src: "/images/photo-18.webp",
    title: "",
    caption: "Moonlit grass glows softly beneath a deep blue night sky.",
    category: "Nature",
    alt: "Grass lit by moonlight under a deep blue night sky.",
    aspectRatio: "3024 / 4032",
  },
  {
    id: 19,
    src: "/images/photo-19.webp",
    title: "",
    caption: "A lone duck glides through calm water, leaving gentle ripples behind.",
    category: "Nature",
    alt: "A duck swimming across calm water, leaving ripples behind it.",
    aspectRatio: "2826 / 3768",
  },
  {
    id: 20,
    src: "/images/photo-20.webp",
    title: "",
    caption: "A glowing Ferris wheel reflects across the still waterfront at dusk.",
    category: "Landscape",
    alt: "An illuminated Ferris wheel reflected in the water at dusk.",
    aspectRatio: "4284 / 5712",
  },
  {
    id: 21,
    src: "/images/photo-21.webp",
    title: "",
    caption: "Historic stone architecture overlooks a garden bright with summer flowers.",
    category: "Landscape",
    alt: "A historic stone building above a garden full of summer flowers.",
    aspectRatio: "5712 / 4284",
  },
  {
    id: 22,
    src: "/images/photo-22.webp",
    title: "",
    caption: "A grand château rises dramatically into the rich blue evening sky.",
    category: "Landscape",
    alt: "A large château against a deep blue evening sky.",
    aspectRatio: "4004 / 5339",
  },
  {
    id: 23,
    src: "/images/photo-23.webp",
    title: "",
    caption: "City lights shimmer along the river beneath a violet twilight sky.",
    category: "Landscape",
    alt: "City lights along a river under a violet twilight sky.",
    aspectRatio: "2834 / 3778",
  },
  {
    id: 24,
    src: "/images/photo-24.webp",
    title: "",
    caption: "A distant château glows like a beacon against the darkened night.",
    category: "Landscape",
    alt: "A lit château in the distance at night.",
    aspectRatio: "3456 / 4608",
  },
  {
    id: 25,
    src: "/images/photo-25.webp",
    title: "",
    caption: "Colourful umbrellas float above the narrow street like a suspended rainbow.",
    category: "Landscape",
    alt: "Colourful umbrellas suspended above a narrow street.",
    aspectRatio: "2604 / 3473",
  },
  {
    id: 26,
    src: "/images/photo-26.webp",
    title: "",
    caption:
      "Warm city lights spill across the street as evening settles over the old buildings.",
    category: "Landscape",
    alt: "A street lined with old buildings, lit by warm lights in the evening.",
    aspectRatio: "2522 / 3362",
  },
  {
    id: 27,
    src: "/images/photo-27.webp",
    title: "",
    caption: "Moonlight stretches across the quiet water in a silver path toward the horizon.",
    category: "Nature",
    alt: "Moonlight reflecting on calm water toward the horizon.",
    aspectRatio: "2802 / 3737",
  },
  {
    id: 28,
    src: "/images/photo-28.webp",
    title: "",
    caption: "Golden branches glow against the darkness beneath a softly clouded sky.",
    category: "Nature",
    alt: "Tree branches glowing gold against a dark, cloudy night sky.",
    aspectRatio: "2975 / 3967",
  },
  {
    id: 29,
    src: "/images/photo-29.webp",
    title: "",
    caption: "Dry grasses shimmer warmly beneath the deep blue stillness of night.",
    category: "Nature",
    alt: "Dry grasses lit warmly under a deep blue night sky.",
    aspectRatio: "3024 / 4032",
  },
];
