/**
 * buildTracks.ts – scrape sc.html and generate tracks.ts
 *
 *   npm i -D cheerio tsx
 *   npx tsx buildTracks.ts
 *
 * Change ARTIST to the profile‑slug you saved the HTML from, e.g. "theweeknd".
 */
import { readFileSync, writeFileSync } from "node:fs";
import * as cheerio from "cheerio";

export interface TrackData {
  title: string;
  slug: string;
}

/* ─── CONFIG ────────────────────────────────────────────────────────────── */

const ARTIST = "theweeknd";

/* ─── HELPERS ───────────────────────────────────────────────────────────── */

const toSlug = (href: unknown): string =>
  typeof href === "string"
    ? href
        .split("?")[0]
        .replace(new RegExp(`^/${ARTIST}/`), "")
        .replace(/\/$/, "")
    : "";

/* ─── 1. LOAD HTML ─────────────────────────────────────────────────────── */

const html = readFileSync("sc.html", "utf8");
const $ = cheerio.load(html);

/* ─── 2. COLLECT TRACKS ────────────────────────────────────────────────── */

const tracks: TrackData[] = [];
const seen = new Set<string>();

// a) regular “stream” / profile track list
$(`a.soundTitle__title[href^="/${ARTIST}/"]`).each((_, el) => {
  const slug = toSlug($(el).attr("href"));
  if (!slug || slug.includes("/") || seen.has(slug)) return;
  tracks.push({ title: $(el).text().trim(), slug });
  seen.add(slug);
});

// b) compact track lists inside playlists/albums
$(`.compactTrackListItem__trackTitle[data-permalink-path^="/${ARTIST}/"]`).each(
  (_, el) => {
    const slug = toSlug($(el).data("permalink-path"));
    if (!slug || slug.includes("/") || seen.has(slug)) return;
    tracks.push({ title: $(el).text().trim(), slug });
    seen.add(slug);
  },
);

/* ─── 3. WRITE tracks.ts ───────────────────────────────────────────────── */

if (!tracks.length) {
  console.error(
    `⚠  No tracks found – did you set ARTIST to the correct profile slug?`,
  );
  process.exit(1);
}

const body = tracks
  .map(
    ({ title, slug }) =>
      `  { title: ${JSON.stringify(title)}, slug: ${JSON.stringify(slug)} },`,
  )
  .join("\n");

writeFileSync(
  "tracks.ts",
  `// Auto‑generated from sc.html – edit as you like\n` +
    `export const TRACKS_DATA: TrackData[] = [\n${body}\n];\n`,
);

console.log(
  `✔ tracks.ts written with ${tracks.length} entries for "${ARTIST}"`,
);
