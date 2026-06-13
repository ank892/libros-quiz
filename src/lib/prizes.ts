export type Prize = {
  id: string;
  /** Display name */
  name: string;
  /** Short tagline for the result card */
  tagline: string;
  /** Emoji or single glyph for the reel */
  glyph: string;
  /** Relative weight — higher = more common */
  weight: number;
  /** Color for the prize card */
  color: string;
  /** Rarity tier shown to user */
  rarity: "comun" | "especial" | "jackpot";
  /** What the booth attendant should do */
  redeem: string;
};

/**
 * Probabilities (relative weights, sum = 100):
 *  - Calcomanía (sticker)   : 50  → 50%
 *  - Marcador de libro      : 25  → 25%
 *  - Tarjeta con PDF        : 15  → 15%
 *  - LIBRO físico (jackpot) : 10  → 10%  (1 de cada 10)
 */
export const PRIZES: Prize[] = [
  {
    id: "sticker",
    name: "Calcomanía",
    tagline: "Una calcomanía exclusiva de la portada de tu libro.",
    glyph: "✦",
    weight: 50,
    color: "#f4c47a",
    rarity: "comun",
    redeem:
      "Mostrá esta pantalla en el stand. El equipo te entrega tu calcomanía al instante.",
  },
  {
    id: "bookmark",
    name: "Marcador de libro",
    tagline: "Un marcador con una de las frases del libro que te tocó.",
    glyph: "❦",
    weight: 25,
    color: "#f59ec0",
    rarity: "comun",
    redeem:
      "Mostrá esta pantalla en el stand. Elegimos juntos el marcador con la frase que más te llegue.",
  },
  {
    id: "pdf-card",
    name: "Tarjeta con PDF del libro",
    tagline:
      "Tarjeta física con QR para descargar el PDF de tu libro recomendado. Para leerlo esta noche.",
    glyph: "✉",
    weight: 15,
    color: "#9bd1ff",
    rarity: "especial",
    redeem:
      "Mostrá esta pantalla en el stand. Te entregamos la tarjeta con el QR. El PDF expira en 30 días.",
  },
  {
    id: "book",
    name: "¡Un libro físico!",
    tagline:
      "Tu libro recomendado, gratis, en tus manos. Y donamos otro a un paciente o cuidador.",
    glyph: "★",
    weight: 10,
    color: "#ff8c5a",
    rarity: "jackpot",
    redeem:
      "Mostrá esta pantalla en el stand AHORA MISMO. Te entregamos tu libro al instante (1 por persona).",
  },
];

export function pickPrize(rng: () => number = Math.random): Prize {
  const total = PRIZES.reduce((s, p) => s + p.weight, 0);
  const r = rng() * total;
  let acc = 0;
  for (const p of PRIZES) {
    acc += p.weight;
    if (r < acc) return p;
  }
  return PRIZES[0];
}

/** Short alphanumeric redemption code shown at booth. Avoids 0/O/1/I confusion. */
export function makeRedeemCode(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 6; i++) {
    s += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return `${s.slice(0, 3)}-${s.slice(3)}`;
}
