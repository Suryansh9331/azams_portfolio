import { SectionShell } from "./shared/SectionShell";
import { processSteps } from "../data/content";

export function Process() {
  return (
    <SectionShell id="process" label="How a Collaboration Works" page="13">
      <h2 className="font-display text-3xl font-medium text-silver sm:text-4xl md:text-5xl">
        Predictable process.{" "}
        <span className="italic">Unpredictable moment.</span>
      </h2>

      <div className="relative mt-16 md:mt-24">
        <div className="absolute top-0 bottom-0 left-[5px] w-px bg-line md:top-[18px] md:right-0 md:bottom-auto md:left-0 md:h-px md:w-auto" />

        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-8 lg:gap-10">
          {processSteps.map((s) => (
            <div
              key={s.n}
              className="relative flex flex-col gap-4 pl-8 md:gap-6 md:pl-0"
            >
              <div className="relative md:flex md:flex-col md:gap-6">
                <span className="text-[11px] tracking-[0.3em] text-muted">
                  {s.n}
                </span>
                <div className="absolute top-1 -left-8 h-[11px] w-[11px] rounded-full bg-silver shadow-[0_0_12px_rgba(220,225,240,0.5)] md:static md:mt-6 md:h-2 md:w-2" />
              </div>
              <h3 className="font-display text-xl font-medium text-silver sm:text-2xl lg:text-3xl">
                {s.title}
              </h3>
              <p className="max-w-xs text-sm leading-relaxed text-silver-dim">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
