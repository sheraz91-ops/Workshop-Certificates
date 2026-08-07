import { EVENT_CONFIG } from "@/config/certificate.config";

export default function Header() {
  return (
    <header className="w-full flex flex-col items-center text-center gap-6">

      {/* CBS Logo */}
      <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-white shadow-lg">
        <img
          src="/icon.png"
          alt="Character Building Society"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Organization Name */}
      <div className="flex items-center gap-2.5 text-gold-300 sm:gap-3">
        <span className="h-px w-7 bg-gradient-to-r from-transparent to-gold-300" />

        <span className="whitespace-nowrap uppercase tracking-[0.25em]">
          {EVENT_CONFIG.organizationName}
        </span>

        <span className="h-px w-7 bg-gradient-to-l from-transparent to-gold-300" />
      </div>

      {/* Main Heading */}
      <h1 className="font-display text-[28px] leading-[1.15] font-semibold text-white sm:text-4xl md:text-5xl">
        {EVENT_CONFIG.siteTitle}
      </h1>

      {/* Tagline */}
      <p className="max-w-xs text-[15px] leading-relaxed text-navy-100/90 sm:max-w-xl sm:text-base">
        {EVENT_CONFIG.siteTagline}
      </p>

    </header>
  );
}