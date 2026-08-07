import { EVENT_CONFIG } from "@/config/certificate.config";

export default function Header() {
  return (
    <header className="w-full flex flex-col items-center text-center gap-3 animate-fade-in">
      <div className="flex items-center gap-3 text-gold-300">
        <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold-400" />
        <span className="uppercase tracking-[0.35em] text-xs font-semibold">
          {EVENT_CONFIG.organizationName}
        </span>
        <span className="h-px w-10 bg-gradient-to-l from-transparent to-gold-400" />
      </div>

      <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-white leading-tight">
        {EVENT_CONFIG.siteTitle}
      </h1>

      <p className="max-w-xl text-sm sm:text-base text-navy-100/70">
        {EVENT_CONFIG.institutionName} &mdash; {EVENT_CONFIG.siteTagline}
      </p>
    </header>
  );
}
