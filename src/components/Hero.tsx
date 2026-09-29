"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { hero, site } from "@/data/content";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MilkDrop } from "@/components/ui/MilkSplash";

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.12]);

  useEffect(() => {
    // Slot for motionsites.ai cinematic asset when provided
  }, []);

  return (
    <section
      id="top"
      ref={ref}
      className="film-grain relative flex min-h-[100svh] items-center overflow-hidden bg-ink"
    >
      <motion.div className="absolute inset-0" style={{ scale: bgScale }}>
        <Image
          src={site.heroBackground}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
      </motion.div>

      <div className="container-site relative z-[2] grid w-full grid-cols-12 gap-8 pb-28 pt-32 lg:pb-24 lg:pt-28">
        <div className="col-span-12 text-center lg:col-span-8 lg:text-left">
          <Eyebrow className="justify-center lg:justify-start">{hero.eyebrow}</Eyebrow>

          <h1 className="display-h1 text-milk">
            {hero.lines.map((line, i) => (
              <span key={line} className="block">
                <motion.span
                  className={
                    i === hero.goldLineIndex
                      ? "inline-block text-gold-gradient italic"
                      : "inline-block"
                  }
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: reduce ? 0 : 0.15 + i * 0.12,
                    duration: reduce ? 0 : 0.85,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="mx-auto mt-6 max-w-[480px] text-base text-silver sm:text-lg lg:mx-0"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: reduce ? 0 : 0.55,
              duration: reduce ? 0 : 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {hero.subtext}
          </motion.p>

          <motion.div
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row lg:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: reduce ? 0 : 0.7,
              duration: reduce ? 0 : 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Button href={hero.primaryCta.href}>{hero.primaryCta.label}</Button>
            <Button href={hero.secondaryCta.href} variant="secondary">
              {hero.secondaryCta.label}
            </Button>
          </motion.div>
        </div>

        <div className="pointer-events-none absolute right-[8%] top-1/2 hidden -translate-y-1/2 lg:block">
          <div className="relative size-40">
            <div className="rotate-slow absolute inset-0">
              <svg viewBox="0 0 200 200" className="size-full">
                <defs>
                  <path
                    id="badgeCircle"
                    d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0"
                  />
                </defs>
                <text
                  fill="#C9A24B"
                  fontSize="11"
                  letterSpacing="3"
                  className="font-display uppercase"
                >
                  <textPath href="#badgeCircle">
                    PURITY PROMISED • PURITY PROMISED •
                  </textPath>
                </text>
              </svg>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex size-16 items-center justify-center rounded-full border border-gold/40 bg-ink/60 backdrop-blur-sm">
                <MilkDrop className="h-7 w-5 text-gold" fill="currentColor" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 z-[2]">
        <div className="container-site relative flex items-end justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {hero.chips.map((chip, i) => (
              <motion.span
                key={chip}
                className="rounded-full border border-gold/40 bg-white/5 px-4 py-2 text-xs font-medium tracking-wide text-milk backdrop-blur-md"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: reduce ? 0 : 0.85 + i * 0.1,
                  duration: reduce ? 0 : 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {chip}
              </motion.span>
            ))}
          </div>

          <div className="absolute left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex">
            <span className="text-[10px] uppercase tracking-[0.3em] text-silver">
              Scroll
            </span>
            <span className="relative h-10 w-px overflow-hidden bg-gold/20">
              <span className="scroll-indicator-line absolute inset-x-0 top-0 h-full bg-gold" />
            </span>
          </div>
          <span className="w-[1px] opacity-0 sm:w-40" aria-hidden />
        </div>
      </div>
    </section>
  );
}
