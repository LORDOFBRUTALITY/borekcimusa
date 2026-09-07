import { cn } from "@/lib/utils";

export function Emblem({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <img
        src="/logo.png"
        alt="Börekçi Musa logosu"
        width={1200}
        height={1200}
        className="h-auto w-full max-w-full object-contain"
        style={{
          maxWidth: compact ? "min(170px, 60vw)" : "min(380px, 80vw)",
          filter:
            "drop-shadow(0 2px 8px oklch(0.10 0.02 50 / 60%)) drop-shadow(0 10px 30px oklch(0.10 0.02 50 / 45%))",
        }}
      />
      {!compact ? (
        <p className="mt-4 text-[0.62rem] tracking-[0.5em] text-muted-foreground uppercase">
          Nilüfer / Bursa
        </p>
      ) : null}
    </div>
  );
}
