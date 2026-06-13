"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { PRIZES, pickPrize, makeRedeemCode, type Prize } from "@/lib/prizes";

const ITEM_H = 72; // px per row
const VISIBLE_ROWS = 3; // how many rows visible at once (center is the winner)
const STRIP_REPEATS = 60; // long strip so the reel can spin many cycles

export default function SlotMachine({
  accentColor,
  inkColor,
}: {
  accentColor: string;
  inkColor: string;
}) {
  const [phase, setPhase] = useState<"idle" | "spinning" | "won">("idle");
  const [winner, setWinner] = useState<Prize | null>(null);
  const [code, setCode] = useState<string>("");
  const controls = useAnimation();

  const strip = useMemo(() => {
    const out: Prize[] = [];
    for (let i = 0; i < STRIP_REPEATS; i++) {
      // Shuffle slightly for visual variety while preserving distribution
      const block = [...PRIZES].sort(() => Math.random() - 0.5);
      out.push(...block);
    }
    return out;
  }, []);

  // Initial offset (so we have room above to scroll up)
  const initialOffsetRef = useRef<number>(ITEM_H * 5);

  useEffect(() => {
    controls.set({ y: -initialOffsetRef.current });
  }, [controls]);

  const spin = async () => {
    if (phase !== "idle") return;
    setPhase("spinning");

    const chosen = pickPrize();

    // Find a chosen-prize index near the END of the strip so the reel
    // travels a long distance and visibly spins.
    const minIdx = Math.floor(strip.length * 0.78);
    const maxIdx = Math.floor(strip.length * 0.92);
    let landIdx = -1;
    for (let i = minIdx; i <= maxIdx; i++) {
      if (strip[i].id === chosen.id) {
        landIdx = i;
        break;
      }
    }
    if (landIdx === -1) {
      // Fallback: scan from minIdx upward
      for (let i = minIdx; i < strip.length; i++) {
        if (strip[i].id === chosen.id) { landIdx = i; break; }
      }
    }
    if (landIdx === -1) landIdx = strip.length - 1;

    // The reel window centers a slot at row index VISIBLE_ROWS/2 (i.e. row 1 of 3).
    // To have `landIdx` appear in the center, y = -(landIdx - 1) * ITEM_H
    const finalY = -(landIdx - Math.floor(VISIBLE_ROWS / 2)) * ITEM_H;

    // Phase 1: fast linear spin (passes lots of items so user sees motion)
    const fastY = finalY + ITEM_H * 18; // 18 items before final
    await controls.start({
      y: fastY,
      transition: { duration: 1.0, ease: "linear" },
    });

    // Phase 2: a couple of "fake-out" wobbles that make it feel like it's
    // hesitating between prizes — the slot-machine feeling
    await controls.start({
      y: finalY + ITEM_H * 6,
      transition: { duration: 0.55, ease: [0.33, 0, 0.67, 0.4] },
    });
    await controls.start({
      y: finalY + ITEM_H * 8.2, // bounce back UP
      transition: { duration: 0.28, ease: [0.4, 0, 0.4, 1] },
    });
    await controls.start({
      y: finalY + ITEM_H * 2.5,
      transition: { duration: 0.5, ease: [0.33, 0, 0.4, 0.6] },
    });
    await controls.start({
      y: finalY + ITEM_H * 3.8, // small back-up: looks like it might land here
      transition: { duration: 0.22, ease: [0.4, 0, 0.4, 1] },
    });

    // Phase 3: slow ease into final, with a tiny overshoot + bounce back
    await controls.start({
      y: finalY - ITEM_H * 0.45, // overshoot (goes one notch past)
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    });
    await controls.start({
      y: finalY,
      transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }, // back-out spring
    });

    setWinner(chosen);
    setCode(makeRedeemCode());
    setPhase("won");
  };

  if (phase === "won" && winner) {
    return <PrizeCard prize={winner} code={code} accentColor={accentColor} inkColor={inkColor} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="rounded-3xl px-5 py-6 sm:px-6 sm:py-7"
      style={{
        background: `linear-gradient(160deg, ${accentColor}1f, ${accentColor}08)`,
        border: `1px solid ${accentColor}55`,
      }}
    >
      <div>
        <p
          className="text-[11px] uppercase tracking-[0.22em] mb-1"
          style={{ color: accentColor }}
        >
          🎰 Bono de feria
        </p>
        <p className="font-serif text-xl sm:text-2xl leading-snug" style={{ color: inkColor }}>
          Tirá la ruleta. Algo te vas a llevar.
        </p>
        <p className="mt-1 text-sm" style={{ color: `${inkColor}b3` }}>
          Calcomanía, marcador, tarjeta con el PDF del libro o —si la suerte
          está contigo— el libro completo, gratis.
        </p>
      </div>

      {/* Reel window */}
      <div
        className="relative mx-auto mt-5 overflow-hidden rounded-2xl"
        style={{
          width: "100%",
          maxWidth: 360,
          height: ITEM_H * VISIBLE_ROWS,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.7), rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.7))",
          border: `1px solid ${accentColor}66`,
          boxShadow: `inset 0 0 30px rgba(0,0,0,0.7)`,
        }}
      >
        <motion.div animate={controls} style={{ willChange: "transform" }}>
          {strip.map((p, i) => (
            <ReelRow key={i} prize={p} ink={inkColor} h={ITEM_H} />
          ))}
        </motion.div>

        {/* Center selector lines */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 right-0"
          style={{
            top: ITEM_H,
            height: ITEM_H,
            borderTop: `2px solid ${accentColor}`,
            borderBottom: `2px solid ${accentColor}`,
            background: `${accentColor}10`,
          }}
        />

        {/* Vignette gradient at top/bottom edges */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.85) 0%, transparent 22%, transparent 78%, rgba(0,0,0,0.85) 100%)",
          }}
        />
      </div>

      <button
        disabled={phase !== "idle"}
        onClick={spin}
        className="mt-5 w-full rounded-full px-6 py-3 font-medium text-base transition-transform disabled:opacity-60"
        style={{
          background: accentColor,
          color: "#1a0f08",
          transform: phase === "idle" ? undefined : "scale(0.98)",
        }}
      >
        {phase === "idle" ? "🎲 Girar la ruleta" : "Girando…"}
      </button>

      <p className="mt-3 text-center text-[11px] uppercase tracking-[0.2em]" style={{ color: `${inkColor}66` }}>
        1 tirada por persona · canjeable solo en el stand
      </p>
    </motion.div>
  );
}

