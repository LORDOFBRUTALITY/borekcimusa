export const SITE = {
  name: "Ciğerci Veysi Usta",
  tagline: "Ciğerin Gerçek Ustası",
  district: "Yunuseli, Osmangazi / Bursa",
  phone: "0540 604 2121",
  phoneHref: "tel:+905406042121",
  whatsapp: "905406042121",
  whatsappMessage: "Merhaba, bilgi almak istiyorum.",
  instagram: "cigerciveysiusta_yunuseli",
  instagramUrl: "https://www.instagram.com/cigerciveysiusta_yunuseli/",
  mapsQuery: "Ciğerci Veysi Usta Yunuseli Bursa",
  hours: [
    { day: "Pazartesi - Cuma", value: "11:00 – 23:00" },
    { day: "Cumartesi", value: "11:00 – 00:00" },
    { day: "Pazar", value: "11:00 – 23:00" },
  ],
} as const;

export const whatsappLink = (message: string = SITE.whatsappMessage) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;

export const IKRAMLAR = [
  "Haydari",
  "Ezme",
  "Mevsim Yeşilliği",
  "Bulgur Pilavı",
  "Soğan",
  "Kızarmış Soğan",
  "Salatalık",
] as const;

export const REASONS = [
  { title: "Günlük Taze Ürünler", text: "Ciğer ve etlerimiz her gün taze temin edilir, beklemez." },
  { title: "Usta Ellerden Izgara", text: "Ocağın başında yılların tecrübesi; doğru ateş, doğru zaman." },
  { title: "Kaliteli Hizmet", text: "Güler yüzlü, ilgili ve düzenli servis anlayışı." },
  { title: "Aile Ortamı", text: "Ailenizle rahatça oturabileceğiniz sıcak bir salon." },
  { title: "Hijyenik Mutfak", text: "Açık mutfak disiplini ve titiz temizlik standardı." },
  { title: "Uygun Fiyat", text: "Porsiyon ve kalite dengesinde dürüst fiyatlandırma." },
  { title: "Hızlı Servis", text: "Siparişiniz ocağa gelir gelmez hazırlanır, sıcak servis edilir." },
] as const;

export const CATEGORY_ORDER = ["Izgaralar", "Dürümler", "Diğer"] as const;
