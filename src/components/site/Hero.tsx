import { CroissantIcon, MessageCircle, Phone } from "lucide-react";

import { Emblem } from "./Emblem";
import { SITE, whatsappLink } from "@/lib/site";

const EMBERS = Array.from({ length: 14 }, (_, i) => ({
  left: `${(i * 7.3 + 5) % 96}%`,
  duration: `${6 + (i % 5) * 1.7}s`,
  delay: `${(i % 7) * 1.1}s`,
}));

export function Hero({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <section id="hero" className="relative isolate min-h-[100svh]">
      <img
        src="/images/hero-borek.jpg"
        alt="Taş fırından yeni çıkmış, dumanı üstünde çıtır tepsi böreği"
        width={1280}
        height={1920}
        fetchPriority="high"
        className="ken-burns absolute inset-0 size-full object-cover object-center"
        style={{
          maskImage:
            "linear-gradient(to bottom, oklch(0 0 0) 0%, oklch(0 0 0) 46%, oklch(0 0 0 / 0.82) 64%, oklch(0 0 0 / 0.45) 82%, oklch(0 0 0 / 0.12) 94%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, oklch(0 0 0) 0%, oklch(0 0 0) 46%, oklch(0 0 0 / 0.82) 64%, oklch(0 0 0 / 0.45) 82%, oklch(0 0 0 / 0.12) 94%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "var(--gradient-veil)" }}
        aria-hidden="true"
      />
      <div
        className="smoke-veil absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-background via-background/35 to-transparent"
        aria-hidden="true"
      />
      <div className="hero-focus" aria-hidden="true" />
      <div className="hero-join" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {EMBERS.map((e, i) => (
          <span
            key={i}
            className="ember"
            style={{ left: e.left, animationDuration: e.duration, animationDelay: e.delay }}
          />
        ))}
      </div>

      <div className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 py-20 text-center">
        <Emblem />
        <h1
          className="mt-10 font-display text-5xl leading-[1.05] font-semibold text-balance sm:text-7xl"
          style={{ filter: "drop-shadow(0 3px 14px oklch(0.10 0.02 50 / 70%))" }}
        >
          <span className="text-gilded">{title}</span>
        </h1>
        <p
          className="mt-5 max-w-2xl text-sm tracking-[0.22em] text-muted-foreground uppercase sm:text-base"
          style={{ textShadow: "0 2px 10px oklch(0.10 0.02 50 / 70%)" }}
        >
          {subtitle}
        </p>
        <div className="hairline-gold mt-8 h-px w-56" />

        <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
          <a
            href="#menu"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/50 bg-primary px-8 py-3.5 text-sm font-semibold tracking-wide text-gold-soft transition-all duration-500 hover:-translate-y-0.5 hover:border-gold hover:shadow-[var(--shadow-gold)]"
          >
            <CroissantIcon className="size-4" strokeWidth={1.6} /> Menüyü İncele
          </a>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="surface-glass inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold tracking-wide transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[var(--shadow-gold)]"
          >
            <MessageCircle className="size-4" strokeWidth={1.6} /> WhatsApp Sipariş
          </a>
          <a
            href={SITE.phoneHref}
            className="surface-glass inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold tracking-wide transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[var(--shadow-gold)]"
          >
            <Phone className="size-4" strokeWidth={1.6} /> Hemen Ara
          </a>
        </div>
      </div>
    </section>
  );
}
