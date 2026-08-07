import type { CertificatePlan, Participant } from "@/types";
import { buildVerifyUrl } from "./qrcode";

/**
 * Resolves a participant record into everything needed to render a
 * certificate: display name, the formatted ID, and the verification
 * URL that gets encoded into the QR code.
 */
export function buildCertificatePlan(
  participant: Participant,
  formattedId: string
): CertificatePlan {
  return {
    fullName: participant.name,
    formattedId,
    verifyUrl: buildVerifyUrl(formattedId),
  };
}
