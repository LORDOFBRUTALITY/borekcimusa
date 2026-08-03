import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  adminDb as admin,
  getAdminSession,
  normalizeUser,
  requireAdmin,
} from "./admin.server";

export const adminLogin = createServerFn({ method: "POST" })
  .inputValidator((data: { username: string; password: string }) =>
    z.object({ username: z.string().max(80), password: z.string().max(80) }).parse(data),
  )
  .handler(async ({ data }) => {
    const okUser = normalizeUser(data.username) === "VEYSIUSTA";
    const okPass = data.password.trim() === "2116";
    if (!okUser || !okPass) return { ok: false as const };
    const session = await getAdminSession();
    await session.update({ admin: true });
    return { ok: true as const };
  });

export const adminLogout = createServerFn({ method: "POST" }).handler(async () => {
  const session = await getAdminSession();
  await session.clear();
  return { ok: true as const };
});

export const adminStatus = createServerFn({ method: "GET" }).handler(async () => {
  const session = await getAdminSession();
  return { admin: Boolean(session.data.admin) };
});


export const adminLoadAll = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdmin();
  const db = await admin();
  const [menu, gallery, reviews, content, campaigns] = await Promise.all([
    db.from("menu_items").select("*").order("category").order("sort_order"),
    db.from("gallery_images").select("*").order("sort_order"),
    db.from("reviews").select("*").order("created_at", { ascending: false }),
    db.from("site_content").select("*"),
    db.from("campaigns").select("*").order("created_at", { ascending: false }),
  ]);
  return {
    menu: menu.data ?? [],
    gallery: gallery.data ?? [],
    reviews: reviews.data ?? [],
    content: content.data ?? [],
    campaigns: campaigns.data ?? [],
  };
});

export const saveMenuItem = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    z
      .object({
        id: z.string().uuid().optional(),
        category: z.string().min(1).max(60),
        name: z.string().min(1).max(120),
        description: z.string().max(500).default(""),
        price: z.number().int().min(0).max(1000000),
        image_url: z.string().max(500).nullable().default(null),
        sort_order: z.number().int().min(0).max(9999).default(0),
        is_visible: z.boolean().default(true),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    await requireAdmin();
    const db = await admin();
    const { id, ...values } = data;
    const res = id
      ? await db.from("menu_items").update(values).eq("id", id)
      : await db.from("menu_items").insert(values);
    if (res.error) throw new Error(res.error.message);
    return { ok: true as const };
  });

export const deleteMenuItem = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string }) => z.object({ id: z.string().uuid() }).parse(data))
  .handler(async ({ data }) => {
    await requireAdmin();
    const db = await admin();
    const res = await db.from("menu_items").delete().eq("id", data.id);
    if (res.error) throw new Error(res.error.message);
    return { ok: true as const };
  });

export const saveGalleryImage = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    z
      .object({
        image_url: z.string().min(3).max(1000),
        caption: z.string().max(200).default(""),
        sort_order: z.number().int().min(0).max(9999).default(0),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    await requireAdmin();
    const db = await admin();
    const res = await db.from("gallery_images").insert(data);
    if (res.error) throw new Error(res.error.message);
    return { ok: true as const };
  });

export const deleteGalleryImage = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string }) => z.object({ id: z.string().uuid() }).parse(data))
  .handler(async ({ data }) => {
    await requireAdmin();
    const db = await admin();
    const res = await db.from("gallery_images").delete().eq("id", data.id);
    if (res.error) throw new Error(res.error.message);
    return { ok: true as const };
  });

export const setReviewApproval = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string; approved: boolean }) =>
    z.object({ id: z.string().uuid(), approved: z.boolean() }).parse(data),
  )
  .handler(async ({ data }) => {
    await requireAdmin();
    const db = await admin();
    const res = await db.from("reviews").update({ is_approved: data.approved }).eq("id", data.id);
    if (res.error) throw new Error(res.error.message);
    return { ok: true as const };
  });

export const deleteReview = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string }) => z.object({ id: z.string().uuid() }).parse(data))
  .handler(async ({ data }) => {
    await requireAdmin();
    const db = await admin();
    const res = await db.from("reviews").delete().eq("id", data.id);
    if (res.error) throw new Error(res.error.message);
    return { ok: true as const };
  });

export const saveSiteContent = createServerFn({ method: "POST" })
  .inputValidator((data: { key: string; value: string }) =>
    z.object({ key: z.string().min(1).max(60), value: z.string().max(4000) }).parse(data),
  )
  .handler(async ({ data }) => {
    await requireAdmin();
    const db = await admin();
    const res = await db
      .from("site_content")
      .upsert({ key: data.key, value: data.value, updated_at: new Date().toISOString() });
    if (res.error) throw new Error(res.error.message);
    return { ok: true as const };
  });

export const saveCampaign = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    z
      .object({
        title: z.string().min(1).max(120),
        description: z.string().max(600).default(""),
        is_active: z.boolean().default(true),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    await requireAdmin();
    const db = await admin();
    const res = await db.from("campaigns").insert(data);
    if (res.error) throw new Error(res.error.message);
    return { ok: true as const };
  });

export const deleteCampaign = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string }) => z.object({ id: z.string().uuid() }).parse(data))
  .handler(async ({ data }) => {
    await requireAdmin();
    const db = await admin();
    const res = await db.from("campaigns").delete().eq("id", data.id);
    if (res.error) throw new Error(res.error.message);
    return { ok: true as const };
  });
