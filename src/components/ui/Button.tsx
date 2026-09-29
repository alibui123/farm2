"use client";

import {
  forwardRef,
  useRef,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  href?: string;
  magnetic?: boolean;
  showArrow?: boolean;
  children: ReactNode;
  className?: string;
};

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, Props>(
  function Button(
    {
      variant = "primary",
      href,
      magnetic = true,
      showArrow = true,
      children,
      className,
      onMouseMove,
      onMouseLeave,
      ...rest
    },
    _ref,
  ) {
    const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

    const handleMove = (e: React.MouseEvent<HTMLButtonElement & HTMLAnchorElement>) => {
      onMouseMove?.(e as never);
      if (!magnetic || window.matchMedia("(pointer: coarse)").matches) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.18}px, ${y * 0.22}px)`;
    };

    const handleLeave = (e: React.MouseEvent<HTMLButtonElement & HTMLAnchorElement>) => {
      onMouseLeave?.(e as never);
      if (ref.current) ref.current.style.transform = "";
    };

    const base =
      "group relative h-14 items-center justify-center gap-2 rounded-full px-8 text-[15px] font-semibold tracking-wide transition-all duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink";

    const styles: Record<Variant, string> = {
      primary:
        "inline-flex bg-[linear-gradient(135deg,#9A7B2F,#E8C877_45%,#C9A24B_70%,#F3DC9B)] text-ink shadow-[0_0_0_0_rgba(201,162,75,0)] hover:shadow-[0_8px_32px_rgba(201,162,75,0.35)]",
      secondary:
        "inline-flex border border-gold/80 bg-transparent text-gold hover:bg-gold hover:text-ink",
      ghost: "inline-flex bg-transparent text-milk hover:text-gold",
    };

    const content = (
      <>
        <span>{children}</span>
        {showArrow && (
          <ArrowRight
            className="size-4 transition-transform duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
            strokeWidth={2}
          />
        )}
      </>
    );

    if (href) {
      return (
        <a
          ref={ref as React.RefObject<HTMLAnchorElement>}
          href={href}
          className={cn(base, styles[variant], className)}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.RefObject<HTMLButtonElement>}
        className={cn(base, styles[variant], className)}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        {...rest}
      >
        {content}
      </button>
    );
  },
);
