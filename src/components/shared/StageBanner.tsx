export function StageBanner() {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-ink-950" />

      <div
        className="absolute inset-x-0 top-0 bottom-[22%]"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 55% 100% at 50% 55%, rgba(60,100,200,0.42) 0%, rgba(30,55,130,0.22) 35%, rgba(10,16,34,0) 70%)",
        }}
      />

      <div
        className="absolute inset-x-0 top-0 bottom-[22%] mix-blend-screen opacity-40"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(140,170,255,0) 0px, rgba(140,170,255,0.08) 2px, rgba(140,170,255,0) 24px)",
          maskImage:
            "radial-gradient(ellipse 60% 100% at 50% 55%, #000 0%, rgba(0,0,0,0.35) 55%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 100% at 50% 55%, #000 0%, rgba(0,0,0,0.35) 55%, transparent 75%)",
        }}
      />

      <Spotlight x="34%" />
      <Spotlight x="50%" strength={1.1} />
      <Spotlight x="66%" />

      <div
        className="absolute inset-x-0 bottom-0 h-[26%]"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(5,7,12,0) 0%, rgba(5,7,12,0.6) 40%, rgba(5,7,12,1) 100%)",
        }}
      />

      <div
        className="absolute inset-x-0 bottom-[22%] h-px"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(140,170,255,0) 0%, rgba(140,170,255,0.35) 50%, rgba(140,170,255,0) 100%)",
        }}
      />

      <ScatteredCards />

      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(140,170,255,0.25)] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[rgba(140,170,255,0.15)] to-transparent" />
    </div>
  );
}

function Spotlight({ x, strength = 1 }: { x: string; strength?: number }) {
  const opacity = 0.18 * strength;
  const spread = 0.1 * strength;
  return (
    <div
      className="absolute top-0 h-[80%] w-[22%] -translate-x-1/2"
      style={{
        left: x,
        backgroundImage: `radial-gradient(ellipse 60% 100% at 50% 0%, rgba(180,200,255,${opacity}) 0%, rgba(100,130,210,${spread}) 30%, transparent 70%)`,
      }}
    />
  );
}

function ScatteredCards() {
  const cards = [
    { left: "32%", bottom: "6%", rotate: -24, scale: 0.9, opacity: 0.55 },
    { left: "42%", bottom: "3%", rotate: 8, scale: 1, opacity: 0.7 },
    { left: "52%", bottom: "4%", rotate: -6, scale: 0.95, opacity: 0.65 },
    { left: "60%", bottom: "7%", rotate: 22, scale: 0.85, opacity: 0.5 },
    { left: "48%", bottom: "9%", rotate: -40, scale: 0.75, opacity: 0.4 },
    { left: "66%", bottom: "11%", rotate: 48, scale: 0.7, opacity: 0.35 },
  ];
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[25%]">
      {cards.map((c, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: c.left,
            bottom: c.bottom,
            transform: `translateX(-50%) rotate(${c.rotate}deg) scale(${c.scale})`,
            opacity: c.opacity,
          }}
        >
          <div
            className="h-10 w-7 rounded-[2px] border border-white/15 bg-gradient-to-b from-white/[0.08] to-white/[0.02] shadow-[0_2px_10px_rgba(0,0,0,0.6)] sm:h-14 sm:w-10 md:h-16 md:w-11"
          />
        </div>
      ))}
    </div>
  );
}
