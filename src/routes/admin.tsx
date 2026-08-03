import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { ArrowLeft, Check, LogOut, Plus, Trash2, X } from "lucide-react";
import {
  deleteCampaign as adminDeleteCampaign,
  deleteGalleryImage as adminDeleteGalleryImage,
  deleteMenuItem as adminDeleteMenuItem,
  deleteReview as adminDeleteReview,
  adminLoadAll,
  adminLogin,
  adminLogout,
  saveCampaign as adminSaveCampaign,
  saveGalleryImage as adminSaveGalleryImage,
  saveMenuItem as adminSaveMenuItem,
  saveSiteContent as adminSaveSiteContent,
  setReviewApproval as adminSetReviewApproval,
  adminStatus,
} from "@/lib/admin.functions";

import { Emblem } from "@/components/site/Emblem";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Yönetim Paneli | Ciğerci Veysi Usta" },
      { name: "description", content: "Ciğerci Veysi Usta yönetim paneli girişi." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Yönetim Paneli | Ciğerci Veysi Usta" },
      { property: "og:description", content: "Ciğerci Veysi Usta yönetim paneli girişi." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/admin" },
    ],
    links: [{ rel: "canonical", href: "/admin" }],
  }),
  component: AdminPage,
});

const inputClass =
  "w-full rounded-lg border border-gold/20 bg-background/60 px-3 py-2 text-sm outline-none focus:border-gold/60";
const buttonClass =
  "inline-flex items-center justify-center gap-2 rounded-full border border-gold/50 bg-primary px-5 py-2.5 text-sm font-semibold tracking-wide text-gold-soft transition-all duration-500 hover:border-gold hover:shadow-[var(--shadow-gold)] disabled:opacity-60";

function AdminPage() {
  const status = useServerFn(adminStatus);
  const { data, refetch } = useQuery({
    queryKey: ["admin-status"],
    queryFn: () => status({}),
  });

  if (data?.admin) return <AdminDashboard onSignedOut={() => void refetch()} />;
  return <LoginCard onSignedIn={() => void refetch()} />;
}

function LoginCard({ onSignedIn }: { onSignedIn: () => void }) {
  const login = useServerFn(adminLogin);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const mutation = useMutation({
    mutationFn: () => login({ data: { username, password } }),
    onSuccess: (result) => {
      if (result.ok) {
        toast.success("Hoş geldiniz usta.");
        onSignedIn();
      } else {
        toast.error("Kullanıcı adı veya şifre hatalı.");
      }
    },
    onError: () => toast.error("Giriş yapılamadı. Lütfen tekrar deneyin."),
  });

  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-16">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          mutation.mutate();
        }}
        className="surface-glass w-full max-w-sm rounded-3xl p-8"
      >
        <Emblem />
        <h1 className="mt-8 text-center font-display text-2xl font-semibold text-gold-soft">
          Yönetim Girişi
        </h1>
        <div className="mt-6 space-y-4">
          <div>
            <label htmlFor="user" className="text-xs tracking-widest uppercase">
              Kullanıcı Adı
            </label>
            <input
              id="user"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className={`mt-2 ${inputClass}`}
              autoComplete="username"
              required
            />
          </div>
          <div>
            <label htmlFor="pass" className="text-xs tracking-widest uppercase">
              Şifre
            </label>
            <input
              id="pass"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={`mt-2 ${inputClass}`}
              autoComplete="current-password"
              required
            />
          </div>
          <button type="submit" disabled={mutation.isPending} className={`${buttonClass} w-full`}>
            {mutation.isPending ? "Giriş yapılıyor…" : "Giriş Yap"}
          </button>
        </div>
        <Link
          to="/"
          className="mt-6 flex items-center justify-center gap-2 text-xs tracking-widest text-muted-foreground uppercase hover:text-gold"
        >
          <ArrowLeft className="size-3.5" /> Siteye dön
        </Link>
      </form>
    </main>
  );
}

const EMPTY_ITEM = {
  category: "Izgaralar",
  name: "",
  description: "",
  price: 0,
  image_url: "",
  sort_order: 0,
  is_visible: true,
};

