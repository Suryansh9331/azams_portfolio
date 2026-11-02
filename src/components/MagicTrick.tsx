import { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "../hooks/useInView";
import { SectionHeader } from "./shared/SectionHeader";

type Suit = "♠" | "♥" | "♦" | "♣";
type Rank = "A" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K";

type Phase =
  | "idle" //              nothing shown yet
  | "intro" //             envelope sits, pickers hidden
  | "pickers" //           user selects suit, rank, position
  | "dealing" //           10 cards fly out of the envelope
  | "counting" //          counter counts 1..N with each card lifting
  | "revealing" //         chosen position's card flips to show user's card
  | "done"; //             match confirmed, replay button

const SUITS: { suit: Suit; color: "red" | "dark"; label: string }[] = [
  { suit: "♠", color: "dark", label: "Spades" },
  { suit: "♥", color: "red", label: "Hearts" },
  { suit: "♦", color: "red", label: "Diamonds" },
  { suit: "♣", color: "dark", label: "Clubs" },
];
const RANKS: Rank[] = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const POSITIONS = Array.from({ length: 10 }, (_, i) => i + 1);
const DECK_SIZE = 10;

export function MagicTrick() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.2 });
  const [phase, setPhase] = useState<Phase>("idle");
  const [suit, setSuit] = useState<Suit | null>(null);
  const [rank, setRank] = useState<Rank | null>(null);
  const [position, setPosition] = useState<number | null>(null);
  const [countAt, setCountAt] = useState(0);
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
    schedule(() => setPhase("intro"), 400);
    schedule(() => setPhase("pickers"), 1300);
  }, [inView, schedule]);

  const canReveal = suit !== null && rank !== null && position !== null;

  const handleReveal = () => {
    if (!canReveal || phase !== "pickers") return;
    setPhase("dealing");
    setCountAt(0);

    // Deal animation: 10 cards cascade out of the envelope
    schedule(() => setPhase("counting"), DECK_SIZE * 90 + 400);

    // Counter advances 1..position
    const COUNT_STEP = 320;
    for (let i = 1; i <= position!; i++) {
      schedule(() => setCountAt(i), DECK_SIZE * 90 + 400 + i * COUNT_STEP);
    }

    // Reveal at the chosen position
    schedule(
      () => setPhase("revealing"),
      DECK_SIZE * 90 + 400 + position! * COUNT_STEP + 400,
    );
    schedule(
      () => setPhase("done"),
      DECK_SIZE * 90 + 400 + position! * COUNT_STEP + 2200,
    );
  };

  const reset = () => {
    clearTimers();
    setSuit(null);
    setRank(null);
    setPosition(null);
    setCountAt(0);
    setPhase("pickers");
  };

  const chosenColor: "red" | "dark" =
    suit === "♥" || suit === "♦" ? "red" : "dark";

  return (
    <section
      ref={ref}
      id="magic-trick"
      className={`dealer-reveal relative overflow-hidden bg-ink-950 pt-6 pb-12 sm:pt-8 sm:pb-14 md:pt-10 md:pb-16 lg:pt-12 lg:pb-20 ${
        inView ? "in-view" : ""
      }`}
    >
      {/* Themed backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 55% 50% at 50% 55%, rgba(60,100,200,0.2) 0%, rgba(30,55,130,0.08) 42%, rgba(10,16,34,0) 72%)",
        }}
      />
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
          maxWidth="2xl"
          eyebrow="A Small Illusion"
          headline={
            <>
              Any card.{" "}
              <span className="italic text-silver-dim">Any number.</span>
            </>
          }
          sub="Name a suit, a rank, and a position. We'll deal to it."
        />

        {/* The envelope + deal row */}
        <div className="relative mx-auto mt-10 flex min-h-80 w-full max-w-3xl flex-col items-center sm:mt-12 md:min-h-90">
          <Envelope opening={phase === "dealing" || phase === "counting" || phase === "revealing" || phase === "done"} />

          {(phase === "dealing" || phase === "counting" || phase === "revealing" || phase === "done") && (
            <DealRow
              count={countAt}
              position={position!}
              suit={suit!}
              rank={rank!}
              color={chosenColor}
              phase={phase}
            />
          )}
        </div>

        {/* Pickers */}
        {phase === "pickers" && (
          <div className="dealer-pickers mx-auto mt-10 flex max-w-3xl flex-col gap-6 sm:mt-12 sm:gap-7">
            <SuitPicker value={suit} onChange={setSuit} />
            <RankPicker value={rank} onChange={setRank} />
            <PositionPicker value={position} onChange={setPosition} />

            {/* Reveal CTA */}
            <div className="mt-2 flex items-center justify-center">
              <button
                type="button"
                onClick={handleReveal}
                disabled={!canReveal}
                className={`dealer-cta group inline-flex items-center gap-2 rounded-full border px-6 py-2.5 text-[11px] font-medium tracking-[0.22em] uppercase backdrop-blur-md transition-all duration-300 sm:text-[12px] ${
                  canReveal
                    ? "border-accent/60 bg-[rgba(138,160,255,0.12)] text-silver shadow-[0_10px_28px_rgba(138,160,255,0.25)] hover:border-accent hover:bg-[rgba(138,160,255,0.2)] hover:shadow-[0_14px_34px_rgba(138,160,255,0.35)]"
                    : "cursor-not-allowed border-line bg-ink-900/70 text-muted"
                }`}
              >
                {canReveal ? "Deal" : "Pick all three"}
                <ChevronRight />
              </button>
            </div>
          </div>
        )}

        {/* Reveal copy + replay */}
        <div className="relative mx-auto mt-6 flex min-h-16 max-w-xl flex-col items-center gap-4 text-center">
          <CountingLabel countAt={countAt} position={position} phase={phase} />

          {phase === "done" && (
            <>
              <p className="dealer-result font-display text-xl leading-tight text-silver sm:text-2xl">
                {rank} {suit} at position {position}.{" "}
                <span className="italic text-silver-dim">Exactly as called.</span>
              </p>
              <button
                type="button"
                onClick={reset}
                className="dealer-replay group inline-flex items-center gap-2 rounded-full border border-line bg-ink-900/70 px-5 py-2.5 text-[11px] font-medium tracking-[0.22em] text-silver-dim uppercase backdrop-blur-md transition-all duration-300 hover:border-accent/50 hover:text-silver sm:text-[12px]"
              >
                <RefreshIcon />
                Call another
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

/* === Envelope component === */
function Envelope({ opening }: { opening: boolean }) {
  return (
    <div
      className={`envelope relative h-32 w-48 shrink-0 sm:h-40 sm:w-60 md:h-44 md:w-72 ${
        opening ? "is-opening" : ""
      }`}
      aria-hidden
    >
      <svg viewBox="0 0 240 160" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="env-body" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a2140" />
            <stop offset="100%" stopColor="#0a0e1a" />
          </linearGradient>
          <linearGradient id="env-flap" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#141a2e" />
            <stop offset="100%" stopColor="#1a2140" />
          </linearGradient>
          <radialGradient id="wax-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#d94848" />
            <stop offset="60%" stopColor="#8a2020" />
            <stop offset="100%" stopColor="#4a0808" />
          </radialGradient>
        </defs>

        {/* Envelope body */}
        <rect
          x="4"
          y="30"
          width="232"
          height="124"
          rx="4"
          fill="url(#env-body)"
          stroke="rgba(184,186,196,0.3)"
          strokeWidth="0.6"
        />

        {/* Flap (triangle) */}
        <g className="envelope-flap">
          <polygon
            points="4,30 236,30 120,110"
            fill="url(#env-flap)"
            stroke="rgba(184,186,196,0.35)"
            strokeWidth="0.6"
          />
          {/* Wax seal (center-bottom of flap) */}
          <g className="envelope-wax" transform="translate(120 92)">
            <circle r="14" fill="url(#wax-grad)" />
            <circle
              r="14"
              fill="none"
              stroke="rgba(0,0,0,0.4)"
              strokeWidth="1"
            />
            <text
              textAnchor="middle"
              y="4"
              fontFamily="'Playfair Display', serif"
              fontSize="12"
              fontStyle="italic"
              fontWeight="700"
              fill="rgba(255,230,220,0.75)"
            >
              A
            </text>
          </g>
        </g>

        {/* Decorative corners on body */}
        {[
          [16, 44],
          [224, 44],
          [16, 140],
          [224, 140],
        ].map(([x, y], i) => (
          <g key={i} transform={`translate(${x} ${y})`}>
            <circle r="1.5" fill="rgba(138,160,255,0.5)" />
            <circle r="4" fill="none" stroke="rgba(184,186,196,0.2)" strokeWidth="0.3" />
          </g>
        ))}
      </svg>
    </div>
  );
}

/* === DealRow: 10 cards slide out of the envelope === */
function DealRow({
  count,
  position,
  suit,
  rank,
  color,
  phase,
}: {
  count: number;
  position: number;
  suit: Suit;
  rank: Rank;
  color: "red" | "dark";
  phase: Phase;
}) {
  return (
    <div className="dealer-row mt-8 grid w-full grid-cols-5 gap-2 sm:grid-cols-10 sm:gap-3">
      {POSITIONS.map((i) => {
        const isCurrent = count === i && (phase === "counting" || phase === "revealing" || phase === "done");
        const isChosen = i === position;
        const shouldReveal = isChosen && (phase === "revealing" || phase === "done");

        return (
          <div
            key={i}
            className={`dealer-slot relative flex aspect-7/10 items-center justify-center transition-transform duration-300 ${
              isCurrent ? "scale-110 -translate-y-2" : ""
            }`}
            style={{ animationDelay: `${i * 90}ms` }}
          >
            <div
              className={`relative h-full w-full rounded-md transition-transform duration-700 transform-3d ${
                shouldReveal ? "transform-[rotateY(180deg)]" : ""
              }`}
            >
              {/* Back */}
              <div
                className={`absolute inset-0 overflow-hidden rounded-md border bg-linear-to-br from-ink-800 via-ink-900 to-[#0b1030] backface-hidden ${
                  isCurrent ? "border-accent/70 shadow-[0_8px_20px_rgba(138,160,255,0.5)]" : "border-silver-dim/25"
                }`}
              >
                <MiniCardBack />
              </div>
              {/* Face */}
              <div
                className={`absolute inset-0 overflow-hidden rounded-md border bg-linear-to-br from-white to-[#f3f3ee] transform-[rotateY(180deg)] backface-hidden ${
                  shouldReveal
                    ? "border-accent shadow-[0_18px_40px_rgba(138,160,255,0.6)]"
                    : "border-silver/40"
                }`}
              >
                <MiniCardFace rank={rank} suit={suit} color={color} />
              </div>
            </div>
            {/* Position number below */}
            <span
              className={`absolute -bottom-5 text-[9px] font-medium tracking-[0.22em] uppercase transition-colors sm:text-[10px] ${
                isCurrent
                  ? "text-accent"
                  : isChosen && (phase === "revealing" || phase === "done")
                    ? "text-silver"
                    : "text-muted"
              }`}
            >
              {i}
            </span>
          </div>
        );
      })}

      {/* Sparkles on chosen card */}
      {(phase === "revealing" || phase === "done") && (
        <Sparkles position={position} />
      )}
    </div>
  );
}

/* === Picker UIs === */
function SuitPicker({
  value,
  onChange,
}: {
  value: Suit | null;
  onChange: (s: Suit) => void;
}) {
  return (
    <div>
      <PickerLabel step="1" label="Suit" />
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {SUITS.map(({ suit, color, label }) => {
          const active = value === suit;
          return (
            <button
              key={suit}
              type="button"
              onClick={() => onChange(suit)}
              aria-label={label}
              className={`picker-btn flex flex-col items-center justify-center gap-1 rounded-lg border px-3 py-3 transition-all duration-300 sm:gap-2 sm:py-4 ${
                active
                  ? "border-accent/70 bg-[rgba(138,160,255,0.1)] shadow-[0_8px_20px_rgba(138,160,255,0.25)]"
                  : "border-line bg-ink-900/60 hover:border-silver-dim/50 hover:bg-ink-800/70"
              }`}
            >
              <span
                className={`text-2xl sm:text-3xl ${
                  color === "red" ? "text-[#ff6b6b]" : "text-silver"
                }`}
              >
                {suit}
              </span>
              <span className="text-[9px] font-medium tracking-[0.18em] text-silver-dim uppercase sm:text-[10px]">
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function RankPicker({
  value,
  onChange,
}: {
  value: Rank | null;
  onChange: (r: Rank) => void;
}) {
  return (
    <div>
      <PickerLabel step="2" label="Rank" />
      <div className="grid grid-cols-7 gap-1.5 sm:grid-cols-13 sm:gap-2">
        {RANKS.map((r) => {
          const active = value === r;
          return (
            <button
              key={r}
              type="button"
              onClick={() => onChange(r)}
              className={`picker-btn aspect-square rounded-md border font-serif font-semibold transition-all duration-300 ${
                active
                  ? "border-accent/70 bg-[rgba(138,160,255,0.1)] text-silver shadow-[0_6px_14px_rgba(138,160,255,0.3)]"
                  : "border-line bg-ink-900/60 text-silver-dim hover:border-silver-dim/50 hover:bg-ink-800/70 hover:text-silver"
              }`}
            >
              {r}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function PositionPicker({
  value,
  onChange,
}: {
  value: number | null;
  onChange: (n: number) => void;
}) {
  return (
    <div>
      <PickerLabel step="3" label="Position (1–10)" />
      <div className="grid grid-cols-5 gap-1.5 sm:grid-cols-10 sm:gap-2">
        {POSITIONS.map((n) => {
          const active = value === n;
          return (
            <button
              key={n}
              type="button"
              onClick={() => onChange(n)}
              className={`picker-btn font-numeric aspect-square rounded-md border font-medium transition-all duration-300 ${
                active
                  ? "border-accent/70 bg-[rgba(138,160,255,0.1)] text-silver shadow-[0_6px_14px_rgba(138,160,255,0.3)]"
                  : "border-line bg-ink-900/60 text-silver-dim hover:border-silver-dim/50 hover:bg-ink-800/70 hover:text-silver"
              }`}
            >
              {n}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function PickerLabel({ step, label }: { step: string; label: string }) {
  return (
    <div className="mb-2.5 flex items-center gap-3 sm:mb-3">
      <span className="font-numeric text-[11px] font-medium tracking-[0.26em] text-muted uppercase sm:text-[12px]">
        {step.padStart(2, "0")}
      </span>
      <span className="h-px flex-1 bg-line/60" />
      <span className="text-[11px] font-medium tracking-[0.22em] text-silver-dim uppercase sm:text-[12px]">
        {label}
      </span>
    </div>
  );
}

/* === Counting label === */
function CountingLabel({
  countAt,
  position,
  phase,
}: {
  countAt: number;
  position: number | null;
  phase: Phase;
}) {
  if (phase === "dealing")
    return (
      <p className="dealer-prompt text-[12px] tracking-[0.22em] text-muted uppercase sm:text-[13px]">
        Dealing
        <Dots />
      </p>
    );
  if (phase === "counting")
    return (
      <p className="dealer-prompt font-display text-xl text-silver-dim italic sm:text-2xl">
        Counting<span className="not-italic">: </span>
        <span className="font-numeric text-silver">{countAt}</span>
        <span className="text-muted"> / {position}</span>
      </p>
    );
  if (phase === "revealing")
    return (
      <p className="dealer-prompt text-[12px] tracking-[0.22em] text-muted uppercase sm:text-[13px]">
        Reading
        <Dots />
      </p>
    );
  return null;
}

function Dots() {
  return (
    <span className="ml-1 inline-flex gap-0.5">
      <span className="thinking-dot">.</span>
      <span className="thinking-dot">.</span>
      <span className="thinking-dot">.</span>
    </span>
  );
}

/* === Mini card art for the dealt row === */
function MiniCardBack() {
  return (
    <svg viewBox="0 0 70 100" className="absolute inset-0 h-full w-full" aria-hidden>
      <defs>
        <pattern id="mini-dots" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="0.3" fill="rgba(138,160,255,0.4)" />
        </pattern>
      </defs>
      <rect width="70" height="100" fill="url(#mini-dots)" />
      <rect x="4" y="4" width="62" height="92" fill="none" stroke="rgba(184,186,196,0.3)" strokeWidth="0.4" rx="2" />
      <g transform="translate(35 50)">
        <path d="M0 -20 L14 0 L0 20 L-14 0 Z" fill="none" stroke="rgba(138,160,255,0.5)" strokeWidth="0.4" />
        <circle r="2.5" fill="rgba(138,160,255,0.25)" />
      </g>
    </svg>
  );
}

function MiniCardFace({ rank, suit, color }: { rank: Rank; suit: Suit; color: "red" | "dark" }) {
  const fill = color === "red" ? "#c22" : "#0a0e1a";
  return (
    <svg viewBox="0 0 70 100" className="absolute inset-0 h-full w-full" aria-hidden>
      <g fill={fill}>
        <text x="6" y="16" fontFamily="'Playfair Display', serif" fontSize="12" fontWeight="700">
          {rank}
        </text>
        <text x="6" y="26" fontSize="8">
          {suit}
        </text>
      </g>
      <text
        x="35"
        y="60"
        textAnchor="middle"
        fontSize="34"
        fill={fill}
      >
        {suit}
      </text>
      <g fill={fill} transform="rotate(180 35 50)">
        <text x="6" y="16" fontFamily="'Playfair Display', serif" fontSize="12" fontWeight="700">
          {rank}
        </text>
        <text x="6" y="26" fontSize="8">
          {suit}
        </text>
      </g>
    </svg>
  );
}

/* === Sparkles === */
function Sparkles({ position }: { position: number }) {
  // position is 1-10; compute horizontal center of the column in the grid
  const col = ((position - 1) % 10) / 10;
  const left = `${col * 100 + 5}%`;
  const stars = [
    { dx: -20, dy: -10, size: 10, delay: 60 },
    { dx: 20, dy: -5, size: 14, delay: 180 },
    { dx: -15, dy: 20, size: 8, delay: 320 },
    { dx: 25, dy: 15, size: 11, delay: 90 },
    { dx: 0, dy: -25, size: 7, delay: 250 },
    { dx: 5, dy: 30, size: 9, delay: 380 },
  ];
  return (
    <div
      className="pointer-events-none absolute inset-y-0 z-30"
      style={{ left }}
      aria-hidden
    >
      {stars.map((s, i) => (
        <span
          key={i}
          className="dealer-sparkle absolute block"
          style={{
            left: `${s.dx}px`,
            top: `calc(50% + ${s.dy}px)`,
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

/* === Icons === */
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
