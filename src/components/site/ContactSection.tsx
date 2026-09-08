import { Instagram, MapPin, MessageCircle, Phone } from "lucide-react";
import { SITE, whatsappLink } from "@/lib/site";
import { Emblem } from "./Emblem";
import { Reveal, SectionHeading } from "./Reveal";

const INSTA_STRIP = [
  "/images/urun-pastirmali.jpg",
  "/images/urun-su-boregi.jpg",
  "/images/urun-tahinli-pide.jpg",
  "/images/urun-peynirli.jpg",
  "/images/urun-kut-boregi.jpg",
  "/images/urun-kiymali.jpg",
];

function Ribbon({
  href,
  external,
  icon: Icon,
  label,
  value,
}: {
  href: string;
  external?: boolean;
  icon: typeof Phone;
  label: string;
  value: string;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="float-card flex items-center gap-5 rounded-full px-6 py-4"
    >
      <span
        className="grid size-11 shrink-0 place-items-center rounded-full"
        style={{ boxShadow: "inset 0 0 0 1px color-mix(in oklab, var(--gold) 34%, transparent)" }}
      >
        <Icon className="size-5 text-gold" strokeWidth={1.6} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[0.65rem] tracking-[0.3em] text-muted-foreground uppercase">
          {label}
        </span>
        <span className="block truncate text-base font-semibold text-cream">{value}</span>
      </span>
    </a>
  );
}

export function ContactSection() {
  return (
    <section id="iletisim" className="relative px-5 py-24 sm:py-32">
      <SectionHeading eyebrow="İletişim" title="Bize Ulaşın" />

      <div className="mx-auto mt-14 max-w-4xl space-y-4">
        <Reveal>
          <Ribbon href={SITE.phoneHref} icon={Phone} label="Telefon" value={SITE.phone} />
        </Reveal>
        <Reveal delay={60}>
          <Ribbon
            href={whatsappLink()}
            external
            icon={MessageCircle}
            label="WhatsApp"
            value="WhatsApp İletişim"
          />
        </Reveal>
        <Reveal delay={120}>
          <Ribbon
            href={SITE.instagramUrl}
            external
            icon={Instagram}
            label="Instagram"
            value={`@${SITE.instagram}`}
          />
        </Reveal>
        <Reveal delay={180}>
          <div className="float-card flex items-center gap-5 rounded-full px-6 py-4">
            <span
              className="grid size-11 shrink-0 place-items-center rounded-full"
              style={{
                boxShadow: "inset 0 0 0 1px color-mix(in oklab, var(--gold) 34%, transparent)",
              }}
            >
              <MapPin className="size-5 text-gold" strokeWidth={1.6} />
            </span>
            <p className="min-w-0 text-sm text-muted-foreground">{SITE.district}</p>
          </div>
        </Reveal>
      </div>

      {/* Instagram akış şeridi */}
      <Reveal delay={120} className="mx-auto mt-14 max-w-5xl">
        <a
          href={SITE.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
          aria-label={`Instagram: @${SITE.instagram}`}
        >
          <div className="flex gap-3 overflow-x-auto pb-3">
            {INSTA_STRIP.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={`Börekçi Musa Instagram paylaşımı ${i + 1}`}
                loading="lazy"
                className="photo-crimp h-32 w-32 shrink-0 object-cover transition-transform duration-700 ease-[var(--ease-luxe)] hover:scale-105 sm:h-40 sm:w-40"
              />
            ))}
          </div>
        </a>
      </Reveal>

      <Reveal delay={160} className="mx-auto mt-10 max-w-5xl">
        <div className="photo-crimp overflow-hidden">
          <iframe
            title="Börekçi Musa konum haritası"
            src={SITE.mapsEmbed}
            loading="lazy"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            className="h-[400px] w-full border-0"
          />
        </div>
      </Reveal>

      <footer className="mx-auto mt-24 max-w-6xl pt-10 text-center">
        <span className="dashed-flour mx-auto mb-10 block w-full max-w-3xl" />
        <Emblem compact className="items-center" />
        <p className="mt-4 text-xs tracking-[0.28em] text-muted-foreground uppercase">
          © {new Date().getFullYear()} {SITE.name} · {SITE.district}
        </p>
      </footer>
    </section>
  );
}
