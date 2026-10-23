import { useCallback, useEffect, useState } from "react";
import { useInView } from "../hooks/useInView";

type Phase = "idle" | "dealing" | "shuffling" | "ready" | "reveal" | "done";

// Three card "slots". The visual order rotates during shuffle via `positions`.
const CARD_IDS = [0, 1, 2] as const;

// A couple of pre-planned shuffle sequences so the motion looks natural, not scripted.
const SHUFFLE_SEQUENCES: Array<[number, number, number][]> = [
  [
    [1, 0, 2],
    [1, 2, 0],
    [0, 2, 1],
    [2, 0, 1],
  ],
  [
    [0, 2, 1],
    [2, 0, 1],
    [2, 1, 0],
    [1, 0, 2],
  ],
  [
    [2, 1, 0],
    [0, 1, 2],
    [1, 2, 0],
    [0, 2, 1],
  ],
];

export function MagicTrick() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.3 });
  const [phase, setPhase] = useState<Phase>("idle");
  const [positions, setPositions] = useState<[number, number, number]>([0, 1, 2]);
  const [picked, setPicked] = useState<number | null>(null);
  const [sequenceIdx, setSequenceIdx] = useState(0);

  const runShuffle = useCallback(() => {
    const sequence = SHUFFLE_SEQUENCES[sequenceIdx % SHUFFLE_SEQUENCES.length];
    sequence.forEach((pos, i) => {
      window.setTimeout(() => setPositions(pos), i * 500);
    });
    window.setTimeout(() => {
      setPositions([0, 1, 2]);
      setPhase("ready");
    }, sequence.length * 500 + 400);
  }, [sequenceIdx]);

  // Kick the trick off when the section is first scrolled into view.
  useEffect(() => {
    if (!inView || phase !== "idle") return;
    const t1 = window.setTimeout(() => setPhase("dealing"), 400);
    const t2 = window.setTimeout(() => setPhase("shuffling"), 1500);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [inView, phase]);

  useEffect(() => {
    if (phase === "shuffling") runShuffle();
  }, [phase, runShuffle]);

  const handlePick = (id: number) => {
    if (phase !== "ready") return;
    setPicked(id);
    setPhase("reveal");
    window.setTimeout(() => setPhase("done"), 1200);
  };

  const reset = () => {
    setPicked(null);
    setPositions([0, 1, 2]);
    setSequenceIdx((n) => n + 1);
    setPhase("idle");
  };

  const canPick = phase === "ready";

  return (
    <section
      ref={ref}
      id="magic-trick"
      className={`magic-reveal relative overflow-hidden bg-ink-950 py-20 sm:py-24 md:py-28 lg:py-32 ${
        inView ? "in-view" : ""
      }`}
    >
      {/* Spotlight backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 50% at 50% 55%, rgba(60,100,200,0.18) 0%, rgba(30,55,130,0.08) 40%, rgba(10,16,34,0) 72%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1680px] px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="magic-label text-[13px] font-medium tracking-[0.24em] text-muted uppercase sm:text-[14px] md:text-[15px] lg:text-[16px]">
            A Quick Trick
          </p>
          <div className="magic-rail mx-auto mt-3 h-px w-24 bg-line sm:w-32" />
          <h3 className="magic-headline mt-6 font-display text-3xl leading-[1.1] font-normal text-silver sm:text-4xl md:text-5xl">
            Pick a card.{" "}
            <span className="italic text-silver-dim">Any card.</span>
          </h3>
          <p className="magic-sub mt-4 text-[13px] leading-relaxed text-silver-dim sm:text-sm">
            Watch them shuffle. Trust your instinct. Tap the one that calls you.
          </p>
        </div>

        {/* Stage */}
        <div className="magic-stage relative mx-auto mt-12 flex h-[260px] w-full max-w-[640px] items-end justify-center sm:mt-16 sm:h-[320px] md:h-[380px] lg:h-[420px]">
          {/* Stage floor glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-10 bottom-0 h-16 opacity-70"
            style={{
              backgroundImage:
                "radial-gradient(ellipse at 50% 100%, rgba(138,160,255,0.18) 0%, transparent 70%)",
            }}
          />

          {CARD_IDS.map((id) => {
            const slot = positions.indexOf(id);
            const isPicked = picked === id;
            return (
              <MagicCard
                key={id}
                id={id}
                slot={slot}
                phase={phase}
                picked={isPicked}
                anyPicked={picked !== null}
                canPick={canPick}
                onPick={() => handlePick(id)}
              />
            );
          })}

          {/* Sparkles around the picked card */}
          {phase === "reveal" || phase === "done" ? <Sparkles /> : null}
        </div>

        {/* Prompt / result area — reserved height so content doesn't jump */}
        <div className="magic-prompt relative mx-auto mt-10 flex min-h-[80px] max-w-xl flex-col items-center justify-start text-center sm:mt-14">
          {phase === "ready" && (
            <p className="magic-prompt-cta font-display text-lg italic text-silver-dim sm:text-xl">
              Pick one.
            </p>
          )}
          {(phase === "reveal" || phase === "done") && (
            <>
              <p className="magic-result font-display text-xl leading-tight text-silver sm:text-2xl md:text-3xl">
                That's your card.{" "}
                <span className="italic text-silver-dim">Of course it is.</span>
              </p>
              {phase === "done" && (
                <button
                  type="button"
                  onClick={reset}
                  className="magic-replay group mt-6 inline-flex items-center gap-2 rounded-full border border-line bg-ink-900/70 px-5 py-2.5 text-[11px] font-medium tracking-[0.22em] text-silver-dim uppercase backdrop-blur-md transition-all duration-300 hover:border-accent/50 hover:text-silver sm:text-[12px]"
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
            </>
          )}
        </div>
      </div>
    </section>
  );
}

/* === Individual card === */

type CardProps = {
  id: number;
  slot: number; // 0, 1, 2 — current visual position after shuffle
  phase: Phase;
  picked: boolean;
  anyPicked: boolean;
  canPick: boolean;
  onPick: () => void;
};

function MagicCard({ id, slot, phase, picked, anyPicked, canPick, onPick }: CardProps) {
  // Horizontal offset per slot (in rem). Centered middle, left and right.
  const offsets = ["-9rem", "0rem", "9rem"];
  const smOffsets = ["-11rem", "0rem", "11rem"];

  // During "dealing": cards start from above and fall into position
  const isHidden = phase === "idle";
  const isDealing = phase === "dealing";

  // During "reveal/done": picked card centers and scales up, others fly away
  const otherFliesAway = anyPicked && !picked;

  const translateX = picked
    ? "0rem"
    : otherFliesAway
      ? slot === 0
        ? "-18rem"
        : slot === 2
          ? "18rem"
          : "0rem"
      : `var(--card-offset)`;

  const translateY = isHidden
    ? "-24rem"
    : isDealing
      ? "0rem"
      : picked
        ? "-1rem"
        : "0rem";

  const scale = picked ? "1.08" : otherFliesAway ? "0.85" : "1";
  const opacity = isHidden ? 0 : otherFliesAway ? 0 : 1;
  const rotate = picked
    ? "0deg"
    : isDealing
      ? `${(id - 1) * 2}deg`
      : "0deg";

  return (
    <button
      type="button"
      onClick={onPick}
      disabled={!canPick}
      aria-label={canPick ? `Pick card ${id + 1}` : undefined}
      className={`magic-card group absolute bottom-0 h-[200px] w-[140px] rounded-xl transition-all duration-700 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:h-[240px] sm:w-[170px] md:h-[280px] md:w-[200px] lg:h-[320px] lg:w-[230px] ${
        canPick ? "cursor-pointer hover:-translate-y-3" : "cursor-default"
      } ${picked ? "z-20" : "z-10"}`}
      style={
        {
          "--card-offset": slot === 0 ? offsets[0] : slot === 2 ? offsets[2] : offsets[1],
          transform: `translateX(${translateX}) translateY(${translateY}) scale(${scale}) rotate(${rotate})`,
          opacity,
          transitionProperty: "transform, opacity",
          transitionDelay: isDealing ? `${id * 140}ms` : "0ms",
        } as React.CSSProperties
      }
    >
      <div
        className={`card-flipper relative h-full w-full rounded-xl transition-transform duration-700 [transform-style:preserve-3d] ${
          picked ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* Back of card */}
        <div className="absolute inset-0 overflow-hidden rounded-xl border border-silver-dim/20 bg-gradient-to-br from-ink-800 via-ink-900 to-[#0b1030] shadow-[0_18px_40px_rgba(0,0,0,0.6)] [backface-visibility:hidden]">
          <CardBack />
          {/* Hover glow */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              backgroundImage:
                "radial-gradient(ellipse at center, rgba(138,160,255,0.25) 0%, transparent 70%)",
            }}
          />
        </div>

        {/* Face of card (Ace of Spades) */}
        <div className="absolute inset-0 overflow-hidden rounded-xl border border-silver/40 bg-gradient-to-br from-white to-[#f5f5f0] shadow-[0_25px_60px_rgba(138,160,255,0.45)] [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <CardFace />
        </div>
      </div>
    </button>
  );
}

/* === Card back design === */
function CardBack() {
  return (
    <svg
      viewBox="0 0 140 200"
      className="absolute inset-0 h-full w-full"
      aria-hidden
    >
      <defs>
        <linearGradient id="back-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1a2140" />
          <stop offset="100%" stopColor="#0a0e1a" />
        </linearGradient>
        <pattern
          id="back-dots"
          x="0"
          y="0"
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="5" cy="5" r="0.5" fill="rgba(138,160,255,0.35)" />
        </pattern>
      </defs>
      <rect width="140" height="200" fill="url(#back-grad)" />
      <rect width="140" height="200" fill="url(#back-dots)" />

      {/* Decorative inner border */}
      <rect
        x="8"
        y="8"
        width="124"
        height="184"
        fill="none"
        stroke="rgba(184,186,196,0.3)"
        strokeWidth="0.75"
        rx="4"
      />
      <rect
        x="12"
        y="12"
        width="116"
        height="176"
        fill="none"
        stroke="rgba(138,160,255,0.25)"
        strokeWidth="0.5"
        rx="2"
      />

      {/* Center diamond ornament */}
      <g transform="translate(70 100)">
        <path
          d="M0 -50 L35 0 L0 50 L-35 0 Z"
          fill="none"
          stroke="rgba(184,186,196,0.45)"
          strokeWidth="0.75"
        />
        <path
          d="M0 -32 L22 0 L0 32 L-22 0 Z"
          fill="none"
          stroke="rgba(138,160,255,0.5)"
          strokeWidth="0.5"
        />
        <circle
          cx="0"
          cy="0"
          r="6"
          fill="rgba(138,160,255,0.15)"
          stroke="rgba(184,186,196,0.6)"
          strokeWidth="0.5"
        />
        <text
          x="0"
          y="3.5"
          textAnchor="middle"
          fontFamily="'Playfair Display', serif"
          fontSize="7"
          fontStyle="italic"
          fill="rgba(232,232,236,0.8)"
        >
          A
        </text>
      </g>

      {/* Corner flourishes */}
      {[
        [15, 20],
        [125, 20],
        [15, 180],
        [125, 180],
      ].map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r="1.5"
          fill="rgba(138,160,255,0.4)"
        />
      ))}
    </svg>
  );
}

/* === Card face: Ace of Spades + AZAM === */
function CardFace() {
  return (
    <svg
      viewBox="0 0 140 200"
      className="absolute inset-0 h-full w-full"
      aria-hidden
    >
      {/* Corner A ♠ */}
      <g fill="#0a0e1a">
        <text
          x="10"
          y="22"
          fontFamily="'Playfair Display', serif"
          fontSize="18"
          fontWeight="700"
        >
          A
        </text>
        <text x="10" y="36" fontSize="12">
          ♠
        </text>
      </g>

      {/* Big center spade */}
      <g transform="translate(70 100)" fill="#0a0e1a">
        <path
          d="M0 -40
             C-28 -20 -36 -2 -22 14
             C-14 24 -4 22 -2 16
             C-2 20 -8 32 -18 36
             L18 36
             C8 32 2 20 2 16
             C4 22 14 24 22 14
             C36 -2 28 -20 0 -40 Z"
        />
      </g>

      {/* Corner A ♠ rotated */}
      <g fill="#0a0e1a" transform="rotate(180 70 100)">
        <text
          x="10"
          y="22"
          fontFamily="'Playfair Display', serif"
          fontSize="18"
          fontWeight="700"
        >
          A
        </text>
        <text x="10" y="36" fontSize="12">
          ♠
        </text>
      </g>

      {/* AZAM wordmark */}
      <text
        x="70"
        y="188"
        textAnchor="middle"
        fontFamily="'Playfair Display', serif"
        fontSize="7"
        letterSpacing="2.4"
        fill="rgba(10,14,26,0.45)"
      >
        AZAM
      </text>
    </svg>
  );
}

/* === Sparkle burst around the revealed card === */
function Sparkles() {
  const stars = [
    { x: "28%", y: "20%", size: 10, delay: 50 },
    { x: "72%", y: "25%", size: 14, delay: 180 },
    { x: "18%", y: "55%", size: 8, delay: 320 },
    { x: "82%", y: "60%", size: 11, delay: 90 },
    { x: "40%", y: "15%", size: 7, delay: 250 },
    { x: "60%", y: "80%", size: 9, delay: 380 },
    { x: "15%", y: "35%", size: 6, delay: 420 },
    { x: "85%", y: "45%", size: 8, delay: 150 },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 z-30" aria-hidden>
      {stars.map((s, i) => (
        <span
          key={i}
          className="magic-sparkle absolute block"
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
