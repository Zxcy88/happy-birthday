# Birthday experience

A private, chaptered birthday site. She unlocks it, then moves through full-screen scenes. Content lives in one file so you can drop in names, photos, videos, and your letter without touching the UI.

## 1. Install

Requires Node 18+.

```bash
npm install
```

## 2. Start development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Skip the lock while building:

```text
http://localhost:3000/?dev=1
http://localhost:3000/?dev=1&scene=letter
```

The chapter jumper only appears with `?dev=1`.

## 3. Add photos

Replace the placeholder SVGs (or keep the same filenames):

```text
public/media/childhood/childhood-01.jpg
public/media/childhood/childhood-02.jpg
public/media/childhood/childhood-03.jpg
public/media/present/present-01.jpg
public/media/present/present-02.jpg
```

Then point `src` fields in [`src/data/birthday.ts`](src/data/birthday.ts) at those files.

Keep portraits around 1600px on the long edge. Export JPEG or WebP. Do not invent dates or captions — leave caption strings empty if you do not have them.

## 4. Add videos

```text
public/media/video-calls/video-call-01.mp4
public/media/video-calls/video-call-02.mp4
public/media/final/final-message.mp4
```

Set `src` on the matching objects in `birthday.ts`. Posters can stay SVG or become a WebP still.

Compress before commit: 1080p, H.264, AAC, ~5–12 Mbps is plenty. Huge raw screen recordings will make Git and deploys painful. Prefer Git LFS, or host on Mux / Cloudflare Stream and paste the URL into `src`.

Videos never autoplay with sound.

### Video-call montage

The current call recording is kept at its original H.264 quality and edited
non-destructively in `birthday.ts`. `presence.videos[0].segments` contains the
source-time ranges shown as one continuous timeline. This avoids another lossy
encode. The custom player skips excluded ranges, mutes the recording's original
audio, and keeps `presence.soundtrack` synchronized through play, pause, seek,
and every cut. `startAtSec: 27` starts the song at `00:27`.

## 5. Edit birthday content

All copy is in [`src/data/birthday.ts`](src/data/birthday.ts).

Fill in:

- `herName`, `herAge`, `myName`
- unlock milestone lines (optional)
- childhood / present captions
- `recognition.qualities`
- `letter.body` (rendered verbatim, including line breaks)
- `horizon.lines`
- `gate.enabled` + `gate.passphrase` if you want a word-lock

Empty strings and `[BRACKET_TOKENS]` never show on screen. The UI falls back to designed placeholders (“you”, omitted captions, “recording coming”).

### Passphrase vs real privacy

The optional gate is client-side. It stops a casual visitor, not someone who reads the JavaScript. For a real lock, use [Vercel Deployment Protection](https://vercel.com/docs/security/deployment-protection) (or Netlify password protection) on top of an unguessable URL.

## 6. Production build

This app is a static export (required for GitHub Pages).

```bash
npm run lint
npm run typecheck
npm run build
npm start
```

`npm start` serves the `out/` folder locally.

## 7. Deploy (GitHub Pages)

The site is a single client-side experience, so Pages works once Next writes static files to `out/`. A workflow in `.github/workflows/pages.yml` builds and publishes on every push to `main`.

**Privacy:** GitHub Pages on a free account only works from a **public** repository. Anyone with the URL (or anyone browsing your GitHub) can open the photos, video, and letter. A **private** repo with Pages needs GitHub Pro. If you want it private for free, use [Vercel](https://vercel.com) instead and keep the project private.

**File size:** GitHub rejects files over 100 MB. The call recording is ~86 MB (allowed, but clones will be slow). Keep the `video/` folder out of git — it is already gitignored.

1. Create a GitHub repository (public for free Pages, or private if you have Pro).
2. Push this project to the `main` branch.
3. GitHub → **Settings → Pages → Source: GitHub Actions**.
4. The first workflow run publishes the site.
   - Project repo `you/birthday-website` → `https://you.github.io/birthday-website/`
   - User site repo `you/you.github.io` → `https://you.github.io/`

Unlock and gate completion are stored in `sessionStorage` so a refresh does not send her back to the tap screen. While testing, open `/?reset=1` to forget the unlock and see it again. If the repo is public, turn on `gate.enabled` and set a passphrase in `birthday.ts`.

## Soundtrack (optional)

Put a file in `public/audio/` and set `audio.src` in `birthday.ts`. Sound stays off until she taps **Sound on**. The preference is stored in `localStorage`.

## Motion and access

`prefers-reduced-motion` skips choreography, keeps the continue control, and quiets particles. Keyboard: Space / ArrowDown to continue, ArrowUp to go back one chapter.

Two hidden things remain: the small ✦ in the bottom corner opens `easter.note`, and the arrow-key sequence (up up down down left right left right b a) reveals `easter.hidden` on the closing-date chapter.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Local server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
