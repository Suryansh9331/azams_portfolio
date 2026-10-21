import { SectionShell } from "./shared/SectionShell";

type Item = {
  value: string;
  tail?: string;
  label: string;
};

const items: Item[] = [
  { value: "130+", label: "Brands & Partners" },
  { value: "7M+", tail: "Followers", label: "Audience Reach" },
  { value: "UAE", tail: "Golden Visa", label: "Official Recognition" },
];

export function Proof() {
  return (
    <div className="relative overflow-hidden bg-ink-950">
      <ProofBackdrop />
      <SectionShell
        id="proof"
        label="Proof at a Glance"
        page="03"
        className="relative z-10 min-h-[88vh]"
      >
        <div className="flex min-h-[55vh] flex-col justify-center">
          <div className="grid grid-cols-1 divide-y divide-line/60 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-3">
            {items.map((it, i) => (
              <ProofItem key={it.label} {...it} index={i} />
            ))}
          </div>
        </div>

        <p className="relative mt-14 max-w-md text-sm leading-relaxed text-silver-dim lg:mt-20">
          Built over a decade of live work across the UAE and beyond — for brands,
          stages and private hosts.
        </p>
      </SectionShell>
    </div>
  );
}

function ProofItem({
  value,
  tail,
  label,
  index,
}: Item & { index: number }) {
  const pad =
    index === 0
      ? "sm:pr-8 lg:pr-10"
      : "py-10 sm:py-0 sm:px-8 lg:px-10";
  return (
    <div className={`flex flex-col gap-5 ${pad}`}>
      <div className="flex items-baseline gap-x-3 whitespace-nowrap">
        <span className="font-display text-6xl leading-none font-medium text-silver sm:text-7xl lg:text-[88px]">
          {value}
        </span>
        {tail ? (
          <span className="font-display text-2xl leading-none font-normal text-silver-dim sm:text-3xl lg:text-4xl">
            {tail}
          </span>
        ) : null}
      </div>
      <span className="text-[11px] tracking-[0.24em] text-muted uppercase">
        {label}
      </span>
    </div>
  );
}

function ProofBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(40,55,110,0.18) 0%, rgba(10,14,26,0) 60%)",
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      <div className="absolute top-1/2 right-[6%] -translate-y-1/2 text-right opacity-[0.035] sm:opacity-[0.05]">
        <div className="font-display text-6xl leading-[0.9] font-medium text-silver tracking-[0.2em] md:text-7xl lg:text-8xl">
          LIVE
        </div>
        <div className="mt-1 font-display text-5xl leading-[0.9] font-medium text-silver italic md:text-6xl lg:text-7xl">
          IMPOSSIBLE
        </div>
      </div>

      <HandSilhouette />

      <div
        className="absolute inset-x-0 bottom-0 h-[40%]"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(5,7,12,0) 0%, rgba(5,7,12,0.75) 60%, rgba(5,7,12,1) 100%)",
        }}
      />
    </div>
  );
}

function HandSilhouette() {
  return (
    <div className="absolute right-0 bottom-0 left-[38%] h-[55%] opacity-[0.22] sm:opacity-25 md:opacity-30">
      <svg
        viewBox="0 0 500 400"
        preserveAspectRatio="xMidYMax meet"
        className="h-full w-full"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="hand-fade" cx="50%" cy="80%" r="60%">
            <stop offset="0%" stopColor="rgba(140,170,255,0.35)" />
            <stop offset="40%" stopColor="rgba(60,80,140,0.18)" />
            <stop offset="100%" stopColor="rgba(10,14,26,0)" />
          </radialGradient>
          <linearGradient id="hand-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0e1324" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#05070c" stopOpacity="1" />
          </linearGradient>
        </defs>

        <ellipse cx="260" cy="360" rx="240" ry="90" fill="url(#hand-fade)" />

        <path
          d="M 180 400 L 190 320 Q 192 280, 210 260 Q 220 230, 232 215
             L 240 195 Q 248 185, 258 190 L 262 220
             L 278 200 Q 288 192, 296 198 L 294 230
             L 310 215 Q 320 210, 326 220 L 320 250
             L 334 240 Q 342 240, 344 252 L 334 280
             Q 338 310, 326 340 Q 316 370, 300 400 Z"
          fill="url(#hand-body)"
        />
        <path
          d="M 180 400 L 190 320 Q 192 280, 210 260"
          stroke="rgba(140,170,255,0.25)"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M 300 400 Q 316 370, 326 340 Q 338 310, 334 280"
          stroke="rgba(140,170,255,0.25)"
          strokeWidth="1"
          fill="none"
        />

        <rect
          x="188"
          y="310"
          width="26"
          height="14"
          rx="2"
          fill="#030508"
          stroke="rgba(140,170,255,0.2)"
          strokeWidth="0.6"
        />
      </svg>
    </div>
  );
}