function ReelRow({ prize, ink, h }: { prize: Prize; ink: string; h: number }) {
  return (
    <div
      className="flex items-center gap-4 px-6"
      style={{ height: h, color: ink }}
    >
      <span
        className="text-3xl"
        style={{ color: prize.color, textShadow: `0 0 14px ${prize.color}77` }}
      >
        {prize.glyph}
      </span>
      <span className="text-base sm:text-lg font-medium">{prize.name}</span>
    </div>
  );
}

function PrizeCard({
  prize,
  code,
  accentColor,
  inkColor,
}: {
  prize: Prize;
  code: string;
  accentColor: string;
  inkColor: string;
}) {
  const isJackpot = prize.rarity === "jackpot";
  return (
    <motion.div
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 90 }}
      className="relative rounded-3xl px-6 py-7 overflow-hidden"
      style={{
        background: `linear-gradient(160deg, ${prize.color}33, ${prize.color}10)`,
        border: `2px solid ${prize.color}aa`,
        boxShadow: isJackpot ? `0 0 60px ${prize.color}55` : undefined,
      }}
    >
      {isJackpot && (
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.18), transparent 60%)",
          }}
        />
      )}

      <div className="relative">
        <p
          className="text-[11px] uppercase tracking-[0.22em] mb-2"
          style={{ color: prize.color }}
        >
          {isJackpot ? "🎉 ¡JACKPOT!" : `🎰 ¡Te ganaste!`} ·{" "}
          <span style={{ color: `${inkColor}b3` }}>{prize.rarity}</span>
        </p>

        <div className="flex items-start gap-4">
          <span
            className="text-5xl shrink-0"
            style={{ color: prize.color, textShadow: `0 0 18px ${prize.color}aa` }}
          >
            {prize.glyph}
          </span>
          <div>
            <p
              className="font-serif text-2xl sm:text-3xl leading-tight"
              style={{ color: inkColor }}
            >
              {prize.name}
            </p>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: `${inkColor}cc` }}>
              {prize.tagline}
            </p>
          </div>
        </div>

        {/* Redeem code */}
        <div
          className="mt-5 rounded-2xl px-5 py-4 text-center"
          style={{
            background: "rgba(0,0,0,0.45)",
            border: `1px dashed ${prize.color}88`,
          }}
        >
          <p className="text-[10px] uppercase tracking-[0.24em]" style={{ color: `${inkColor}88` }}>
            Código de canje · enseñalo en el stand
          </p>
          <p
            className="font-mono mt-1 text-2xl sm:text-3xl tracking-[0.3em]"
            style={{ color: prize.color }}
          >
            {code}
          </p>
        </div>

        <p className="mt-4 text-sm leading-relaxed" style={{ color: `${inkColor}c0` }}>
          <strong style={{ color: inkColor, fontWeight: 600 }}>Cómo lo reclamás:</strong>{" "}
          {prize.redeem}
        </p>

        <p
          className="mt-4 text-[11px] uppercase tracking-[0.2em]"
          style={{ color: `${accentColor}cc` }}
        >
          Tomale captura a esta pantalla
        </p>
      </div>
    </motion.div>
  );
}
