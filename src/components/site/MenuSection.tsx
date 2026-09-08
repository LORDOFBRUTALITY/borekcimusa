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
      <SectionHeading eyebrow="Menü" title="Fırından Sofranıza" />

      <div className="mx-auto mt-16 max-w-5xl space-y-20">
        {categories.map((category) => (
          <div key={category}>
            <Reveal className="flex items-center gap-5">
              <h3 className="font-display text-2xl font-semibold whitespace-nowrap text-gold-soft sm:text-3xl">
                {category}
              </h3>
              <span className="dashed-flour flex-1" />
            </Reveal>

            <div className="mt-10 space-y-6">
              {items
                .filter((item) => item.category === category)
                .map((item, index) => {
                  const flipped = index % 2 === 1;
                  return (
                    <Reveal key={item.id} delay={index * 55} as="article">
                      <div
                        className={`float-card group flex flex-col overflow-hidden sm:items-stretch ${
                          flipped ? "sm:flex-row-reverse" : "sm:flex-row"
                        }`}
                        style={{
                          borderRadius: flipped
                            ? "2.75rem 1rem 2.75rem 1rem"
                            : "1rem 2.75rem 1rem 2.75rem",
                        }}
                      >
                        <div className="relative shrink-0 overflow-hidden sm:w-[42%]">
                          {item.image_url ? (
                            <img
                              src={item.image_url}
                              alt={item.name}
                              loading="lazy"
                              width={1024}
                              height={768}
                              className="aspect-[16/10] size-full object-cover transition-transform duration-[1.2s] ease-[var(--ease-luxe)] group-hover:scale-105 sm:aspect-auto sm:min-h-[13rem]"
                            />
                          ) : (
                            <div className="aspect-[16/10] size-full bg-secondary sm:min-h-[13rem]" />
                          )}
                          <div
                            className="absolute inset-0"
                            style={{
                              background:
                                "linear-gradient(to right, transparent 45%, color-mix(in oklab, var(--surface) 55%, transparent) 100%)",
                            }}
                          />
                        </div>

                        <div className="flex flex-1 flex-col justify-center gap-2 px-7 py-7">
                          <h4 className="font-display text-2xl font-semibold text-cream">
                            {item.name}
                          </h4>
                          <p className="text-sm leading-relaxed text-muted-foreground">
                            {item.description}
                          </p>
                          {item.price > 0 ? (
                            <p className="mt-2 font-display text-xl font-semibold tracking-wide text-gold">
                              {priceLabel(item.price)}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
