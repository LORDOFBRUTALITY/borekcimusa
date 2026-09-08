import { cn } from "@/lib/utils";

export function Emblem({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <img
        src="/logo.png"
        alt="Börekçi Musa logosu"
        width={1200}
        height={1200}
        className="logo-halo h-auto w-full max-w-full object-contain"
        style={{ maxWidth: compact ? "min(160px, 56vw)" : "min(340px, 78vw)" }}
      />
      {!compact ? (
        <p className="mt-4 text-[0.62rem] tracking-[0.5em] text-cream/70 uppercase">
          Nilüfer / Bursa
        </p>
      ) : null}
    </div>
  );
}
