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
import { IKRAMLAR } from "@/lib/site";
import { Reveal, SectionHeading } from "./Reveal";

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
  return (
    <section id="ikramlar" className="relative px-5 py-24 sm:py-32">
      <SectionHeading
        eyebrow="İkramlarımız"
        title="Siz Değerlisiniz"
        description="Masalarımıza ücretsiz olarak sunulan ikramlarımız."
      />
      <ul className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {IKRAMLAR.map((item, index) => {
          const Icon = ICONS[item] ?? Leaf;
          return (
            <Reveal key={item} delay={index * 55} as="li">
              <div className="lift surface-glass group flex h-full flex-col items-center gap-3 rounded-2xl px-4 py-7 text-center">
                <span className="grid size-12 place-items-center rounded-full border border-gold/30 bg-primary/40 transition-colors duration-500 group-hover:border-gold/70">
                  <Icon className="size-5 text-gold" strokeWidth={1.5} />
                </span>
                <span className="text-sm font-semibold tracking-wide">{item}</span>
              </div>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
