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
    <section id="ikramlar" className="relative px-5 py-24 sm:py-32">
      <SectionHeading eyebrow="İkramlarımız" title="Siz Değerlisiniz" />
      <ul className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((item, index) => {
          const Icon = ICONS[item.name] ?? Leaf;
          return (
            <Reveal key={item.id} delay={index * 55} as="li">
              <div className="lift surface-glass group flex h-full flex-col items-center gap-3 overflow-hidden rounded-2xl text-center">
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
