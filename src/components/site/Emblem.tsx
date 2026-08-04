import { cn } from "@/lib/utils";

export function Emblem({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <img
        src="/logo.png"
        alt="Ciğerci Veysi Usta logosu"
        width={1200}
        height={466}
        className={cn("h-auto w-auto object-contain", compact ? "max-w-[190px]" : "max-w-[420px]")}
      />
      {!compact ? (
        <p className="mt-4 text-[0.62rem] tracking-[0.5em] text-muted-foreground uppercase">
          Ocakbaşı · Bursa
        </p>
      ) : null}
    </div>
  );
}
