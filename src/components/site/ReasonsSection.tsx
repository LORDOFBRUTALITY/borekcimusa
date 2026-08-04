import { Check } from "lucide-react";
import { REASONS } from "@/lib/site";
import { Reveal } from "./Reveal";

export function ReasonsSection() {
  return (
    <section id="neden" className="relative px-5 py-24 sm:py-32">
      <Reveal className="flex justify-center">
        <h2 className="max-w-full rounded-2xl border border-gold/30 px-5 py-3 text-center font-display text-[clamp(1.05rem,4.6vw,2.5rem)] leading-tight font-semibold whitespace-nowrap">
          <span className="text-gilded">Neden Ciğerci Veysi Usta?</span>
        </h2>
      </Reveal>
      <div className="mx-auto mt-14 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {REASONS.map((reason, index) => (
          <Reveal key={reason.title} delay={index * 55}>
            <div className="lift group relative h-full overflow-hidden rounded-2xl border border-gold/15 bg-surface p-6">
              <span
                className="absolute inset-x-0 -top-px h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: "var(--gradient-gold)" }}
              />
              <div className="flex items-start gap-3">
                <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border border-gold/40">
                  <Check className="size-3.5 text-gold" strokeWidth={2} />
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-xl font-semibold">{reason.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {reason.text}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
