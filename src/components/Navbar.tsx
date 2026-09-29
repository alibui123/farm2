"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks, site } from "@/data/content";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(`#${id}`);
        },
        { rootMargin: "-40% 0px -50% 0px" },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          scrolled
            ? "h-[68px] border-b border-gold/30 bg-[rgba(10,10,10,0.7)] backdrop-blur-xl"
            : "h-[84px] bg-transparent",
        )}
      >
        <div className="container-site flex h-full items-center justify-between gap-4">
          <a href="#top" className="flex items-center gap-3">
            <span className="relative size-12 overflow-hidden rounded-full ring-1 ring-gold/40">
              <Image
                src={site.logo}
                alt={site.name}
                fill
                className="object-cover"
                sizes="48px"
                priority
              />
            </span>
            <span className="font-display hidden text-lg font-semibold text-milk sm:inline">
              {site.name}
            </span>
          </a>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative py-2 text-sm font-medium text-silver transition-colors hover:text-milk"
              >
                {link.label}
                <span
                  className={cn(
                    "absolute bottom-0 left-1/2 size-1 -translate-x-1/2 rounded-full bg-gold transition-opacity",
                    active === link.href
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-60",
                  )}
                />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden lg:block">
              <Button href="#contact" className="h-11 px-6 text-sm" showArrow={false}>
                Free Sample
              </Button>
            </div>
            <button
              type="button"
              className="inline-flex size-12 items-center justify-center rounded-full border border-gold/40 text-milk lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col bg-ink px-6 pb-10 pt-28 lg:hidden"
            data-testid="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav className="flex flex-1 flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-display border-b border-gold/15 py-4 text-4xl font-semibold text-milk"
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.05 + i * 0.07,
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
            <div className="space-y-4">
              <Button
                href={`https://wa.me/${site.whatsapp.replace(/\D/g, "")}`}
                className="w-full"
                showArrow={false}
              >
                WhatsApp Us
              </Button>
              <p className="text-center font-display text-sm italic text-silver">
                {site.tagline}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
