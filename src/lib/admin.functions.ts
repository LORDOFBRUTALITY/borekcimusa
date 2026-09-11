import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  adminDb as admin,
  cleanupReplacedImage,
  cleanupRowImage,
  cleanupVariantImages,
  getAdminSession,
  normalizeUser,
  removeMediaByUrl,
  requireAdmin,
  uploadMediaFile,
} from "./admin.server";

export const adminLogin = createServerFn({ method: "POST" })
  .inputValidator((data: { username: string; password: string }) =>
    z.object({ username: z.string().max(80), password: z.string().max(80) }).parse(data),
  )
  .handler(async ({ data }) => {
    const okUser = normalizeUser(data.username) === "BOREKCIMUSA";
    const okPass = data.password.trim() === "1616";
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
  const [menu, variants, gallery, reviews, content, campaigns, ikramlar] = await Promise.all([
    db.from("menu_items").select("*").order("category").order("sort_order"),
    db.from("menu_variants").select("*").order("sort_order"),
    db.from("gallery_images").select("*").order("sort_order"),
    db.from("reviews").select("*").order("created_at", { ascending: false }),
    db.from("site_content").select("*"),
    db.from("campaigns").select("*").order("created_at", { ascending: false }),
    db.from("ikramlar").select("*").order("sort_order"),
  ]);
  return {
    menu: menu.data ?? [],
    variants: (variants.data ?? []) as {
      id: string;
      menu_item_id: string;
      name: string;
      image_url: string | null;
      sort_order: number;
    }[],
    gallery: gallery.data ?? [],
    reviews: reviews.data ?? [],
    content: content.data ?? [],
    campaigns: campaigns.data ?? [],
    ikramlar: (ikramlar.data ?? []) as {
      id: string;
      name: string;
      image_url: string | null;
      sort_order: number;
      is_visible: boolean;
    }[],
  };
});

export const saveIkram = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    z
      .object({
        id: z.string().uuid().optional(),
        name: z.string().min(1).max(80),
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
      ? await db.from("ikramlar").update(values).eq("id", id)
      : await db.from("ikramlar").insert(values);
    if (res.error) throw new Error(res.error.message);
    return { ok: true as const };
  });

export const deleteIkram = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string }) => z.object({ id: z.string().uuid() }).parse(data))
  .handler(async ({ data }) => {
    await requireAdmin();
    const db = await admin();
    const res = await db.from("ikramlar").delete().eq("id", data.id);
    if (res.error) throw new Error(res.error.message);
    return { ok: true as const };
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
        price_unit: z.string().max(20).default(""),
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

export const saveMenuVariant = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    z
      .object({
        id: z.string().uuid().optional(),
        menu_item_id: z.string().uuid(),
        name: z.string().min(1).max(120),
        image_url: z.string().max(500).nullable().default(null),
        sort_order: z.number().int().min(0).max(9999).default(0),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    await requireAdmin();
    const db = await admin();
    const { id, ...values } = data;
    const res = id
      ? await db.from("menu_variants").update(values).eq("id", id)
      : await db.from("menu_variants").insert(values);
    if (res.error) throw new Error(res.error.message);
    return { ok: true as const };
  });

export const deleteMenuVariant = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string }) => z.object({ id: z.string().uuid() }).parse(data))
  .handler(async ({ data }) => {
    await requireAdmin();
    const db = await admin();
    const res = await db.from("menu_variants").delete().eq("id", data.id);
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

export const uploadMedia = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    z
      .object({
        fileName: z.string().min(1).max(200),
        contentType: z.string().min(3).max(60),
        dataBase64: z.string().min(10),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    await requireAdmin();
    return uploadMediaFile(data);
  });

export const updateGalleryImage = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    z
      .object({
        id: z.string().uuid(),
        caption: z.string().max(200).default(""),
        sort_order: z.number().int().min(0).max(9999).default(0),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    await requireAdmin();
    const db = await admin();
    const { id, ...values } = data;
    const res = await db.from("gallery_images").update(values).eq("id", id);
    if (res.error) throw new Error(res.error.message);
    return { ok: true as const };
  });

export const updateReview = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    z
      .object({
        id: z.string().uuid(),
        full_name: z.string().min(2).max(80),
        comment: z.string().min(3).max(1000),
        rating: z.number().int().min(1).max(5),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    await requireAdmin();
    const db = await admin();
    const { id, ...values } = data;
    const res = await db.from("reviews").update(values).eq("id", id);
    if (res.error) throw new Error(res.error.message);
    return { ok: true as const };
  });

export const deleteMedia = createServerFn({ method: "POST" })
  .inputValidator((data: { url: string }) => z.object({ url: z.string().max(500) }).parse(data))
  .handler(async ({ data }) => {
    await requireAdmin();
    await removeMediaByUrl(data.url);
    return { ok: true as const };
  });
