"use client";

import { marqueeItems } from "@/data/content";
import { MilkDrop } from "@/components/ui/MilkSplash";

export function TrustMarquee() {
  const items = [...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems];

  return (
    <div className="relative border-y border-gold/30 bg-ink py-0">
      <div className="flex h-20 items-center overflow-hidden">
        <div className="animate-marquee flex w-max items-center gap-8 whitespace-nowrap px-4">
          {items.map((item, i) => (
            <span key={`${item}-${i}`} className="flex items-center gap-8">
              <span
                className={`font-display text-xl italic sm:text-2xl ${
                  i % 2 === 0 ? "text-silver" : "text-gold"
                }`}
              >
                {item}
              </span>
              <MilkDrop className="h-4 w-3 text-gold" fill="currentColor" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
