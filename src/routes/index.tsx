import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Hero } from "@/components/site/Hero";
import { MenuSection } from "@/components/site/MenuSection";
import { IkramSection } from "@/components/site/IkramSection";
import { AboutSection } from "@/components/site/AboutSection";
import { ReasonsSection } from "@/components/site/ReasonsSection";
import { GallerySection } from "@/components/site/GallerySection";
import { ReviewsSection } from "@/components/site/ReviewsSection";
import { ContactSection } from "@/components/site/ContactSection";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";
import { contentQuery } from "@/lib/public-data";
import { SITE } from "@/lib/site";

const TITLE = "Börekçi Musa | Bursa Nilüfer Sıcak Börek & Tahinli Pide";
const DESCRIPTION =
  "Bursa Nilüfer'de her sabah taze çıtır tepsi börekleri, pastırmalı kaşarlı börek, tahinli pide ve su böreği. Sipariş: 0541 441 02 15.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "restaurant.restaurant" },
      { property: "og:url", content: "/" },
      { property: "og:image", content: "https://project--f6b67c71-a26a-455b-ac40-e95f499b66d5.lovable.app/logo.png" },
      { name: "twitter:image", content: "https://project--f6b67c71-a26a-455b-ac40-e95f499b66d5.lovable.app/logo.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Bakery",
          name: SITE.name,
          description: DESCRIPTION,
          servesCuisine: ["Turkish", "Börek", "Fırın"],
          priceRange: "₺",
          telephone: "+90 541 441 02 15",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Fethiye Mah. 1. Kelebek Sk. No:1/B",
            addressLocality: "Nilüfer",
            postalCode: "16461",
            addressRegion: "Bursa",
            addressCountry: "TR",
          },
          sameAs: [SITE.instagramUrl],
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ],
              opens: "06:00",
              closes: "18:00",
            },
          ],
        }),
      },
    ],
  }),
  component: HomePage,
});

const FALLBACK = {
  hero_title: "Çıtır Çıtır Sıcak Lezzet",
  hero_subtitle: "Nilüfer'de Günün İlk Işıklarıyla Başlayan Geleneksel Fırın Lezzeti",
  about_text:
    "Börekçi Musa, Bursa Nilüfer'de her sabah erken saatlerde fırınını yakan, el açması börek geleneğini sürdüren bir aile işletmesidir.",
  history_text:
    "Musa ve Ahmet Ustaların elinden çıkan kat kat hamur, hakiki tereyağı ve taze malzemeyle her gün taptaze hazırlanır.",
};

function HomePage() {
  const { data: content } = useQuery(contentQuery);
  const value = (key: keyof typeof FALLBACK) => content?.[key]?.trim() || FALLBACK[key];

  return (
    <main>
      <Hero title={value("hero_title")} subtitle={value("hero_subtitle")} />
      <HoursBand />
      <MenuSection />
      <IkramSection />
      <AboutSection about={value("about_text")} history={value("history_text")} />
      <ReasonsSection />
      <GallerySection />
      <ReviewsSection />
      <ContactSection />
      <WhatsAppFab />
    </main>

  );
}
