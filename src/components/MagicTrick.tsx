import { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "../hooks/useInView";
import { SectionHeader } from "./shared/SectionHeader";

type Suit = "♠" | "♥" | "♦" | "♣";
type Card = { rank: string; suit: Suit; color: "red" | "dark" };

type Phase =
  | "idle" //  hidden
  | "dealing" // 3 cards cascade in from above
  | "waiting" // user is thinking, cards wait
  | "revealing-pick" // user clicked; chosen card lifts + flips
  | "paused" // picked card settled, prompting to reveal the others
  | "revealing-rest" // other 2 cards flip
  | "done"; // all three shown, offer replay

/* The forced reveal — rotated per play. Each entry picks a card that will
 * appear on BOTH the user's chosen slot and the other two when they flip.
 * The trick: "no matter which card you choose, it's always the same card." */
const FORCED_CARDS: Card[] = [
  { rank: "A", suit: "♠", color: "dark" },
  { rank: "Q", suit: "♥", color: "red" },
  { rank: "K", suit: "♦", color: "red" },
  { rank: "J", suit: "♣", color: "dark" },
];

const SLOT_IDS = [0, 1, 2] as const;

export function MagicTrick() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.25 });
  const [phase, setPhase] = useState<Phase>("idle");
  const [picked, setPicked] = useState<number | null>(null);
  const [round, setRound] = useState(0);
  const startedRef = useRef(false);
  const timers = useRef<number[]>([]);

  const schedule = useCallback((fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms);
    timers.current.push(id);
    return id;
  }, []);
  const clearTimers = useCallback(() => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  }, []);
  useEffect(() => () => clearTimers(), [clearTimers]);

  useEffect(() => {
    if (!inView || startedRef.current) return;
    startedRef.current = true;
    schedule(() => setPhase("dealing"), 400);
    schedule(() => setPhase("waiting"), 1800);
  }, [inView, schedule]);

  const card = FORCED_CARDS[round % FORCED_CARDS.length];

  const handlePick = (slot: number) => {
    if (phase !== "waiting") return;
    setPicked(slot);
    setPhase("revealing-pick");
    schedule(() => setPhase("paused"), 1200);
  };

  const revealAll = () => {
    if (phase !== "paused") return;
    setPhase("revealing-rest");
    schedule(() => setPhase("done"), 1400);
  };

  const reset = () => {
    clearTimers();
    setPicked(null);
    setRound((n) => n + 1);
    setPhase("dealing");
    schedule(() => setPhase("waiting"), 1400);
  };

  return (
    <section
      ref={ref}
      id="magic-trick"
      className={`trick-reveal relative overflow-hidden bg-ink-950 pt-6 pb-12 sm:pt-8 sm:pb-14 md:pt-10 md:pb-16 lg:pt-12 lg:pb-20 ${
        inView ? "in-view" : ""
      }`}
    >
      {/* Stage lighting */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 55% 45% at 50% 55%, rgba(60,100,200,0.2) 0%, rgba(30,55,130,0.08) 42%, rgba(10,16,34,0) 72%)",
        }}
      />
      {/* Subtle vignette so the stage reads as a lit area */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at center, transparent 55%, rgba(5,7,12,0.55) 100%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1680px] px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10">
        <SectionHeader
          align="center"
          maxWidth="xl"
          eyebrow="A Small Illusion"
          headline={
            <>
              Three cards.{" "}
              <span className="italic text-silver-dim">One truth.</span>
            </>
          }
          sub="Pick any card. We've already chosen it for you."
        />

        {/* The stage */}
        <div className="trick-stage relative mx-auto mt-14 flex min-h-75 w-full max-w-xl items-end justify-center sm:min-h-85 md:mt-18 md:min-h-95 lg:min-h-105">
          {/* Floor glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-10 bottom-0 h-20 opacity-70"
            style={{
              backgroundImage:
                "radial-gradient(ellipse at 50% 100%, rgba(138,160,255,0.22) 0%, transparent 70%)",
            }}
          />

          {SLOT_IDS.map((slot) => (
            <TrickCard
              key={`${round}-${slot}`}
              slot={slot}
              card={card}
              phase={phase}
              picked={picked}
              onPick={() => handlePick(slot)}
            />
          ))}

          {/* Sparkles over the chosen card during reveal */}
          {(phase === "revealing-pick" || phase === "paused") && picked !== null && (
            <Sparkles slot={picked} />
          )}
        </div>

        {/* Prompt + controls */}
        <div className="relative mx-auto mt-10 flex min-h-20 max-w-xl flex-col items-center justify-start gap-4 text-center sm:mt-12">
          <PromptCopy phase={phase} card={card} />

          {phase === "paused" && (
            <button
              type="button"
              onClick={revealAll}
              className="trick-cta group inline-flex items-center gap-2 rounded-full border border-accent/50 bg-[rgba(138,160,255,0.08)] px-6 py-2.5 text-[11px] font-medium tracking-[0.22em] text-silver uppercase shadow-[0_8px_24px_rgba(138,160,255,0.2)] backdrop-blur-md transition-all duration-300 hover:border-accent hover:bg-[rgba(138,160,255,0.14)] hover:shadow-[0_12px_30px_rgba(138,160,255,0.3)] sm:text-[12px]"
            >
              Flip the others
              <ChevronRight />
            </button>
          )}

          {phase === "done" && (
            <button
              type="button"
              onClick={reset}
              className="trick-replay group inline-flex items-center gap-2 rounded-full border border-line bg-ink-900/70 px-5 py-2.5 text-[11px] font-medium tracking-[0.22em] text-silver-dim uppercase backdrop-blur-md transition-all duration-300 hover:border-accent/50 hover:text-silver sm:text-[12px]"
            >
              <RefreshIcon />
              Again
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

/* === The individual card === */
function TrickCard({
  slot,
  card,
  phase,
  picked,
  onPick,
}: {
  slot: number;
  card: Card;
  phase: Phase;
  picked: number | null;
  onPick: () => void;
}) {
  const isHidden = phase === "idle";
  const isDealing = phase === "dealing";
  const canPick = phase === "waiting";
  const isPicked = picked === slot;

  // Reveal timing per card
  const isRevealed =
    (isPicked && (phase === "revealing-pick" || phase === "paused" || phase === "revealing-rest" || phase === "done")) ||
    (!isPicked && (phase === "revealing-rest" || phase === "done"));

  // Rotation for fan feel (idle state only). Horizontal offset is driven
  // by CSS variables set via `data-slot` so it responds to breakpoints
  // without needing `window.innerWidth` on render.
  const idleRotate = slot === 0 ? -6 : slot === 2 ? 6 : 0;

  // Transform states
  const translateX = isPicked
    ? "0rem"
    : "var(--card-x)";
  const translateY = isHidden
    ? "-30rem"
    : isPicked
      ? "-2.5rem"
      : "0rem";
  const scale = isPicked ? "1.08" : "1";
  const rotate =
    phase === "waiting" || phase === "revealing-pick" || phase === "paused" || phase === "revealing-rest" || phase === "done"
      ? isPicked
        ? "0deg"
        : phase === "revealing-rest" || phase === "done"
          ? "0deg"
          : `${idleRotate}deg`
      : `${idleRotate * 2}deg`;

  const dealDelay = isDealing ? slot * 160 : 0;

  return (
    <button
      type="button"
      onClick={onPick}
      disabled={!canPick}
      data-slot={slot}
      aria-label={canPick ? `Pick card ${slot + 1}` : undefined}
      className={`trick-card group absolute bottom-4 h-56 w-40 rounded-xl transition-all duration-700 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:h-64 sm:w-44 md:h-72 md:w-52 lg:h-80 lg:w-60 ${
        canPick ? "cursor-pointer hover:-translate-y-3" : "cursor-default"
      } ${isPicked ? "z-20" : "z-10"}`}
      style={{
        transform: `translateX(${translateX}) translateY(${translateY}) scale(${scale}) rotate(${rotate})`,
        transitionDelay: isDealing ? `${dealDelay}ms` : "0ms",
        opacity: isHidden ? 0 : 1,
      }}
    >
      <div
        className={`card-flipper relative h-full w-full rounded-xl transition-transform duration-900 transform-3d ${
          isRevealed ? "transform-[rotateY(180deg)]" : ""
        }`}
        style={{
          transitionDelay: !isPicked && phase === "revealing-rest" ? `${slot * 90}ms` : "0ms",
        }}
      >
        {/* Back */}
        <div className="absolute inset-0 overflow-hidden rounded-xl border border-silver-dim/25 bg-linear-to-br from-ink-800 via-ink-900 to-[#0b1030] shadow-[0_18px_40px_rgba(0,0,0,0.55)] backface-hidden">
          <CardBack />
          {/* Hover glow */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              backgroundImage:
                "radial-gradient(ellipse at center, rgba(138,160,255,0.3) 0%, transparent 70%)",
            }}
          />
        </div>

        {/* Face */}
        <div
          className={`absolute inset-0 overflow-hidden rounded-xl border bg-linear-to-br from-white to-[#f3f3ee] transform-[rotateY(180deg)] backface-hidden ${
            isPicked
              ? "border-accent/70 shadow-[0_25px_60px_rgba(138,160,255,0.5)]"
              : "border-silver/50 shadow-[0_18px_40px_rgba(138,160,255,0.25)]"
          }`}
        >
          <CardFace card={card} />
        </div>
      </div>
    </button>
  );
}

/* === Card back design === */
function CardBack() {
  return (
    <svg viewBox="0 0 140 200" className="absolute inset-0 h-full w-full" aria-hidden>
      <defs>
        <pattern id="back-dots" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="4" cy="4" r="0.4" fill="rgba(138,160,255,0.4)" />
        </pattern>
        <linearGradient id="back-sheen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.03)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0)" />
          <stop offset="100%" stopColor="rgba(138,160,255,0.08)" />
        </linearGradient>
      </defs>
      <rect width="140" height="200" fill="url(#back-dots)" />
      <rect width="140" height="200" fill="url(#back-sheen)" />
      {/* Double border */}
      <rect x="7" y="7" width="126" height="186" fill="none" stroke="rgba(184,186,196,0.3)" strokeWidth="0.6" rx="4" />
      <rect x="11" y="11" width="118" height="178" fill="none" stroke="rgba(138,160,255,0.3)" strokeWidth="0.4" rx="2" />
      {/* Center ornament */}
      <g transform="translate(70 100)">
        <path d="M0 -48 L34 0 L0 48 L-34 0 Z" fill="none" stroke="rgba(184,186,196,0.4)" strokeWidth="0.7" />
        <path d="M0 -32 L22 0 L0 32 L-22 0 Z" fill="none" stroke="rgba(138,160,255,0.45)" strokeWidth="0.5" />
        <path d="M0 -18 L13 0 L0 18 L-13 0 Z" fill="none" stroke="rgba(184,186,196,0.3)" strokeWidth="0.35" />
        <circle cx="0" cy="0" r="5" fill="rgba(138,160,255,0.18)" stroke="rgba(184,186,196,0.6)" strokeWidth="0.4" />
        <text
          x="0"
          y="3"
          textAnchor="middle"
          fontFamily="'Playfair Display', serif"
          fontSize="6"
          fontStyle="italic"
          fill="rgba(232,232,236,0.75)"
        >
          A
        </text>
      </g>
      {/* Corner markers */}
      {[
        [16, 20],
        [124, 20],
        [16, 180],
        [124, 180],
      ].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <circle r="1" fill="rgba(138,160,255,0.45)" />
          <circle r="2.5" fill="none" stroke="rgba(184,186,196,0.25)" strokeWidth="0.3" />
        </g>
      ))}
    </svg>
  );
}

