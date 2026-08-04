CREATE TABLE public.ikramlar (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  image_url text,
  sort_order integer NOT NULL DEFAULT 0,
  is_visible boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.ikramlar TO anon;
GRANT SELECT ON public.ikramlar TO authenticated;
GRANT ALL ON public.ikramlar TO service_role;

ALTER TABLE public.ikramlar ENABLE ROW LEVEL SECURITY;

CREATE POLICY ikramlar_public_read ON public.ikramlar FOR SELECT TO anon, authenticated USING (is_visible = true);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_ikramlar_updated_at BEFORE UPDATE ON public.ikramlar
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.ikramlar (name, sort_order) VALUES
  ('Haydari', 1),
  ('Ezme', 2),
  ('Mevsim Yeşilliği', 3),
  ('Bulgur Pilavı', 4),
  ('Soğan', 5),
  ('Kızarmış Soğan', 6),
  ('Salatalık', 7);