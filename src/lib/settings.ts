import { useQuery } from "@tanstack/react-query";
import { contentQuery } from "./public-data";
import { SITE } from "./site";

/** Admin panelinden düzenlenebilen teknik/iletişim ayarları. */
export const SETTING_FIELDS = [
  { key: "phone", label: "Telefon (görünen)", placeholder: "0541 441 02 15" },
  { key: "whatsapp_number", label: "WhatsApp Numarası (905...)", placeholder: "905414410215" },
  {
    key: "whatsapp_message",
    label: "WhatsApp Hazır Mesajı",
    placeholder: "Selamün aleyküm, bilgi almak için yazmıştım ustam.",
  },
  { key: "instagram_handle", label: "Instagram Kullanıcı Adı", placeholder: "borekcimusa16" },
  { key: "instagram_url", label: "Instagram Adresi", placeholder: "https://instagram.com/..." },
  { key: "address", label: "Adres", placeholder: "Fethiye Mah. ..." },
  { key: "maps_embed", label: "Google Harita Bağlantısı (embed)", placeholder: "https://..." },
] as const;

export type SiteSettings = {
  phone: string;
  phoneHref: string;
  whatsapp: string;
  whatsappMessage: string;
  whatsappHref: string;
  instagram: string;
  instagramUrl: string;
  address: string;
  mapsEmbed: string;
};

const telHref = (phone: string) => {
  const digits = phone.replace(/\D/g, "");
  return `tel:+${digits.startsWith("0") ? `9${digits}` : digits}`;
};

export function useSiteSettings(): SiteSettings {
  const { data } = useQuery(contentQuery);
  const value = (key: string, fallback: string) => data?.[key]?.trim() || fallback;

  const phone = value("phone", SITE.phone);
  const whatsapp = value("whatsapp_number", SITE.whatsapp);
  const whatsappMessage = value("whatsapp_message", SITE.whatsappMessage);

  return {
    phone,
    phoneHref: telHref(phone),
    whatsapp,
    whatsappMessage,
    whatsappHref: `https://wa.me/${whatsapp}?text=${encodeURIComponent(whatsappMessage)}`,
    instagram: value("instagram_handle", SITE.instagram),
    instagramUrl: value("instagram_url", SITE.instagramUrl),
    address: value("address", SITE.district),
    mapsEmbed: value("maps_embed", SITE.mapsEmbed),
  };
}
