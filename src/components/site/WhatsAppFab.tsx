import { MessageCircle } from "lucide-react";
import { useSiteSettings } from "@/lib/settings";

export function WhatsAppFab() {
  const settings = useSiteSettings();

  return (
    <a
      href={settings.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`WhatsApp iletişim: ${settings.phone}`}
      className="capsule-ghost group fixed right-4 bottom-4 z-50 flex items-center gap-3 px-4 py-3 sm:right-6 sm:bottom-6"
    >
      <MessageCircle className="size-6 text-gold" strokeWidth={1.7} />
      <span className="hidden text-sm font-semibold tracking-wide text-cream sm:inline">
        WhatsApp İletişim
      </span>
    </a>
  );
}
