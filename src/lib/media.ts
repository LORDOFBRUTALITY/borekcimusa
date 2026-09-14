// Yüklenen görseller özel depoda tutulur ve /api/public/media/... adresinden sunulur.
// Site statik olarak başka bir sunucuda (ör. cPanel) yayınlandığında bu yol çalışmaz,
// bu yüzden görselleri her zaman yayındaki Lovable adresi üzerinden mutlak URL ile çağırıyoruz.
const MEDIA_ORIGIN = "https://borekcimusa.lovable.app";
const REMOTE_PREFIXES = ["/api/public/media/", "/__l5e/"];

export function mediaSrc(url: string | null | undefined): string | undefined {
  if (!url) return undefined;
  if (REMOTE_PREFIXES.some((prefix) => url.startsWith(prefix))) return `${MEDIA_ORIGIN}${url}`;
  return url;
}
