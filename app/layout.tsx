import type { Metadata } from "next";
import "./globals.css";
import { EVENT_CONFIG } from "@/config/certificate.config";

export const metadata: Metadata = {
  metadataBase: new URL(EVENT_CONFIG.siteUrl),
  title: {
    default: `${EVENT_CONFIG.siteTitle} | ${EVENT_CONFIG.organizationAbbreviation} (${EVENT_CONFIG.institutionAbbreviation})`,
    template: `%s | ${EVENT_CONFIG.organizationAbbreviation} Certificate Portal`,
  },
  description: `${EVENT_CONFIG.organizationName} (${EVENT_CONFIG.institutionAbbreviation}) — ${EVENT_CONFIG.siteTagline}`,
  openGraph: {
    title: `${EVENT_CONFIG.siteTitle} | ${EVENT_CONFIG.organizationAbbreviation}`,
    description: EVENT_CONFIG.siteTagline,
    siteName: `${EVENT_CONFIG.organizationAbbreviation} Certificate Portal`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${EVENT_CONFIG.siteTitle} | ${EVENT_CONFIG.organizationAbbreviation}`,
    description: EVENT_CONFIG.siteTagline,
  },
  // Next.js automatically detects app/icon.png, app/apple-icon.png, and
  // app/opengraph-image.png by filename convention — no need to list
  // them here. To swap the logo, just replace those files (and
  // public/cbs-logo.png) and re-run the image-generation steps in the
  // README for a new organization's branding.
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/*
        We intentionally rely on a high-quality system font stack
        (see tailwind.config.ts) rather than next/font/google so the
        app has zero external network dependencies at build time.
        To use a custom Google Font instead, swap this for
        next/font/google and update the CSS variables — see README.
      */}
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
