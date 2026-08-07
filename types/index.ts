/**
 * Shared type definitions for the CBS Certificate Portal.
 */

/** A single participant record loaded from data/participants.json */
export interface Participant {
  /** Raw certificate ID as stored in the source list, e.g. "1", "07" */
  id: string;
  /** Full name exactly as it should appear on the certificate */
  name: string;
}

/** Result of a certificate lookup against the participant list */
export type LookupResult =
  | { status: "found"; participant: Participant; formattedId: string }
  | { status: "not-found" };

/** A fully-resolved certificate ready to render (PDF/PNG/verify) */
export interface CertificatePlan {
  fullName: string;
  formattedId: string;
  verifyUrl: string;
}

/** UI state machine for the certificate generation flow */
export type GenerationStatus =
  | "idle"
  | "loading"
  | "success"
  | "error";

/** UI state machine for the certificate preview page */
export type PreviewStatus = "loading" | "ready" | "not-found" | "error";

/** UI state machine for the verification page */
export type VerifyStatus = "idle" | "checking" | "verified" | "not-found";

/** Shape of a transient alert shown to the user */
export interface AlertState {
  type: "success" | "error";
  message: string;
}