/* === Card face: classic playing-card style === */
function CardFace({ card }: { card: Card }) {
  const color = card.color === "red" ? "#c22" : "#0a0e1a";
  return (
    <svg viewBox="0 0 140 200" className="absolute inset-0 h-full w-full" aria-hidden>
      {/* Corner rank + suit (top-left) */}
      <g fill={color}>
        <text
          x="12"
          y="26"
          fontFamily="'Playfair Display', serif"
          fontSize="22"
          fontWeight="700"
        >
          {card.rank}
        </text>
        <text x="12" y="42" fontSize="14">
          {card.suit}
        </text>
      </g>

      {/* Big centered suit */}
      <g transform="translate(70 100)" fill={color}>
        <text
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="76"
        >
          {card.suit}
        </text>
      </g>

      {/* Corner rank + suit (bottom-right, rotated) */}
      <g fill={color} transform="rotate(180 70 100)">
        <text
          x="12"
          y="26"
          fontFamily="'Playfair Display', serif"
          fontSize="22"
          fontWeight="700"
        >
          {card.rank}
        </text>
        <text x="12" y="42" fontSize="14">
          {card.suit}
        </text>
      </g>

      {/* Subtle AZAM wordmark along bottom */}
      <text
        x="70"
        y="188"
        textAnchor="middle"
        fontFamily="'Playfair Display', serif"
        fontSize="6"
        letterSpacing="2.2"
        fill="rgba(10,14,26,0.4)"
      >
        AZAM
      </text>
    </svg>
  );
}

