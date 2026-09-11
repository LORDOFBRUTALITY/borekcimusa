CREATE TABLE public.menu_variants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  menu_item_id uuid NOT NULL REFERENCES public.menu_items(id) ON DELETE CASCADE,
  name text NOT NULL,
  image_url text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT SELECT ON public.menu_variants TO anon;
GRANT SELECT ON public.menu_variants TO authenticated;
GRANT ALL ON public.menu_variants TO service_role;

ALTER TABLE public.menu_variants ENABLE ROW LEVEL SECURITY;

CREATE POLICY menu_variants_public_read ON public.menu_variants
  FOR SELECT TO anon, authenticated USING (true);

CREATE INDEX menu_variants_item_idx ON public.menu_variants (menu_item_id, sort_order);

CREATE TRIGGER update_menu_variants_updated_at
  BEFORE UPDATE ON public.menu_variants
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();