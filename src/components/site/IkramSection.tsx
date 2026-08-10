import {
  Salad,
  Soup,
  Leaf,
  Wheat,
  CircleDot,
  Flame,
  Carrot,
  type LucideIcon,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { ikramlarQuery } from "@/lib/public-data";
import { Reveal, SectionHeading } from "./Reveal";
import ikramBg from "@/assets/ikram-sofra.jpg.asset.json";

const ICONS: Record<string, LucideIcon> = {
  Haydari: Soup,
  Ezme: Salad,
  "Mevsim Yeşilliği": Leaf,
  "Bulgur Pilavı": Wheat,
  Soğan: CircleDot,
  "Kızarmış Soğan": Flame,
  Salatalık: Carrot,
};

export function IkramSection() {
  const { data: items = [] } = useQuery(ikramlarQuery);

  if (items.length === 0) return null;

  return (
    <section
      id="ikramlar"
      className="relative isolate overflow-visible px-5 pt-32 pb-16 sm:pt-40 sm:pb-20"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -bottom-32 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <img
          src={ikramBg.url}
          alt=""
          loading="lazy"
          className="size-full object-cover object-center opacity-45"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent 0%, oklch(0 0 0 / 0.08) 7%, oklch(0 0 0 / 0.32) 16%, oklch(0 0 0 / 0.72) 28%, oklch(0 0 0) 42%, oklch(0 0 0) 65%, oklch(0 0 0 / 0.82) 75%, oklch(0 0 0 / 0.52) 84%, oklch(0 0 0 / 0.24) 92%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, oklch(0 0 0 / 0.08) 7%, oklch(0 0 0 / 0.32) 16%, oklch(0 0 0 / 0.72) 28%, oklch(0 0 0) 42%, oklch(0 0 0) 65%, oklch(0 0 0 / 0.82) 75%, oklch(0 0 0 / 0.52) 84%, oklch(0 0 0 / 0.24) 92%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, var(--background) 0%, color-mix(in oklab, var(--background) 88%, transparent) 12%, color-mix(in oklab, var(--background) 68%, transparent) 30%, color-mix(in oklab, var(--background) 60%, transparent) 58%, color-mix(in oklab, var(--background) 68%, transparent) 72%, color-mix(in oklab, var(--background) 80%, transparent) 84%, color-mix(in oklab, var(--background) 94%, transparent) 94%, var(--background) 100%)",
          }}
        />
      </div>

      <SectionHeading eyebrow="İkramlarımız" title="Siz Değerlisiniz" />
      <ul className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">

        {items.map((item, index) => {
          const Icon = ICONS[item.name] ?? Leaf;
          return (
            <Reveal key={item.id} delay={index * 55} as="li">
              <div className="lift glass-ikram group flex h-full flex-col items-center gap-3 overflow-hidden rounded-2xl text-center">
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={item.name}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-[1.1s] ease-[var(--ease-luxe)] group-hover:scale-110"
                  />
                ) : null}
                <div className="flex flex-col items-center gap-3 px-4 pt-3 pb-7">
                  {item.image_url ? null : (
                    <span className="grid size-12 place-items-center rounded-full border border-gold/30 bg-primary/40 transition-colors duration-500 group-hover:border-gold/70">
                      <Icon className="size-5 text-gold" strokeWidth={1.5} />
                    </span>
                  )}
                  <span className="text-sm font-semibold tracking-wide">{item.name}</span>
                </div>
              </div>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
