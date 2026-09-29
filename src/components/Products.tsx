"use client";

import { useRef } from "react";
import Image from "next/image";
import { products } from "@/data/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { MilkSplash } from "@/components/ui/MilkSplash";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

function ProductCard({
  item,
}: {
  item: (typeof products.items)[number];
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const card = cardRef.current;
    const img = imgRef.current;
    if (!card || !img) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    img.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 8}deg)`;
  };

  const onLeave = () => {
    if (imgRef.current) imgRef.current.style.transform = "";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn(
        "group relative flex min-w-[280px] flex-1 flex-col overflow-hidden rounded-[32px] border bg-ink-2 p-6 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:border-gold hover:shadow-[0_20px_60px_rgba(201,162,75,0.15)] sm:min-w-0",
        item.comingSoon
          ? "border-dashed border-gold/50"
          : "border-gold/30",
      )}
      data-testid={`product-card-${item.id}`}
    >
      <div
        ref={imgRef}
        className="relative mb-6 flex aspect-square items-center justify-center overflow-hidden rounded-[24px] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, rgba(201,162,75,0.28), transparent 65%)",
        }}
      >
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover opacity-90 transition-opacity group-hover:opacity-100"
            sizes="(max-width:768px) 80vw, 320px"
          />
        ) : (
          <MilkSplash className="h-40 w-48 text-gold" fill="currentColor" opacity={0.45} />
        )}
      </div>

      <h3 className="font-display text-2xl font-semibold text-milk">{item.name}</h3>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-silver">
        {item.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-gold/30 px-3 py-1 text-[11px] uppercase tracking-wider text-gold"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between gap-3 pt-6">
        <span className="font-display text-lg text-gold-light">{item.price}</span>
        {!item.comingSoon && (
          <Button href="#contact" className="h-10 px-5 text-sm" showArrow={false}>
            Order
          </Button>
        )}
      </div>
    </div>
  );
}

export function Products() {
  return (
    <section id="products" className="relative bg-cream-2">
      {/* Wavy milk-splash divider into dark */}
      <div className="relative bg-cream-2 pt-20">
        <svg
          viewBox="0 0 1440 120"
          className="block w-full text-ink"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            fill="currentColor"
            d="M0,64 C240,120 480,0 720,48 C960,96 1200,120 1440,40 L1440,120 L0,120 Z"
          />
        </svg>
      </div>

      <div className="film-grain relative bg-ink pb-[var(--section-y-mobile)] pt-4 lg:pb-[var(--section-y)] lg:pt-6">
        <div
          className="pointer-events-none absolute inset-x-0 top-1/3 text-center font-display text-[18vw] font-bold leading-none tracking-tight text-transparent opacity-30"
          style={{ WebkitTextStroke: "1px rgba(201,162,75,0.25)" }}
          aria-hidden
        >
          MILK
        </div>

        <div className="container-site relative z-[1]">
          <Reveal className="mx-auto max-w-3xl text-center">
            <Eyebrow className="justify-center">{products.eyebrow}</Eyebrow>
            <h2 className="display-h2 text-milk">{products.heading}</h2>
          </Reveal>

          <div className="no-scrollbar mt-14 flex gap-6 overflow-x-auto pb-4 lg:mt-16 lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0">
            {products.items.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.1} className="flex min-w-[85%] sm:min-w-[320px] lg:min-w-0">
                <ProductCard item={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
