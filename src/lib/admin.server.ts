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

export async function removeMediaByUrl(url: string) {
  const prefix = "/api/public/media/";
  if (!url.startsWith(prefix)) return;
  const db = await adminDb();
  await db.storage.from("media").remove([url.slice(prefix.length)]);
}
