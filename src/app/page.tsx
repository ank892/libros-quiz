"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BOOKS, QUESTIONS, scoreAnswers, type BookId } from "@/lib/books";
import BookCover from "@/components/BookCover";

type Stage = "hero" | "quiz" | "echo" | "result";

const ECHO_AUTO_MS = 4500;

export default function Home() {
  const [stage, setStage] = useState<Stage>("hero");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [lastEcho, setLastEcho] = useState<{ tag: string; echo: string } | null>(
    null,
  );

  // Direct preview of any result via ?b=ano|sofia|ellos|ellas
  useEffect(() => {
    const url = new URL(window.location.href);
    const b = url.searchParams.get("b") as BookId | null;
    if (b && b in BOOKS) {
      setAnswers([0, 0, 0, 0, 0, 0, 0]);
      setStage("result");
      (window as unknown as { __forcedWinner?: BookId }).__forcedWinner = b;
    }
  }, []);

  const result = useMemo(() => {
    const forced = (typeof window !== "undefined" &&
      (window as unknown as { __forcedWinner?: BookId }).__forcedWinner) as
      | BookId
      | undefined;
    const computed = scoreAnswers(answers);
    if (forced) return { ...computed, winner: forced };
    return computed;
  }, [answers]);

  const advanceFromEcho = () => {
    if (step + 1 >= QUESTIONS.length) {
      setStage("result");
    } else {
      setStep(step + 1);
      setStage("quiz");
    }
  };

  const onChoose = (optionIdx: number) => {
    const q = QUESTIONS[step];
    const opt = q.options[optionIdx];
    const next = [...answers, optionIdx];
    setAnswers(next);
    setLastEcho({ tag: opt.tag, echo: opt.echo });
    setStage("echo");
  };

  const restart = () => {
    setAnswers([]);
    setStep(0);
    setStage("hero");
    setLastEcho(null);
    if (typeof window !== "undefined") {
      (window as unknown as { __forcedWinner?: BookId }).__forcedWinner = undefined;
      const url = new URL(window.location.href);
      url.searchParams.delete("b");
      window.history.replaceState({}, "", url.toString());
    }
  };

  const beginQuiz = () => {
    setStartedAt(Date.now());
    setStage("quiz");
  };

  return (
    <main className="relative flex flex-1 items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        {stage === "hero" && <Hero key="hero" onBegin={beginQuiz} />}
        {stage === "quiz" && (
          <Quiz
            key={`quiz-${step}`}
            step={step}
            total={QUESTIONS.length}
            onChoose={onChoose}
            onBack={() => {
              if (step === 0) {
                setStage("hero");
              } else {
                setAnswers(answers.slice(0, -1));
                setStep(step - 1);
              }
            }}
          />
        )}
        {stage === "echo" && lastEcho && (
          <Echo
            key={`echo-${step}`}
            tag={lastEcho.tag}
            echo={lastEcho.echo}
            isLast={step + 1 >= QUESTIONS.length}
            onContinue={advanceFromEcho}
          />
        )}
        {stage === "result" && (
          <Result
            key="result"
            answers={answers}
            bookId={result.winner}
            contributing={result.contributingAnswers}
            elapsedMs={startedAt ? Date.now() - startedAt : 0}
            onRestart={restart}
          />
        )}
      </AnimatePresence>
    </main>
  );
}

/* ---------------- HERO ---------------- */

