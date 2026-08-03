CREATE TABLE public.menu_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  name text NOT NULL,
  description text NOT NULL DEFAULT '',
  price integer NOT NULL DEFAULT 0,
  image_url text,
  sort_order integer NOT NULL DEFAULT 0,
  is_visible boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.menu_items TO anon, authenticated;
GRANT ALL ON public.menu_items TO service_role;
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "menu_items_public_read" ON public.menu_items FOR SELECT TO anon, authenticated USING (is_visible = true);

CREATE TABLE public.gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL,
  caption text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.gallery_images TO anon, authenticated;
GRANT ALL ON public.gallery_images TO service_role;
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "gallery_public_read" ON public.gallery_images FOR SELECT TO anon, authenticated USING (true);

CREATE TABLE public.reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  comment text NOT NULL,
  rating integer NOT NULL DEFAULT 5,
  is_approved boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT reviews_rating_range CHECK (rating BETWEEN 1 AND 5),
  CONSTRAINT reviews_name_len CHECK (char_length(full_name) BETWEEN 2 AND 80),
  CONSTRAINT reviews_comment_len CHECK (char_length(comment) BETWEEN 3 AND 1000)
);
GRANT SELECT, INSERT ON public.reviews TO anon, authenticated;
GRANT ALL ON public.reviews TO service_role;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "reviews_public_read_approved" ON public.reviews FOR SELECT TO anon, authenticated USING (is_approved = true);
CREATE POLICY "reviews_public_insert_pending" ON public.reviews FOR INSERT TO anon, authenticated WITH CHECK (is_approved = false);

CREATE TABLE public.site_content (
  key text PRIMARY KEY,
  value text NOT NULL DEFAULT '',
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_content TO anon, authenticated;
GRANT ALL ON public.site_content TO service_role;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "site_content_public_read" ON public.site_content FOR SELECT TO anon, authenticated USING (true);

CREATE TABLE public.campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.campaigns TO anon, authenticated;
GRANT ALL ON public.campaigns TO service_role;
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
CREATE POLICY "campaigns_public_read" ON public.campaigns FOR SELECT TO anon, authenticated USING (is_active = true);

INSERT INTO public.menu_items (category, name, description, price, sort_order) VALUES
('Izgaralar','Adana Porsiyon','Zırhla çekilmiş dana etinden, közde pişen acılı Adana kebabı.',500,1),
('Izgaralar','Urfa Porsiyon','Acısız, yumuşacık dokusuyla Urfa usulü ızgara kebap.',500,2),
('Izgaralar','Ciğer Şiş','Günlük taze kuzu ciğeri, kuyruk yağı ile şişte közlenir.',500,3),
('Izgaralar','Tavuk Kanat Porsiyon','Marine edilmiş tavuk kanatları, ateşte kızarmış.',400,4),
('Izgaralar','Tavuk Şiş','Terbiyeli tavuk göğsü kuşbaşı, mangalda.',400,5),
('Izgaralar','Kuzu Pirzola','Seçilmiş kuzu pirzola, tuz ve ateşle buluşuyor.',700,6),
('Izgaralar','Patlıcan Kebabı','Köz patlıcan ile kebap etinin klasik uyumu.',700,7),
('Dürümler','Adana Dürüm','İnce lavaşta acılı Adana, ezme ve yeşillik ile.',250,1),
('Dürümler','Urfa Dürüm','Acısız Urfa kebabı, sıcak lavaş içinde.',250,2),
('Dürümler','Tavuk Dürüm','Izgara tavuk, taze yeşillikler ve lavaş.',200,3),
('Diğer','Çiğ Köfte Porsiyon','Elde yoğrulmuş, bol baharatlı çiğ köfte.',250,1),
('Diğer','Fırın Sütlaç','Odun fırınında üzeri kızarmış geleneksel sütlaç.',150,2),
('Diğer','Tel Kadayıf','Tereyağlı, cevizli, şerbetli tel kadayıf.',250,3),
('Diğer','Açık Ayran','Günlük çalkalanmış, köpüklü açık ayran.',60,4);

INSERT INTO public.site_content (key, value) VALUES
('hero_title','Ciğerin Gerçek Ustası'),
('hero_subtitle','1978''den Bugüne Lezzetin Adresi'),
('about_text','Ciğerci Veysi Usta, Bursa Yunuseli''nde ocağın başında geçen uzun yılların birikimiyle hizmet veren bir aile işletmesidir. Mutfağımızın merkezinde tek bir ilke var: doğru et, doğru ateş, doğru zaman. Ciğerimiz günlük olarak temin edilir, elde ayıklanır ve siparişiniz geldiğinde şişe dizilir. Sofranıza gelen her tabak, ustanın kendi elinden geçer.'),
('history_text','İşletmemiz, ciğer ustalığını babadan oğula aktaran bir geleneğin devamı olarak kuruldu. Yıllar içinde küçük bir ocakbaşından mahallenin buluşma noktasına dönüştük. Bugün Yunuseli''nde, aynı ölçüler ve aynı özenle çalışmaya devam ediyoruz. Anlatacak abartılı bir hikâyemiz yok; yalnızca her gün tekrarlanan aynı titizlik var.');