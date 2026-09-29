"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { site } from "@/data/content";

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);
    document.body.classList.add("has-custom-cursor");

    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      setHover(!!t?.closest("a, button, [role='button'], input, textarea, label"));
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  if (!enabled) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[100] mix-blend-difference"
      animate={{
        x: pos.x,
        y: pos.y,
        width: hover ? 44 : 10,
        height: hover ? 44 : 10,
        marginLeft: hover ? -22 : -5,
        marginTop: hover ? -22 : -5,
        borderWidth: hover ? 1 : 0,
        backgroundColor: hover ? "rgba(0,0,0,0)" : "#C9A24B",
      }}
      transition={{ type: "spring", stiffness: 400, damping: 28, mass: 0.35 }}
      style={{
        borderRadius: 999,
        borderColor: "#C9A24B",
      }}
    />
  );
}

export function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setP(max > 0 ? window.scrollY / max : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] bg-transparent">
      <div
        className="h-full origin-left bg-gold"
        style={{ transform: `scaleX(${p})` }}
      />
    </div>
  );
}

export function WhatsAppFab() {
  const [showTip, setShowTip] = useState(false);
  return (
    <a
      href={`https://wa.me/${site.whatsapp.replace(/\D/g, "")}`}
      target="_blank"
      rel="noreferrer"
      className="whatsapp-pulse fixed bottom-6 right-6 z-50 flex size-[60px] items-center justify-center rounded-full bg-[linear-gradient(135deg,#128C7E,#25D366_55%,#C9A24B)] text-white shadow-[0_10px_30px_rgba(37,211,102,0.35)]"
      aria-label="Chat with us on WhatsApp"
      onMouseEnter={() => setShowTip(true)}
      onMouseLeave={() => setShowTip(false)}
    >
      <svg viewBox="0 0 24 24" className="relative z-[1] size-7 fill-current">
        <path d="M20.5 3.5A11 11 0 0 0 2.6 17.6L2 22l4.5-.6A11 11 0 1 0 20.5 3.5zm-8.5 17a9 9 0 0 1-4.6-1.3l-.3-.2-2.7.4.4-2.6-.2-.3A9 9 0 1 1 12 20.5zm5-6.7c-.3-.1-1.6-.8-1.9-.9s-.4-.1-.6.1-.7.9-.8 1-.3.2-.6.1a7.4 7.4 0 0 1-2.2-1.4 8.2 8.2 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.5-.6c.1-.2.2-.3.3-.5s0-.4 0-.5-.6-1.4-.8-1.9-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3a2.4 2.4 0 0 0-.8 1.8c0 1.1.8 2.1.9 2.3a9.5 9.5 0 0 0 3.8 3.3c1.4.6 1.7.5 2 .5.3 0 1-.4 1.2-.8s.4-.8.3-.9-.2-.2-.4-.3z" />
      </svg>
      {showTip && (
        <span className="absolute right-full mr-3 whitespace-nowrap rounded-full bg-ink-2 px-3 py-1.5 text-xs text-milk ring-1 ring-gold/30">
          Chat with us
        </span>
      )}
    </a>
  );
}
