export const SITE = {
  name: "Börekçi Musa",
  tagline: "Taptaze Sıcak Börekler & Geleneksel Lezzetler",
  district: "Fethiye Mah. 1. Kelebek Sk. No:1/B, 16461 Nilüfer / Bursa",
  phone: "0541 441 02 15",
  phoneHref: "tel:+905414410215",
  whatsapp: "905414410215",
  whatsappMessage: "Merhaba, sipariş vermek istiyorum.",
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
    title: "Her Sabah Taze & Sıcak",
    text: "Günün ilk saatlerinde fırından yeni çıkan çıtır börekler.",
  },
  {
    title: "El Açması Kalite",
    text: "Geleneksel yöntemlerle incecik açılan kat kat hamur.",
  },
  {
    title: "Kaliteli Malzeme",
    text: "Hakiki tereyağı, taze peynir ve özenle seçilmiş içerikler.",
  },
  {
    title: "Meşhur Tahinli Pide",
    text: "Bursa'nın damak çatlatan geleneksel tahinli lezzeti.",
  },
  {
    title: "Güler Yüzlü Esnaflık",
    text: "Musa & Ahmet Ustaların samimi ve sıcak karşılaması.",
  },
  {
    title: "Hijyenik Fırın Mutfak",
    text: "Şeffaf ve yüksek hijyen standartlarında üretim.",
  },
  {
    title: "Hızlı Paket & Adrese Servis",
    text: "Evinize ve iş yerinize sıcacık teslimat.",
  },
] as const;

export const CATEGORY_ORDER = [
  "Çıtır Tepsi Börekleri",
  "Pide & Fırın Özel",
  "İçecekler & Tamamlayıcılar",
] as const;
