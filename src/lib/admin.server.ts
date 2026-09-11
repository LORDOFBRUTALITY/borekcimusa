import { getRequestUrl, useSession } from "@tanstack/react-start/server";

export type AdminSession = { admin?: boolean };

export const sessionConfig = () => {
  const secure = getRequestUrl().protocol === "https:";
  return {
    password: process.env["ADMIN_SESSION_SECRET"]!,
    name: "cvu-admin",
    maxAge: 60 * 60 * 12,
    cookie: {
      httpOnly: true,
      // Hosted previews run in a cross-site iframe and require None + Secure.
      // Plain-http localhost must remain Lax and insecure.
      secure,
      sameSite: secure ? ("none" as const) : ("lax" as const),
      path: "/",
    },
  };
};

export const normalizeUser = (value: string) =>
  value.trim().toLocaleUpperCase("tr-TR").replace(/İ/g, "I");

export async function getAdminSession() {
  return useSession<AdminSession>(sessionConfig());
}

export async function requireAdmin() {
  const session = await getAdminSession();
  if (!session.data.admin) throw new Error("Yetkisiz istek. Lütfen tekrar giriş yapın.");
  return session;
}

export async function adminDb() {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return supabaseAdmin;
}

const EXTENSIONS: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/webp": "webp",
};

export async function uploadMediaFile(input: {
  fileName: string;
  contentType: string;
  dataBase64: string;
}) {
  const ext = EXTENSIONS[input.contentType.toLowerCase()];
  if (!ext) throw new Error("Yalnızca PNG, JPG, JPEG ve WEBP dosyaları yüklenebilir.");

  const binary = Uint8Array.from(atob(input.dataBase64), (char) => char.charCodeAt(0));
  if (binary.byteLength > 6 * 1024 * 1024) throw new Error("Dosya en fazla 6 MB olabilir.");

  const slug = input.fileName
    .toLowerCase()
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);
  const path = `${Date.now()}-${slug || "gorsel"}.${ext}`;

  const db = await adminDb();
  const { error } = await db.storage
    .from("media")
    .upload(path, binary, { contentType: input.contentType, upsert: false });
  if (error) throw new Error(error.message);

  return { path, url: `/api/public/media/${path}` };
}

export async function removeMediaByUrl(url: string | null | undefined) {
  const prefix = "/api/public/media/";
  if (!url || !url.startsWith(prefix)) return;
  const db = await adminDb();
  await db.storage.from("media").remove([url.slice(prefix.length)]);
}

type ImageTable = "menu_items" | "menu_variants" | "ikramlar" | "gallery_images";

async function currentImageUrl(table: ImageTable, id: string) {
  const db = await adminDb();
  const column = table === "gallery_images" ? "image_url" : "image_url";
  const { data } = await db.from(table).select(column).eq("id", id).maybeSingle();
  return (data as { image_url?: string | null } | null)?.image_url ?? null;
}

/** Deletes the stored file of a row when its image is being replaced by a different one. */
export async function cleanupReplacedImage(
  table: ImageTable,
  id: string | undefined,
  nextUrl: string | null | undefined,
) {
  if (!id) return;
  const previous = await currentImageUrl(table, id);
  if (previous && previous !== nextUrl) await removeMediaByUrl(previous);
}

/** Deletes the stored file of a row that is about to be removed. */
export async function cleanupRowImage(table: ImageTable, id: string) {
  const previous = await currentImageUrl(table, id);
  await removeMediaByUrl(previous);
}

/** Deletes stored files of every variant belonging to a menu item. */
export async function cleanupVariantImages(menuItemId: string) {
  const db = await adminDb();
  const { data } = await db
    .from("menu_variants")
    .select("image_url")
    .eq("menu_item_id", menuItemId);
  for (const row of data ?? []) await removeMediaByUrl(row.image_url);
}