/* === Prompt copy per phase === */
function PromptCopy({ phase, card }: { phase: Phase; card: Card }) {
  if (phase === "idle" || phase === "dealing") return null;
  if (phase === "waiting")
    return (
      <p className="trick-prompt font-display text-lg italic text-silver-dim sm:text-xl">
        Choose one.
      </p>
    );
  if (phase === "revealing-pick")
    return (
      <p className="trick-prompt text-[12px] tracking-[0.22em] text-muted uppercase sm:text-[13px]">
        Watching…
      </p>
    );
  if (phase === "paused")
    return (
      <div className="flex flex-col items-center gap-1">
        <p className="trick-result font-display text-xl leading-tight text-silver sm:text-2xl md:text-3xl">
          Your card:{" "}
          <span
            className="font-serif font-bold"
            style={{ color: card.color === "red" ? "#ff6b6b" : undefined }}
          >
            {card.rank} {card.suit}
          </span>
        </p>
        <p className="text-[12px] tracking-[0.22em] text-muted uppercase sm:text-[13px]">
          Want to see something stranger?
        </p>
      </div>
    );
  if (phase === "revealing-rest")
    return (
      <p className="trick-prompt text-[12px] tracking-[0.22em] text-muted uppercase sm:text-[13px]">
        Watching…
      </p>
    );
  if (phase === "done")
    return (
      <div className="flex flex-col items-center gap-1">
        <p className="trick-result font-display text-xl leading-tight text-silver sm:text-2xl md:text-3xl">
          There is only{" "}
          <span className="italic text-silver-dim">one card.</span>
        </p>
        <p className="text-[12px] tracking-[0.22em] text-muted uppercase sm:text-[13px]">
          And it was always yours.
        </p>
      </div>
    );
  return null;
}

