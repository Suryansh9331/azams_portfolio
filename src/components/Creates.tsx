import { SectionShell } from "./shared/SectionShell";

const words = [
  "Attention",
  "Reaction",
  "Engagement",
  "Memory",
  "Brand interaction",
  "Moments worth filming",
];

export function Creates() {
  return (
    <SectionShell id="creates" label="What Azam Creates" page="11">
      <p className="mb-6 text-[11px] tracking-[0.3em] text-silver-dim uppercase sm:mb-8">
        A brand does not book a magician.
      </p>

      <h2 className="font-display flex flex-wrap items-baseline gap-y-2 text-3xl leading-[1.15] font-medium text-silver sm:text-4xl md:text-5xl lg:text-6xl xl:text-[80px] xl:leading-[1.1]">
        {words.map((w, i) => (
          <span key={w} className="whitespace-nowrap">
            {i > 0 ? (
              <span className="mx-2 text-accent opacity-70 sm:mx-3 lg:mx-4">
                /
              </span>
            ) : null}
            {w}
            {i === words.length - 1 ? (
              <span className="text-accent">.</span>
            ) : null}
          </span>
        ))}
      </h2>

      <p className="mt-10 max-w-xl text-sm leading-relaxed text-silver-dim sm:mt-14">
        Everything is built around the guest — what they feel in the moment, and
        what they repeat afterwards.
      </p>
    </SectionShell>
  );
}
