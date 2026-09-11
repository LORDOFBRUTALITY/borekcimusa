import { useQuery } from "@tanstack/react-query";
import { menuQuery, type MenuItem } from "@/lib/public-data";
import { CATEGORY_ORDER, DRINK_CATEGORY } from "@/lib/site";
import { Reveal, SectionHeading } from "./Reveal";

function priceLabel(item: MenuItem) {
  const base = `${item.price.toLocaleString("tr-TR")} TL`;
  return item.price_unit ? `${base} / ${item.price_unit}` : base;
}

const STRIPS = [
  "Sabahın İlk Işıklarıyla Taş Fırından Sofranıza…",
  "Çıtır Çıtır Katlar, Hakiki Tereyağı Lezzeti",
  "Sıcak Böreğin Yanına Bir Bardak Demli Çay",
];

function OvenStrip({ text }: { text: string }) {
  return (
    <Reveal className="mx-auto flex max-w-3xl items-center gap-4 py-2">
      <span className="dashed-flour hidden flex-1 sm:block" />
      <p className="text-center font-display text-lg leading-snug text-gold-soft italic sm:text-xl">
        {text}
      </p>
      <span className="dashed-flour hidden flex-1 sm:block" />
    </Reveal>
  );
}

function ProductCard({ item, index }: { item: MenuItem; index: number }) {
  return (
    <Reveal delay={index * 45} as="article">
      <div className="group flex h-full flex-col overflow-hidden rounded-[1.4rem] border border-gold/20 bg-surface/70 shadow-[0_14px_34px_-24px_rgba(0,0,0,0.9)] backdrop-blur-sm transition-all duration-500 ease-[var(--ease-luxe)] hover:-translate-y-1 hover:border-gold/45 hover:shadow-[0_20px_44px_-22px_color-mix(in_oklab,var(--gold)_45%,transparent)]">
        {item.image_url ? (
          <div className="relative overflow-hidden rounded-xl p-1.5">
            <img
              src={item.image_url}
              alt={item.name}
              loading="lazy"
              width={1024}
              height={768}
              className="aspect-[4/3] w-full rounded-xl object-cover transition-transform duration-[1.1s] ease-[var(--ease-luxe)] group-hover:scale-[1.06]"
            />
          </div>
        ) : null}

        <div className="flex flex-1 flex-col gap-1.5 px-4 pt-2 pb-4">
          <h4 className="font-display text-base leading-tight font-semibold text-cream sm:text-lg">
            {item.name}
          </h4>
          {item.description ? (
            <p className="text-[0.72rem] leading-relaxed text-muted-foreground sm:text-xs">
              {item.description}
            </p>
          ) : null}
          <p className="mt-auto pt-2 font-display text-base font-semibold tracking-wide text-gold sm:text-lg">
            {priceLabel(item)}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

function DrinkBoard({ items }: { items: MenuItem[] }) {
  return (
    <Reveal>
      <div className="mx-auto max-w-3xl rounded-[1.6rem] border border-gold/25 bg-surface/60 px-5 py-6 backdrop-blur-sm sm:px-9 sm:py-8">
        <ul className="grid gap-x-10 gap-y-1 sm:grid-cols-2">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex items-baseline gap-3 border-b border-dashed border-gold/15 py-2.5 last:border-b-0"
            >
              <span className="font-display text-base text-cream sm:text-lg">{item.name}</span>
              <span className="dashed-flour mb-1 flex-1" />
              <span className="font-display text-base font-semibold text-gold sm:text-lg">
                {priceLabel(item)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
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

      <div className="mx-auto mt-14 max-w-6xl space-y-16">
        {categories.map((category, catIndex) => {
          const list = items
            .filter((item) => item.category === category)
            .sort((a, b) => a.sort_order - b.sort_order);

          return (
            <div key={category} className="space-y-10">
              {catIndex > 0 ? <OvenStrip text={STRIPS[(catIndex - 1) % STRIPS.length]} /> : null}

              <Reveal className="flex items-center gap-5">
                <h3 className="font-display text-2xl font-semibold whitespace-nowrap text-gold-soft sm:text-3xl">
                  {category}
                </h3>
                <span className="dashed-flour flex-1" />
              </Reveal>

              {category === DRINK_CATEGORY ? (
                <DrinkBoard items={list} />
              ) : (
                <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
                  {list.map((item, index) => (
                    <ProductCard key={item.id} item={item} index={index} />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
