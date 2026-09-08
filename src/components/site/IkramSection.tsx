import { Coffee } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { ikramlarQuery } from "@/lib/public-data";
import { Reveal } from "./Reveal";

export function IkramSection() {
  const { data: items = [] } = useQuery(ikramlarQuery);
  const item = items[0];

  if (!item) return null;

  return (
    <section id="ikramlar" className="relative isolate overflow-hidden px-5 py-24 sm:py-32">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 50%, color-mix(in oklab, var(--copper) 20%, transparent) 0%, transparent 72%)",
        }}
      />

      <Reveal className="mx-auto max-w-2xl">
        <div className="surface-bakery crimp relative mx-auto flex flex-col items-center gap-6 px-8 py-12 text-center sm:px-14">
          <p className="text-xs font-semibold tracking-[0.42em] text-gold uppercase">
            Müessesemizin İkramı
          </p>

          <div className="relative grid size-40 place-items-center overflow-hidden rounded-full sm:size-52">
            {item.image_url ? (
              <img
                src={item.image_url}
                alt={item.name}
                loading="lazy"
                className="size-full rounded-full object-cover"
              />
            ) : (
              <span className="grid size-full place-items-center rounded-full bg-secondary">
                <Coffee className="size-14 text-gold" strokeWidth={1.3} />
              </span>
            )}
            <span
              className="pointer-events-none absolute inset-0 rounded-full"
              style={{
                boxShadow:
                  "inset 0 0 0 1px color-mix(in oklab, var(--cream) 30%, transparent), 0 0 40px -6px color-mix(in oklab, var(--gold) 45%, transparent)",
              }}
            />
          </div>

          <h2 className="font-display text-4xl font-semibold sm:text-5xl">
            <span className="text-gilded">{item.name}</span>
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            Börekçi Musa'da böreğinizin yanında güler yüz ve taze demleme çay ikram edilir.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