function Hero({ onBegin }: { onBegin: () => void }) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.6 }}
      className="relative w-full max-w-3xl px-6 py-12 sm:py-20 text-center"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 25%, rgba(244,196,122,0.20), transparent 70%), radial-gradient(50% 40% at 80% 80%, rgba(255,140,90,0.16), transparent 70%), radial-gradient(40% 40% at 20% 80%, rgba(91,140,255,0.12), transparent 70%)",
        }}
      />

      <motion.span
        initial={{ y: 8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="pill mx-auto"
      >
        <span aria-hidden>🇨🇷</span> Miguel Fuentes · Costa Rica
      </motion.span>

      <motion.h1
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="font-serif mt-7 text-[2.6rem] sm:text-6xl leading-[1.02] tracking-tight"
      >
        Decime cómo estás hoy.
        <br />
        <span
          className="bg-clip-text text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #f4c47a 0%, #ff8c5a 50%, #f59ec0 100%)",
          }}
        >
          Te digo qué libro abrir esta noche.
        </span>
      </motion.h1>

      <motion.p
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.7 }}
        className="mx-auto mt-6 max-w-xl text-base sm:text-lg text-foreground/80 leading-relaxed"
      >
        Siete preguntas honestas. Tres minutos. Sin email, sin trampa, sin
        algoritmo que te siga después. Al final te explico, con tus propias
        respuestas, por qué te recomiendo el libro que te recomiendo.
      </motion.p>

      <motion.div
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.7 }}
        className="mt-9 flex flex-col items-center gap-4"
      >
        <button
          onClick={onBegin}
          className="group relative inline-flex items-center gap-3 rounded-full bg-foreground px-9 py-4 text-background font-medium text-base sm:text-lg transition-transform hover:scale-[1.02]"
        >
          <span>Empecemos</span>
          <span
            aria-hidden
            className="inline-block transition-transform group-hover:translate-x-1"
          >
            →
          </span>
        </button>
        <p className="text-xs uppercase tracking-[0.18em] text-foreground/50">
          Pura vida · Menos de 3 min
        </p>
      </motion.div>

      {/* 1+1 promise — visible right at the QR landing */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85 }}
        className="mt-10 mx-auto max-w-md rounded-2xl border border-foreground/12 bg-foreground/[0.04] px-5 py-4 text-sm text-foreground/80"
      >
        <p className="font-serif text-base leading-snug text-foreground">
          1 libro comprado = 1 libro donado.
        </p>
        <p className="mt-1 leading-relaxed">
          Por cada ejemplar de <em>El año en que aprendí a vivir</em> que sale
          de esta feria, otro va directo a un paciente oncológico o a un
          cuidador del Hospital México.
        </p>
      </motion.div>

      {/* Floating mini covers */}
      <div className="mt-10 flex justify-center gap-3 sm:gap-5">
        {(Object.keys(BOOKS) as BookId[]).map((id, i) => (
          <motion.div
            key={id}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 0.85 }}
            transition={{ delay: 0.9 + i * 0.08, type: "spring" }}
            className="w-14 sm:w-20"
            style={{ rotate: `${(i - 1.5) * 4}deg` }}
          >
            <BookCover book={BOOKS[id]} small />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

/* ---------------- QUIZ ---------------- */

function Quiz({
  step,
  total,
  onChoose,
  onBack,
}: {
  step: number;
  total: number;
  onChoose: (i: number) => void;
  onBack: () => void;
}) {
  const q = QUESTIONS[step];
  const progress = ((step + 1) / total) * 100;

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.45 }}
      className="relative w-full max-w-2xl px-6 py-10"
    >
      <div className="mb-9 flex items-center gap-4">
        <button
          onClick={onBack}
          aria-label="Atrás"
          className="text-foreground/60 hover:text-foreground transition-colors text-sm"
        >
          ←
        </button>
        <div className="flex-1 h-[2px] bg-foreground/10 overflow-hidden rounded-full">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
            className="h-full"
            style={{
              background:
                "linear-gradient(90deg, #f4c47a, #ff8c5a, #f59ec0)",
            }}
          />
        </div>
        <span className="text-xs tabular-nums text-foreground/50">
          {step + 1}/{total}
        </span>
      </div>

      <p className="text-xs uppercase tracking-[0.18em] text-foreground/45 mb-3">
        {q.pacing}
      </p>
      <h2 className="font-serif text-3xl sm:text-4xl leading-tight tracking-tight">
        {q.prompt}
      </h2>

      <div className="mt-7 grid gap-3">
        {q.options.map((opt, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i + 0.1 }}
            onClick={() => onChoose(i)}
            className="option-card group text-left rounded-2xl border border-foreground/10 bg-foreground/[0.03] hover:bg-foreground/[0.06] hover:border-foreground/25 px-5 py-4"
          >
            <div className="flex items-start gap-4">
              <span className="mt-[2px] inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-foreground/20 text-[11px] font-medium text-foreground/60 group-hover:text-foreground group-hover:border-foreground/60">
                {String.fromCharCode(65 + i)}
              </span>
              <div>
                <p className="text-base sm:text-lg leading-snug">{opt.label}</p>
                {opt.hint && (
                  <p className="mt-1 text-sm text-foreground/55">{opt.hint}</p>
                )}
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.section>
  );
}

/* ---------------- ECHO (between questions) ---------------- */

