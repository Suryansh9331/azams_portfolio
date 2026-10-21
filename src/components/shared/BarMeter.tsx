type Props = {
  label: string;
  value: number;
  labelWidth?: "sm" | "md" | "lg";
};

const widthMap: Record<NonNullable<Props["labelWidth"]>, string> = {
  sm: "grid-cols-[55px_1fr] sm:grid-cols-[70px_1fr] md:grid-cols-[80px_1fr]",
  md: "grid-cols-[70px_1fr] sm:grid-cols-[100px_1fr] md:grid-cols-[140px_1fr]",
  lg: "grid-cols-[140px_1fr] sm:grid-cols-[160px_1fr] md:grid-cols-[200px_1fr]",
};

export function BarMeter({ label, value, labelWidth = "md" }: Props) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div
      className={`grid items-center gap-4 sm:gap-5 md:gap-6 ${widthMap[labelWidth]}`}
    >
      <span className="text-[11px] tracking-[0.1em] whitespace-nowrap text-silver-dim uppercase sm:text-xs md:text-sm">
        {label}
      </span>
      <div className="relative h-[3px] w-full overflow-hidden rounded-full bg-line-soft">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-accent via-silver-dim to-silver"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