/* === Sparkles over picked card === */
function Sparkles({ slot }: { slot: number }) {
  const positions = ["25%", "50%", "75%"];
  const left = positions[slot] ?? "50%";
  const stars = [
    { x: "-18%", y: "20%", size: 10, delay: 60 },
    { x: "115%", y: "25%", size: 14, delay: 180 },
    { x: "-12%", y: "60%", size: 8, delay: 320 },
    { x: "118%", y: "65%", size: 11, delay: 90 },
    { x: "40%", y: "-10%", size: 7, delay: 250 },
    { x: "60%", y: "95%", size: 9, delay: 380 },
  ];
  return (
    <div
      className="pointer-events-none absolute top-1/2 z-30 h-56 w-40 -translate-x-1/2 -translate-y-1/2 sm:h-64 sm:w-44 md:h-72 md:w-52 lg:h-80 lg:w-60"
      style={{ left }}
      aria-hidden
    >
      {stars.map((s, i) => (
        <span
          key={i}
          className="trick-sparkle absolute block"
          style={{
            left: s.x,
            top: s.y,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}ms`,
          }}
        >
          <svg viewBox="0 0 20 20" className="h-full w-full">
            <path
              d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z"
              fill="rgba(220,225,240,0.95)"
            />
          </svg>
        </span>
      ))}
    </div>
  );
}

/* === Icon components === */
function ChevronRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
      aria-hidden
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-rotate-180"
      aria-hidden
    >
      <path d="M3 12a9 9 0 0 1 15.5-6.3L21 8" />
      <path d="M21 3v5h-5" />
    </svg>
  );
}
