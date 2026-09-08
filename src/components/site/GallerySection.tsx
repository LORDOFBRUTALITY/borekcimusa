import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { galleryQuery } from "@/lib/public-data";
import { Reveal, SectionHeading } from "./Reveal";

export function GallerySection() {
  const { data: images = [] } = useQuery(galleryQuery);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") setActive((i) => ((i ?? 0) + 1) % images.length);
      if (event.key === "ArrowLeft")
        setActive((i) => ((i ?? 0) - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, images.length]);

  return (
    <section id="galeri" className="relative px-5 py-24 sm:py-32">
      <SectionHeading
        eyebrow="Galeri"
        title="@borekcimusa16 Instagram'da Biz"
        description="Fırınımızdan en taze görseller ve günlük videolar için Instagram hesabımızı takip edin."
      />

      <div className="mx-auto mt-14 max-w-6xl columns-2 gap-4 md:columns-3 [&>*]:mb-4">
        {images.map((image, index) => (
          <Reveal key={image.id} delay={(index % 6) * 50}>
            <button
              type="button"
              onClick={() => setActive(index)}
              className="photo-crimp group relative block w-full overflow-hidden"
              aria-label={`${image.caption || "Galeri görseli"} — büyüt`}
            >
              <img
                src={image.image_url}
                alt={image.caption || "Börekçi Musa galeri görseli"}
                loading="lazy"
                className="w-full object-cover transition-transform duration-[1.1s] ease-[var(--ease-luxe)] group-hover:scale-110"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-background/85 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              {image.caption ? (
                <span className="absolute bottom-3 left-4 translate-y-3 text-left text-sm font-medium text-gold-soft opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {image.caption}
                </span>
              ) : null}
            </button>
          </Reveal>
        ))}
      </div>

      {active !== null && images[active] ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-background/92 p-4 backdrop-blur-xl"
          role="dialog"
          aria-modal="true"
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            aria-label="Kapat"
            className="absolute top-5 right-5 grid size-11 place-items-center rounded-full border border-gold/30 text-gold"
            onClick={() => setActive(null)}
          >
            <X className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Önceki"
            className="absolute left-3 grid size-11 place-items-center rounded-full border border-gold/30 text-gold sm:left-8"
            onClick={(event) => {
              event.stopPropagation();
              setActive((i) => ((i ?? 0) - 1 + images.length) % images.length);
            }}
          >
            <ChevronLeft className="size-5" />
          </button>
          <figure className="max-h-[86vh] max-w-5xl" onClick={(event) => event.stopPropagation()}>
            <img
              src={images[active].image_url}
              alt={images[active].caption || "Galeri görseli"}
              className="photo-crimp max-h-[78vh] w-auto object-contain"
            />
            <figcaption className="mt-4 text-center text-sm text-muted-foreground">
              {images[active].caption}
            </figcaption>
          </figure>
          <button
            type="button"
            aria-label="Sonraki"
            className="absolute right-3 grid size-11 place-items-center rounded-full border border-gold/30 text-gold sm:right-8"
            onClick={(event) => {
              event.stopPropagation();
              setActive((i) => ((i ?? 0) + 1) % images.length);
            }}
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      ) : null}
    </section>
  );
}
