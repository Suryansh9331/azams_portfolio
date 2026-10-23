import { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "../hooks/useInView";

type Phase =
  | "idle"
  | "revealing-set-one" // cards fade in face up
  | "setup" // user is thinking of a card
  | "flipping" // cards flip face down
  | "shuffling" // cards swirl / shuffle to "read mind"
  | "removing" // cards converge / vanish
  | "revealing-set-two" // new 5 cards appear face up
  | "done";

type Card = {
  rank: string;
  suit: "♠" | "♥" | "♦" | "♣";
  color: "red" | "dark";
};

// SET ONE — the 6 cards the user picks mentally from.
const SET_ONE: Card[] = [
  { rank: "7", suit: "♠", color: "dark" },
  { rank: "Q", suit: "♥", color: "red" },
  { rank: "10", suit: "♦", color: "red" },
  { rank: "J", suit: "♣", color: "dark" },
  { rank: "K", suit: "♠", color: "dark" },
  { rank: "A", suit: "♥", color: "red" },
];

// SET TWO — the 5 "mind-read" cards. **None of these appear in SET ONE** —
// that is the magic: whichever card the user picked is guaranteed to be
// missing from the second set, so it looks like we removed theirs.
const SET_TWO: Card[] = [
  { rank: "9", suit: "♣", color: "dark" },
  { rank: "2", suit: "♥", color: "red" },
  { rank: "5", suit: "♦", color: "red" },
  { rank: "8", suit: "♠", color: "dark" },
  { rank: "3", suit: "♥", color: "red" },
];

export function MagicTrick() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.25 });
  const [phase, setPhase] = useState<Phase>("idle");
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

  // Start the setup phase as soon as the section enters the viewport.
  useEffect(() => {
    if (!inView || startedRef.current) return;
    startedRef.current = true;
    schedule(() => setPhase("revealing-set-one"), 300);
    schedule(() => setPhase("setup"), 1500);
  }, [inView, schedule]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const handleThinkingDone = () => {
    if (phase !== "setup") return;
    setPhase("flipping");
    schedule(() => setPhase("shuffling"), 900);
    schedule(() => setPhase("removing"), 3200);
    schedule(() => setPhase("revealing-set-two"), 3800);
    schedule(() => setPhase("done"), 5500);
  };

  const reset = () => {
    clearTimers();
    setPhase("revealing-set-one");
    schedule(() => setPhase("setup"), 1000);
  };

  return (
    <section
      ref={ref}
      id="magic-trick"
      className={`magic-reveal relative overflow-hidden bg-ink-950 py-20 sm:py-24 md:py-28 lg:py-32 ${
        inView ? "in-view" : ""
      }`}
    >
      {/* Stage backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 50% at 50% 55%, rgba(60,100,200,0.18) 0%, rgba(30,55,130,0.08) 40%, rgba(10,16,34,0) 72%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1680px] px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="magic-label text-[13px] font-medium tracking-[0.24em] text-muted uppercase sm:text-[14px] md:text-[15px] lg:text-[16px]">
            A Small Illusion
          </p>
          <div className="magic-rail mx-auto mt-3 h-px w-24 bg-line sm:w-32" />
          <h3 className="magic-headline mt-6 font-display text-3xl leading-[1.1] font-normal text-silver sm:text-4xl md:text-5xl">
            Think of a card.{" "}
            <span className="italic text-silver-dim">We'll remove it.</span>
          </h3>
          <p className="magic-sub mt-4 text-[13px] leading-relaxed text-silver-dim sm:text-sm">
            Look at the six cards. Lock one into your mind — don't click it,
            just remember it. When you're ready, tell us.
          </p>
        </div>

        {/* Instruction / prompt area — reserved height so content doesn't jump */}
        <div className="relative mx-auto mt-10 flex min-h-18 max-w-xl flex-col items-center justify-center gap-3 text-center sm:mt-14">
          <PromptCopy phase={phase} />
          {phase === "setup" && (
            <button
              type="button"
              onClick={handleThinkingDone}
              className="magic-cta group inline-flex items-center gap-2 rounded-full border border-accent/50 bg-[rgba(138,160,255,0.08)] px-6 py-2.5 text-[11px] font-medium tracking-[0.22em] text-silver uppercase shadow-[0_8px_24px_rgba(138,160,255,0.2)] backdrop-blur-md transition-all duration-300 hover:border-accent hover:bg-[rgba(138,160,255,0.14)] hover:shadow-[0_12px_30px_rgba(138,160,255,0.3)] sm:text-[12px]"
            >
              Got my card
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
            </button>
          )}
          {phase === "done" && (
            <button
              type="button"
              onClick={reset}
              className="magic-replay group mt-2 inline-flex items-center gap-2 rounded-full border border-line bg-ink-900/70 px-5 py-2.5 text-[11px] font-medium tracking-[0.22em] text-silver-dim uppercase backdrop-blur-md transition-all duration-300 hover:border-accent/50 hover:text-silver sm:text-[12px]"
            >
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
              Try again
            </button>
          )}
        </div>

        {/* The two stages — show set 1 OR set 2 depending on phase */}
        <div className="relative mx-auto mt-10 flex min-h-55 w-full max-w-230 items-center justify-center sm:min-h-65 md:min-h-75">
          <ReadingParticles active={phase === "shuffling"} />

          {/* SET ONE */}
          {(phase === "revealing-set-one" ||
            phase === "setup" ||
            phase === "flipping" ||
            phase === "shuffling" ||
            phase === "removing") && (
            <div className="trick-grid grid w-full grid-cols-3 gap-3 sm:grid-cols-6 sm:gap-4 md:gap-5">
              {SET_ONE.map((card, i) => (
                <TrickCard
                  key={`one-${i}`}
                  card={card}
                  index={i}
                  faceDown={
                    phase === "flipping" ||
                    phase === "shuffling" ||
                    phase === "removing"
                  }
                  mode={
                    phase === "revealing-set-one" || phase === "setup"
                      ? "appear"
                      : phase === "flipping"
                        ? "flip-down"
                        : phase === "shuffling"
                          ? "shuffle"
                          : "vanish"
                  }
                />
              ))}
            </div>
          )}

          {/* SET TWO */}
          {(phase === "revealing-set-two" || phase === "done") && (
            <div className="trick-grid grid w-full grid-cols-3 gap-3 sm:grid-cols-5 sm:gap-4 md:gap-5">
              {SET_TWO.map((card, i) => (
                <TrickCard
                  key={`two-${i}`}
                  card={card}
                  index={i}
                  faceDown={false}
                  mode="emerge"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* === Prompt copy per phase === */
function PromptCopy({ phase }: { phase: Phase }) {
  if (phase === "idle" || phase === "revealing-set-one") return null;
  if (phase === "setup")
    return (
      <p className="magic-prompt font-display text-base italic text-silver-dim sm:text-lg">
        Have you locked it in?
      </p>
    );
  if (phase === "flipping" || phase === "shuffling")
    return (
      <p className="magic-prompt font-display text-base italic text-silver-dim sm:text-lg">
        Reading your mind
        <ThinkingDots />
      </p>
    );
  if (phase === "removing")
    return (
      <p className="magic-prompt font-display text-base italic text-silver sm:text-lg">
        Removing your card…
      </p>
    );
  if (phase === "revealing-set-two" || phase === "done")
    return (
      <div className="flex flex-col items-center gap-1">
        <p className="magic-result font-display text-xl leading-tight text-silver sm:text-2xl md:text-3xl">
          Your card is{" "}
          <span className="italic text-silver-dim">no longer here.</span>
        </p>
        <p className="text-[12px] tracking-[0.22em] text-muted uppercase sm:text-[13px]">
          Impossible, isn't it?
        </p>
      </div>
    );
  return null;
}

function ThinkingDots() {
  return (
    <span className="ml-1 inline-flex gap-0.5">
      <span className="thinking-dot">.</span>
      <span className="thinking-dot">.</span>
      <span className="thinking-dot">.</span>
    </span>
  );
}

/* === Individual card === */
type TrickCardProps = {
  card: Card;
  index: number;
  faceDown: boolean;
  mode: "appear" | "flip-down" | "shuffle" | "vanish" | "emerge";
};

function TrickCard({ card, index, faceDown, mode }: TrickCardProps) {
  // Each mode maps to a CSS class that drives its own keyframe animation.
  const modeClass =
    mode === "appear"
      ? "trick-card--appear"
      : mode === "flip-down"
        ? "trick-card--flip-down"
        : mode === "shuffle"
          ? "trick-card--shuffle"
          : mode === "vanish"
            ? "trick-card--vanish"
            : "trick-card--emerge";

  return (
    <div
      className={`trick-card relative aspect-7/10 rounded-xl shadow-[0_12px_30px_rgba(0,0,0,0.5)] ${modeClass}`}
      style={
        {
          "--i": index,
        } as React.CSSProperties
      }
    >
      <div
        className={`card-flipper relative h-full w-full rounded-xl transition-transform duration-700 transform-3d ${
          faceDown ? "transform-[rotateY(180deg)]" : ""
        }`}
      >
        {/* Face */}
        <div className="absolute inset-0 overflow-hidden rounded-xl border border-silver/40 bg-linear-to-br from-white to-[#f5f5f0] backface-hidden">
          <CardFace card={card} />
        </div>
        {/* Back */}
        <div className="absolute inset-0 overflow-hidden rounded-xl border border-silver-dim/20 bg-linear-to-br from-ink-800 via-ink-900 to-[#0b1030] transform-[rotateY(180deg)] backface-hidden">
          <CardBack />
        </div>
      </div>
    </div>
  );
}

function CardFace({ card }: { card: Card }) {
  const color = card.color === "red" ? "#c22" : "#0a0e1a";
  return (
    <div
      className="flex h-full w-full flex-col justify-between p-1.5 font-serif leading-none sm:p-2 md:p-2.5"
      style={{ color }}
    >
      {/* Top-left corner */}
      <div className="flex flex-col items-start">
        <span className="text-[13px] font-bold sm:text-[16px] md:text-[18px]">
          {card.rank}
        </span>
        <span className="text-[11px] sm:text-[14px] md:text-[16px]">
          {card.suit}
        </span>
      </div>
      {/* Center suit */}
      <div className="flex flex-1 items-center justify-center">
        <span className="text-[32px] drop-shadow-[0_1px_3px_rgba(0,0,0,0.1)] sm:text-[40px] md:text-[52px] lg:text-[64px]">
          {card.suit}
        </span>
      </div>
      {/* Bottom-right corner (rotated) */}
      <div className="flex flex-col items-end" style={{ transform: "rotate(180deg)" }}>
        <span className="text-[13px] font-bold sm:text-[16px] md:text-[18px]">
          {card.rank}
        </span>
        <span className="text-[11px] sm:text-[14px] md:text-[16px]">
          {card.suit}
        </span>
      </div>
    </div>
  );
}

function CardBack() {
  return (
    <svg viewBox="0 0 100 140" className="absolute inset-0 h-full w-full" aria-hidden>
      <defs>
        <pattern id="back-pattern" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="4" cy="4" r="0.4" fill="rgba(138,160,255,0.4)" />
        </pattern>
      </defs>
      <rect width="100" height="140" fill="url(#back-pattern)" />
      <rect x="6" y="6" width="88" height="128" fill="none" stroke="rgba(184,186,196,0.3)" strokeWidth="0.6" rx="3" />
      <g transform="translate(50 70)">
        <path
          d="M0 -32 L22 0 L0 32 L-22 0 Z"
          fill="none"
          stroke="rgba(138,160,255,0.5)"
          strokeWidth="0.6"
        />
        <circle cx="0" cy="0" r="4" fill="rgba(138,160,255,0.2)" stroke="rgba(184,186,196,0.5)" strokeWidth="0.4" />
      </g>
    </svg>
  );
}

/* === Reading particles — soft orbs that drift during the "reading" phase === */
function ReadingParticles({ active }: { active: boolean }) {
  if (!active) return null;
  const orbs = Array.from({ length: 14 }, (_, i) => ({
    left: `${8 + Math.random() * 84}%`,
    top: `${12 + Math.random() * 76}%`,
    delay: `${Math.random() * 600}ms`,
    duration: `${1800 + Math.random() * 1500}ms`,
    size: 3 + Math.random() * 5,
    key: `${active}-${i}`,
  }));
  return (
    <div className="pointer-events-none absolute inset-0 z-20" aria-hidden>
      {orbs.map((o) => (
        <span
          key={o.key}
          className="magic-orb absolute block rounded-full"
          style={{
            left: o.left,
            top: o.top,
            width: o.size,
            height: o.size,
            animationDelay: o.delay,
            animationDuration: o.duration,
          }}
        />
      ))}
    </div>
  );
}