function AdminDashboard({ onSignedOut }: { onSignedOut: () => void }) {
  const queryClient = useQueryClient();
  const loadAll = useServerFn(adminLoadAll);
  const logout = useServerFn(adminLogout);
  const saveItem = useServerFn(adminSaveMenuItem);
  const removeItem = useServerFn(adminDeleteMenuItem);
  const addImage = useServerFn(adminSaveGalleryImage);
  const removeImage = useServerFn(adminDeleteGalleryImage);
  const approve = useServerFn(adminSetReviewApproval);
  const removeReview = useServerFn(adminDeleteReview);
  const saveContent = useServerFn(adminSaveSiteContent);
  const addCampaign = useServerFn(adminSaveCampaign);
  const removeCampaign = useServerFn(adminDeleteCampaign);

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["admin-data"],
    queryFn: () => loadAll({}),
  });

  const [draft, setDraft] = useState<typeof EMPTY_ITEM & { id?: string }>({ ...EMPTY_ITEM });
  const [image, setImage] = useState({ image_url: "", caption: "", sort_order: 0 });
  const [campaign, setCampaign] = useState({ title: "", description: "" });
  const [content, setContent] = useState<Record<string, string>>({});

  const refresh = async () => {
    await refetch();
    await queryClient.invalidateQueries();
  };

  const run = async (action: () => Promise<unknown>, message: string) => {
    try {
      await action();
      await refresh();
      toast.success(message);
    } catch {
      toast.error("İşlem tamamlanamadı. Lütfen tekrar deneyin.");
    }
  };

  const contentValue = (key: string) =>
    content[key] ?? data?.content.find((row) => row.key === key)?.value ?? "";

  return (
    <main className="mx-auto max-w-6xl px-5 py-12">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
        <div className="min-w-0">
          <h1 className="truncate font-display text-3xl font-semibold">
            <span className="text-gilded">Yönetim Paneli</span>
          </h1>
          <p className="mt-1 text-xs tracking-widest text-muted-foreground uppercase">
            Ciğerci Veysi Usta
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Link to="/" className="rounded-full border border-gold/25 px-4 py-2 text-xs uppercase">
            Site
          </Link>
          <button
            type="button"
            className={buttonClass}
            onClick={() =>
              void run(async () => {
                await logout({});
                onSignedOut();
              }, "Çıkış yapıldı.")
            }
          >
            <LogOut className="size-4" /> Çıkış
          </button>
        </div>
      </header>

      {isLoading ? (
        <p className="mt-16 text-center text-sm text-muted-foreground">Yükleniyor…</p>
      ) : null}

      {/* Yorumlar */}
      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold text-gold-soft">Yorumlar</h2>
        <div className="mt-4 space-y-3">
          {(data?.reviews ?? []).map((review) => (
            <div
              key={review.id}
              className="rounded-2xl border border-gold/15 bg-surface p-4 text-sm"
            >
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                <p className="truncate font-semibold">
                  {review.full_name} · {review.rating}★
                  {review.is_approved ? (
                    <span className="ml-2 text-xs text-gold">yayında</span>
                  ) : (
                    <span className="ml-2 text-xs text-muted-foreground">onay bekliyor</span>
                  )}
                </p>
                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    aria-label={review.is_approved ? "Yayından kaldır" : "Onayla"}
                    className="grid size-9 place-items-center rounded-full border border-gold/30"
                    onClick={() =>
                      void run(
                        () =>
                          approve({
                            data: { id: review.id, approved: !review.is_approved },
                          }),
                        review.is_approved ? "Yayından kaldırıldı." : "Yorum onaylandı.",
                      )
                    }
                  >
                    {review.is_approved ? (
                      <X className="size-4 text-gold" />
                    ) : (
                      <Check className="size-4 text-gold" />
                    )}
                  </button>
                  <button
                    type="button"
                    aria-label="Yorumu sil"
                    className="grid size-9 place-items-center rounded-full border border-destructive/40"
                    onClick={() =>
                      void run(
                        () => removeReview({ data: { id: review.id } }),
                        "Yorum silindi.",
                      )
                    }
                  >
                    <Trash2 className="size-4 text-destructive" />
                  </button>
                </div>
              </div>
              <p className="mt-2 text-muted-foreground">{review.comment}</p>
            </div>
          ))}
          {(data?.reviews ?? []).length === 0 ? (
            <p className="text-sm text-muted-foreground">Henüz yorum yok.</p>
          ) : null}
        </div>
      </section>

      {/* Menü */}
      <section className="mt-14">
        <h2 className="font-display text-2xl font-semibold text-gold-soft">Menü Yönetimi</h2>

        <div className="mt-4 grid gap-3 rounded-2xl border border-gold/15 bg-surface p-5 sm:grid-cols-2">
          <input
            className={inputClass}
            placeholder="Kategori"
            value={draft.category}
            onChange={(event) => setDraft({ ...draft, category: event.target.value })}
          />
          <input
            className={inputClass}
            placeholder="Ürün adı"
            value={draft.name}
            onChange={(event) => setDraft({ ...draft, name: event.target.value })}
          />
          <input
            className={inputClass}
            placeholder="Açıklama"
            value={draft.description}
            onChange={(event) => setDraft({ ...draft, description: event.target.value })}
          />
          <input
            className={inputClass}
            type="number"
            placeholder="Fiyat (TL)"
            value={draft.price}
            onChange={(event) => setDraft({ ...draft, price: Number(event.target.value) })}
          />
          <input
            className={inputClass}
            placeholder="Görsel adresi (/images/... veya https://...)"
            value={draft.image_url}
            onChange={(event) => setDraft({ ...draft, image_url: event.target.value })}
          />
          <input
            className={inputClass}
            type="number"
            placeholder="Sıra"
            value={draft.sort_order}
            onChange={(event) => setDraft({ ...draft, sort_order: Number(event.target.value) })}
          />
          <div className="flex items-center gap-3 sm:col-span-2">
            <button
              type="button"
              className={buttonClass}
              onClick={() =>
                void run(async () => {
                  await saveItem({
                    data: {
                      ...(draft.id ? { id: draft.id } : {}),
                      category: draft.category,
                      name: draft.name,
                      description: draft.description,
                      price: draft.price,
                      image_url: draft.image_url || null,
                      sort_order: draft.sort_order,
                      is_visible: draft.is_visible,
                    },
                  });
                  setDraft({ ...EMPTY_ITEM });
                }, draft.id ? "Ürün güncellendi." : "Ürün eklendi.")
              }
            >
              <Plus className="size-4" /> {draft.id ? "Güncelle" : "Ürün Ekle"}
            </button>
            {draft.id ? (
              <button
                type="button"
                className="text-xs tracking-widest text-muted-foreground uppercase"
                onClick={() => setDraft({ ...EMPTY_ITEM })}
              >
                Vazgeç
              </button>
            ) : null}
          </div>
        </div>

        <div className="mt-4 space-y-2">
          {(data?.menu ?? []).map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-gold/15 bg-surface px-4 py-3 text-sm"
            >
              <p className="truncate">
                <span className="text-muted-foreground">{item.category} · </span>
                <span className="font-semibold">{item.name}</span>
                <span className="ml-2 text-gold">{item.price} TL</span>
              </p>
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  className="rounded-full border border-gold/30 px-3 py-1.5 text-xs uppercase"
                  onClick={() =>
                    setDraft({
                      id: item.id,
                      category: item.category,
                      name: item.name,
                      description: item.description,
                      price: item.price,
                      image_url: item.image_url ?? "",
                      sort_order: item.sort_order,
                      is_visible: item.is_visible,
                    })
                  }
                >
                  Düzenle
                </button>
                <button
                  type="button"
                  aria-label="Ürünü sil"
                  className="grid size-8 place-items-center rounded-full border border-destructive/40"
                  onClick={() =>
                    void run(() => removeItem({ data: { id: item.id } }), "Ürün silindi.")
                  }
                >
                  <Trash2 className="size-4 text-destructive" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Galeri */}
      <section className="mt-14">
        <h2 className="font-display text-2xl font-semibold text-gold-soft">Galeri</h2>
        <div className="mt-4 grid gap-3 rounded-2xl border border-gold/15 bg-surface p-5 sm:grid-cols-3">
          <input
            className={inputClass}
            placeholder="Görsel adresi"
            value={image.image_url}
            onChange={(event) => setImage({ ...image, image_url: event.target.value })}
          />
          <input
            className={inputClass}
            placeholder="Başlık"
            value={image.caption}
            onChange={(event) => setImage({ ...image, caption: event.target.value })}
          />
          <button
            type="button"
            className={buttonClass}
            onClick={() =>
              void run(async () => {
                await addImage({ data: image });
                setImage({ image_url: "", caption: "", sort_order: 0 });
              }, "Fotoğraf eklendi.")
            }
          >
            <Plus className="size-4" /> Ekle
          </button>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {(data?.gallery ?? []).map((row) => (
            <div key={row.id} className="relative overflow-hidden rounded-xl border border-gold/15">
              <img src={row.image_url} alt={row.caption} loading="lazy" className="aspect-square w-full object-cover" />
              <button
                type="button"
                aria-label="Fotoğrafı sil"
                className="absolute top-2 right-2 grid size-8 place-items-center rounded-full border border-destructive/40 bg-background/80"
                onClick={() =>
                  void run(() => removeImage({ data: { id: row.id } }), "Fotoğraf silindi.")
                }
              >
                <Trash2 className="size-4 text-destructive" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Ana sayfa yazıları */}
      <section className="mt-14">
        <h2 className="font-display text-2xl font-semibold text-gold-soft">Ana Sayfa Yazıları</h2>
        <div className="mt-4 space-y-4 rounded-2xl border border-gold/15 bg-surface p-5">
          {[
            { key: "hero_title", label: "Başlık" },
            { key: "hero_subtitle", label: "Alt Başlık" },
            { key: "about_text", label: "Hakkımızda" },
            { key: "history_text", label: "Tarihçe" },
          ].map((field) => (
            <div key={field.key}>
              <label htmlFor={field.key} className="text-xs tracking-widest uppercase">
                {field.label}
              </label>
              <textarea
                id={field.key}
                rows={field.key.includes("text") ? 5 : 2}
                className={`mt-2 resize-none ${inputClass}`}
                value={contentValue(field.key)}
                onChange={(event) => setContent({ ...content, [field.key]: event.target.value })}
              />
              <button
                type="button"
                className="mt-2 text-xs tracking-widest text-gold uppercase"
                onClick={() =>
                  void run(
                    () =>
                      saveContent({ data: { key: field.key, value: contentValue(field.key) } }),
                    "Metin kaydedildi.",
                  )
                }
              >
                Kaydet
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Kampanyalar */}
      <section className="mt-14 mb-20">
        <h2 className="font-display text-2xl font-semibold text-gold-soft">Kampanyalar</h2>
        <div className="mt-4 grid gap-3 rounded-2xl border border-gold/15 bg-surface p-5 sm:grid-cols-3">
          <input
            className={inputClass}
            placeholder="Kampanya başlığı"
            value={campaign.title}
            onChange={(event) => setCampaign({ ...campaign, title: event.target.value })}
          />
          <input
            className={inputClass}
            placeholder="Açıklama"
            value={campaign.description}
            onChange={(event) => setCampaign({ ...campaign, description: event.target.value })}
          />
          <button
            type="button"
            className={buttonClass}
            onClick={() =>
              void run(async () => {
                await addCampaign({ data: { ...campaign, is_active: true } });
                setCampaign({ title: "", description: "" });
              }, "Kampanya eklendi.")
            }
          >
            <Plus className="size-4" /> Ekle
          </button>
        </div>
        <div className="mt-4 space-y-2">
          {(data?.campaigns ?? []).map((row) => (
            <div
              key={row.id}
              className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-gold/15 bg-surface px-4 py-3 text-sm"
            >
              <p className="truncate">
                <span className="font-semibold">{row.title}</span>{" "}
                <span className="text-muted-foreground">{row.description}</span>
              </p>
              <button
                type="button"
                aria-label="Kampanyayı sil"
                className="grid size-8 shrink-0 place-items-center rounded-full border border-destructive/40"
                onClick={() =>
                  void run(() => removeCampaign({ data: { id: row.id } }), "Kampanya silindi.")
                }
              >
                <Trash2 className="size-4 text-destructive" />
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