function Echo({
  tag,
  echo,
  isLast,
  onContinue,
}: {
  tag: string;
  echo: string;
  isLast: boolean;
  onContinue: () => void;
}) {
  // Auto-advance fallback so the experience never stalls, but slow enough to read.
  useEffect(() => {
    const t = window.setTimeout(onContinue, ECHO_AUTO_MS);
    return () => window.clearTimeout(t);
  }, [onContinue]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.4 }}
      className="relative w-full max-w-xl px-6 py-12 text-center"
    >
      <p className="text-xs uppercase tracking-[0.22em] text-foreground/45">
        Anotado: <span className="text-foreground/80">{tag}</span>
      </p>
      <p className="font-serif mt-5 text-2xl sm:text-3xl leading-snug text-foreground/95">
        “{echo}”
      </p>

      <button
        onClick={onContinue}
        className="mt-9 inline-flex items-center gap-2 rounded-full bg-foreground/95 px-7 py-3 text-background text-sm sm:text-base font-medium transition-transform hover:scale-[1.02]"
      >
        {isLast ? "Ver tu libro" : "Siguiente"}
        <span aria-hidden>→</span>
      </button>

      {/* Subtle progress ring (purely visual cue that auto-advance exists) */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: ECHO_AUTO_MS / 1000, ease: "linear" }}
        className="mt-7 mx-auto h-[2px] max-w-[160px] origin-left"
        style={{
          background: "linear-gradient(90deg, #f4c47a, #ff8c5a, #f59ec0)",
        }}
      />
      <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-foreground/35">
        Avanza solo · o tocá para continuar
      </p>
    </motion.section>
  );
}

/* ---------------- RESULT ---------------- */

