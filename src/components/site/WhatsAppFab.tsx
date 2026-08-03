import { MessageCircle } from "lucide-react";
import { SITE, whatsappLink } from "@/lib/site";

export function WhatsAppFab() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`WhatsApp ile sipariş: ${SITE.phone}`}
      className="group fixed right-4 bottom-4 z-50 flex items-center gap-3 rounded-full border border-gold/30 bg-primary px-4 py-3 shadow-[var(--shadow-luxe)] transition-transform duration-500 hover:scale-105 sm:right-6 sm:bottom-6"
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-gold/15" />
      <MessageCircle className="size-6 text-gold" strokeWidth={1.6} />
      <span className="hidden text-sm font-semibold tracking-wide text-gold-soft sm:inline">
        WhatsApp Sipariş
      </span>
    </a>
  );
}
