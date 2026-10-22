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
    <SectionShell id="creates" label="What Azam Creates" page="08">
      <p className="mb-6 text-[12px] tracking-[0.3em] text-silver-dim uppercase sm:text-[13px] md:text-sm sm:mb-8">
        A brand does not book a magician.
      </p>

      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 -bottom-16 h-64 w-80 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(138,160,255,0.28),rgba(60,80,160,0.08)_40%,transparent_70%)] blur-2xl sm:-right-16 sm:-bottom-20 sm:h-80 sm:w-md lg:h-96 lg:w-xl"
        />
        <h2 className="relative font-display flex flex-wrap items-baseline gap-y-2 text-2xl leading-[1.15] font-medium text-silver sm:text-3xl md:text-4xl lg:text-5xl xl:text-[64px] xl:leading-[1.1]">
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
      </div>

      <p className="mt-10 max-w-xl text-sm leading-relaxed text-silver-dim sm:mt-14">
        Everything is built around the guest — what they feel in the moment, and
        what they repeat afterwards.
      </p>
    </SectionShell>
  );
}
