import { SectionShell } from "./shared/SectionShell";
import { whyBrands } from "../data/content";

export function WhyBrands() {
  return (
    <SectionShell id="why-brands" label="Why Brands Choose Azam" page="10">
      <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-14">
        {whyBrands.map((item) => (
          <div key={item.n} className="flex flex-col gap-4">
            <div className="h-px w-full bg-line" />
            <span className="text-[11px] tracking-[0.3em] text-muted">
              {item.n}
            </span>
            <h3 className="font-display text-xl leading-tight font-medium text-silver sm:text-2xl lg:text-[26px]">
              {item.title}
            </h3>
            <p className="max-w-sm text-sm leading-relaxed text-silver-dim">
              {item.body}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-20 grid grid-cols-1 items-end gap-8 border-t border-line pt-10 sm:grid-cols-2 sm:gap-10">
        <div className="flex items-baseline gap-4 sm:gap-5">
          <span className="font-display text-4xl leading-none font-medium text-silver sm:text-5xl lg:text-6xl">
            7M+
          </span>
          <span className="text-[11px] tracking-[0.22em] text-muted uppercase">
            Social Media Followers
          </span>
        </div>
        <div className="flex items-baseline gap-4 sm:gap-5 sm:justify-center">
          <span className="font-display text-4xl leading-none font-medium text-silver sm:text-5xl lg:text-6xl">
            UAE
          </span>
          <span className="text-[11px] tracking-[0.22em] text-muted uppercase">
            Golden Visa Holder
          </span>
        </div>
      </div>
    </SectionShell>
  );
}
