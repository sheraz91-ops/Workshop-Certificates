# CBS Certificate Download Portal

A production-ready, 100% frontend certificate platform for the
**Character Building Society (MNSUAM)**. Participants look up their
Certificate ID, preview their certificate, and download it as a
print-quality PDF or PNG — every certificate carries a scannable QR code
linking to a public verification page. No backend, no database, no
authentication.

Built for the **"Laptop Survival Workshop"**, but the entire event
identity is centralized in **one config file**, so the whole portal can
be repointed at a brand-new workshop by editing that single file and
swapping two data files (see [Reusing for a new event](#-reusing-for-a-new-event)).

---

## ✨ Features

- **Single-field lookup** — enter a Certificate ID, get your certificate.
- **Tolerant matching** — `"5"`, `"05"`, `"CBS-LSW-2026-005"`, and even a
  pasted QR link all resolve to the same participant.
- **Formatted Certificate IDs** — `CBS-LSW-2026-001` style, built from the
  event prefix + a zero-padded sequence number, entirely config-driven.
- **Certificate preview page** (`/certificate?id=...`) — see the finished
  certificate rendered on-screen before downloading anything.
- **Download as PDF or PNG** — PDF via `pdf-lib` (crisp vector text),
  PNG via an HTML canvas renderer that mirrors the exact same layout at
  2x resolution for crisp downloads and social sharing.
- **QR code on every certificate** — generated client-side with the
  `qrcode` package, linking straight to that certificate's verification
  page. Uses the live browser origin, so it's correct on localhost,
  Vercel previews, and your final domain with zero config.
- **Public verification page** (`/verify`) — anyone with a Certificate ID
  (typed in, or arriving via the QR code / a shared link) can confirm a
  certificate is authentic: name, ID, workshop, date, and organizer.
- **One master config file** — `config/certificate.config.ts` holds every
  event-specific value (names, dates, ID prefix, asset paths, template
  layout). New workshop = edit this file + swap the template/participant
  list.
- **CBS logo as favicon & social preview image** — auto-detected via
  Next.js's `app/icon.png`, `app/apple-icon.png`, and
  `app/opengraph-image.png` conventions.
- **Premium blue & gold university UI** — rounded cards, gold accents,
  smooth animations, fully responsive.
- **Zero external network calls** at build or runtime beyond the static
  assets shipped with the app — deploys reliably anywhere.

---

## 🧱 Tech Stack

| Layer      | Choice                                     |
|------------|---------------------------------------------|
| Framework  | Next.js 15 (App Router)                      |
| Language   | TypeScript                                   |
| Styling    | Tailwind CSS                                 |
| PDF engine | pdf-lib (client-side, vector text)           |
| PNG engine | HTML Canvas 2D (client-side)                 |
| QR codes   | qrcode                                       |
| Hosting    | Vercel (no backend required)                 |

---

## 📁 Project Structure

```
certificate-portal/
├── app/
│   ├── layout.tsx              # Root layout, SEO metadata
│   ├── page.tsx                 # Home — Certificate ID lookup
│   ├── certificate/page.tsx     # Preview + Download PDF/PNG
│   ├── verify/page.tsx          # Public verification page
│   ├── globals.css
│   ├── icon.png                 # Favicon (from CBS logo)
│   ├── apple-icon.png           # Apple touch icon
│   └── opengraph-image.png      # Social preview image
├── components/
│   ├── PageShell.tsx            # Shared hero/background/logo/footer shell
│   ├── Header.tsx                # Homepage title block
│   ├── CertificateForm.tsx       # ID input -> navigates to /certificate
│   ├── CertificatePreview.tsx    # Renders + downloads PDF/PNG
│   ├── VerifyPanel.tsx           # Verification form + result card
│   ├── AlertMessage.tsx
│   ├── LoadingSpinner.tsx
│   └── Footer.tsx
├── config/
│   └── certificate.config.ts    # ★ THE single master config file ★
├── lib/
│   ├── participants.ts           # Data loading + tolerant lookup
│   ├── formatId.ts               # ID formatting/normalization
│   ├── certificatePlan.ts        # Participant -> render-ready plan
│   ├── qrcode.ts                 # QR generation + verify URL builder
│   ├── generateCertificate.ts    # PDF rendering (pdf-lib) + downloads
│   └── renderCertificatePng.ts   # Canvas rendering (preview + PNG)
├── data/
│   └── participants.json        # Certificate ID -> Full Name records
├── public/
│   ├── certificate-template.png  # Certificate artwork
│   └── cbs-logo.png              # Standalone logo (in-app use)
├── types/
│   └── index.ts
├── tailwind.config.ts
├── next.config.js
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.18+ (Node 20 LTS recommended)
- npm (or pnpm/yarn — adjust commands accordingly)

### Install & run locally

```bash
npm install
npm run dev
```

Visit **http://localhost:3000**. Try:
- Certificate ID `1` (or any ID from `data/participants.json`) → preview
  → download PDF/PNG.
- An out-of-range ID (e.g. `999`) → error state.
- **http://localhost:3000/verify** → paste a Certificate ID (or open the
  page with `?id=CBS-LSW-2026-005` the way a scanned QR code would) to
  see the verification result.

### Production build

```bash
npm run build
npm start
```

---

## 🎯 How It Works

### 1. Lookup (`/`)
`lib/participants.ts` normalizes whatever the participant types — a bare
number, a zero-padded number, or a full `CBS-LSW-2026-005` code — and
matches it against `data/participants.json`. On a match, the browser
navigates to `/certificate?id=<formattedId>`.

### 2. Preview (`/certificate?id=...`)
`components/CertificatePreview.tsx` re-resolves the ID from the URL,
builds a `CertificatePlan` (`lib/certificatePlan.ts`), and renders it
onto an off-screen `<canvas>` (`lib/renderCertificatePng.ts`) at 2x the
template's native resolution. That canvas becomes both the on-screen
preview image and the source for the "Download PNG" button.

### 3. Download PDF
`lib/generateCertificate.ts` independently re-renders the same plan
using `pdf-lib`, drawing vector text (crisp at any zoom/print size)
instead of a rasterized image. Both renderers read their coordinates
from the exact same ratios in `config/certificate.config.ts`, so the
preview, the PNG, and the PDF are always visually identical.

Both renderers:
- Paint a background-matched rectangle over the original `<<Full Name>>`
  / `<<ID>>` placeholder text (masking).
- Draw the real name and ID, **auto-shrinking the font size** if the
  text is too long to fit its box — this is what lets long names *and*
  the longer `CBS-LSW-2026-XXX` ID format fit cleanly without any manual
  per-certificate tuning.
- Draw a QR code (generated via `lib/qrcode.ts`) linking to
  `/verify?id=<formattedId>`, using the page's live origin so it's
  always correct.

### 4. Verify (`/verify`)
`components/VerifyPanel.tsx` performs the same tolerant lookup and shows
either a green "Certificate Verified" card (name, ID, workshop, date,
organizer) or a red "Certificate Not Found" card. It does not offer a
download — verification is intentionally a separate, read-only action
from generation.

---

## 🔡 Certificate ID Format

IDs are built from `config/certificate.config.ts`:

```
{organizationAbbreviation}-{workshopCode}-{eventYear}-{sequence, zero-padded}
        CBS         -    LSW     - 2026  -     005
```

Change `organizationAbbreviation`, `workshopCode`, `eventYear`, or the
padding length in one place — every certificate, QR code, and
verification lookup updates automatically.

---

## 🧭 Re-tuning the Template Layout

If you replace `public/certificate-template.png` with new artwork that
moves the placeholder text, or that leaves a QR-sized blank area
somewhere else, re-measure it:

```python
from PIL import Image
import numpy as np

im = Image.open("certificate-template.png").convert("L")
arr = np.array(im)
region = arr[Y1:Y2, X1:X2]        # a rough crop around the placeholder
mask = region < 100                # dark (text) pixels
ys, xs = np.where(mask)
print("x:", X1 + xs.min(), X1 + xs.max())
print("y:", Y1 + ys.min(), Y1 + ys.max())
```

For finding blank space to place a new QR code, scan candidate boxes for
"non-white density" and pick the lowest:

```python
def content_density(box, arr_rgb):
    x0, y0, x1, y1 = box
    sub = arr_rgb[y0:y1, x0:x1].astype(int)
    dist = np.abs(sub - 255).sum(axis=2)
    return (dist > 60).mean()  # fraction of non-blank pixels
```

Divide the resulting pixel boxes by the image's width/height to get the
ratios used in `LAYOUT_CONFIG` inside `config/certificate.config.ts`.

---

## 🔁 Reusing for a New Event

No code changes are required to run a brand-new batch of certificates:

1. **Edit `config/certificate.config.ts`** — update `EVENT_CONFIG`
   (organization, workshop name/code, year, date, tagline, site URL).
2. **Replace `data/participants.json`** with new `{ "id": "...", "name": "..." }`
   records.
3. **Replace `public/certificate-template.png`** with the new artwork.
   If the new design keeps `<<Full Name>>` / `<<ID>>` in the same
   position and leaves the same area blank for the QR code, no further
   changes are needed. Otherwise, re-measure per the section above.
4. **(Optional) Replace the logo** — swap `public/cbs-logo.png` and
   regenerate `app/icon.png`, `app/apple-icon.png`, and
   `app/opengraph-image.png` for the new organization's branding.

---

## 🖋️ Fonts

Both the PDF and PNG renderers use **standard, universally-available
fonts** rather than embedding custom webfonts:

- PDF: pdf-lib's built-in Standard Fonts (Times-Roman for the name,
  Helvetica-Bold for the ID/QR caption) — embedded in virtually every
  PDF viewer, guaranteeing identical output everywhere.
- Canvas/PNG: the equivalent system fonts (`"Times New Roman"` and
  `Arial/Helvetica`), so the preview and PNG match the PDF.

This keeps the app dependency-free for fonts — no downloads, no
`@pdf-lib/fontkit`, faster and more reliable builds.

---

## ☁️ Deploying to Vercel

### Option A — Vercel CLI
```bash
npm install -g vercel
vercel login
vercel        # first deploy
vercel --prod # promote to production
```

### Option B — Git + Vercel Dashboard (recommended)
1. Push this project to a GitHub/GitLab/Bitbucket repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Framework preset: Vercel auto-detects **Next.js** — no configuration
   needed.
4. Click **Deploy**.

After your first deploy, update `EVENT_CONFIG.siteUrl` in
`config/certificate.config.ts` to your real Vercel domain for nicer
social link previews (this does **not** affect QR codes or
verification, which always use the live origin).

Every push to your default branch auto-deploys; pull requests get their
own preview URLs.

---

## ✅ Production Checklist

- [x] No hardcoded secrets or API keys (none are needed).
- [x] No backend/server code — fully client-rendered.
- [x] TypeScript strict mode enabled.
- [x] Responsive design (mobile → desktop).
- [x] Accessible form labeling and status alerts.
- [x] `npm run build` verified to complete successfully with zero errors.
- [x] QR codes verified (decoded with OpenCV) to resolve to the correct
      verification URL.
- [x] Long names and the full `CBS-LSW-2026-XXX` ID format verified to
      auto-fit their designated areas without manual tuning.

---

## 📄 License

Internal tool built for the Character Building Society (MNSUAM). Adapt
freely for your own society/university events.
