"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { about, site } from "@/data/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MilkSplash } from "@/components/ui/MilkSplash";
import { Reveal } from "@/components/ui/Reveal";

function StatementWord({
  word,
  index,
  total,
  progress,
}: {
  word: string;
  index: number;
  total: number;
  progress: ReturnType<typeof useTransform<number, number>>;
}) {
  const opacity = useTransform(progress, (v) => {
    const start = index / total;
    const end = (index + 1.2) / total;
    if (v <= start) return 0.22;
    if (v >= end) return 1;
    return 0.22 + ((v - start) / (end - start)) * 0.78;
  });

  return (
    <motion.span style={{ opacity }} className="inline">
      {word}
      {index < total - 1 ? " " : ""}
    </motion.span>
  );
}

export function About() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "center 35%"],
  });

  const words = about.statement.split(" ");
  const imgY1 = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [40, -40]);
  const imgY2 = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [20, -70]);
  const imgY3 = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [50, -20]);

  return (
    <section id="about" ref={ref} className="section-pad relative overflow-hidden bg-cream">
      <MilkSplash
        className="pointer-events-none absolute -left-24 top-10 w-[55vw] max-w-2xl text-cream-2"
        fill="currentColor"
        opacity={1}
      />

      <div className="container-site relative z-[1]">
        <Reveal>
          <Eyebrow>{about.eyebrow}</Eyebrow>
        </Reveal>

        <h2 className="display-h2 max-w-5xl text-text-dark">
          {words.map((word, i) => (
            <StatementWord
              key={`${word}-${i}`}
              word={word}
              index={i}
              total={words.length}
              progress={scrollYProgress}
            />
          ))}
        </h2>

        <div className="mt-16 grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="max-w-md text-lg leading-relaxed text-text-dark/80">
              {about.body}
            </p>
            <p className="mt-8 font-display text-xl italic text-gold-deep">
              {about.signature}
            </p>
          </Reveal>

          <div className="relative mx-auto grid h-[420px] w-full max-w-lg grid-cols-12 grid-rows-6 gap-3 sm:h-[480px]">
            <motion.div
              style={{ y: imgY1 }}
              className="relative col-span-6 row-span-6 overflow-hidden rounded-t-[999px] rounded-b-[24px]"
            >
              <Image
                src={about.images[0].src}
                alt={about.images[0].alt}
                fill
                className="object-cover"
                sizes="(max-width:768px) 50vw, 280px"
              />
            </motion.div>
            <motion.div
              style={{ y: imgY2 }}
              className="relative col-span-6 row-span-3 overflow-hidden rounded-full"
            >
              <Image
                src={about.images[1].src}
                alt={about.images[1].alt}
                fill
                className="object-cover"
                sizes="(max-width:768px) 40vw, 220px"
              />
            </motion.div>
            <motion.div
              style={{ y: imgY3 }}
              className="relative col-span-6 row-span-3 overflow-hidden rounded-[32px]"
            >
              <Image
                src={about.images[2].src}
                alt={about.images[2].alt}
                fill
                className="object-cover"
                sizes="(max-width:768px) 40vw, 220px"
              />
            </motion.div>

            <div className="absolute -right-2 top-8 z-10 flex size-20 items-center justify-center rounded-full bg-[linear-gradient(135deg,#9A7B2F,#E8C877_45%,#C9A24B_70%,#F3DC9B)] text-center shadow-lg sm:size-24">
              <span className="font-display text-[11px] font-bold leading-tight text-ink sm:text-xs">
                Since
                <br />
                {site.foundedYear}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-0">
          {about.stats.map((stat, i) => (
            <div key={stat.label} className="flex items-center">
              {i > 0 && (
                <span className="mx-6 hidden h-px w-12 bg-gold/50 sm:block" aria-hidden />
              )}
              <span className="font-display text-lg text-text-dark">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
