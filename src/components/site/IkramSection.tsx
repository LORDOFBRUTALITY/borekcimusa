import { CupSoda, Coffee, Wheat, type LucideIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { ikramlarQuery } from "@/lib/public-data";
import { Reveal, SectionHeading } from "./Reveal";

const ikramBg = { url: "/images/ikram-cay.jpg" };

const ICONS: Record<string, LucideIcon> = {
  "Taze Demleme Çay": Coffee,
  Ayran: CupSoda,
};

function FiligreeEdge({ position }: { position: "top" | "bottom" }) {
  return (
    <div
      className={`pointer-events-none absolute inset-x-0 z-20 flex justify-center px-4 ${
        position === "top" ? "top-0 -translate-y-1/2" : "bottom-0 translate-y-1/2"
      }`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 720 72"
        fill="none"
        className={`h-auto w-full max-w-3xl overflow-visible text-gold drop-shadow-[0_2px_7px_color-mix(in_oklab,var(--gold)_45%,transparent)] ${
          position === "bottom" ? "rotate-180" : ""
        }`}
      >
        {/* örgü börek kıvrımı — iki iç içe geçen dalga */}
        <path
          d="M10 40C46 40 46 20 82 20C118 20 118 40 154 40C190 40 190 20 226 20C262 20 262 40 298 40C334 40 334 20 370 20C406 20 406 40 442 40C478 40 478 20 514 20C550 20 550 40 586 40C622 40 622 20 658 20C694 20 694 40 710 40"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M10 20C46 20 46 40 82 40C118 40 118 20 154 20C190 20 190 40 226 40C262 40 262 20 298 20C334 20 334 40 370 40C406 40 406 20 442 20C478 20 478 40 514 40C550 40 550 20 586 20C622 20 622 40 658 40C694 40 694 20 710 20"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
          opacity="0.5"
        />
        <rect
          x="344"
          y="14"
          width="32"
          height="32"
          rx="4"
          transform="rotate(45 360 30)"
          stroke="currentColor"
          strokeWidth="1.4"
          fill="var(--background)"
        />
        <circle cx="360" cy="30" r="3.2" fill="currentColor" />
      </svg>
    </div>
  );
}

export function IkramSection() {
  const { data: items = [] } = useQuery(ikramlarQuery);

  if (items.length === 0) return null;

  return (
    <section
      id="ikramlar"
      className="relative isolate overflow-visible px-5 pt-32 pb-16 sm:pt-40 sm:pb-20"
    >
      <FiligreeEdge position="top" />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -bottom-32 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <img
          src={ikramBg.url}
          alt=""
          loading="lazy"
          className="size-full object-cover object-center opacity-80"
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
              "linear-gradient(to bottom, var(--background) 0%, color-mix(in oklab, var(--background) 74%, transparent) 12%, color-mix(in oklab, var(--background) 38%, transparent) 30%, color-mix(in oklab, var(--background) 26%, transparent) 58%, color-mix(in oklab, var(--background) 40%, transparent) 72%, color-mix(in oklab, var(--background) 62%, transparent) 84%, color-mix(in oklab, var(--background) 86%, transparent) 94%, var(--background) 100%)",

          }}
        />
      </div>

      <SectionHeading
        eyebrow="İkramlarımız"
        title="Müessesemizin İkramı"
        description="Börekçi Musa'da böreğinizin yanında dostluk ve samimiyet ikram edilir."
      />
      <ul className="mx-auto mt-14 grid max-w-md grid-cols-1 gap-4">

        {items.map((item, index) => {
          const Icon = ICONS[item.name] ?? Wheat;
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
      <FiligreeEdge position="bottom" />
    </section>
  );
}
