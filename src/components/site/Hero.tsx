import { Link } from "@tanstack/react-router";
import { ChefHat, MessageCircle, Phone } from "lucide-react";
import heroImage from "@/assets/hero-ocakbasi.jpg";
import { Emblem } from "./Emblem";
import { SITE, whatsappLink } from "@/lib/site";

const EMBERS = Array.from({ length: 14 }, (_, i) => ({
  left: `${(i * 7.3 + 5) % 96}%`,
  duration: `${6 + (i % 5) * 1.7}s`,
  delay: `${(i % 7) * 1.1}s`,
}));

export function Hero({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <section id="hero" className="relative isolate min-h-[100svh] overflow-hidden">
      <img
        src={heroImage}
        alt="Ocakbaşında közlenen ciğer ve kebap şişleri"
        width={1920}
        height={1280}
        fetchPriority="high"
        className="ken-burns absolute inset-0 size-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{ background: "var(--gradient-veil)" }}
        aria-hidden="true"
      />
      <div
        className="smoke-veil absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-background via-transparent to-transparent"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {EMBERS.map((e, i) => (
          <span
            key={i}
            className="ember"
            style={{ left: e.left, animationDuration: e.duration, animationDelay: e.delay }}
          />
        ))}
      </div>

      <div className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-5 py-24 text-center">
        <Emblem />
        <h1 className="mt-10 font-display text-5xl leading-[1.05] font-semibold text-balance sm:text-7xl">
          <span className="text-gilded">{title}</span>
        </h1>
        <p className="mt-5 text-sm tracking-[0.32em] text-muted-foreground uppercase sm:text-base">
          {subtitle}
        </p>
        <div className="hairline-gold mt-8 h-px w-56" />

        <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
          <a
            href="#menu"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/50 bg-primary px-8 py-3.5 text-sm font-semibold tracking-wide text-gold-soft transition-all duration-500 hover:-translate-y-0.5 hover:border-gold hover:shadow-[var(--shadow-gold)]"
          >
            <ChefHat className="size-4" strokeWidth={1.6} /> Menü
          </a>
          <a
            href={whatsappLink("Merhaba, rezervasyon yaptırmak istiyorum.")}
            target="_blank"
            rel="noopener noreferrer"
            className="surface-glass inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold tracking-wide transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[var(--shadow-gold)]"
          >
            <Phone className="size-4" strokeWidth={1.6} /> Rezervasyon
          </a>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="surface-glass inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold tracking-wide transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[var(--shadow-gold)]"
          >
            <MessageCircle className="size-4" strokeWidth={1.6} /> WhatsApp Sipariş
          </a>
        </div>

        <p className="mt-10 text-xs tracking-[0.3em] text-muted-foreground/80 uppercase">
          {SITE.district} · {SITE.phone}
        </p>
      </div>
    </section>

  );
}
