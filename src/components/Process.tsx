"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { processSteps } from "@/data/content";
import { MilkSplash } from "@/components/ui/MilkSplash";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger);

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setIsDesktop(mq.matches && !reduce.matches);
    update();
    mq.addEventListener("change", update);
    reduce.addEventListener("change", update);
    return () => {
      mq.removeEventListener("change", update);
      reduce.removeEventListener("change", update);
    };
  }, []);

  useGSAP(
    () => {
      if (!sectionRef.current || !isDesktop) return;

      const steps = processSteps.length;
      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${window.innerHeight * steps}`,
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => {
          const idx = Math.min(steps - 1, Math.floor(self.progress * steps));
          setActive(idx);
        },
      });

      return () => st.kill();
    },
    { dependencies: [isDesktop], scope: sectionRef },
  );

  const step = processSteps[active];

  return (
    <section
      id="process"
      ref={sectionRef}
      className="film-grain relative overflow-hidden bg-ink"
    >
      <MilkSplash
        className="pointer-events-none absolute -right-20 top-1/4 w-[50vw] max-w-xl rotate-slow text-gold opacity-[0.07]"
        fill="currentColor"
      />

      {/* Desktop pinned experience */}
      <div className="container-site relative z-[1] hidden min-h-[100svh] flex-col justify-center lg:flex lg:py-0">
        <div className="grid grid-cols-12 items-center gap-12">
          <div className="relative col-span-1">
            <div className="absolute left-3 top-0 h-[280px] w-px bg-gold/20">
              <div
                className="w-px bg-gold transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  height: `${((active + 1) / processSteps.length) * 100}%`,
                }}
              />
            </div>
            <div className="relative flex h-[280px] flex-col justify-between">
              {processSteps.map((s, i) => (
                <button
                  key={s.number}
                  type="button"
                  aria-label={`Step ${s.number}`}
                  onClick={() => setActive(i)}
                  className={cn(
                    "relative z-[1] ml-1 size-4 rounded-full border-2 transition-all duration-300",
                    i <= active
                      ? "border-gold bg-gold shadow-[0_0_16px_rgba(201,162,75,0.7)]"
                      : "border-gold/40 bg-ink",
                  )}
                />
              ))}
            </div>
          </div>

          <div className="col-span-5">
            <div
              className="font-display text-[140px] font-bold leading-none text-transparent"
              style={{ WebkitTextStroke: "1.5px #C9A24B" }}
            >
              {step.number}
            </div>
            <h3 className="font-display mt-2 text-5xl font-semibold text-milk">
              {step.title}
            </h3>
            <p className="mt-4 max-w-md text-lg text-silver">{step.description}</p>
          </div>

          <div className="col-span-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[32px] border border-gold/30">
              {processSteps.map((s, i) => (
                <div
                  key={s.number}
                  className={cn(
                    "absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    i === active ? "scale-100 opacity-100" : "scale-105 opacity-0",
                  )}
                >
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    className="object-cover"
                    sizes="50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile stacked steps (no pin) */}
      <div className="container-site relative z-[1] space-y-16 py-20 lg:hidden">
        {processSteps.map((s) => (
          <div key={s.number} className="grid gap-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[32px] border border-gold/30">
              <Image
                src={s.image}
                alt={s.title}
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
            <div>
              <div
                className="font-display text-7xl font-bold leading-none text-transparent"
                style={{ WebkitTextStroke: "1.5px #C9A24B" }}
              >
                {s.number}
              </div>
              <h3 className="font-display mt-1 text-3xl font-semibold text-milk">
                {s.title}
              </h3>
              <p className="mt-3 text-silver">{s.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
