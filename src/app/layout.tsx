import type { Metadata } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Al Shukr Dairy — Purity Promised",
  description:
    "Farm-fresh cow and buffalo milk delivered daily. No additives. Pure milk from our farm to your door.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${dmSans.variable} h-full antialiased`}
    >
      {/*
        THESIS: Black-and-gold heritage dairy shell holding cream purity — cinematic dark vs clean cream, not a generic farm grid.
        OWN-WORLD: Ink/gold luxury, Fraunces display with one gold-gradient italic word, milk-splash motifs, pill CTAs, film grain on dark.
        STORY: Believe milk can be simple and pure; request a free sample via WhatsApp/form.
        FIRST VIEWPORT: Full-bleed farm hero, left-aligned "Pure Milk." gold gradient, dual CTAs, glass chips, rotating purity badge.
        FORM: Brief-pinned "Purity Promised" luxury dairy (user-spec). Seed: brief-pinned.
        FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
      */}
      <body className="min-h-full bg-ink text-milk">{children}</body>
    </html>
  );
}
