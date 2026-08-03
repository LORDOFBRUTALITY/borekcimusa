import { Clock, Instagram, MapPin, MessageCircle, Phone } from "lucide-react";
import { SITE, whatsappLink } from "@/lib/site";
import { Emblem } from "./Emblem";
import { Reveal, SectionHeading } from "./Reveal";

export function ContactSection() {
  return (
    <section id="iletisim" className="relative px-5 py-24 sm:py-32">
      <SectionHeading eyebrow="İletişim" title="Bize Ulaşın" />

      <div className="mx-auto mt-14 grid max-w-6xl gap-6 lg:grid-cols-2">
        <Reveal className="space-y-4">
          <a
            href={SITE.phoneHref}
            className="lift flex items-center gap-4 rounded-2xl border border-gold/15 bg-surface p-5"
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-full border border-gold/30">
              <Phone className="size-5 text-gold" strokeWidth={1.5} />
            </span>
            <span className="min-w-0">
              <span className="block text-xs tracking-widest text-muted-foreground uppercase">
                Telefon
              </span>
              <span className="block truncate text-lg font-semibold">{SITE.phone}</span>
            </span>
          </a>

          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="lift flex items-center gap-4 rounded-2xl border border-gold/15 bg-surface p-5"
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-full border border-gold/30">
              <MessageCircle className="size-5 text-gold" strokeWidth={1.5} />
            </span>
            <span className="min-w-0">
              <span className="block text-xs tracking-widest text-muted-foreground uppercase">
                WhatsApp
              </span>
              <span className="block truncate text-lg font-semibold">Hemen sipariş verin</span>
            </span>
          </a>

          <a
            href={SITE.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="lift flex items-center gap-4 rounded-2xl border border-gold/15 bg-surface p-5"
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-full border border-gold/30">
              <Instagram className="size-5 text-gold" strokeWidth={1.5} />
            </span>
            <span className="min-w-0">
              <span className="block text-xs tracking-widest text-muted-foreground uppercase">
                Instagram
              </span>
              <span className="block truncate text-lg font-semibold">@{SITE.instagram}</span>
            </span>
          </a>

          <div className="rounded-2xl border border-gold/15 bg-surface p-5">
            <div className="flex items-center gap-3">
              <Clock className="size-5 shrink-0 text-gold" strokeWidth={1.5} />
              <span className="text-xs tracking-widest text-muted-foreground uppercase">
                Çalışma Saatleri
              </span>
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              {SITE.hours.map((row) => (
                <li key={row.day} className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground">{row.day}</span>
                  <span className="font-semibold">{row.value}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-gold/15 bg-surface p-5">
            <MapPin className="size-5 shrink-0 text-gold" strokeWidth={1.5} />
            <p className="text-sm text-muted-foreground">{SITE.district}</p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="h-full min-h-[420px] overflow-hidden rounded-2xl border border-gold/15">
            <iframe
              title="Ciğerci Veysi Usta konum haritası"
              src={`https://www.google.com/maps?q=${encodeURIComponent(SITE.mapsQuery)}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="size-full min-h-[420px] border-0 grayscale-[0.35]"
            />
          </div>
        </Reveal>
      </div>

      <footer className="mx-auto mt-24 max-w-6xl border-t border-gold/15 pt-10 text-center">
        <Emblem compact className="items-center" />
        <p className="mt-4 text-xs tracking-[0.28em] text-muted-foreground uppercase">
          © {new Date().getFullYear()} {SITE.name} · {SITE.district}
        </p>
      </footer>
    </section>
  );
}
