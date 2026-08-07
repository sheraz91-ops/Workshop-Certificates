/**
 * ============================================================================
 *  MASTER CONFIGURATION — CBS Certificate Portal
 * ============================================================================
 *  This is the ONLY file you need to edit to reuse this portal for a brand
 *  new workshop/event. To onboard a new event:
 *
 *    1. Update EVENT_CONFIG below (names, dates, workshop code, etc).
 *    2. Replace `public/certificate-template.png` with the new artwork.
 *    3. Replace `data/participants.json` with the new participant list.
 *    4. If the new template places "<<Full Name>>" / "<<ID>>" in a
 *       different spot than the current design, re-measure it (see the
 *       README section "Re-tuning the layout") and update LAYOUT_CONFIG.
 *       If the new artwork reuses the same layout, no changes needed here.
 *
 *  Nothing outside this file (and the two files above) should need to
 *  change to run a new batch of certificates.
 * ============================================================================
 */

// ---------------------------------------------------------------------------
// 1. EVENT / BRANDING — edit these for every new workshop
// ---------------------------------------------------------------------------
export const EVENT_CONFIG = {
  /** Organization running the event */
  organizationName: "Character Building Society",
  organizationAbbreviation: "CBS",

  /** Institution the organization belongs to */
  institutionName: "Muhammad Nawaz Sharif University of Agriculture, Multan",
  institutionAbbreviation: "MNSUAM",

  /** The specific workshop/event this batch of certificates is for */
  workshopName: "Laptop Survival Workshop",
  workshopFullTitle:
    "Laptop Survival Workshop: From Fresh Windows Installation to Complete PC Setup",
  /** Short code embedded in every certificate ID, e.g. "LSW" */
  workshopCode: "LSW",
  /** Year embedded in every certificate ID */
  eventYear: "2026",
  /** Human-readable event date, shown on the verification page */
  eventDate: "10 August 2026",

  /** Shown as "Organized by" on the verification page */
  organizedBy: "Character Building Society (MNSUAM)",

  /** Homepage copy */
  siteTitle: "Certificate Download Portal",
  siteTagline:
    "Enter your Certificate ID to instantly generate, preview, and download your official Certificate of Participation.",

  /**
   * Canonical production URL — used ONLY for page metadata (Open Graph /
   * social link previews). QR codes on certificates always encode the
   * live browser origin at generation time, so verification works
   * correctly even if you forget to update this. Update it after your
   * first deploy for nicer link-preview cards when the URL is shared.
   */
  siteUrl: "https://cbs-certificate-portal.vercel.app",
} as const;

// ---------------------------------------------------------------------------
// 2. CERTIFICATE ID FORMAT
// ---------------------------------------------------------------------------
/**
 * Combined with a zero-padded sequence number to produce the final ID,
 * e.g. "CBS-LSW-2026" + "001" -> "CBS-LSW-2026-001".
 */
export const CERTIFICATE_ID_PREFIX = `${EVENT_CONFIG.organizationAbbreviation}-${EVENT_CONFIG.workshopCode}-${EVENT_CONFIG.eventYear}`;

/** How many digits the sequence number is zero-padded to. */
export const CERTIFICATE_ID_PAD_LENGTH = 3;

// ---------------------------------------------------------------------------
// 3. ASSET PATHS
// ---------------------------------------------------------------------------
export const ASSET_PATHS = {
  /** Certificate background artwork (with placeholders baked in) */
  certificateTemplate: "/certificate-template.png",
  /** Standalone organization logo (square, used in-app) */
  logo: "/cbs-logo.png",
} as const;

/** Source template's native pixel dimensions (image width x height). */
export const TEMPLATE_PIXEL_SIZE = { width: 1448, height: 1086 };

/** Output PDF/PNG page size, in points/px-equivalent units. 12in x 9in
 *  preserves the template's exact 4:3 aspect ratio (1448:1086 = 12:9),
 *  so the artwork is never stretched or letterboxed. */
export const PAGE_WIDTH_PT = 864; // 12in @ 72pt/in
export const PAGE_HEIGHT_PT = 648; // 9in @ 72pt/in

// ---------------------------------------------------------------------------
// 4. TEMPLATE LAYOUT — geometry measured from the current template image
// ---------------------------------------------------------------------------
/**
 * HOW THESE NUMBERS WERE DERIVED
 * The template (1448 x 1086 px) was scanned for dark-pixel clusters
 * (grayscale threshold < 100) to get exact bounding boxes for the
 * "<<Full Name>>" and "ID: <<ID>>" placeholders, then converted to
 * *ratios* (0–1) of image width/height so the same config works at any
 * output resolution.
 *
 * Measured pixel boxes (for reference / future re-tuning):
 *   "<<Full Name>>"  -> x: 490–932,  y: 510–553   (center 711, 531.5)
 *   "ID: <<ID>>"     -> x: 860–964,  y: 883–895   (widened below to fit
 *                        the longer "CBS-LSW-2026-001" format)
 *   QR code          -> placed in a hand-picked blank region (measured
 *                        via pixel-density scan) at x:1190–1320, y:275–405
 *
 * Sampled colors:
 *   Name text  -> pure black (#000000)
 *   ID text    -> dark navy  (#002352)
 *   Background near placeholders -> near-white (~#f9f9f9)
 */
export const LAYOUT_CONFIG = {
  /** Full Name placeholder */
  nameField: {
    centerXRatio: 0.491,
    centerYRatio: 0.4894,
    maskBox: {
      leftRatio: 0.3177,
      rightRatio: 0.6699,
      topRatio: 0.4586,
      bottomRatio: 0.5212,
    },
    font: "serif" as const, // maps to TimesRoman (PDF) / Times New Roman (canvas)
    color: "#000000",
    maxFontSize: 40,
    minFontSize: 16,
    maxWidthRatio: 0.62, // auto-shrinks long names to fit this fraction of page width
  },

  /** Certificate ID (e.g. "ID: CBS-LSW-2026-001"), left-aligned */
  idField: {
    startXRatio: 0.5939,
    centerYRatio: 0.8186,
    maskBox: {
      leftRatio: 0.5836,
      rightRatio: 0.7770,
      topRatio: 0.8039,
      bottomRatio: 0.8315,
    },
    font: "sans-bold" as const, // maps to HelveticaBold (PDF) / Arial Bold (canvas)
    color: "#002352",
    label: "ID: ",
    maxFontSize: 15,
    minFontSize: 8,
    maxWidthRatio: 0.185, // auto-shrinks to fit the widened ID box
  },

  /** Verification QR code, placed in a blank area of the template */
  qrField: {
    box: {
      leftRatio: 0.8219,
      rightRatio: 0.9116,
      topRatio: 0.2533,
      bottomRatio: 0.373,
    },
    caption: "SCAN TO VERIFY",
    captionCenterXRatio: 0.8667,
    captionCenterYRatio: 0.3859,
    captionFontSize: 8.5,
    captionColor: "#0b1c47",
  },

  /** Off-white fill used to mask over the original placeholder text,
   *  sampled directly from the template background. */
  maskColor: "#f9f9f9",
} as const;
