"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { testimonials } from "@/data/content";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  const t = testimonials[index];

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(id);
  }, [reduce, index]);

  const prev = () =>
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setIndex((i) => (i + 1) % testimonials.length);

  return (
    <section className="film-grain section-pad relative overflow-hidden bg-ink" id="testimonials">
      {/* Floating avatars */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {[
          { t: "12%", l: "8%", d: "0s" },
          { t: "70%", l: "12%", d: "1.2s" },
          { t: "20%", l: "88%", d: "0.6s" },
          { t: "65%", l: "85%", d: "1.8s" },
        ].map((p, i) => (
          <span
            key={i}
            className="float-gentle absolute size-10 rounded-full border border-gold/30 bg-ink-2 sm:size-14"
            style={{
              top: p.t,
              left: p.l,
              animationDelay: p.d,
              backgroundImage: `radial-gradient(circle at 30% 30%, #E8C87733, #141210)`,
            }}
          />
        ))}
      </div>

      <div className="container-site relative z-[1] mx-auto max-w-4xl text-center">
        <div className="relative min-h-[280px] sm:min-h-[260px]">
          <span
            className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 font-display text-[140px] leading-none text-gold opacity-10 sm:text-[180px]"
            aria-hidden
          >
            “
          </span>

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? undefined : { opacity: 0, x: -40 }}
              transition={{
                duration: reduce ? 0 : 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Synthetic testimonial — replace in content.ts */}
              <blockquote className="font-display relative pt-10 text-2xl italic leading-snug text-milk sm:text-4xl lg:text-5xl">
                {t.quote}
              </blockquote>
              <div className="mt-8">
                <p className="font-medium text-milk">{t.name}</p>
                <p className="text-sm text-silver">{t.area}</p>
                <div className="mt-3 flex justify-center gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="size-4 fill-gold text-gold"
                      strokeWidth={0}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous testimonial"
            className="flex size-12 items-center justify-center rounded-full border border-gold/40 text-gold transition hover:bg-gold hover:text-ink"
          >
            <ChevronLeft className="size-5" />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`size-2 rounded-full transition-all ${
                  i === index ? "w-6 bg-gold" : "bg-gold/30"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={next}
            aria-label="Next testimonial"
            className="flex size-12 items-center justify-center rounded-full border border-gold/40 text-gold transition hover:bg-gold hover:text-ink"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
