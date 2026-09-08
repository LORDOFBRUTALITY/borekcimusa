import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { reviewsQuery } from "@/lib/public-data";
import { cn } from "@/lib/utils";
import { Reveal, SectionHeading } from "./Reveal";

const schema = z.object({
  full_name: z.string().trim().min(2, "Ad soyad en az 2 karakter olmalı").max(80),
  comment: z.string().trim().min(3, "Yorum en az 3 karakter olmalı").max(1000),
  rating: z.number().int().min(1).max(5),
});

function Stars({ value }: { value: number }) {
  return (
    <span className="flex gap-0.5" aria-label={`${value} yıldız`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={cn("size-4", i <= value ? "fill-gold text-gold" : "text-muted-foreground/40")}
          strokeWidth={1.4}
        />
      ))}
    </span>
  );
}

export function ReviewsSection() {
  const queryClient = useQueryClient();
  const { data: reviews = [] } = useQuery(reviewsQuery);
  const [fullName, setFullName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);

  const mutation = useMutation({
    mutationFn: async () => {
      const parsed = schema.parse({ full_name: fullName, comment, rating });
      const { error } = await supabase.from("reviews").insert({ ...parsed, is_approved: false });
      if (error) throw error;
    },
    onSuccess: () => {
      setFullName("");
      setComment("");
      setRating(5);
      toast.success("Yorumunuz alındı. Onaylandıktan sonra yayınlanacak.");
      void queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
    onError: (error: unknown) => {
      const message =
        error instanceof z.ZodError
          ? (error.issues[0]?.message ?? "Lütfen alanları kontrol edin.")
          : "Yorum gönderilemedi. Lütfen tekrar deneyin.";
      toast.error(message);
    },
  });

  return (
    <section id="yorumlar" className="relative px-5 py-24 sm:py-32">
      <SectionHeading
        eyebrow="Yorumlar"
        title="Misafirlerimiz Ne Diyor?"
        description="Yorumlar yalnızca gerçek misafirlerimiz tarafından bırakılır ve onaylandıktan sonra yayınlanır."
      />

      <div className="mx-auto mt-14 grid max-w-6xl gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-4">
          {reviews.length === 0 ? (
            <Reveal>
              <p className="float-card crimp p-8 text-center text-sm text-muted-foreground">
                Henüz yayınlanmış yorum yok. İlk yorumu siz bırakın.
              </p>
            </Reveal>
          ) : (
            reviews.map((review, index) => (
              <Reveal key={review.id} delay={index * 45}>
                <article
                  className={`float-card relative p-7 ${index % 2 ? "crimp-alt" : "crimp"}`}
                >
                  <span
                    className="pointer-events-none absolute -bottom-3 left-0 size-0"
                    style={{
                      borderTop: "14px solid color-mix(in oklab, var(--surface) 78%, transparent)",
                      borderRight: "16px solid transparent",
                    }}
                    aria-hidden="true"
                  />
                  <p className="font-display text-2xl leading-none text-gold">“</p>
                  <p className="mt-2 text-sm leading-relaxed text-cream/90">{review.comment}</p>
                  <div className="mt-5 flex items-center justify-between gap-4">
                    <h3 className="truncate font-display text-lg font-semibold text-cream">
                      {review.full_name}
                    </h3>
                    <Stars value={review.rating} />
                  </div>
                  <time className="mt-2 block text-xs tracking-wide text-muted-foreground/70">
                    {new Date(review.created_at).toLocaleDateString("tr-TR", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </time>
                </article>
              </Reveal>
            ))
          )}

        </div>

        <Reveal>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              mutation.mutate();
            }}
            className="surface-bakery crimp sticky top-8 space-y-4 p-6"

          >
            <h3 className="font-display text-xl font-semibold text-gold-soft">Yorum Bırakın</h3>
            <div>
              <label htmlFor="rv-name" className="text-xs tracking-widest uppercase">
                Ad Soyad
              </label>
              <input
                id="rv-name"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                maxLength={80}
                required
                className="field-crimp mt-2 w-full px-4 py-2.5 text-sm"
              />
            </div>
            <div>
              <span className="text-xs tracking-widest uppercase">Puan</span>
              <div className="mt-2 flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`${i} yıldız ver`}
                    onClick={() => setRating(i)}
                    className="transition-transform duration-300 hover:scale-125"
                  >
                    <Star
                      className={cn(
                        "size-6",
                        i <= rating ? "fill-gold text-gold" : "text-muted-foreground/40",
                      )}
                      strokeWidth={1.3}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label htmlFor="rv-comment" className="text-xs tracking-widest uppercase">
                Yorum
              </label>
              <textarea
                id="rv-comment"
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                maxLength={1000}
                rows={4}
                required
                className="field-crimp mt-2 w-full resize-none px-4 py-2.5 text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={mutation.isPending}
              className="capsule-warm w-full px-6 py-3 text-sm font-semibold tracking-wide disabled:opacity-60"

            >
              {mutation.isPending ? "Gönderiliyor…" : "Yorumu Gönder"}
            </button>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Yorumunuz yönetici onayından sonra yayınlanır.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
