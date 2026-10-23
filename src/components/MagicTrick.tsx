import { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "../hooks/useInView";

type Phase =
  | "idle"
  | "intro"
  | "step-1"
  | "step-2"
  | "step-3"
  | "step-4"
  | "step-5"
  | "circle"
  | "divining"
  | "reveal"
  | "done";

/* === The rune circle ===
 * 10 "mystical" runes. The user is told to find their mental number (0-9) in
 * the circle and memorise that rune. The math above guarantees their result
 * is 9 — so the rune at index 9 (★) is the one that will always match.
 *
 * The other 9 slots are decorated with visually similar but distinct glyphs
 * so no pattern is obvious. The circle is laid out non-sequentially (see
 * CIRCLE_ORDER) to add one more layer of visual noise. */
const RUNES = ["⬡", "◈", "✦", "❖", "⟐", "⬟", "✧", "⟢", "◇", "★"];
// Visually scattered around the ring — user has to hunt for their digit.
const CIRCLE_ORDER = [3, 7, 1, 9, 5, 0, 8, 2, 6, 4];

const STEPS: {
  phase: Phase;
  title: string;
  body: string;
  example: string;
  cta: string;
}[] = [
  {
    phase: "step-1",
    title: "One. A number.",
    body: "Think of any two-digit number. Any one. Hold it.",
    example: "Example: 47",
    cta: "Got it",
  },
  {
    phase: "step-2",
    title: "Two. The sum.",
    body: "Add its two digits together in your head.",
    example: "47 → 4 + 7 = 11",
    cta: "Done",
  },
  {
    phase: "step-3",
    title: "Three. The subtraction.",
    body: "Subtract that sum from your original number.",
    example: "47 − 11 = 36",
    cta: "Next",
  },
  {
    phase: "step-4",
    title: "Four. Your choice.",
    body: "Multiply the result by any single digit between 2 and 9 — whichever one calls to you.",
    example: "36 × 5 = 180",
    cta: "Chosen",
  },
  {
    phase: "step-5",
    title: "Five. Collapse the digits.",
    body: "Add the digits of your result. If it's still more than one digit, add again. Keep going until a single digit remains.",
    example: "180 → 1 + 8 + 0 = 9",
    cta: "I have my digit",
  },
];

export function MagicTrick() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.2 });
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

  useEffect(() => {
    if (!inView || startedRef.current) return;
    startedRef.current = true;
    schedule(() => setPhase("intro"), 300);
    schedule(() => setPhase("step-1"), 1600);
  }, [inView, schedule]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const advance = () => {
    const flow: Phase[] = [
      "step-1",
      "step-2",
      "step-3",
      "step-4",
      "step-5",
      "circle",
    ];
    const idx = flow.indexOf(phase);
    if (idx === -1 || idx === flow.length - 1) return;
    setPhase(flow[idx + 1]);
  };

  const divine = () => {
    setPhase("divining");
    schedule(() => setPhase("reveal"), 2500);
    schedule(() => setPhase("done"), 4800);
  };

  const reset = () => {
    clearTimers();
    setPhase("intro");
    schedule(() => setPhase("step-1"), 900);
  };

  const currentStep = STEPS.find((s) => s.phase === phase);

  return (
    <section
      ref={ref}
      id="magic-trick"
      className={`oracle-reveal relative overflow-hidden bg-ink-950 py-20 sm:py-24 md:py-28 lg:py-32 ${
        inView ? "in-view" : ""
      }`}
    >
      {/* Celestial backdrop — matches portfolio radial-glow pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 50% at 50% 55%, rgba(60,100,200,0.18) 0%, rgba(30,55,130,0.08) 40%, rgba(10,16,34,0) 72%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-screen"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1680px] px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="oracle-label text-[13px] font-medium tracking-[0.24em] text-muted uppercase sm:text-[14px] md:text-[15px] lg:text-[16px]">
            The Oracle
          </p>
          <div className="oracle-rail mx-auto mt-3 h-px w-24 bg-line sm:w-32" />
          <h3 className="oracle-headline mt-6 font-display text-3xl leading-[1.1] font-normal text-silver sm:text-4xl md:text-5xl">
            A number tells.{" "}
            <span className="italic text-silver-dim">We'll listen.</span>
          </h3>
          <p className="oracle-sub mt-4 text-[13px] leading-relaxed text-silver-dim sm:text-sm">
            Five mental steps. Then find your digit in the ring. The Oracle
            doesn't guess — it knows.
          </p>
        </div>

        {/* Stage */}
        <div className="relative mx-auto mt-12 flex min-h-120 w-full max-w-200 flex-col items-center justify-center sm:mt-16 md:min-h-144">
          {phase === "intro" && (
            <div className="oracle-intro flex flex-col items-center gap-5 text-center">
              <OracleEye phase={phase} />
              <p className="font-display text-xl italic text-silver-dim sm:text-2xl">
                Clear your mind.
              </p>
            </div>
          )}

          {currentStep && (
            <div className="oracle-step flex max-w-md flex-col items-center gap-6 text-center">
              <StepIndex current={STEPS.indexOf(currentStep) + 1} total={STEPS.length} />
              <h4 className="font-display text-2xl font-normal text-silver sm:text-3xl md:text-4xl">
                {currentStep.title}
              </h4>
              <p className="text-[14px] leading-relaxed text-silver-dim sm:text-[15px]">
                {currentStep.body}
              </p>
              <p className="font-numeric text-[13px] tracking-wide text-muted sm:text-sm">
                {currentStep.example}
              </p>
              <button
                type="button"
                onClick={advance}
                className="oracle-cta group mt-2 inline-flex items-center gap-2 rounded-full border border-accent/50 bg-[rgba(138,160,255,0.08)] px-6 py-2.5 text-[11px] font-medium tracking-[0.22em] text-silver uppercase shadow-[0_8px_24px_rgba(138,160,255,0.2)] backdrop-blur-md transition-all duration-300 hover:border-accent hover:bg-[rgba(138,160,255,0.14)] hover:shadow-[0_12px_30px_rgba(138,160,255,0.3)] sm:text-[12px]"
              >
                {currentStep.cta}
                <ChevronRight />
              </button>
            </div>
          )}

          {(phase === "circle" || phase === "divining") && (
            <RuneCircle
              divining={phase === "divining"}
              onConfirm={divine}
            />
          )}

          {(phase === "reveal" || phase === "done") && (
            <RevealOrb done={phase === "done"} onReset={reset} />
          )}
        </div>
      </div>
    </section>
  );
}

