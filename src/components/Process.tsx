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
          <div className="absolute top-0 bottom-0 left-[5px] w-px bg-line md:top-[26px] md:right-0 md:bottom-auto md:left-0 md:h-px md:w-auto" />

          <div className="grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-8 lg:gap-10">
            {processSteps.map((s) => (
              <div
                key={s.n}
                className="relative flex flex-col gap-4 pl-8 md:gap-5 md:pl-0"
              >
                <div className="relative md:flex md:flex-col md:gap-6">
                  <span className="text-[11px] tracking-[0.3em] text-muted">
                    {s.n}
                  </span>
                  <div className="absolute top-1 -left-8 h-[11px] w-[11px] rounded-full bg-silver shadow-[0_0_12px_rgba(220,225,240,0.5)] md:static md:mt-4 md:h-2 md:w-2" />
                </div>
                <h3 className="font-display text-xl font-normal text-silver sm:text-[22px] md:text-2xl lg:text-[26px]">
                  {s.title}
                </h3>
                <p className="max-w-xs text-sm leading-relaxed text-silver-dim">
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
