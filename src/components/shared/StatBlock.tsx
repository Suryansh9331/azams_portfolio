type Props = {
  value: string;
  label: string;
  size?: "md" | "lg";
};

export function StatBlock({ value, label, size = "md" }: Props) {
  const valueClass =
    size === "lg"
      ? "text-5xl md:text-7xl"
      : "text-3xl md:text-5xl";
  return (
    <div className="flex flex-col gap-2">
      <span
        className={`font-display font-medium text-silver ${valueClass}`}
      >
        {value}
      </span>
      <span className="text-[10px] font-medium tracking-[0.22em] text-muted uppercase md:text-xs">
        {label}
      </span>
    </div>
  );
}
