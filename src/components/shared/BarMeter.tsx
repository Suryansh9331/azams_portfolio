type Props = {
  label: string;
  value: number;
};

export function BarMeter({ label, value }: Props) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div className="grid grid-cols-[70px_1fr] items-center gap-3 sm:grid-cols-[100px_1fr] sm:gap-4 md:grid-cols-[140px_1fr] md:gap-6">
      <span className="text-[11px] tracking-[0.1em] text-silver-dim uppercase sm:text-xs md:text-sm">
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
