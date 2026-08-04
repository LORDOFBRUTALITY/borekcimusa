import { useQuery } from "@tanstack/react-query";
import { menuQuery } from "@/lib/public-data";
import { CATEGORY_ORDER } from "@/lib/site";
import { Reveal, SectionHeading } from "./Reveal";

function priceLabel(price: number) {
  return `${price.toLocaleString("tr-TR")} TL`;
}

export function MenuSection() {
  const { data: items = [] } = useQuery(menuQuery);

  const categories = [
    ...CATEGORY_ORDER.filter((c) => items.some((i) => i.category === c)),
    ...Array.from(new Set(items.map((i) => i.category))).filter(
      (c) => !CATEGORY_ORDER.includes(c as (typeof CATEGORY_ORDER)[number]),
    ),
  ];

  return (
    <section id="menu" className="relative px-5 py-24 sm:py-32">
      <SectionHeading eyebrow="Menü" title="Ocaktan Sofraya" />

      <div className="mx-auto mt-16 max-w-6xl space-y-20">
        {categories.map((category) => (
          <div key={category}>
            <Reveal className="flex items-center gap-5">
              <h3 className="font-display text-2xl font-semibold whitespace-nowrap text-gold-soft sm:text-3xl">
                {category}
              </h3>
              <span className="hairline-gold h-px flex-1" />
            </Reveal>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items
                .filter((item) => item.category === category)
                .map((item, index) => (
                  <Reveal key={item.id} delay={index * 60} as="article">
                    <div className="lift group relative h-full overflow-hidden rounded-2xl border border-gold/15 bg-surface">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        {item.image_url ? (
                          <img
                            src={item.image_url}
                            alt={item.name}
                            loading="lazy"
                            width={1024}
                            height={768}
                            className="size-full object-cover transition-transform duration-[1.1s] ease-[var(--ease-luxe)] group-hover:scale-110"
                          />
                        ) : (
                          <div className="size-full bg-secondary" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/25 to-transparent" />
                        <span className="absolute top-3 right-3 rounded-full border border-gold/40 bg-background/70 px-3 py-1 text-xs font-semibold tracking-wide text-gold backdrop-blur-md">
                          {priceLabel(item.price)}
                        </span>
                      </div>
                      <div className="p-5">
                        <h4 className="font-display text-xl font-semibold">{item.name}</h4>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
