---
name: statik-html-export
description: Siteyi cPanel gibi Node çalıştırmayan klasik hostinglerde yayınlanabilecek statik HTML paketine dönüştürür; yönetim paneli Lovable'da kalır.
---

# Statik HTML dışa aktarma

Amaç: ziyaretçi tarafını hazır HTML/CSS/JS dosyalarına çevirip indirilebilir bir zip
üretmek. Yönetim paneli (`/admin`) sunucu oturumu gerektirdiği için pakete girmez,
Lovable adresinde kalır ve veriler ortak veritabanından gelmeye devam eder.

## Ön koşullar (zaten kuruluysa dokunma)

1. `vite.config.ts` içinde ana sayfa prerender edilmiş olmalı:
   ```ts
   tanstackStart: {
     pages: [{ path: "/" }],
     prerender: { enabled: true, autoStaticPathsDiscovery: false },
   }
   ```
   Yönetim paneli listeye eklenmez.
2. `src/lib/media.ts` içindeki `mediaSrc()` yardımcısı, veritabanından gelen
   `/api/public/media/...` ve `/__l5e/...` yollarını `https://borekcimusa.lovable.app`
   ön ekiyle mutlak adrese çevirir. Görsel gösteren her bileşen (`MenuSection`,
   `GallerySection` vb.) `src={mediaSrc(...)}` kullanmalı.
3. `scripts/static-export.mjs` derlenen çıktıyı `static-site/` klasörüne kopyalar ve
   kalan relatif medya yollarını mutlak adrese çevirir.

## Çalıştırma

```bash
bun run build && node scripts/static-export.mjs
cd static-site && zip -qr /mnt/documents/borekci-musa-statik-site.zip .
```

Farklı bir medya adresi gerekiyorsa: `STATIC_ORIGIN=https://... node scripts/static-export.mjs`

## Doğrulama

- `static-site/index.html` var ve içinde menü/galeri içeriği yerine boş gövde değil,
  prerender edilmiş HTML bulunuyor.
- `rg -n '"/api/public/media/' static-site` hiçbir sonuç döndürmemeli (hepsi mutlak olmalı).
- `static-site/admin` klasörü **olmamalı**.

## Kullanıcıya anlatım

- Zip'i indirip içindeki **tüm dosyaları** cPanel > Dosya Yöneticisi > `public_html`
  içine yükleyin (klasörü değil, içindekileri).
- Menü, fotoğraf, yorum güncellemeleri panelden anında yansır; yalnızca tasarım/metin
  değişikliğinde yeni paket gerekir.
- Fotoğraflar Lovable üzerinden servis edildiği için Lovable projesi kapatılmamalı.
