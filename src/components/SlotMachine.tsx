"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { PRIZES, pickPrize, makeRedeemCode, type Prize } from "@/lib/prizes";

/**
 * Single-reel slot machine.
 * - User taps "Girar".
 * - The reel spins through PRIZES many times, decelerating.
 * - It lands on a prize chosen by weighted random.
 * - Then we show the prize card with a redemption code.
 */
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
  // Build a long pseudo-strip of glyphs so the reel "spins"
  const stripRef = useRef<Prize[]>([]);
  if (stripRef.current.length === 0) {
    const strip: Prize[] = [];
    for (let i = 0; i < 18; i++) {
      strip.push(PRIZES[i % PRIZES.length]);
    }
    stripRef.current = strip;
  }
  const [offset, setOffset] = useState(0);

  const ITEM_H = 64; // px

  useEffect(() => {
    if (phase !== "spinning") return;
    const chosen = pickPrize();
    // Build a destination index: many full rotations + land on chosen
    const baseLoops = 8; // full strip cycles
    const stripLen = stripRef.current.length;
    const chosenIdx = stripRef.current.findIndex((p) => p.id === chosen.id);
    const targetIndex = baseLoops * stripLen + chosenIdx;
    setOffset(targetIndex * ITEM_H);

    const t = window.setTimeout(() => {
      setWinner(chosen);
      setCode(makeRedeemCode());
      setPhase("won");
    }, 3600);
    return () => window.clearTimeout(t);
  }, [phase]);

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
      <div className="flex items-center justify-between gap-4">
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
            Calcomanía, marcador, PDF del libro, capítulo firmado o —si la
            suerte está contigo— el libro completo, gratis.
          </p>
        </div>
      </div>

      {/* Reel window */}
      <div
        className="relative mx-auto mt-5 overflow-hidden rounded-2xl"
        style={{
          width: "100%",
          maxWidth: 320,
          height: ITEM_H,
          background: "rgba(0,0,0,0.45)",
          border: `1px solid ${accentColor}66`,
          boxShadow: `inset 0 0 24px rgba(0,0,0,0.6)`,
        }}
      >
        <motion.div
          animate={{ y: -offset }}
          transition={{
            duration: phase === "spinning" ? 3.4 : 0,
            ease: phase === "spinning" ? [0.15, 0.85, 0.25, 1] : "linear",
          }}
          style={{ willChange: "transform" }}
        >
          {stripRef.current.map((p, i) => (
            <ReelRow key={i} prize={p} ink={inkColor} h={ITEM_H} />
          ))}
        </motion.div>
        {/* Center indicator */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-full"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.55) 100%)",
          }}
        />
      </div>

      <button
        disabled={phase !== "idle"}
        onClick={() => setPhase("spinning")}
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
      className="flex items-center gap-3 px-5"
      style={{ height: h, color: ink }}
    >
      <span
        className="text-2xl"
        style={{ color: prize.color, textShadow: `0 0 10px ${prize.color}55` }}
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
