"use client";

import Image from "next/image";
import { ArrowUp } from "lucide-react";
import { navLinks, site } from "@/data/content";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H9v3h2v7h3v-7h2.5l.5-3H14V9z" />
    </svg>
  );
}

export function Footer() {
  const social = [
    { Icon: InstagramIcon, label: "Instagram" },
    { Icon: FacebookIcon, label: "Facebook" },
  ];

  return (
    <footer className="film-grain bg-ink pt-20 pb-8">
      <div className="container-site">
        <a
          href="#top"
          className="group block overflow-hidden"
          aria-label="Purity Promised"
        >
          <p
            className="font-display text-center text-[11vw] font-bold leading-none tracking-tight transition-all duration-700 group-hover:text-gold"
            style={{
              WebkitTextStroke: "1.5px #C9A24B",
              color: "transparent",
            }}
          >
            PURITY PROMISED
          </p>
        </a>

        <div className="mt-16 grid grid-cols-1 gap-12 border-t border-gold/20 pt-14 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <span className="relative size-12 overflow-hidden rounded-full ring-1 ring-gold/40">
                <Image
                  src={site.logo}
                  alt={site.name}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </span>
              <span className="font-display text-lg font-semibold text-milk">
                {site.name}
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-silver">
              Farm-fresh milk with a purity promise — delivered daily from our
              herd to your doorstep.
            </p>
          </div>

          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.25em] text-gold">
              Quick links
            </p>
            <ul className="space-y-2">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-silver transition hover:text-gold"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.25em] text-gold">
              Contact
            </p>
            <p className="text-silver">{site.phone}</p>
            <p className="text-silver">{site.address}</p>
            <div className="mt-5 flex gap-3">
              {social.map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex size-11 items-center justify-center rounded-full border border-gold/40 text-gold transition hover:bg-gold hover:text-ink"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex items-center justify-between border-t border-gold/30 pt-6">
          <p className="text-sm text-silver">
            © 2026 {site.name}. All rights reserved.
          </p>
          <a
            href="#top"
            aria-label="Back to top"
            className="flex size-11 items-center justify-center rounded-full border border-gold/40 text-gold transition hover:bg-gold hover:text-ink"
          >
            <ArrowUp className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
