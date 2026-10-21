import { SectionShell } from "./shared/SectionShell";
import { processSteps } from "../data/content";

export function Process() {
  return (
    <SectionShell id="process" label="How a Collaboration Works" page="13">
      <div
        className="pointer-events-none absolute inset-0 -z-0"
        aria-hidden="true"
      >
        <div
          className="absolute top-0 left-1/2 h-[55%] w-[55%] -translate-x-1/2"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 65% 75% at 50% 30%, rgba(45,70,140,0.12) 0%, rgba(25,40,95,0.05) 40%, rgba(10,16,34,0) 72%)",
          }}
        />
      </div>

      <div className="relative">
        <h2 className="font-display text-2xl leading-[1.15] font-normal text-silver sm:text-3xl md:text-4xl">
          Predictable process. Unpredictable moment.
        </h2>

        <div className="relative mt-20 md:mt-28 lg:mt-32">
          <div
            className="absolute top-0 bottom-0 left-[6px] w-px bg-line md:top-[30px] md:right-0 md:bottom-auto md:left-0 md:h-px md:w-auto"
          />

          <div className="grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-8 lg:gap-10">
            {processSteps.map((s) => (
              <div
                key={s.n}
                className="relative pl-10 md:pl-0"
              >
                <span className="block text-[11px] tracking-[0.3em] text-muted">
                  {s.n}
                </span>

                <div
                  className="absolute top-1 left-[6px] h-[11px] w-[11px] -translate-x-1/2 rounded-full bg-silver shadow-[0_0_12px_rgba(220,225,240,0.5)] md:top-[30px] md:left-0 md:translate-x-0 md:-translate-y-1/2"
                />

                <h3 className="mt-5 font-display text-xl font-normal text-silver sm:text-[22px] md:mt-14 md:text-2xl lg:text-[26px]">
                  {s.title}
                </h3>

                <p className="mt-3 max-w-xs text-sm leading-relaxed text-silver-dim">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
