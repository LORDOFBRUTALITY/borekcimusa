import { REASONS } from "@/lib/site";
import { Reveal } from "./Reveal";

export function ReasonsSection() {
  return (
    <section id="neden" className="relative px-4 py-24 sm:py-32">
      <Reveal className="text-center">
        <h2 className="mx-auto font-display text-[clamp(1.6rem,6.4vw,3rem)] leading-tight font-semibold tracking-tight whitespace-nowrap">
          <span className="text-gilded">Neden Börekçi Musa?</span>
        </h2>
        <div className="dashed-flour mx-auto mt-6 w-40" />
      </Reveal>

      <div className="mx-auto mt-14 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {REASONS.map((reason, index) => {
          const Icon = reason.icon;
          return (
            <Reveal key={reason.title} delay={index * 55}>
              <div className="float-card flex h-full flex-col items-center gap-3 rounded-[2rem] px-6 py-8 text-center">
                <span
                  className="grid size-14 place-items-center rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 25%, color-mix(in oklab, var(--gold) 28%, transparent), transparent 72%)",
                    boxShadow: "inset 0 0 0 1px color-mix(in oklab, var(--gold) 30%, transparent)",
                  }}
                >
                  <Icon className="size-6 text-gold" strokeWidth={1.5} />
                </span>
                <h3 className="font-display text-xl font-semibold text-cream">{reason.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{reason.text}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
