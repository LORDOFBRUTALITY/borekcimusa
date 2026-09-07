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
      { property: "og:image", content: "https://veysi-usta-legacy.lovable.app/logo.png" },
      { name: "twitter:image", content: "https://veysi-usta-legacy.lovable.app/logo.png" },
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
          "@type": "Restaurant",
          name: SITE.name,
          description: DESCRIPTION,
          servesCuisine: ["Turkish", "Kebab", "Ocakbaşı"],
          priceRange: "₺₺",
          telephone: "+90 535 359 62 16",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Yunuseli, Osmangazi",
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
              opens: "11:00",
              closes: "23:00",
            },
          ],
        }),
      },
    ],
  }),
  component: HomePage,
});

const FALLBACK = {
  hero_title: "Ciğerin Adresi",
  hero_subtitle: "1978'den Bugüne Lezzetin Adresi",
  about_text:
    "Ciğerci Veysi Usta, Bursa Yunuseli'nde ocağın başında geçen yılların birikimiyle hizmet veren bir aile işletmesidir.",
  history_text:
    "İşletmemiz, ciğer ustalığını babadan oğula aktaran bir geleneğin devamı olarak kuruldu.",
};

function HomePage() {
  const { data: content } = useQuery(contentQuery);
  const value = (key: keyof typeof FALLBACK) => content?.[key]?.trim() || FALLBACK[key];

  return (
    <main>
      <Hero title={value("hero_title")} subtitle={value("hero_subtitle")} />
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
