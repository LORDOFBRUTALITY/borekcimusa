export type Variant = { name: string; image: string };

const V = (name: string, image: string): Variant => ({
  name,
  image: `/images/variants/${image}.jpg`,
});

export const MENU_VARIANTS: Record<string, Variant[]> = {
  "Kol Böreği": [
    V("Kıymalı", "kol-kiymali"),
    V("Peynirli", "kol-peynirli"),
    V("Patatesli", "kol-patatesli"),
    V("Ispanak Kaşarlı", "kol-ispanak-kasarli"),
    V("Patlıcanlı", "kol-patlicanli"),
  ],
  "Su Böreği": [
    V("Kaşarlı", "su-kasarli"),
    V("Pastırmalı Kaşarlı", "su-pastirmali"),
    V("Kavurma Kaşarlı", "su-kavurmali"),
    V("Sucuklu Kaşarlı", "su-sucuklu"),
  ],
  "Talaş Böreği": [
    V("Kıymalı", "talas-kiymali"),
    V("Peynirli", "talas-peynirli"),
    V("Patatesli", "talas-patatesli"),
    V("Domatesli Kaşarlı", "talas-domatesli-kasarli"),
  ],
  "Açma Çeşitleri": [
    V("Peynirli", "acma-peynirli"),
    V("Patatesli", "acma-patatesli"),
    V("Sade", "acma-sade"),
    V("Çikolatalı", "acma-cikolatali"),
    V("Sosisli", "acma-sosisli"),
    V("Sosis Kaşarlı", "acma-sosis-kasarli"),
    V("Zeytin Kaşarlı", "acma-zeytin-kasarli"),
  ],
  "Poğaça Çeşitleri": [
    V("Kaşarlı", "pogaca-kasarli"),
    V("Peynirli", "pogaca-peynirli"),
    V("Zeytinli", "pogaca-zeytinli"),
    V("Patatesli", "pogaca-patatesli"),
    V("Kaşarlı - Salçalı", "pogaca-kasarli-salca"),
    V("Kaşarlı - Sade", "pogaca-sade"),
  ],
};

export const variantsFor = (name: string): Variant[] => MENU_VARIANTS[name] ?? [];
