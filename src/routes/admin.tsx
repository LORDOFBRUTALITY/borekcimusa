import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import {
  ArrowLeft,
  Check,
  Clock,
  Images,
  LayoutDashboard,
  Leaf,
  LogOut,
  Megaphone,
  MessageSquare,
  Pencil,
  Plus,
  Settings,
  Star,
  Trash2,
  UploadCloud,
  UtensilsCrossed,
  X,
} from "lucide-react";
import {
  deleteCampaign as adminDeleteCampaign,
  deleteGalleryImage as adminDeleteGalleryImage,
  deleteIkram as adminDeleteIkram,
  deleteMedia as adminDeleteMedia,
  deleteMenuItem as adminDeleteMenuItem,
  deleteReview as adminDeleteReview,
  adminLoadAll,
  adminLogin,
  adminLogout,
  saveCampaign as adminSaveCampaign,
  saveGalleryImage as adminSaveGalleryImage,
  saveIkram as adminSaveIkram,
  saveMenuItem as adminSaveMenuItem,
  saveSiteContent as adminSaveSiteContent,
  setReviewApproval as adminSetReviewApproval,
  adminStatus,
  updateGalleryImage as adminUpdateGalleryImage,
  updateReview as adminUpdateReview,
  uploadMedia as adminUploadMedia,
} from "@/lib/admin.functions";

import { Emblem } from "@/components/site/Emblem";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Yönetim Paneli | Ciğerci Veysi Usta" },
      { name: "description", content: "Ciğerci Veysi Usta yönetim paneli girişi." },
      { name: "robots", content: "noindex, nofollow, noarchive, nosnippet" },
      { name: "googlebot", content: "noindex, nofollow" },
      { property: "og:title", content: "Yönetim Paneli | Ciğerci Veysi Usta" },
      { property: "og:description", content: "Ciğerci Veysi Usta yönetim paneli girişi." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/admin" },
    ],
    links: [{ rel: "canonical", href: "/admin" }],
  }),
  component: AdminPage,
});

const CATEGORIES = ["Izgaralar", "Dürümler", "Tatlılar", "İçecekler", "Diğer"] as const;

const inputClass =
  "w-full rounded-lg border border-gold/20 bg-background/60 px-3 py-2 text-sm outline-none focus:border-gold/60";
const buttonClass =
  "inline-flex items-center justify-center gap-2 rounded-full border border-gold/50 bg-primary px-5 py-2.5 text-sm font-semibold tracking-wide text-gold-soft transition-all duration-500 hover:border-gold hover:shadow-[var(--shadow-gold)] disabled:opacity-60";
const ghostButton =
  "inline-flex items-center gap-2 rounded-full border border-gold/25 px-3.5 py-1.5 text-xs tracking-widest uppercase transition-colors hover:border-gold/60 hover:text-gold";

function AdminPage() {
  const status = useServerFn(adminStatus);
  const [signedIn, setSignedIn] = useState(false);
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["admin-status"],
    queryFn: () => status({}),
    staleTime: 0,
    gcTime: 0,
  });

  if (isLoading) {
    return (
      <main className="grid min-h-screen place-items-center text-sm text-muted-foreground">
        Yükleniyor…
      </main>
    );
  }
  if (signedIn || data?.admin) {
    return (
      <AdminShell
        onSignedOut={() => {
          setSignedIn(false);
          void refetch();
        }}
      />
    );
  }
  return (
    <LoginCard
      onSignedIn={() => {
        setSignedIn(true);
        void refetch();
      }}
    />
  );
}


