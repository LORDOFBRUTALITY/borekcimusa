import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";

export function Emblem({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div
        className={cn(
          "relative grid place-items-center rounded-full border border-gold/40",
          compact ? "size-10" : "size-20 sm:size-24",
        )}
      >
        <div className="absolute inset-1 rounded-full border border-copper/40" />
        <Flame
          className={cn("text-gold", compact ? "size-4" : "size-8 sm:size-9")}
          strokeWidth={1.3}
        />
      </div>
      <div className={cn("text-center", compact ? "mt-0" : "mt-4")}>
        <p
          className={cn(
            "font-display leading-none font-semibold",
            compact ? "text-base" : "text-2xl sm:text-3xl",
          )}
        >
          <span className="text-gilded">CİĞERCİ VEYSİ USTA</span>
        </p>
        {!compact ? (
          <p className="mt-2 text-[0.62rem] tracking-[0.5em] text-muted-foreground uppercase">
            Ocakbaşı · Bursa
          </p>
        ) : null}
      </div>
    </div>
  );
}
