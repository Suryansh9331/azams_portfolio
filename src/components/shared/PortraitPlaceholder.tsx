type Props = {
  caption?: string;
  aspect?: "portrait" | "square" | "tall";
  className?: string;
};

export function PortraitPlaceholder({
  caption = "Portrait",
  aspect = "portrait",
  className = "",
}: Props) {
  const aspectClass =
    aspect === "square"
      ? "aspect-square"
      : aspect === "tall"
        ? "aspect-[3/5]"
        : "aspect-[4/5]";

  return (
    <div
      className={`relative overflow-hidden rounded-sm border border-line bg-ink-900 ${aspectClass} ${className}`}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 50% 40%, rgba(80,100,180,0.22) 0%, rgba(10,14,26,0) 60%), linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0.6) 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(45deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <svg
        viewBox="0 0 100 125"
        className="absolute top-1/2 left-1/2 h-[70%] w-auto -translate-x-1/2 -translate-y-[55%] text-silver-dim/15"
        fill="currentColor"
        aria-hidden="true"
      >
        <circle cx="50" cy="42" r="18" />
        <path d="M14 118 C 14 86, 32 70, 50 70 C 68 70, 86 86, 86 118 Z" />
      </svg>

      <div className="pointer-events-none absolute top-4 left-4 flex items-center gap-2 text-[10px] tracking-[0.3em] text-silver-dim/70 uppercase">
        <span className="h-px w-6 bg-line" />
        <span>Azam</span>
      </div>

      <div className="pointer-events-none absolute right-4 bottom-4 flex items-center gap-2 text-[10px] tracking-[0.3em] text-muted uppercase">
        <span>{caption}</span>
        <span className="h-px w-6 bg-line" />
      </div>
    </div>
  );
}