function Result({
  answers,
  bookId,
  contributing,
  elapsedMs,
  onRestart,
}: {
  answers: number[];
  bookId: BookId;
  contributing: { qIdx: number; weight: number; tag: string }[];
  elapsedMs: number;
  onRestart: () => void;
}) {
  const book = BOOKS[bookId];
  const seconds = Math.max(20, Math.round(elapsedMs / 1000));
  const mm = Math.floor(seconds / 60);
  const ss = seconds % 60;
  const [showWhy, setShowWhy] = useState(false);

  // Pick the best humor + heart excerpt
  const excerptHeart =
    book.excerpts.find((e) => e.tone === "corazon") ?? book.excerpts[0];
  const excerptHumor =
    book.excerpts.find((e) => e.tone === "humor") ??
    book.excerpts.find((e) => e.tone === "esperanza") ??
    book.excerpts[0];
  const excerptHope =
    book.excerpts.find((e) => e.tone === "esperanza") ??
    book.excerpts[book.excerpts.length - 1];

  // Top tags from this person's actual answers
  const topTags = contributing.slice(0, 3).map((c) => c.tag);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="relative w-full min-h-screen flex items-start justify-center overflow-hidden"
      style={{
        backgroundImage: `radial-gradient(60% 50% at 30% 20%, ${book.palette.via}66, transparent 70%), radial-gradient(60% 50% at 80% 90%, ${book.palette.to}55, transparent 70%), linear-gradient(180deg, ${book.palette.from} 0%, #050308 100%)`,
        color: book.palette.ink,
      }}
    >
      <div className="w-full max-w-5xl px-6 py-14 sm:py-20 grid md:grid-cols-[auto_1fr] gap-10 md:gap-14 items-start">
        <motion.div
          initial={{ scale: 0.85, opacity: 0, rotate: -3 }}
          animate={{ scale: 1, opacity: 1, rotate: -2 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 80 }}
          className="mx-auto md:mx-0 w-44 sm:w-56 md:sticky md:top-10"
        >
          <BookCover book={book} />
        </motion.div>

        <div>
          <motion.p
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="pill"
            style={{ borderColor: `${book.palette.accent}55`, color: book.palette.ink }}
          >
            ✦ Te leí en {mm > 0 ? `${mm}m ${ss}s` : `${ss}s`}
          </motion.p>

          <motion.h1
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="font-serif mt-5 text-4xl sm:text-5xl leading-[1.05] tracking-tight"
          >
            Tu libro es{" "}
            <span style={{ color: book.palette.accent }}>{book.title}</span>.
          </motion.h1>

          <motion.p
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-3 text-base sm:text-lg italic"
            style={{ color: `${book.palette.ink}cc` }}
          >
            {book.subtitle}
          </motion.p>

          {/* Personalized resumen built from THEIR answers */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
            className="mt-7 rounded-2xl border px-5 py-5 leading-relaxed"
            style={{
              borderColor: `${book.palette.ink}1f`,
              background: `${book.palette.ink}08`,
            }}
          >
            <p className="text-xs uppercase tracking-[0.22em] mb-3" style={{ color: book.palette.accent }}>
              Lo que escuché de vos
            </p>
            <p className="text-base sm:text-lg" style={{ color: `${book.palette.ink}e6` }}>
              Me dijiste que en este capítulo tuyo cargás{" "}
              {topTags.map((t, i) => (
                <span key={i}>
                  <strong style={{ color: book.palette.ink, fontWeight: 600 }}>{t}</strong>
                  {i < topTags.length - 1 ? (i === topTags.length - 2 ? " y " : ", ") : ""}
                </span>
              ))}
              . Por eso te estoy recomendando este libro y no otro.
            </p>

            <button
              onClick={() => setShowWhy((v) => !v)}
              className="mt-4 inline-flex items-center gap-2 text-sm underline-offset-4 hover:underline"
              style={{ color: book.palette.accent }}
            >
              {showWhy ? "Ocultar" : "Ver"} por qué este y no otro
              <span aria-hidden className={`transition-transform ${showWhy ? "rotate-180" : ""}`}>▾</span>
            </button>

            <AnimatePresence>
              {showWhy && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35 }}
                  className="overflow-hidden"
                >
                  <ul className="mt-4 space-y-2 text-sm" style={{ color: `${book.palette.ink}cc` }}>
                    {contributing.map((c, i) => {
                      const q = QUESTIONS[c.qIdx];
                      const opt = q.options[answers[c.qIdx]];
                      return (
                        <li key={i} className="flex gap-3">
                          <span
                            aria-hidden
                            className="mt-[7px] inline-block h-1 w-1 shrink-0 rounded-full"
                            style={{ background: book.palette.accent }}
                          />
                          <span>
                            <span className="opacity-70">{q.prompt}</span>
                            <br />
                            <strong style={{ color: book.palette.ink, fontWeight: 600 }}>
                              {opt.label}
                            </strong>{" "}
                            <span className="opacity-60">
                              · suma {c.weight} a este libro
                            </span>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                  <p className="mt-4 text-sm leading-relaxed" style={{ color: `${book.palette.ink}d0` }}>
                    {book.why}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Three excerpts in three flavors: corazón, humor, esperanza */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.95 }}
            className="mt-8 grid gap-4 sm:grid-cols-3"
          >
            {[
              { e: excerptHeart, label: "Corazón" },
              { e: excerptHumor, label: "Humor" },
              { e: excerptHope, label: "Esperanza" },
            ].map((slot, i) => (
              <div
                key={i}
                className="rounded-2xl border px-4 py-4"
                style={{
                  borderColor: `${book.palette.ink}1a`,
                  background: `${book.palette.ink}06`,
                }}
              >
                <p
                  className="text-[10px] uppercase tracking-[0.22em]"
                  style={{ color: book.palette.accent }}
                >
                  {slot.label}
                </p>
                <p
                  className="mt-2 font-serif text-[0.98rem] leading-snug"
                  style={{ color: book.palette.ink }}
                >
                  {slot.e.text}
                </p>
                <p
                  className="mt-2 text-[10px] uppercase tracking-[0.18em]"
                  style={{ color: `${book.palette.ink}70` }}
                >
                  {slot.e.caption}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Costa Rica anchor */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="mt-7 rounded-2xl px-5 py-4 text-sm leading-relaxed"
            style={{
              border: `1px dashed ${book.palette.accent}55`,
              background: `${book.palette.accent}0d`,
              color: `${book.palette.ink}d6`,
            }}
          >
            <span className="mr-2" aria-hidden>🇨🇷</span>
            <strong style={{ color: book.palette.ink, fontWeight: 600 }}>
              Pasa en Costa Rica.
            </strong>{" "}
            {book.ticoAnchor}
          </motion.div>

          {/* Donation badge — only for "ano" */}
          {book.donation && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.25, type: "spring", stiffness: 70 }}
              className="mt-5 rounded-2xl px-5 py-5"
              style={{
                background: `linear-gradient(135deg, ${book.palette.accent}26, ${book.palette.to}1f)`,
                border: `1px solid ${book.palette.accent}66`,
              }}
            >
              <p
                className="text-[11px] uppercase tracking-[0.22em] mb-2"
                style={{ color: book.palette.accent }}
              >
                Compra solidaria
              </p>
              <p
                className="font-serif text-xl leading-snug"
                style={{ color: book.palette.ink }}
              >
                {book.donation.line}
              </p>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: `${book.palette.ink}cc` }}>
                {book.donation.detail}
              </p>
            </motion.div>
          )}

          {/* CTAs */}
          <motion.div
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <a
              href={book.cta.buyHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium transition-transform hover:scale-[1.02]"
              style={{ background: book.palette.accent, color: book.palette.from }}
            >
              {book.donation ? "Llevarme el mío (y donar uno) →" : "Quiero leerlo →"}
            </a>
            <a
              href={book.cta.talkHref}
              className="inline-flex items-center gap-2 rounded-full border px-6 py-3 font-medium transition-colors"
              style={{
                borderColor: `${book.palette.ink}33`,
                color: book.palette.ink,
              }}
            >
              Conversar con el autor
            </a>
            <button
              onClick={onRestart}
              className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm transition-colors"
              style={{ color: `${book.palette.ink}99` }}
            >
              Probar otra vez
            </button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.55 }}
            className="mt-12 text-xs uppercase tracking-[0.18em]"
            style={{ color: `${book.palette.ink}66` }}
          >
            Miguel Fuentes · San José, Costa Rica · Pura vida
          </motion.p>
        </div>
      </div>
    </motion.section>
  );
}
