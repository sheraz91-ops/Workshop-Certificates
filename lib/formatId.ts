import {
  CERTIFICATE_ID_PAD_LENGTH,
  CERTIFICATE_ID_PREFIX,
} from "@/config/certificate.config";

/**
 * Formats a raw participant record ID (e.g. "1", "07") into the full
 * public-facing certificate ID, e.g. "CBS-LSW-2026-001".
 * The prefix and padding length are read from the single master config,
 * so a new event only requires updating config/certificate.config.ts.
 */
export function formatCertificateId(rawId: string): string {
  const numeric = rawId.trim().replace(/\D/g, "");
  const padded =
    numeric.length > 0
      ? numeric.padStart(CERTIFICATE_ID_PAD_LENGTH, "0")
      : rawId.trim().toUpperCase();

  return `${CERTIFICATE_ID_PREFIX}-${padded}`;
}

/**
 * Normalizes ANY user-supplied identifier into a bare sequence number for
 * lookup purposes. This is intentionally tolerant so that all of the
 * following resolve to the same participant record:
 *   "7"                    (bare number)
 *   "07" / "007"           (zero-padded)
 *   "CBS-LSW-2026-007"     (full formatted ID, e.g. pasted from a QR link)
 *   "cbs-lsw-2026-007"     (case-insensitive)
 *
 * Strategy: pull out every run of digits and use the LAST one, since the
 * certificate ID format always ends in the sequence number (any year or
 * other numeric segments earlier in the string are ignored).
 */
export function normalizeIdForLookup(rawId: string): string {
  const matches = rawId.trim().match(/\d+/g);

  if (!matches || matches.length === 0) {
    return rawId.trim().toLowerCase();
  }

  const lastNumericGroup = matches[matches.length - 1];
  return String(parseInt(lastNumericGroup, 10));
}