function LoginCard({ onSignedIn }: { onSignedIn: () => void }) {
  const login = useServerFn(adminLogin);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: () => login({ data: { username, password } }),
    onSuccess: (result) => {
      if (result.ok) {
        setError("");
        toast.success("Hoş geldiniz usta.");
        onSignedIn();
      } else {
        setError("Kullanıcı adı veya şifre hatalı.");
      }
    },
    onError: () => setError("Giriş yapılamadı. Lütfen tekrar deneyin."),
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
          {error ? (
            <p role="alert" className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive">
              {error}
            </p>
          ) : null}
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

type Tab = "dashboard" | "menu" | "ikramlar" | "gallery" | "reviews" | "settings";

const NAV: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "menu", label: "Menü Yönetimi", icon: UtensilsCrossed },
  { id: "ikramlar", label: "İkramlar", icon: Leaf },
  { id: "gallery", label: "Galeri", icon: Images },
  { id: "reviews", label: "Yorumlar", icon: MessageSquare },
  { id: "settings", label: "Site Ayarları", icon: Settings },
];

function fileToBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1] ?? "");
    reader.onerror = () => reject(new Error("Dosya okunamadı."));
    reader.readAsDataURL(file);
  });
}

function AdminShell({ onSignedOut }: { onSignedOut: () => void }) {
  const queryClient = useQueryClient();
  const loadAll = useServerFn(adminLoadAll);
  const logout = useServerFn(adminLogout);
  const saveItem = useServerFn(adminSaveMenuItem);
  const removeItem = useServerFn(adminDeleteMenuItem);
  const addImage = useServerFn(adminSaveGalleryImage);
  const editImage = useServerFn(adminUpdateGalleryImage);
  const removeImage = useServerFn(adminDeleteGalleryImage);
  const saveIkram = useServerFn(adminSaveIkram);
  const removeIkram = useServerFn(adminDeleteIkram);
  const approve = useServerFn(adminSetReviewApproval);
  const editReview = useServerFn(adminUpdateReview);
  const removeReview = useServerFn(adminDeleteReview);
  const saveContent = useServerFn(adminSaveSiteContent);
  const addCampaign = useServerFn(adminSaveCampaign);
  const removeCampaign = useServerFn(adminDeleteCampaign);
  const upload = useServerFn(adminUploadMedia);
  const removeMedia = useServerFn(adminDeleteMedia);

  const { data, refetch, isLoading, error } = useQuery({
    queryKey: ["admin-data"],
    queryFn: () => loadAll({}),
    retry: false,
  });

  const [tab, setTab] = useState<Tab>("dashboard");
  const [draft, setDraft] = useState<typeof EMPTY_ITEM & { id?: string }>({ ...EMPTY_ITEM });
  const [image, setImage] = useState({ image_url: "", caption: "", sort_order: 0 });
  const [campaign, setCampaign] = useState({ title: "", description: "" });
  const [ikramDraft, setIkramDraft] = useState({ name: "", image_url: "" });
  const [content, setContent] = useState<Record<string, string>>({});
  const [reviewDraft, setReviewDraft] = useState<{
    id: string;
    full_name: string;
    comment: string;
    rating: number;
  } | null>(null);
  const [busy, setBusy] = useState(false);

  const refresh = async () => {
    await refetch();
    await queryClient.invalidateQueries();
  };

  const run = async (action: () => Promise<unknown>, message: string) => {
    setBusy(true);
    try {
      await action();
      await refresh();
      toast.success(message);
    } catch (error) {
      toast.error(
        error instanceof Error && error.message ? error.message : "İşlem tamamlanamadı.",
      );
    } finally {
      setBusy(false);
    }
  };

  const uploadFile = async (file: File) => {
    const dataBase64 = await fileToBase64(file);
    const result = await upload({
      data: { fileName: file.name, contentType: file.type, dataBase64 },
    });
    return result.url;
  };

  const contentValue = (key: string) =>
    content[key] ?? data?.content.find((row) => row.key === key)?.value ?? "";

  const menu = data?.menu ?? [];
  const gallery = data?.gallery ?? [];
  const reviews = data?.reviews ?? [];
  const campaigns = data?.campaigns ?? [];
  const ikramlar = data?.ikramlar ?? [];
  const pending = reviews.filter((review) => !review.is_approved);

  const lastUpdated = useMemo(() => {
    const dates = [
      ...(data?.content ?? []).map((row) => row.updated_at),
      ...reviews.map((row) => row.created_at),
      ...menu.map((row) => row.created_at),
    ].filter(Boolean) as string[];
    if (dates.length === 0) return "—";
    const latest = dates.sort().at(-1)!;
    return new Date(latest).toLocaleString("tr-TR", { dateStyle: "medium", timeStyle: "short" });
  }, [data, menu, reviews]);

  if (error) {
    return (
      <main className="grid min-h-screen place-items-center px-6 text-center">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Oturum doğrulanamadı. Lütfen tekrar giriş yapın.
          </p>
          <button type="button" className={buttonClass} onClick={onSignedOut}>
            Giriş ekranına dön
          </button>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-background lg:grid lg:grid-cols-[250px_minmax(0,1fr)]">
      <aside className="border-b border-gold/15 bg-surface/70 backdrop-blur lg:sticky lg:top-0 lg:h-screen lg:border-r lg:border-b-0">
        <div className="px-5 py-6">
          <p className="font-display text-lg font-semibold text-gilded">Veysi Usta</p>
          <p className="mt-1 text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
            Yönetim Sistemi
          </p>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-col lg:overflow-visible">
          {NAV.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={`flex shrink-0 items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm transition-colors lg:w-full ${
                tab === item.id
                  ? "border border-gold/40 bg-primary/40 text-gold-soft"
                  : "border border-transparent text-muted-foreground hover:text-gold"
              }`}
            >
              <item.icon className="size-4 shrink-0" strokeWidth={1.6} />
              <span className="whitespace-nowrap">{item.label}</span>
              {item.id === "reviews" && pending.length > 0 ? (
                <span className="ml-auto rounded-full bg-gold/20 px-2 py-0.5 text-[10px] text-gold">
                  {pending.length}
                </span>
              ) : null}
            </button>
          ))}
          <button
            type="button"
            className="flex shrink-0 items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm text-muted-foreground transition-colors hover:text-destructive lg:w-full"
            onClick={() =>
              void run(async () => {
                await logout({});
                onSignedOut();
              }, "Çıkış yapıldı.")
            }
          >
            <LogOut className="size-4 shrink-0" strokeWidth={1.6} /> Çıkış Yap
          </button>
        </nav>
      </aside>

      <main className="px-5 py-8 sm:px-8">
        <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
          <div className="min-w-0">
            <h1 className="truncate font-display text-2xl font-semibold text-gilded sm:text-3xl">
              {NAV.find((item) => item.id === tab)?.label}
            </h1>
            <p className="mt-1 text-xs tracking-widest text-muted-foreground uppercase">
              Ciğerci Veysi Usta
            </p>
          </div>
          <Link to="/" className={ghostButton}>
            Siteyi Gör
          </Link>
        </header>

        {isLoading ? (
          <p className="mt-16 text-center text-sm text-muted-foreground">Yükleniyor…</p>
        ) : null}

        {tab === "dashboard" ? (
          <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard icon={UtensilsCrossed} label="Toplam Ürün" value={menu.length} />
            <StatCard icon={MessageSquare} label="Toplam Yorum" value={reviews.length} />
            <StatCard icon={Star} label="Bekleyen Yorum" value={pending.length} />
            <StatCard icon={Clock} label="Son Güncelleme" value={lastUpdated} small />
            <StatCard icon={Images} label="Galeri Fotoğrafı" value={gallery.length} />
            <StatCard icon={Megaphone} label="Kampanya" value={campaigns.length} />
            <StatCard icon={Leaf} label="İkram" value={ikramlar.length} />
          </section>
        ) : null}

        {tab === "menu" ? (
          <section className="mt-8 space-y-6">
            <div className="grid gap-3 rounded-2xl border border-gold/15 bg-surface p-5 sm:grid-cols-2">
              <div>
                <label className="text-xs tracking-widest uppercase" htmlFor="cat">
                  Kategori
                </label>
                <select
                  id="cat"
                  className={`mt-2 ${inputClass}`}
                  value={draft.category}
                  onChange={(event) => setDraft({ ...draft, category: event.target.value })}
                >
                  {[...new Set([...CATEGORIES, draft.category])].map((category) => (
                    <option key={category} value={category} className="bg-background">
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs tracking-widest uppercase" htmlFor="pname">
                  Ürün Adı
                </label>
                <input
                  id="pname"
                  className={`mt-2 ${inputClass}`}
                  value={draft.name}
                  onChange={(event) => setDraft({ ...draft, name: event.target.value })}
                />
              </div>
              <div>
                <label className="text-xs tracking-widest uppercase" htmlFor="pdesc">
                  Açıklama
                </label>
                <input
                  id="pdesc"
                  className={`mt-2 ${inputClass}`}
                  value={draft.description}
                  onChange={(event) => setDraft({ ...draft, description: event.target.value })}
                />
              </div>
              <div>
                <label className="text-xs tracking-widest uppercase" htmlFor="pprice">
                  Fiyat (TL)
                </label>
                <input
                  id="pprice"
                  type="number"
                  className={`mt-2 ${inputClass}`}
                  value={draft.price}
                  onChange={(event) => setDraft({ ...draft, price: Number(event.target.value) })}
                />
              </div>
              <div className="sm:col-span-2">
                <span className="text-xs tracking-widest uppercase">Ürün Fotoğrafı</span>
                <div className="mt-2 flex flex-wrap items-center gap-3">
                  {draft.image_url ? (
                    <img
                      src={draft.image_url}
                      alt="Önizleme"
                      className="size-20 rounded-lg border border-gold/20 object-cover"
                    />
                  ) : null}
                  <label className={`${ghostButton} cursor-pointer`}>
                    <UploadCloud className="size-4" /> Fotoğraf Yükle
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      className="hidden"
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        event.target.value = "";
                        if (!file) return;
                        void run(async () => {
                          const url = await uploadFile(file);
                          setDraft((prev) => ({ ...prev, image_url: url }));
                        }, "Fotoğraf yüklendi.");
                      }}
                    />
                  </label>
                  {draft.image_url ? (
                    <button
                      type="button"
                      className={ghostButton}
                      onClick={() =>
                        void run(async () => {
                          await removeMedia({ data: { url: draft.image_url } });
                          setDraft((prev) => ({ ...prev, image_url: "" }));
                        }, "Fotoğraf kaldırıldı.")
                      }
                    >
                      <Trash2 className="size-4" /> Fotoğrafı Sil
                    </button>
                  ) : null}
                  <input
                    className={`${inputClass} flex-1 min-w-[220px]`}
                    placeholder="veya görsel adresi"
                    value={draft.image_url}
                    onChange={(event) => setDraft({ ...draft, image_url: event.target.value })}
                  />
                </div>
              </div>
              <div className="flex items-center gap-3 sm:col-span-2">
                <button
                  type="button"
                  disabled={busy}
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
                  <Plus className="size-4" /> {draft.id ? "Kaydet" : "Ürün Ekle"}
                </button>
                {draft.id ? (
                  <button
                    type="button"
                    className={ghostButton}
                    onClick={() => setDraft({ ...EMPTY_ITEM })}
                  >
                    Vazgeç
                  </button>
                ) : null}
              </div>
            </div>

            <div className="space-y-2">
              {menu.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-gold/15 bg-surface px-4 py-3 text-sm"
                >
                  <img
                    src={item.image_url ?? "/images/menu-izgara.jpg"}
                    alt={item.name}
                    loading="lazy"
                    className="size-12 rounded-lg object-cover"
                  />
                  <p className="truncate">
                    <span className="text-muted-foreground">{item.category} · </span>
                    <span className="font-semibold">{item.name}</span>
                    <span className="ml-2 text-gold">{item.price} TL</span>
                  </p>
                  <div className="flex shrink-0 gap-2">
                    <button
                      type="button"
                      className={ghostButton}
                      onClick={() => {
                        setDraft({
                          id: item.id,
                          category: item.category,
                          name: item.name,
                          description: item.description,
                          price: item.price,
                          image_url: item.image_url ?? "",
                          sort_order: item.sort_order,
                          is_visible: item.is_visible,
                        });
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      <Pencil className="size-3.5" /> Düzenle
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
              {menu.length === 0 ? (
                <p className="text-sm text-muted-foreground">Henüz ürün yok.</p>
              ) : null}
            </div>
          </section>
        ) : null}

        {tab === "ikramlar" ? (
          <section className="mt-8 space-y-6">
            <div className="grid gap-3 rounded-2xl border border-gold/15 bg-surface p-5 sm:grid-cols-[minmax(0,1fr)_auto_auto]">
              <input
                className={inputClass}
                placeholder="İkram adı (örn. Haydari)"
                value={ikramDraft.name}
                onChange={(event) => setIkramDraft({ ...ikramDraft, name: event.target.value })}
              />
              <label className={`${ghostButton} cursor-pointer justify-center`}>
                <UploadCloud className="size-4" />
                {ikramDraft.image_url ? "Fotoğraf seçildi" : "Fotoğraf Yükle"}
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    event.target.value = "";
                    if (!file) return;
                    void run(async () => {
                      const url = await uploadFile(file);
                      setIkramDraft((prev) => ({ ...prev, image_url: url }));
                    }, "Fotoğraf yüklendi.");
                  }}
                />
              </label>
              <button
                type="button"
                disabled={busy || !ikramDraft.name.trim()}
                className={buttonClass}
                onClick={() =>
                  void run(async () => {
                    await saveIkram({
                      data: {
                        name: ikramDraft.name.trim(),
                        image_url: ikramDraft.image_url || null,
                        sort_order: ikramlar.length + 1,
                        is_visible: true,
                      },
                    });
                    setIkramDraft({ name: "", image_url: "" });
                  }, "İkram eklendi.")
                }
              >
                <Plus className="size-4" /> Ekle
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {ikramlar.map((row) => (
                <div
                  key={row.id}
                  className="overflow-hidden rounded-2xl border border-gold/15 bg-surface"
                >
                  {row.image_url ? (
                    <img
                      src={row.image_url}
                      alt={row.name}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover"
                    />
                  ) : null}
                  <div className="space-y-2 p-3">
                    <input
                      className={inputClass}
                      defaultValue={row.name}
                      placeholder="İkram adı"
                      onBlur={(event) =>
                        event.target.value.trim() && event.target.value !== row.name
                          ? void run(
                              () =>
                                saveIkram({
                                  data: {
                                    id: row.id,
                                    name: event.target.value.trim(),
                                    image_url: row.image_url,
                                    sort_order: row.sort_order,
                                    is_visible: row.is_visible,
                                  },
                                }),
                              "İkram güncellendi.",
                            )
                          : undefined
                      }
                    />
                    <input
                      className={inputClass}
                      type="number"
                      defaultValue={row.sort_order}
                      placeholder="Sıra"
                      onBlur={(event) =>
                        Number(event.target.value) !== row.sort_order
                          ? void run(
                              () =>
                                saveIkram({
                                  data: {
                                    id: row.id,
                                    name: row.name,
                                    image_url: row.image_url,
                                    sort_order: Number(event.target.value),
                                    is_visible: row.is_visible,
                                  },
                                }),
                              "Sıra güncellendi.",
                            )
                          : undefined
                      }
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <label className={`${ghostButton} cursor-pointer justify-center`}>
                        <UploadCloud className="size-4" /> Fotoğraf
                        <input
                          type="file"
                          accept="image/png,image/jpeg,image/webp"
                          className="hidden"
                          onChange={(event) => {
                            const file = event.target.files?.[0];
                            event.target.value = "";
                            if (!file) return;
                            void run(async () => {
                              const url = await uploadFile(file);
                              if (row.image_url) await removeMedia({ data: { url: row.image_url } });
                              await saveIkram({
                                data: {
                                  id: row.id,
                                  name: row.name,
                                  image_url: url,
                                  sort_order: row.sort_order,
                                  is_visible: row.is_visible,
                                },
                              });
                            }, "Fotoğraf güncellendi.");
                          }}
                        />
                      </label>
                      <button
                        type="button"
                        disabled={busy}
                        className={`${ghostButton} justify-center`}
                        onClick={() =>
                          void run(async () => {
                            await removeIkram({ data: { id: row.id } });
                            if (row.image_url) await removeMedia({ data: { url: row.image_url } });
                          }, "İkram silindi.")
                        }
                      >
                        <Trash2 className="size-4 text-destructive" /> Sil
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {ikramlar.length === 0 ? (
                <p className="text-sm text-muted-foreground">Henüz ikram yok.</p>
              ) : null}
            </div>
          </section>
        ) : null}

        {tab === "gallery" ? (
          <section className="mt-8 space-y-6">
            <div className="grid gap-3 rounded-2xl border border-gold/15 bg-surface p-5 sm:grid-cols-4">
              <label className={`${ghostButton} cursor-pointer justify-center`}>
                <UploadCloud className="size-4" /> Bilgisayardan Yükle
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                  multiple
                  onChange={(event) => {
                    const files = Array.from(event.target.files ?? []);
                    event.target.value = "";
                    if (files.length === 0) return;
                    void run(async () => {
                      for (const file of files) {
                        const url = await uploadFile(file);
                        await addImage({ data: { image_url: url, caption: "", sort_order: 0 } });
                      }
                    }, "Fotoğraflar galeriye eklendi.");
                  }}
                />
              </label>
              <input
                className={inputClass}
                placeholder="veya görsel adresi"
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
                disabled={busy}
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

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
              {gallery.map((row) => (
                <div
                  key={row.id}
                  className="overflow-hidden rounded-xl border border-gold/15 bg-surface"
                >
                  <div className="relative">
                    <img
                      src={row.image_url}
                      alt={row.caption}
                      loading="lazy"
                      className="aspect-square w-full object-cover"
                    />
                    <button
                      type="button"
                      aria-label="Fotoğrafı sil"
                      className="absolute top-2 right-2 grid size-8 place-items-center rounded-full border border-destructive/40 bg-background/80"
                      onClick={() =>
                        void run(async () => {
                          await removeImage({ data: { id: row.id } });
                          await removeMedia({ data: { url: row.image_url } });
                        }, "Fotoğraf silindi.")
                      }
                    >
                      <Trash2 className="size-4 text-destructive" />
                    </button>
                  </div>
                  <div className="space-y-2 p-3">
                    <input
                      className={inputClass}
                      defaultValue={row.caption}
                      placeholder="Başlık"
                      onBlur={(event) =>
                        event.target.value !== row.caption
                          ? void run(
                              () =>
                                editImage({
                                  data: {
                                    id: row.id,
                                    caption: event.target.value,
                                    sort_order: row.sort_order,
                                  },
                                }),
                              "Güncellendi.",
                            )
                          : undefined
                      }
                    />
                    <input
                      className={inputClass}
                      type="number"
                      defaultValue={row.sort_order}
                      placeholder="Sıra"
                      onBlur={(event) =>
                        Number(event.target.value) !== row.sort_order
                          ? void run(
                              () =>
                                editImage({
                                  data: {
                                    id: row.id,
                                    caption: row.caption,
                                    sort_order: Number(event.target.value),
                                  },
                                }),
                              "Sıra güncellendi.",
                            )
                          : undefined
                      }
                    />
                  </div>
                </div>
              ))}
              {gallery.length === 0 ? (
                <p className="text-sm text-muted-foreground">Henüz fotoğraf yok.</p>
              ) : null}
            </div>
          </section>
        ) : null}

        {tab === "reviews" ? (
          <section className="mt-8 space-y-3">
            {reviews.map((review) => (
              <div key={review.id} className="rounded-2xl border border-gold/15 bg-surface p-4 text-sm">
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
                            approve({ data: { id: review.id, approved: !review.is_approved } }),
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
                      aria-label="Yorumu düzenle"
                      className="grid size-9 place-items-center rounded-full border border-gold/30"
                      onClick={() =>
                        setReviewDraft({
                          id: review.id,
                          full_name: review.full_name,
                          comment: review.comment,
                          rating: review.rating,
                        })
                      }
                    >
                      <Pencil className="size-4 text-gold" />
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

                {reviewDraft?.id === review.id ? (
                  <div className="mt-3 space-y-2">
                    <input
                      className={inputClass}
                      value={reviewDraft.full_name}
                      onChange={(event) =>
                        setReviewDraft({ ...reviewDraft, full_name: event.target.value })
                      }
                    />
                    <textarea
                      rows={3}
                      className={`resize-none ${inputClass}`}
                      value={reviewDraft.comment}
                      onChange={(event) =>
                        setReviewDraft({ ...reviewDraft, comment: event.target.value })
                      }
                    />
                    <div className="flex flex-wrap items-center gap-2">
                      <input
                        type="number"
                        min={1}
                        max={5}
                        className={`${inputClass} w-24`}
                        value={reviewDraft.rating}
                        onChange={(event) =>
                          setReviewDraft({ ...reviewDraft, rating: Number(event.target.value) })
                        }
                      />
                      <button
                        type="button"
                        className={buttonClass}
                        onClick={() =>
                          void run(async () => {
                            await editReview({ data: reviewDraft });
                            setReviewDraft(null);
                          }, "Yorum güncellendi.")
                        }
                      >
                        Kaydet
                      </button>
                      <button
                        type="button"
                        className={ghostButton}
                        onClick={() => setReviewDraft(null)}
                      >
                        Vazgeç
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="mt-2 text-muted-foreground">{review.comment}</p>
                )}
              </div>
            ))}
            {reviews.length === 0 ? (
              <p className="text-sm text-muted-foreground">Henüz yorum yok.</p>
            ) : null}
          </section>
        ) : null}

        {tab === "settings" ? (
          <section className="mt-8 space-y-8 pb-16">
            <div className="space-y-4 rounded-2xl border border-gold/15 bg-surface p-5">
              <h2 className="font-display text-xl font-semibold text-gold-soft">
                Ana Sayfa Yazıları
              </h2>
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
                    onChange={(event) =>
                      setContent({ ...content, [field.key]: event.target.value })
                    }
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

            <div className="space-y-4 rounded-2xl border border-gold/15 bg-surface p-5">
              <h2 className="font-display text-xl font-semibold text-gold-soft">Kampanyalar</h2>
              <div className="grid gap-3 sm:grid-cols-3">
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
                  onChange={(event) =>
                    setCampaign({ ...campaign, description: event.target.value })
                  }
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
              <div className="space-y-2">
                {campaigns.map((row) => (
                  <div
                    key={row.id}
                    className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-gold/15 px-4 py-3 text-sm"
                  >
                    <p className="truncate">
                      <span className="font-semibold">{row.title}</span>
                      <span className="ml-2 text-muted-foreground">{row.description}</span>
                    </p>
                    <button
                      type="button"
                      aria-label="Kampanyayı sil"
                      className="grid size-8 place-items-center rounded-full border border-destructive/40"
                      onClick={() =>
                        void run(
                          () => removeCampaign({ data: { id: row.id } }),
                          "Kampanya silindi.",
                        )
                      }
                    >
                      <Trash2 className="size-4 text-destructive" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </main>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  small,
}: {
  icon: typeof LayoutDashboard;
  label: string;
  value: string | number;
  small?: boolean;
}) {
  return (
    <div className="lift rounded-2xl border border-gold/15 bg-surface p-5">
      <div className="flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-full border border-gold/30">
          <Icon className="size-5 text-gold" strokeWidth={1.5} />
        </span>
        <span className="text-xs tracking-widest text-muted-foreground uppercase">{label}</span>
      </div>
      <p
        className={`mt-4 font-display font-semibold text-gold-soft ${small ? "text-lg" : "text-3xl"}`}
      >
        {value}
      </p>
    </div>
  );
}
