# Scouter

A Dragon Ball-style scouter for Meta Ray-Ban Display glasses. Press to scan and
it locks onto a random power level — green HUD, yellow targeting graphics, and
the scouter detector sound effect.

Standalone MRBD web app (600×600, D-pad navigation). Migrated out of
`mrbd-sandbox/apps/scouter/`.

## Controls

| Input | Action |
|---|---|
| Enter (or focus the reticle + Enter) | Scan — rolls a random power level |

Each scan plays the sound, scrambles 4 digits for ~4s, then reveals the
reading. When it lands above 9000 the readout flares white and the label
flips to **IT'S OVER 9000!**

## Run locally

```bash
node server.js
# open http://localhost:3000 — press Enter to scan
```

## Deploy

```bash
vercel --yes --prod
```

Then in the Meta AI app: **Devices → Display Glasses → App connections → Web
apps → Add a web app** and paste the URL.

## Assets

- `assets/scouter.ttf` — the **DBZ Scouter** font (uppercase A-Z + punctuation),
  used for the decorative corner glyphs.
- `assets/scan.mp3` — the scouter detector sound effect.

## Number font

The DBZ Scouter font has **no digit glyphs**, so the power-level readout uses a
digital monospace fallback (`--num-font` in `styles.css`). To use a dedicated
number font:

1. Drop the `.ttf` into `assets/number-font.ttf`.
2. Uncomment the `@font-face` block for `ScouterNum` in `styles.css`.

It is already first in the `--num-font` stack, so no other change is needed.

## Theming

This app builds on `design-system.css` but overrides the dark tokens for its
green/yellow look — an example of theming the MRBD design system rather than
using it as-is.
