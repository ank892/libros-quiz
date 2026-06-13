import type { Book } from "@/lib/books";

/**
 * A purely typographic, gradient book cover.
 * Avoids needing image assets and looks elegant at all sizes.
 */
export default function BookCover({
  book,
  small = false,
}: {
  book: Book;
  small?: boolean;
}) {
  const titleSize = small ? "text-[10px] leading-tight" : "text-base leading-tight";
  const authorSize = small ? "text-[7px]" : "text-[10px]";
  return (
    <div
      className="relative aspect-[2/3] w-full overflow-hidden rounded-[6px] shadow-[0_18px_40px_-12px_rgba(0,0,0,0.6)]"
      style={{
        background: `linear-gradient(160deg, ${book.palette.from} 0%, ${book.palette.via} 55%, ${book.palette.to} 100%)`,
        color: book.palette.ink,
      }}
    >
      {/* spine highlight */}
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 w-[6%]"
        style={{
          background: `linear-gradient(90deg, rgba(0,0,0,0.35), rgba(0,0,0,0))`,
        }}
      />

      {/* motif accent */}
      <Motif motif={book.motif} accent={book.palette.accent} />

      <div className="relative h-full flex flex-col justify-between p-3 sm:p-4">
        <div
          className={`${authorSize} uppercase tracking-[0.22em] opacity-80`}
        >
          Miguel Fuentes
        </div>
        <div>
          <div
            className={`${titleSize} font-serif font-semibold`}
            style={{ color: book.palette.ink }}
          >
            {book.title}
          </div>
          <div
            aria-hidden
            className="mt-2 h-[1px] w-8"
            style={{ background: book.palette.accent }}
          />
        </div>
      </div>
    </div>
  );
}

function Motif({ motif, accent }: { motif: string; accent: string }) {
  // Each motif is a tiny abstract SVG suggesting the book's mood.
  if (motif === "amanecer") {
    return (
      <svg
        aria-hidden
        viewBox="0 0 100 150"
        className="absolute inset-0 h-full w-full opacity-70"
      >
        <circle cx="50" cy="78" r="26" fill={accent} fillOpacity="0.55" />
        <line x1="0" y1="98" x2="100" y2="98" stroke={accent} strokeOpacity="0.45" />
        <line x1="0" y1="103" x2="100" y2="103" stroke={accent} strokeOpacity="0.25" />
      </svg>
    );
  }
  if (motif === "arcoiris") {
    return (
      <svg
        aria-hidden
        viewBox="0 0 100 150"
        className="absolute inset-0 h-full w-full opacity-80"
      >
        <path d="M10 110 Q50 50 90 110" stroke={accent} strokeWidth="3" fill="none" strokeOpacity="0.7" />
        <path d="M18 110 Q50 62 82 110" stroke="#ffffff" strokeWidth="2" fill="none" strokeOpacity="0.4" />
        <path d="M26 110 Q50 74 74 110" stroke={accent} strokeWidth="1.5" fill="none" strokeOpacity="0.35" />
        <circle cx="20" cy="40" r="2" fill="#ffffff" fillOpacity="0.7" />
        <circle cx="80" cy="32" r="1.5" fill="#ffffff" fillOpacity="0.6" />
      </svg>
    );
  }
  if (motif === "bodega") {
    return (
      <svg
        aria-hidden
        viewBox="0 0 100 150"
        className="absolute inset-0 h-full w-full opacity-60"
      >
        <rect x="34" y="50" width="32" height="46" rx="2" fill="none" stroke={accent} strokeOpacity="0.7" strokeWidth="1.5" />
        <line x1="34" y1="68" x2="66" y2="68" stroke={accent} strokeOpacity="0.5" />
        <circle cx="60" cy="78" r="1.5" fill={accent} />
        <path d="M50 96 L50 110" stroke={accent} strokeOpacity="0.5" />
      </svg>
    );
  }
  // atardecer
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 150"
      className="absolute inset-0 h-full w-full opacity-70"
    >
      <circle cx="50" cy="92" r="22" fill={accent} fillOpacity="0.5" />
      <line x1="0" y1="106" x2="100" y2="106" stroke={accent} strokeOpacity="0.5" />
      <path d="M0 110 Q25 100 50 110 T100 110" stroke="#ffffff" strokeOpacity="0.18" fill="none" />
    </svg>
  );
}
