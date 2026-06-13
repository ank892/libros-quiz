"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BOOKS, QUESTIONS, scoreAnswers, type BookId } from "@/lib/books";
import BookCover from "@/components/BookCover";

type Stage = "hero" | "quiz" | "result";

const TOTAL_TIME_HINT = "Menos de 3 minutos";

export default function Home() {
  const [stage, setStage] = useState<Stage>("hero");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [startedAt, setStartedAt] = useState<number | null>(null);

  // Soft escape hatch: hash routing for direct result preview (?b=ano)
  useEffect(() => {
    const url = new URL(window.location.href);
    const b = url.searchParams.get("b") as BookId | null;
    if (b && b in BOOKS) {
      setAnswers([0, 0, 0, 0, 0]);
      setStage("result");
      // override winner via state encoded in url for testing
      (window as unknown as { __forcedWinner?: BookId }).__forcedWinner = b;
    }
  }, []);

  const result = useMemo(() => {
    const forced = (typeof window !== "undefined" &&
      (window as unknown as { __forcedWinner?: BookId }).__forcedWinner) as
      | BookId
      | undefined;
    if (forced) return { winner: forced, scores: { ano: 0, sofia: 0, ellos: 0, ellas: 0 } };
    return scoreAnswers(answers);
  }, [answers]);

  const onChoose = (optionIdx: number) => {
    const next = [...answers, optionIdx];
    setAnswers(next);
    if (step + 1 >= QUESTIONS.length) {
      setStage("result");
    } else {
      setStep(step + 1);
    }
  };

  const restart = () => {
    setAnswers([]);
    setStep(0);
    setStage("hero");
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
        {stage === "hero" && (
          <Hero key="hero" onBegin={beginQuiz} />
        )}
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
        {stage === "result" && (
          <Result
            key="result"
            bookId={result.winner}
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
      className="relative w-full max-w-3xl px-6 py-16 sm:py-24 text-center"
    >
      {/* ambient gradient */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 30%, rgba(244,196,122,0.18), rgba(0,0,0,0) 70%), radial-gradient(50% 40% at 80% 80%, rgba(255,140,90,0.14), rgba(0,0,0,0) 70%), radial-gradient(40% 40% at 20% 80%, rgba(91,140,255,0.12), rgba(0,0,0,0) 70%)",
        }}
      />

      <motion.span
        initial={{ y: 8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="pill mx-auto"
      >
        <span aria-hidden>✦</span> Cuatro libros · Una respuesta
      </motion.span>

      <motion.h1
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="font-serif mt-8 text-4xl sm:text-6xl leading-[1.05] tracking-tight"
      >
        Hay un libro
        <br />
        <span
          className="bg-clip-text text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #f4c47a 0%, #ff8c5a 50%, #f59ec0 100%)",
          }}
        >
          que te está esperando
        </span>
        .
      </motion.h1>

      <motion.p
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.7 }}
        className="mx-auto mt-6 max-w-xl text-base sm:text-lg text-foreground/80"
      >
        Cinco preguntas honestas. Sin email, sin trampa, sin algoritmo que te
        siga después. Solo vos, este momento de tu vida y la voz que te
        corresponde leer hoy.
      </motion.p>

      <motion.div
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.7 }}
        className="mt-10 flex flex-col items-center gap-4"
      >
        <button
          onClick={onBegin}
          className="group relative inline-flex items-center gap-3 rounded-full bg-foreground px-8 py-4 text-background font-medium text-base sm:text-lg transition-transform hover:scale-[1.02]"
        >
          <span>Empezar</span>
          <span
            aria-hidden
            className="inline-block transition-transform group-hover:translate-x-1"
          >
            →
          </span>
        </button>
        <p className="text-xs uppercase tracking-[0.18em] text-foreground/50">
          {TOTAL_TIME_HINT}
        </p>
      </motion.div>

      {/* Floating mini covers */}
      <div className="mt-16 flex justify-center gap-3 sm:gap-5">
        {(Object.keys(BOOKS) as BookId[]).map((id, i) => (
          <motion.div
            key={id}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 0.85 }}
            transition={{ delay: 0.7 + i * 0.1, type: "spring" }}
            className="w-16 sm:w-20"
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
      className="relative w-full max-w-2xl px-6 py-12"
    >
      {/* progress */}
      <div className="mb-10 flex items-center gap-4">
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

      <div className="mt-8 grid gap-3">
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

/* ---------------- RESULT ---------------- */

function Result({
  bookId,
  elapsedMs,
  onRestart,
}: {
  bookId: BookId;
  elapsedMs: number;
  onRestart: () => void;
}) {
  const book = BOOKS[bookId];
  const seconds = Math.max(15, Math.round(elapsedMs / 1000));
  const mm = Math.floor(seconds / 60);
  const ss = seconds % 60;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `radial-gradient(60% 50% at 30% 20%, ${book.palette.via}66, transparent 70%), radial-gradient(60% 50% at 80% 90%, ${book.palette.to}55, transparent 70%), linear-gradient(180deg, ${book.palette.from} 0%, #050308 100%)`,
        color: book.palette.ink,
      }}
    >
      <div className="w-full max-w-5xl px-6 py-16 grid md:grid-cols-[auto_1fr] gap-10 md:gap-14 items-center">
        <motion.div
          initial={{ scale: 0.85, opacity: 0, rotate: -3 }}
          animate={{ scale: 1, opacity: 1, rotate: -2 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 80 }}
          className="mx-auto md:mx-0 w-44 sm:w-56"
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
            ✦ Tu libro · {mm > 0 ? `${mm}m ${ss}s` : `${ss}s`}
          </motion.p>

          <motion.h1
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="font-serif mt-5 text-4xl sm:text-5xl leading-[1.05] tracking-tight"
          >
            {book.title}
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

          <motion.blockquote
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-7 border-l-2 pl-5 font-serif text-lg sm:text-xl leading-relaxed"
            style={{ borderColor: book.palette.accent, color: book.palette.ink }}
          >
            {book.excerpt}
            <footer
              className="mt-2 text-xs uppercase tracking-[0.18em] not-italic"
              style={{ color: `${book.palette.accent}` }}
            >
              {book.excerptCaption}
            </footer>
          </motion.blockquote>

          <motion.p
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-7 text-base sm:text-lg leading-relaxed"
            style={{ color: `${book.palette.ink}d9` }}
          >
            {book.why}
          </motion.p>

          <motion.div
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.15 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <a
              href={book.cta.buyHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium transition-transform hover:scale-[1.02]"
              style={{
                background: book.palette.accent,
                color: book.palette.from,
              }}
            >
              Quiero leerlo →
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
            transition={{ delay: 1.4 }}
            className="mt-10 text-xs uppercase tracking-[0.18em]"
            style={{ color: `${book.palette.ink}66` }}
          >
            Miguel Fuentes · Costa Rica
          </motion.p>
        </div>
      </div>
    </motion.section>
  );
}
