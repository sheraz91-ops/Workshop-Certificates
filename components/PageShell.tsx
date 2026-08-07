import type { ReactNode } from "react";
import Link from "next/link";
import Footer from "./Footer";
import { ASSET_PATHS, EVENT_CONFIG } from "@/config/certificate.config";

export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <main className="hero-bg relative min-h-screen overflow-hidden flex flex-col items-center justify-between px-4 py-8 safe-top safe-bottom sm:py-14">
      {/* Ambient glow accents — sized down on mobile so they don't
          overwhelm a narrow viewport, full size from sm: up. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-24 h-56 w-56 rounded-full bg-gold-400/20 blur-3xl animate-float sm:-top-32 sm:-left-32 sm:h-72 sm:w-72"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-navy-400/30 blur-3xl animate-float sm:-bottom-24 sm:-right-24 sm:h-80 sm:w-80"
        style={{ animationDelay: "1.5s" }}
      />

      <div className="relative z-10 flex w-full flex-col items-center gap-8 sm:gap-12">
        <Link
          href="/"
          className="flex flex-col items-center gap-3 animate-fade-in sm:gap-4"
        >
          <div className="relative flex h-14 w-14 items-center justify-center sm:h-20 sm:w-20">
            {/* Soft pulsing ring behind the crest for a premium,
                "official" feel — purely decorative. */}
            <span className="absolute inset-0 rounded-full bg-gold-400/25 blur-md animate-pulse" />
            <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full border border-gold-400/60 bg-navy-800/60 shadow-gold">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={ASSET_PATHS.logo}
                alt={`${EVENT_CONFIG.organizationAbbreviation} logo`}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <span className="text-center text-[10px] font-semibold leading-relaxed tracking-[0.2em] text-navy-100/90 sm:text-[11px] sm:tracking-[0.3em]">
            {EVENT_CONFIG.institutionAbbreviation} &mdash;{" "}
            {EVENT_CONFIG.institutionName.split(",")[0]}
          </span>
        </Link>

        {/* Trust badge — reinforces that certificates issued here are
            checkable, tying into the /verify page. */}
        <Link
          href="/verify"
          className="group -mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3.5 py-1.5 text-[11px] font-medium text-emerald-200/90 transition-colors hover:bg-emerald-400/15 sm:-mt-6"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          Every certificate is instantly verifiable
          <span className="text-emerald-300/70 transition-transform group-hover:translate-x-0.5">
            &rarr;
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