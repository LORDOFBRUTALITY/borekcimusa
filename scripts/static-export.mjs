// Derlenen istemci dosyalarını, Node çalıştırmayan klasik bir hostingde (cPanel vb.)
// yayınlanabilecek statik bir klasöre kopyalar.
// Lovable üzerinde barındırılan görsel adreslerini tam adrese çevirir.
// Kullanım: bun run build && node scripts/static-export.mjs
import { cp, readdir, readFile, writeFile, rm } from "node:fs/promises";
import { join, extname } from "node:path";

const ORIGIN = process.env.STATIC_ORIGIN ?? "https://borekcimusa.lovable.app";
const SRC = "dist/client";
const OUT = "static-site";
const REWRITE_EXT = new Set([".html", ".js", ".css", ".json", ".xml", ".txt"]);

await rm(OUT, { recursive: true, force: true });
await cp(SRC, OUT, { recursive: true });

async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(full);
      continue;
    }
    if (!REWRITE_EXT.has(extname(entry.name))) continue;
    const text = await readFile(full, "utf8");
    const next = text
      .replaceAll('"/__l5e/', `"${ORIGIN}/__l5e/`)
      .replaceAll("'/__l5e/", `'${ORIGIN}/__l5e/`)
      .replaceAll('"/api/public/media/', `"${ORIGIN}/api/public/media/`);
    if (next !== text) await writeFile(full, next);
  }
}

await walk(OUT);
console.log(`Statik site hazır: ${OUT}/ (görseller ${ORIGIN} üzerinden)`);