/* === Small presentational bits === */

function StepIndex({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-3 text-[11px] tracking-[0.3em] text-muted uppercase">
      <span className="font-numeric text-silver-dim">
        {String(current).padStart(2, "0")}
      </span>
      <span className="h-px w-10 bg-line" />
      <span className="font-numeric">{String(total).padStart(2, "0")}</span>
    </div>
  );
}

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

/* === The Oracle "eye" — spinning concentric rings === */
function OracleEye({ phase }: { phase: Phase }) {
  const active = phase === "divining" || phase === "intro";
  return (
    <div
      className={`oracle-eye relative h-24 w-24 ${active ? "is-active" : ""}`}
      aria-hidden
    >
      <span className="oracle-ring oracle-ring-1" />
      <span className="oracle-ring oracle-ring-2" />
      <span className="oracle-ring oracle-ring-3" />
      <span className="oracle-pupil" />
    </div>
  );
}

/* === Rune Circle — user finds their digit here === */
function RuneCircle({
  divining,
  onConfirm,
}: {
  divining: boolean;
  onConfirm: () => void;
}) {
  // 10 runes positioned on a circle; CIRCLE_ORDER controls which digit lives
  // at which angular slot so numbers aren't sequential around the ring.
  const positions = CIRCLE_ORDER.map((digit, slot) => {
    const angle = (slot / CIRCLE_ORDER.length) * Math.PI * 2 - Math.PI / 2;
    return {
      digit,
      rune: RUNES[digit],
      x: 50 + Math.cos(angle) * 42,
      y: 50 + Math.sin(angle) * 42,
      slot,
    };
  });

  return (
    <div className="oracle-circle relative flex flex-col items-center gap-6">
      <p className="font-display text-base italic text-silver-dim sm:text-lg">
        {divining ? "Reading your rune" : "Find your digit. Memorise its rune."}
        {divining && <ThinkingDots />}
      </p>

      <div className="relative aspect-square w-72 sm:w-80 md:w-96">
        {/* Ring background */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
          <defs>
            <radialGradient id="ring-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(138,160,255,0.25)" />
              <stop offset="60%" stopColor="rgba(60,80,160,0.08)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="48" fill="url(#ring-glow)" />
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="rgba(184,186,196,0.25)"
            strokeWidth="0.3"
          />
          <circle
            cx="50"
            cy="50"
            r="32"
            fill="none"
            stroke="rgba(138,160,255,0.35)"
            strokeWidth="0.25"
            strokeDasharray="1 2"
          />
          <circle
            cx="50"
            cy="50"
            r="16"
            fill="none"
            stroke="rgba(184,186,196,0.2)"
            strokeWidth="0.3"
          />
        </svg>

        {/* Center oracle eye */}
        <div className="absolute inset-0 flex items-center justify-center">
          <OracleEye phase={divining ? "divining" : "circle"} />
        </div>

        {/* Rune positions */}
        {positions.map(({ digit, rune, x, y, slot }) => (
          <div
            key={digit}
            className="oracle-rune absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
            style={
              {
                left: `${x}%`,
                top: `${y}%`,
                animationDelay: `${slot * 70}ms`,
              } as React.CSSProperties
            }
          >
            <span className="font-display text-2xl text-silver drop-shadow-[0_2px_8px_rgba(138,160,255,0.4)] sm:text-3xl">
              {rune}
            </span>
            <span className="font-numeric text-[10px] font-medium tracking-wide text-muted sm:text-[11px]">
              {digit}
            </span>
          </div>
        ))}

        {/* Scanning sweep during divining */}
        {divining && (
          <div
            aria-hidden
            className="oracle-sweep pointer-events-none absolute inset-0 rounded-full"
          />
        )}
      </div>

      {!divining && (
        <button
          type="button"
          onClick={onConfirm}
          className="oracle-cta group inline-flex items-center gap-2 rounded-full border border-accent/50 bg-[rgba(138,160,255,0.08)] px-6 py-2.5 text-[11px] font-medium tracking-[0.22em] text-silver uppercase shadow-[0_8px_24px_rgba(138,160,255,0.2)] backdrop-blur-md transition-all duration-300 hover:border-accent hover:bg-[rgba(138,160,255,0.14)] hover:shadow-[0_12px_30px_rgba(138,160,255,0.3)] sm:text-[12px]"
        >
          Read my rune
          <ChevronRight />
        </button>
      )}
    </div>
  );
}

/* === Reveal: the "9" rune (★) blossoms in center === */
function RevealOrb({ done, onReset }: { done: boolean; onReset: () => void }) {
  const rune = RUNES[9]; // star — the forced oracle rune
  return (
    <div className="oracle-reveal-wrap flex flex-col items-center gap-6 text-center">
      <p className="font-display text-lg italic text-silver-dim sm:text-xl">
        The Oracle has your rune.
      </p>

      <div className="relative flex h-56 w-56 items-center justify-center sm:h-64 sm:w-64 md:h-72 md:w-72">
        {/* Glow ripples */}
        <span className="oracle-ripple oracle-ripple-1" aria-hidden />
        <span className="oracle-ripple oracle-ripple-2" aria-hidden />
        <span className="oracle-ripple oracle-ripple-3" aria-hidden />

        {/* The star itself */}
        <span className="oracle-star relative font-display text-8xl text-silver drop-shadow-[0_0_24px_rgba(138,160,255,0.8)] sm:text-9xl">
          {rune}
        </span>

        {/* Sparkles around */}
        <Sparkles />
      </div>

      <div className="flex flex-col items-center gap-1">
        <p className="font-display text-xl text-silver sm:text-2xl">
          Did it match?
        </p>
        <p className="text-[11px] tracking-[0.22em] text-muted uppercase sm:text-[12px]">
          Every mind lands on the same rune.
        </p>
      </div>

      {done && (
        <button
          type="button"
          onClick={onReset}
          className="oracle-replay group mt-2 inline-flex items-center gap-2 rounded-full border border-line bg-ink-900/70 px-5 py-2.5 text-[11px] font-medium tracking-[0.22em] text-silver-dim uppercase backdrop-blur-md transition-all duration-300 hover:border-accent/50 hover:text-silver sm:text-[12px]"
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
          Again
        </button>
      )}
    </div>
  );
}

/* === Sparkle burst === */
function Sparkles() {
  const stars = [
    { x: "20%", y: "15%", size: 10, delay: 60 },
    { x: "80%", y: "20%", size: 14, delay: 180 },
    { x: "10%", y: "60%", size: 8, delay: 320 },
    { x: "85%", y: "65%", size: 11, delay: 90 },
    { x: "45%", y: "5%", size: 7, delay: 250 },
    { x: "55%", y: "90%", size: 9, delay: 380 },
    { x: "15%", y: "35%", size: 6, delay: 420 },
    { x: "90%", y: "40%", size: 8, delay: 150 },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 z-20" aria-hidden>
      {stars.map((s, i) => (
        <span
          key={i}
          className="oracle-sparkle absolute block"
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

function ThinkingDots() {
  return (
    <span className="ml-1 inline-flex gap-0.5">
      <span className="thinking-dot">.</span>
      <span className="thinking-dot">.</span>
      <span className="thinking-dot">.</span>
    </span>
  );
}
