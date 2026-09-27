# Photos for Ahmed's Photography

This folder (`public/images/`) holds every photograph shown on the website,
plus the About page portrait (`portrait.webp`). The site currently has
**29 photos**: `photo-01.webp` … `photo-29.webp`.

Everything in this folder is published with the website, so only put
finished, web-ready photos here.

---

## How to Add a New Photo

You only ever need to touch **two things**: this folder, and one file of
photo data. The gallery, filters, lightbox, and home page all update
themselves automatically.

The example below adds the next photo, **photo 30**.

### Step 1 — Prepare the image

- **Use WebP** (`.webp`). It keeps photos sharp at a fraction of the size of
  JPEG or PNG, which makes the site load quickly on phones.
- **Resize it** so the longest side is roughly **2000–2400 pixels**. Camera
  originals (4000–6000 px) look no better on screen and only slow the site
  down.
- **Remove location data.** Phone photos usually contain the GPS coordinates
  of where they were taken, and anyone can read them from a published image.

An easy free tool that does all three at once is **Squoosh**
(<https://squoosh.app>), which runs in your browser:

1. Drag your photo onto the page.
2. On the right-hand side, set the format to **WebP** and quality to about
   **80–85**.
3. Turn on **Resize** and set the longer side to about **2400**.
4. Click the download button.

Squoosh re-encodes the image, which leaves the location data behind. You can
also stop location tagging at the source: turn off location for your phone's
camera app, or switch off "Location" in the share options when you send a
photo to your computer.

### Step 2 — Name it and put it in this folder

Photos are numbered in order with **two digits**: `photo-01`, `photo-02`, …
`photo-29`. The next photo is simply the next number:

```
public/images/photo-30.webp
```

Use lowercase letters and keep the `.webp` extension exactly as it is.
Windows doesn't care about capital letters in file names, but the live
website does, so `photo-30.WEBP` would show up on your computer and then
appear broken online.

### Step 3 — Find the photo's width and height

Drag the image file into Google Chrome. The browser tab shows its size,
for example:

```
photo-30.webp (3024×4032)
```

That means it is **3024 wide** and **4032 tall**. You'll use these two numbers
in the next step.

### Step 4 — Add an entry to the photo list

Open this file in your code editor:

```
src/data/photos.ts
```

Scroll to the **very bottom**. The last entry looks like this:

```ts
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
```

Copy that whole block (from `{` to `},`), paste it directly **after** it and
**before** the closing `];`, then edit it for your new photo:

```ts
  {
    id: 30,
    src: "/images/photo-30.webp",
    title: "",
    caption: "Your one-sentence caption goes here.",
    category: "Landscape",
    alt: "A short, plain description of what the photo shows.",
    aspectRatio: "3024 / 4032",
  },
];
```

Save the file. That's it — the photo now appears in the gallery.

### What each field means

| Field | What it does | Example |
|---|---|---|
| `id` | A unique number for the photo. Use the next unused number. Two photos must never share an `id`. | `30` |
| `src` | Where the image file is. Always starts with `/images/` and must match the file name **exactly**, including `.webp`. | `"/images/photo-30.webp"` |
| `title` | Optional heading shown above the caption. Leave it as `""` to show no title (this is how all current photos are set up). | `""` |
| `caption` | The short sentence shown under the photo and in the full-screen viewer. | `"Morning fog drifts across the lake."` |
| `category` | Which filter button the photo belongs to. Must be spelled exactly `"Landscape"` or `"Nature"`. | `"Nature"` |
| `alt` | A plain description of the photo for people using screen readers, and shown if the image ever fails to load. Describe what's in the picture, not how it feels. | `"Fog over a lake at sunrise."` |
| `aspectRatio` | The photo's width and height, written as `"width / height"`. It reserves the right amount of space so the page doesn't jump while photos load, and stops photos from being cropped. | `"3024 / 4032"` |

### How to set `aspectRatio`

Write the width and height from Step 3 with a slash between them:

- A photo that is 3024 wide and 4032 tall (upright/portrait) → `"3024 / 4032"`
- A photo that is 5712 wide and 4284 tall (sideways/landscape) → `"5712 / 4284"`

Width always comes first. If you get these the wrong way round, the photo's
gallery tile will be the wrong shape and parts of the photo will be cut off.

### How to choose Landscape or Nature

- **Landscape** — a wider scene or place: skylines, streets, buildings,
  roads, horizons, waterfronts, sunsets over open land.
- **Nature** — the natural world up close: plants, trees, grass, animals,
  water textures, the moon and night sky.

When a photo could fit both, pick whichever you'd want someone to find it
under when they click that filter.

### How to write a caption

Keep it to one sentence, written inside the double quotes:

```ts
caption: "Morning fog drifts slowly across the still lake.",
```

Apostrophes are fine (`"The lake's edge at dawn."`). If you ever need a
double quote inside the caption, put a backslash before it: `\"`.

---

## How to Remove a Photo

1. In `src/data/photos.ts`, delete that photo's whole block, from its `{` to
   its `},`.
2. Delete the image file from this folder.

Do both. If you only delete the file, the site shows a grey "PHOTO 30"
placeholder where it used to be. If you only delete the entry, the photo
disappears from the site but the file is still published.

You don't need to renumber the other photos. Gaps in the `id` numbers are
fine.

## How to Reorder Photos

The gallery shows photos in the same order they're listed in
`src/data/photos.ts`. To move a photo, cut its whole block (`{` … `},`) and
paste it where you want it in the list.

The **first 6** photos in the list are also the ones shown on the home page,
so moving a favourite near the top features it there.

You don't need to change any `id` numbers when reordering.

## How to Replace an Existing Photo

Save the new version with the **same file name** (for example
`photo-12.webp`) and put it in this folder, replacing the old file. If the new
version has a different width or height, update that photo's `aspectRatio` in
`src/data/photos.ts` to match.

---

## How to Preview the Site on Your Computer

Open a terminal in the `ahmeds-photography` project folder (the one
containing `package.json`), then run:

```
pnpm dev
```

Open <http://localhost:5173> in your browser. The page updates automatically
every time you save a file. Press `Ctrl + C` in the terminal to stop it.

Before publishing, also run:

```
pnpm run build
```

If this prints `built in …` at the end, everything is fine. If it prints an
error instead (for example, a misspelled category), fix it before
publishing. Cloudflare runs this same check, and if it fails there your live
site simply stays on the previous version.

If the terminal says `pnpm` isn't recognized, install it once with
`npm install -g pnpm`, then open a new terminal.

## How to Publish Your Update

Once you've checked everything locally, run these three commands in the
same project folder:

```
git add .
git commit -m "Add new photography"
git push
```

- **`git add .`** — collects all the files you changed or added, ready to save.
- **`git commit -m "…"`** — saves those changes on your computer as one
  update, with a short description. You can change the message to describe
  what you did, e.g. `"Add photo 30"`.
- **`git push`** — sends the update to GitHub.

Cloudflare Pages notices the new update on GitHub, rebuilds the site, and
publishes it automatically. The live site usually updates within a minute or
two.
