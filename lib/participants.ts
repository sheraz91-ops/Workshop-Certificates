import participantsData from "@/data/participants.json";
import type { LookupResult, Participant } from "@/types";
import { formatCertificateId, normalizeIdForLookup } from "./formatId";

/**
 * The full participant list, sourced from the CBS "Laptop Survival
 * Workshop" attendance sheet. To onboard a new batch/event, simply
 * replace the contents of data/participants.json with the new
 * { id, name } records — no code changes required.
 */
export const participants: Participant[] = participantsData as Participant[];

/**
 * Looks up a participant by the certificate ID they typed in.
 * Matching is whitespace/zero-padding tolerant, e.g. "7", "07", and
 * "007" all resolve to the same participant.
 */
export function findParticipantByCertificateId(rawId: string): LookupResult {
  const query = normalizeIdForLookup(rawId);

  if (query.length === 0) {
    return { status: "not-found" };
  }

  const match = participants.find(
    (p) => normalizeIdForLookup(p.id) === query
  );

  if (!match) {
    return { status: "not-found" };
  }

  return {
    status: "found",
    participant: match,
    formattedId: formatCertificateId(match.id),
  };
}
