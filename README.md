# Track‑List Builder for SoundCloud Profiles

A tiny script that scrapes a saved SoundCloud profile/playlist page (`sc.html`) and generates a Type‑Script array (`tracks.ts`) containing every unique track title and slug for a chosen artist.

> **One‑variable rule →** Change the single `ARTIST` constant at the top of **`buildTracks.ts`** and the script will work for any SoundCloud user‑slug.

---

## 0 · Demo

<!-- TODO: drop a short GIF or screenshot of the script running and the generated file here -->
<img width="1758" alt="image" src="https://github.com/user-attachments/assets/50104acb-37b0-4345-af3e-d5c3554047f9" />



---

## 1 · Prerequisites

| Tool | Why | Install |
|------|-----|---------|
| **Node ≥ 18** | run the script | <https://nodejs.org> |
| **pnpm / npm / yarn** | install deps | ships with Node |
| **git** | clone the repo | <https://git‑scm.com> |

---

## 2 · Cloning the repository

```bash
# clone it wherever you like
$ git clone https://github.com/SoPat712/soundcloud-track-importer.git
$ cd soundcloud-track-importer
```

Install dependencies:

```bash
# using npm
$ npm i
```

<img width="1758" alt="image" src="https://github.com/user-attachments/assets/2c683299-ce7d-4166-8e28-7130952a72c9" />


---

## 3 · Capturing the HTML (once per artist)

1. **Open the artist’s page** on SoundCloud (e.g. `soundcloud.com/theweeknd`).
2. **Press Tracks**

![CleanShot 2025-04-21 at 16 17 02@2x](https://github.com/user-attachments/assets/3d81edce-cd37-48f6-947b-9765aef2efc0)

3. **Scroll** until all desired tracks have loaded.

![image](https://github.com/user-attachments/assets/5f30f982-91bd-4de9-9821-5cbdf33baa2e)

4. **Save the HTML**:
   * Use DevTools ➜ **Elements** panel ➜ `Ctrl + S`.

<img width="462" alt="image" src="https://github.com/user-attachments/assets/8f2950fa-f984-4d01-a3d2-05a7b90965f5" />

5. Click into **Browser Tools** and then **Web Developer Tools**

These instructions are for Firefox, but this process exists on all browsers

6. Copy the **OUTER HTML**

<img width="1227" alt="image" src="https://github.com/user-attachments/assets/2599f3da-897f-4651-9e9b-6c943b739c14" />

7. Create a new file in the cloned repository
9. Paste what you just copied into that file and save it to the repo root as **`sc.html`** (overwriting any old file).
<img width="1758" alt="image" src="https://github.com/user-attachments/assets/ae244f98-1784-4c17-bf8f-aa9fb865a7fa" />



---

## 4 · Running the script

```bash
# https://soundcloud.com/theweeknd/tracks -> take the "theweeknd" part of the link
# edit buildTracks.ts → const ARTIST = "theweeknd"

# then
$ npx tsx buildTracks.ts
```

<img width="1512" alt="image" src="https://github.com/user-attachments/assets/57124fb1-0354-48cf-91db-12d1b5f6d5cf" />


A new **`tracks.ts`** will appear:

```ts
export const TRACKS_DATA: TrackData[] = [
  { title: "After Hours", slug: "after‑hours" },
  // …etc.
];
```

---

## 5 · Customising / Re‑using

| What | Where | Example |
|------|-------|---------|
| **Artist slug** | top of `buildTracks.ts` | `const ARTIST = "taylor‑swift"` |
| **HTML filename** | CLI arg #2 *(optional)* | `npx tsx buildTracks.ts taylor‑swift saved.html` |
| **Output file** | bottom of script | change `tracks.ts` path |

Feel free to adapt the code: it’s only ~60 lines and uses **Cheerio** for DOM parsing.

---

## 6 · Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| `No tracks found – did you set ARTIST…` | artist slug doesn’t match HTML | Double‑check the `ARTIST` constant matches the `/artist‑slug/` prefix in links inside `sc.html`. |
| Garbled titles | special HTML entities | The script already trims text; tweak if you need further decoding. |

---

## 7 · License

GNU General Public License v3.0
SoundCloud content belongs to their respective owners – this tool simply rearranges publicly available information.
See the LICENSE file for the full license text.

