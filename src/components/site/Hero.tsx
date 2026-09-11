import { CroissantIcon, MessageCircle, Phone } from "lucide-react";

import { Emblem } from "./Emblem";
import { useSiteSettings } from "@/lib/settings";

const MOTES = Array.from({ length: 16 }, (_, i) => ({
  left: `${(i * 6.4 + 4) % 96}%`,
  duration: `${9 + (i % 6) * 1.6}s`,
  delay: `${(i % 8) * 1.3}s`,
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
            "linear-gradient(to bottom, oklch(0 0 0) 0%, oklch(0 0 0) 48%, oklch(0 0 0 / 0.82) 66%, oklch(0 0 0 / 0.42) 84%, oklch(0 0 0 / 0.1) 94%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, oklch(0 0 0) 0%, oklch(0 0 0) 48%, oklch(0 0 0 / 0.82) 66%, oklch(0 0 0 / 0.42) 84%, oklch(0 0 0 / 0.1) 94%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "var(--gradient-veil)" }}
        aria-hidden="true"
      />
      {/* fırın sıcaklığı — yumuşak buğu ve ışık süzülmesi */}
      <div
        className="warm-haze pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 30%, color-mix(in oklab, var(--gold) 16%, transparent) 0%, transparent 70%)",
        }}
      />
      <div className="hero-join" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {MOTES.map((m, i) => (
          <span
            key={i}
            className="flour-mote"
            style={{ left: m.left, animationDuration: m.duration, animationDelay: m.delay }}
          />
        ))}
      </div>

      <div className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 py-20 text-center">
        <Emblem />
        <h1
          className="mt-9 font-display text-5xl leading-[1.05] font-semibold text-balance sm:text-7xl"
          style={{ filter: "drop-shadow(0 3px 14px oklch(0.10 0.02 40 / 70%))" }}
        >
          <span className="text-gilded">{title}</span>
        </h1>
        <p
          className="mt-5 max-w-2xl text-sm leading-relaxed text-cream/85 sm:text-base"
          style={{ textShadow: "0 2px 10px oklch(0.10 0.02 40 / 75%)" }}
        >
          {subtitle}
        </p>
        <div className="dashed-flour mt-8 w-48" />

        <div className="mt-10 flex w-full max-w-md flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center">
          <a
            href="#menu"
            className="capsule-warm inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold tracking-wide"
          >
            <CroissantIcon className="size-4" strokeWidth={1.7} /> Menüyü Keşfet
          </a>
          <a
            href={settings.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="capsule-ghost inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold tracking-wide text-cream"
          >
            <MessageCircle className="size-4 text-gold" strokeWidth={1.7} /> WhatsApp İletişim
          </a>
          <a
            href={settings.phoneHref}
            className="capsule-ghost inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold tracking-wide text-gold-soft"
          >
            <Phone className="size-4 text-gold" strokeWidth={1.7} /> Hemen Ara: {settings.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
