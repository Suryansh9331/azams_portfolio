import { SectionShell } from "./shared/SectionShell";
import thirdSectionImg from "../assets/third-section.png";

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
          <div className="grid grid-cols-1 divide-y divide-line/60 md:grid-cols-3 md:divide-x md:divide-y-0">
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
      ? "md:pr-8 lg:pr-10"
      : "py-10 md:py-0 md:px-8 lg:px-10";
  return (
    <div className={`flex flex-col gap-5 ${pad}`}>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="font-display text-5xl leading-none font-medium text-silver sm:text-6xl md:text-5xl lg:text-6xl xl:text-[88px]">
          {value}
        </span>
        {tail ? (
          <span className="font-display text-xl leading-none font-normal text-silver-dim sm:text-2xl md:text-xl lg:text-2xl xl:text-4xl">
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
      <img
        src={thirdSectionImg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center opacity-80"
      />

      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(5,7,12,0.72) 0%, rgba(5,7,12,0.2) 30%, rgba(5,7,12,0.15) 55%, rgba(5,7,12,0.5) 88%, rgba(5,7,12,0.92) 100%)",
        }}
      />

      <div
        className="absolute inset-y-0 left-0 w-[18%]"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(5,7,12,0.6) 0%, rgba(5,7,12,0) 100%)",
        }}
      />
      <div
        className="absolute inset-y-0 right-0 w-[18%]"
        style={{
          backgroundImage:
            "linear-gradient(270deg, rgba(5,7,12,0.6) 0%, rgba(5,7,12,0) 100%)",
        }}
      />
    </div>
  );
}
