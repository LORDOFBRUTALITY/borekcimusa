import { Bike as BikeIcon, Flame, Milk, Smile, Sunrise, Wheat } from "lucide-react";

export const SITE = {
  name: "Börekçi Musa",
  tagline: "Taptaze Sıcak Börekler & Geleneksel Lezzetler",
  district: "Fethiye Mah. 1. Kelebek Sk. No:1/B, 16461 Nilüfer / Bursa",
  phone: "0541 441 02 15",
  phoneHref: "tel:+905414410215",
  whatsapp: "905414410215",
  whatsappMessage: "Selamün aleyküm, bilgi almak için yazmıştım ustam.",
  instagram: "borekcimusa16",
  instagramUrl: "https://www.instagram.com/borekcimusa16?stkn=MXgwNm54eTFwNGJ5Zw==",
  mapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3045.9693050750575!2d28.971512900000004!3d40.2319847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14ca150afae40db7%3A0xc8ad7fed7eaa9eec!2sBorekci%20Musa!5e0!3m2!1str!2str!4v1788819426291!5m2!1str!2str",
  hours: [
    { day: "Pazartesi - Cuma", value: "06:00 – 18:00" },
    { day: "Cumartesi", value: "06:00 – 18:00" },
    { day: "Pazar", value: "06:00 – 18:00" },
  ],
} as const;

export const whatsappLink = (message: string = SITE.whatsappMessage) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;

export const REASONS = [
  {
    icon: Sunrise,
    title: "Her Sabah 06:00'da Taze",
    text: "Günün ilk ışıklarıyla fırından yeni çıkan sıcak börekler.",
  },
  {
    icon: Wheat,
    title: "İncecik El Açması Hamur",
    text: "Geleneksel yöntemle açılan kat kat, çıtır çıtır hamur.",
  },
  {
    icon: Milk,
    title: "Hakiki Tereyağı & Taze Malzeme",
    text: "Gerçek tereyağı, taze peynir ve özenle seçilmiş içerikler.",
  },
  {
    icon: Flame,
    title: "Bursa'nın Meşhur Tahinli Pidesi",
    text: "Taş fırında pişen, damak çatlatan geleneksel tahinli pide.",
  },
  {
    icon: Smile,
    title: "Musa & Ahmet Usta'dan Güler Yüz",
    text: "Samimi esnaflık, sıcak karşılama ve dostluk sofrası.",
  },
  {
    icon: BikeIcon,
    title: "Hızlı Paket & Hijyenik Üretim",
    text: "Şeffaf mutfak standardı ve sıcacık, hızlı paket servis.",
  },
] as const;


export const DRINK_CATEGORY = "İçecekler";

export const CATEGORY_ORDER = [
  "Börek Çeşitleri",
  "Mayalı Çeşitleri",
  DRINK_CATEGORY,
] as const;
