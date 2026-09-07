DELETE FROM public.menu_items;
DELETE FROM public.ikramlar;
DELETE FROM public.reviews;
DELETE FROM public.gallery_images;
DELETE FROM public.site_content;

INSERT INTO public.menu_items (category, name, description, price, image_url, sort_order) VALUES
('Çıtır Tepsi Börekleri','Pastırmalı Kaşarlı Börek','Özel pastırma, erimiş kaşar peyniri ve incecik el açması çıtır yufka.',0,'/images/urun-pastirmali.jpg',1),
('Çıtır Tepsi Börekleri','Kıymalı Börek','Özel baharatlı dana kıyma harcı ile hazırlanmış geleneksel börek.',0,'/images/urun-kiymali.jpg',2),
('Çıtır Tepsi Börekleri','Peynirli Börek','Halis taze peynir ve maydanoz dolgulu klasik lezzet.',0,'/images/urun-peynirli.jpg',3),
('Çıtır Tepsi Börekleri','Patatesli Börek','Baharatlı taze patates harçlı tepsi böreği.',0,'/images/urun-patatesli.jpg',4),
('Çıtır Tepsi Börekleri','Küt Böreği (Pudra Şekerli)','Kat kat çıtır hamur, isteğe göre bol pudra şekeri ikramıyla.',0,'/images/urun-kut-boregi.jpg',5),
('Pide & Fırın Özel','Tahinli Pide','Bursa''nın meşhur bol tahinli, taş fırında pişen tatlı lezzeti.',0,'/images/urun-tahinli-pide.jpg',1),
('Pide & Fırın Özel','Su Böreği','Bol peynirli, tereyağlı, yumuşacık kat kat su böreği.',0,'/images/urun-su-boregi.jpg',2),
('İçecekler & Tamamlayıcılar','Demleme Çay','Taze demlenmiş sıcak çay.',0,'/images/ikram-cay.jpg',1),
('İçecekler & Tamamlayıcılar','Köpüklü Açık Ayran','Soğuk ve ferahlatıcı geleneksel ayran.',0,NULL,2),
('İçecekler & Tamamlayıcılar','Kutu İçecekler & Meyve Suları','Çeşitli soğuk meşrubatlar.',0,NULL,3);

INSERT INTO public.ikramlar (name, image_url, sort_order, is_visible) VALUES
('Taze Demleme Çay','/images/ikram-cay.jpg',1,true);

INSERT INTO public.reviews (full_name, comment, rating, is_approved) VALUES
('Göksel Kocabıyık','Börekçi Musa, lezzeti ve samimiyeti bir araya getiren nadir esnaflardan. Her böreğinde ürünlerinde emeği hissediliyor. Güler yüzlü hizmetiyle de insanı tekrar tekrar gelmeye davet ediyor.',5,true),
('Ahmet Ber','Pastırmalı kaşarlı böreği efsaneydi gerçekten Bravooo. Her şey olması gerektiği gibi idi. Nezaket ve güleryüzlü Musa ve Ahmet ustalarım elleriniz dert görmesin.',5,true),
('Elmas Emel GÖKTÜRK','Çok güzel tavsiye ederim kısa sürede müdavimi olduk, gidecek olan kişilere tavsiye ederim afiyet olsun.',5,true);

INSERT INTO public.gallery_images (image_url, caption, sort_order) VALUES
('/images/hero-borek.jpg','Fırından yeni çıkan tepsi böreği',1),
('/images/urun-pastirmali.jpg','Pastırmalı kaşarlı börek',2),
('/images/urun-tahinli-pide.jpg','Meşhur tahinli pide',3),
('/images/urun-kut-boregi.jpg','Pudra şekerli küt böreği',4),
('/images/ikram-cay.jpg','İkram çayımız',5),
('/images/urun-su-boregi.jpg','Kat kat su böreği',6);

INSERT INTO public.site_content (key, value) VALUES
('hero_title','Çıtır Çıtır Sıcak Lezzet'),
('hero_subtitle','Nilüfer''de Günün İlk Işıklarıyla Başlayan Geleneksel Fırın Lezzeti'),
('about_text','Börekçi Musa, Bursa Nilüfer''de her sabah erken saatlerde fırınını yakan, el açması börek geleneğini sürdüren bir aile işletmesidir. Böreklerimiz gün boyu taze taze hazırlanır, sıcak sıcak servis edilir.'),
('history_text','Musa ve Ahmet Ustaların elinden çıkan kat kat hamur; hakiki tereyağı, taze peynir ve özenle seçilmiş malzemelerle her gün taptaze hazırlanır. Bursa''nın meşhur tahinli pidesi de fırınımızın vazgeçilmezidir.');
