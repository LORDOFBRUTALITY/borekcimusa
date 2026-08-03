import { useSession } from "@tanstack/react-start/server";

export type AdminSession = { admin?: boolean };

export const sessionConfig = () => ({
  password: process.env["ADMIN_SESSION_SECRET"]!,
  name: "cvu-admin",
  maxAge: 60 * 60 * 12,
  cookie: { httpOnly: true, secure: true, sameSite: "lax" as const, path: "/" },
});

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
