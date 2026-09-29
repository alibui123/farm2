"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { purityStats } from "@/data/content";
import { MilkDrop } from "@/components/ui/MilkSplash";
import { Reveal } from "@/components/ui/Reveal";

function CountUp({
  value,
  suffix,
  active,
}: {
  value: number;
  suffix: string;
  active: boolean;
}) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!active) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setN(value);
      return;
    }
    const duration = 1400;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, value]);

  return (
    <span className="text-gold-gradient">
      {n.toLocaleString()}
      {suffix}
    </span>
  );
}

export function PurityPromise() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section id="promise" ref={ref} className="film-grain section-pad relative overflow-hidden bg-ink">
      <div className="container-site relative z-[1]">
        <Reveal className="mx-auto mb-16 flex justify-center">
          <div className="relative size-48 sm:size-56">
            <div className="rotate-slow absolute inset-0">
              <svg viewBox="0 0 200 200" className="size-full">
                <defs>
                  <path
                    id="purityRing"
                    d="M100,100 m-82,0 a82,82 0 1,1 164,0 a82,82 0 1,1 -164,0"
                  />
                </defs>
                <circle
                  cx="100"
                  cy="100"
                  r="88"
                  fill="none"
                  stroke="#C9A24B"
                  strokeOpacity="0.35"
                  strokeWidth="1"
                />
                <text
                  fill="#C9A24B"
                  fontSize="12"
                  letterSpacing="4"
                  className="font-display uppercase"
                >
                  <textPath href="#purityRing">
                    PURITY PROMISED • PURITY PROMISED •
                  </textPath>
                </text>
              </svg>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex size-20 items-center justify-center rounded-full bg-[linear-gradient(135deg,#9A7B2F,#E8C877_45%,#C9A24B_70%,#F3DC9B)]">
                <MilkDrop className="h-8 w-6 text-ink" fill="currentColor" />
              </div>
            </div>
          </div>
        </Reveal>

        {/* Placeholder stats — replace values in /data/content.ts */}
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-0">
          {purityStats.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 0.08}
              className="relative flex flex-col items-center text-center lg:px-6"
            >
              {i > 0 && (
                <span
                  className="absolute left-0 top-1/2 hidden h-16 w-px -translate-y-1/2 bg-gold/30 lg:block"
                  aria-hidden
                />
              )}
              <div className="font-display text-5xl font-bold tracking-tight sm:text-6xl">
                <CountUp value={stat.value} suffix={stat.suffix} active={inView} />
              </div>
              <p className="mt-2 text-sm uppercase tracking-[0.2em] text-silver">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
