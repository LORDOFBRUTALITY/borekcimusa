import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type MenuItem = {
  id: string;
  category: string;
  name: string;
  description: string;
  price: number;
  image_url: string | null;
  sort_order: number;
  is_visible: boolean;
};

export type GalleryImage = { id: string; image_url: string; caption: string; sort_order: number };
export type Review = {
  id: string;
  full_name: string;
  comment: string;
  rating: number;
  created_at: string;
};
export type Campaign = { id: string; title: string; description: string };
export type Ikram = { id: string; name: string; image_url: string | null; sort_order: number };

export const ikramlarQuery = queryOptions({
  queryKey: ["ikramlar"],
  queryFn: async (): Promise<Ikram[]> => {
    const { data, error } = await supabase
      .from("ikramlar")
      .select("id, name, image_url, sort_order")
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return (data ?? []) as Ikram[];
  },
});

export const menuQuery = queryOptions({
  queryKey: ["menu"],
  queryFn: async (): Promise<MenuItem[]> => {
    const { data, error } = await supabase
      .from("menu_items")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return (data ?? []) as MenuItem[];
  },
});

export const galleryQuery = queryOptions({
  queryKey: ["gallery"],
  queryFn: async (): Promise<GalleryImage[]> => {
    const { data, error } = await supabase
      .from("gallery_images")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return (data ?? []) as GalleryImage[];
  },
});

export const reviewsQuery = queryOptions({
  queryKey: ["reviews"],
  queryFn: async (): Promise<Review[]> => {
    const { data, error } = await supabase
      .from("reviews")
      .select("id, full_name, comment, rating, created_at")
      .order("created_at", { ascending: false })
      .limit(30);
    if (error) throw error;
    return (data ?? []) as Review[];
  },
});

export const contentQuery = queryOptions({
  queryKey: ["site_content"],
  queryFn: async (): Promise<Record<string, string>> => {
    const { data, error } = await supabase.from("site_content").select("key, value");
    if (error) throw error;
    return Object.fromEntries((data ?? []).map((row) => [row.key, row.value]));
  },
});

export const campaignsQuery = queryOptions({
  queryKey: ["campaigns"],
  queryFn: async (): Promise<Campaign[]> => {
    const { data, error } = await supabase
      .from("campaigns")
      .select("id, title, description")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data ?? []) as Campaign[];
  },
});
