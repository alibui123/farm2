import { cn } from "@/lib/cn";

export function Eyebrow({
  children,
  className,
  light = false,
}: {
  children: React.ReactNode;
  className?: string;
  light?: boolean;
}) {
  return (
    <div
      className={cn(
        "mb-5 flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.25em]",
        light ? "text-gold" : "text-gold",
        className,
      )}
    >
      <span className="inline-block h-px w-8 bg-gold" aria-hidden />
      <span>{children}</span>
    </div>
  );
}
