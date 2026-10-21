import { SectionShell } from "./shared/SectionShell";
import { formats } from "../data/content";

export function Formats() {
  return (
    <SectionShell id="formats" label="Experience Formats" page="12">
      <div
        className="pointer-events-none absolute inset-0 -z-0"
        aria-hidden="true"
      >
        <div
          className="absolute top-0 left-0 h-[45%] w-[42%]"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 60% 70% at 22% 18%, rgba(45,70,140,0.11) 0%, rgba(25,40,95,0.05) 35%, rgba(10,16,34,0) 72%)",
          }}
        />
      </div>

      <div className="relative border-t border-line">
        {formats.map((f) => (
          <div
            key={f.n}
            className="group grid grid-cols-[auto_1fr] items-baseline gap-x-3 gap-y-3 border-b border-line py-6 transition-colors hover:bg-line-soft sm:gap-x-5 sm:py-8 md:grid-cols-[60px_1.4fr_2fr] md:gap-x-8 md:py-10 lg:grid-cols-[80px_1.2fr_2fr] lg:gap-x-10"
          >
            <span className="text-[11px] tracking-[0.3em] text-muted">
              {f.n}
            </span>
            <h3 className="font-display text-xl font-medium text-silver sm:text-2xl md:text-3xl lg:text-4xl">
              {f.title}
            </h3>
            <p className="col-span-2 text-sm leading-relaxed text-silver-dim md:col-span-1 md:text-base">
              {f.body}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-8 text-sm text-silver-dim sm:mt-10">
        Every format is scaled to the room, the audience and the brand
        objective.
      </p>
    </SectionShell>
  );
}
