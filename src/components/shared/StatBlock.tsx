type Props = {
  value: string;
  label: string;
  size?: "md" | "lg";
};

export function StatBlock({ value, label, size = "md" }: Props) {
  const valueClass =
    size === "lg"
      ? "text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
      : "text-2xl sm:text-3xl md:text-4xl lg:text-5xl";
  return (
    <div className="flex flex-col gap-2">
      <span
        className={`font-numeric font-medium text-silver ${valueClass}`}
      >
        {value}
      </span>
      <span className="text-[11px] font-medium tracking-[0.22em] text-muted uppercase sm:text-[12px] md:text-[13px] lg:text-sm">
        {label}
      </span>
    </div>
  );
}
