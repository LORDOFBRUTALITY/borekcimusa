import { Clock, Sunrise, Sunset } from "lucide-react";
import { Reveal } from "./Reveal";

export function HoursBand() {
  return (
    <section id="saatler" className="relative px-5 py-10">
      <Reveal className="mx-auto max-w-4xl">
        <div className="surface-bakery flex flex-col items-center gap-6 rounded-full px-8 py-6 sm:flex-row sm:justify-between sm:px-12">
          <span className="flex items-center gap-3 text-xs font-semibold tracking-[0.34em] text-gold uppercase">
            <Clock className="size-4" strokeWidth={1.7} /> Her Gün Açığız
          </span>

          <div className="flex flex-1 items-center gap-4 sm:px-8">
            <span className="flex items-center gap-2 font-display text-xl font-semibold text-cream">
              <Sunrise className="size-5 text-gold" strokeWidth={1.5} /> 06:00
            </span>
            <span className="dashed-flour flex-1" />
            <span className="flex items-center gap-2 font-display text-xl font-semibold text-cream">
              <Sunset className="size-5 text-gold" strokeWidth={1.5} /> 18:00
            </span>
          </div>

          <span className="text-xs tracking-[0.28em] text-muted-foreground uppercase">
            Nilüfer / Bursa
          </span>
        </div>
      </Reveal>
    </section>
  );
}
