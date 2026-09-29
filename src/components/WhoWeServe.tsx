"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { audiences } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";

export function WhoWeServe() {
  return (
    <section id="serve" className="section-pad bg-cream">
      <div className="container-site">
        <div className="mb-12 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-end">
          <Reveal>
            <h2 className="display-h2 text-text-dark">Who we serve</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-md text-lg text-text-dark/75 lg:justify-self-end">
              Whether you&apos;re filling a family fridge or stocking a shop —
              we deliver the same farm purity, every day.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {audiences.map((card, i) => (
            <Reveal key={card.number} delay={i * 0.15}>
              <a
                href={card.href}
                className="group relative flex aspect-[3/4] overflow-hidden rounded-[24px]"
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                  sizes="(max-width:768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/15" />

                <span className="absolute left-6 top-6 font-display text-2xl text-gold">
                  {card.number}
                </span>

                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-milk sm:text-3xl">
                      {card.title}
                    </h3>
                    <p className="mt-2 max-w-[220px] text-sm text-silver">
                      {card.description}
                    </p>
                  </div>
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-gold bg-gold/10 text-gold transition-transform duration-300 group-hover:rotate-45">
                    <ArrowUpRight className="size-5" />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
