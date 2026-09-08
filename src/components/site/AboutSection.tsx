import { useQuery } from "@tanstack/react-query";
import { campaignsQuery } from "@/lib/public-data";
const galleryImage = "/images/urun-pastirmali.jpg";
import { Reveal } from "./Reveal";

export function AboutSection({ about, history }: { about: string; history: string }) {
  const { data: campaigns = [] } = useQuery(campaignsQuery);

  return (
    <section id="hakkimizda" className="relative px-5 pt-16 pb-24 sm:pt-20 sm:pb-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <div
            className="relative overflow-hidden shadow-[var(--shadow-soft)]"
            style={{ borderRadius: "3rem 1rem 3rem 1rem" }}
          >

            <img
              src={galleryImage}
              alt="Fırından yeni çıkmış çıtır börek"
              loading="lazy"
              width={1024}
              height={1280}
              className="aspect-[4/5] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="text-xs font-semibold tracking-[0.42em] text-gold uppercase">
              Hakkımızda
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold sm:text-5xl">
              <span className="text-gilded">Fırının Başındaki Usta</span>
            </h2>
            <p className="mt-6 leading-relaxed whitespace-pre-line text-muted-foreground">
              {about}
            </p>
          </Reveal>

          <Reveal delay={120} className="mt-10">
            <h3 className="font-display text-2xl font-semibold text-gold-soft">Tarihçe</h3>
            <div className="dashed-flour mt-4 w-32" />

            <p className="mt-4 leading-relaxed whitespace-pre-line text-muted-foreground">
              {history}
            </p>
          </Reveal>

          {campaigns.length > 0 ? (
            <Reveal delay={180} className="mt-10 space-y-3">
              {campaigns.map((campaign) => (
                <div
                  key={campaign.id}
                  className="surface-glass rounded-2xl px-5 py-4"
                >
                  <p className="text-sm font-semibold tracking-wide text-gold">{campaign.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{campaign.description}</p>
                </div>
              ))}
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}
