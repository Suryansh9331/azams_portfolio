import { SectionShell } from "./shared/SectionShell";
import { LogoTile } from "./shared/LogoTile";
import type { BrandGroup } from "../data/brands";
import { getLogo } from "../data/logos";
import { useInView } from "../hooks/useInView";

// Mobile uses 3 columns + a smaller 0.5rem gap so tiles are compact and the
// section doesn't require endless scrolling. Larger breakpoints keep the
// original density per `group.columns`.
const basisClassMap: Record<number, string> = {
  3: "basis-[calc((100%-1rem)/3)] sm:basis-[calc((100%-2rem)/3)]",
  4: "basis-[calc((100%-1rem)/3)] sm:basis-[calc((100%-3rem)/4)] md:basis-[calc((100%-3rem)/4)]",
  5: "basis-[calc((100%-1rem)/3)] sm:basis-[calc((100%-3rem)/4)] md:basis-[calc((100%-3rem)/4)] lg:basis-[calc((100%-4rem)/5)]",
  6: "basis-[calc((100%-1rem)/3)] sm:basis-[calc((100%-3rem)/4)] md:basis-[calc((100%-3rem)/4)] lg:basis-[calc((100%-5rem)/6)]",
};

export function BrandGrid({ group }: { group: BrandGroup }) {
  const basis = basisClassMap[group.columns] ?? basisClassMap[5];
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <SectionShell id={group.id} label={group.label} page={group.page}>
      <div
        ref={ref}
        className={`brand-reveal flex flex-wrap justify-center gap-2 sm:gap-4 ${
          inView ? "in-view" : ""
        }`}
      >
        {group.items.map((item, i) => (
          <div
            key={item.slug}
            className={`brand-cell ${basis} shrink-0 grow-0`}
            style={{ "--brand-delay": `${i * 43}ms` } as React.CSSProperties}
          >
            <LogoTile name={item.name} src={getLogo(group.folder, item.slug)} />
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
