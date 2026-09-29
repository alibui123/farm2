"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, ClipboardList, Heart, Truck } from "lucide-react";
import { delivery, site } from "@/data/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

const icons = [ClipboardList, Heart, Truck];

export function Delivery() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [lineProgress, setLineProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setLineProgress(1);
        delivery.steps.forEach((_, i) => {
          window.setTimeout(() => setActive(i + 1), 200 + i * 350);
        });
      },
      { threshold: 0.35 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="delivery" className="section-pad bg-cream">
      <div className="container-site">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow className="justify-center">{delivery.eyebrow}</Eyebrow>
          <h2 className="display-h2 text-text-dark">{delivery.heading}</h2>
        </Reveal>

        <div ref={ref} className="relative mt-16">
          {/* Connecting dashed line */}
          <div className="pointer-events-none absolute left-[16%] right-[16%] top-10 hidden h-px md:block">
            <div
              className="h-full origin-left border-t-2 border-dashed border-gold transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ transform: `scaleX(${lineProgress})` }}
            />
          </div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-6">
            {delivery.steps.map((step, i) => {
              const Icon = icons[i];
              const filled = active > i;
              return (
                <Reveal key={step.title} delay={i * 0.1} className="text-center">
                  <div
                    className={cn(
                      "mx-auto mb-5 flex size-20 items-center justify-center rounded-full border-2 transition-all duration-500",
                      filled
                        ? "border-gold bg-gold text-ink"
                        : "border-gold bg-transparent text-gold",
                    )}
                  >
                    <Icon className="size-7" strokeWidth={1.5} />
                  </div>
                  <p className="mb-2 text-xs uppercase tracking-[0.25em] text-gold">
                    Step {i + 1}
                  </p>
                  <h3 className="font-display text-xl font-semibold text-text-dark sm:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mx-auto mt-2 max-w-xs text-text-dark/70">
                    {step.description}
                  </p>
                </Reveal>
              );
            })}
          </div>
        </div>

        <Reveal className="mt-16">
          <div className="flex flex-col items-start justify-between gap-6 rounded-[32px] bg-ink px-8 py-8 sm:flex-row sm:items-center sm:px-10">
            <div>
              <p className="font-display text-2xl text-gold sm:text-3xl">
                {site.deliveryTiming}
              </p>
              {/* Placeholder delivery areas */}
              <p className="mt-2 text-silver">{site.deliveryAreas}</p>
            </div>
            <Button
              href={`https://wa.me/${site.whatsapp.replace(/\D/g, "")}`}
              showArrow={false}
            >
              <MessageCircle className="mr-1 size-4" />
              WhatsApp to Order
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
