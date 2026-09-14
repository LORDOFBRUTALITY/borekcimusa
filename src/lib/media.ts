// Yüklenen görseller özel depoda tutulur ve /api/public/media/... adresinden sunulur.
// Site statik olarak başka bir sunucuda (ör. cPanel) yayınlandığında bu yol çalışmaz,
// bu yüzden görselleri her zaman yayındaki Lovable adresi üzerinden mutlak URL ile çağırıyoruz.
const MEDIA_ORIGIN = "https://borekcimusa.lovable.app";
const MEDIA_PREFIX = "/api/public/media/";

export function mediaSrc(url: string | null | undefined): string | undefined {
  if (!url) return undefined;
  if (url.startsWith(MEDIA_PREFIX)) return `${MEDIA_ORIGIN}${url}`;
  return url;
}
