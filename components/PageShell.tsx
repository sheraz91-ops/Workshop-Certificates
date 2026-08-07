import type { ReactNode } from "react";
import Link from "next/link";
import Footer from "./Footer";
import { ASSET_PATHS, EVENT_CONFIG } from "@/config/certificate.config";

export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-hero-gradient bg-grid-pattern flex flex-col items-center justify-between px-4 py-10 sm:py-14">
      {/* Ambient glow accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-32 h-72 w-72 rounded-full bg-gold-400/20 blur-3xl animate-float"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-navy-400/30 blur-3xl animate-float"
        style={{ animationDelay: "1.5s" }}
      />

      <div className="relative z-10 flex w-full flex-col items-center gap-10 sm:gap-12">
        <Link
          href="/"
          className="flex flex-col items-center gap-4 animate-fade-in"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-gold-400/60 bg-navy-800/60 shadow-gold overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ASSET_PATHS.logo}
              alt={`${EVENT_CONFIG.organizationAbbreviation} logo`}
              className="h-full w-full object-cover"
            />
          </div>
          <span className="text-[11px] font-semibold tracking-[0.3em] text-navy-200/70">
            {EVENT_CONFIG.institutionAbbreviation} &mdash;{" "}
            {EVENT_CONFIG.institutionName.split(",")[0]}
          </span>
        </Link>

        {children}
      </div>

      <div className="relative z-10 w-full">
        <Footer />
      </div>
    </main>
  );
}
