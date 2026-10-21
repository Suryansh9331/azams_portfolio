import { SectionShell } from "./shared/SectionShell";
import { LogoTile } from "./shared/LogoTile";
import type { BrandGroup } from "../data/brands";
import { getLogo } from "../data/logos";

// Flex-basis per breakpoint. The basis math assumes gap-4 (1rem) on the
// container so a full row of N items fills exactly 100% width; a partial
// trailing row occupies less and is centered by `justify-center`.
const basisClassMap: Record<number, string> = {
  3: "basis-[calc((100%-1rem)/2)] sm:basis-[calc((100%-2rem)/3)]",
  4: "basis-[calc((100%-1rem)/2)] sm:basis-[calc((100%-2rem)/3)] md:basis-[calc((100%-3rem)/4)]",
  5: "basis-[calc((100%-1rem)/2)] sm:basis-[calc((100%-2rem)/3)] md:basis-[calc((100%-3rem)/4)] lg:basis-[calc((100%-4rem)/5)]",
  6: "basis-[calc((100%-1rem)/2)] sm:basis-[calc((100%-2rem)/3)] md:basis-[calc((100%-3rem)/4)] lg:basis-[calc((100%-5rem)/6)]",
};

export function BrandGrid({ group }: { group: BrandGroup }) {
  const basis = basisClassMap[group.columns] ?? basisClassMap[5];
  return (
    <SectionShell id={group.id} label={group.label} page={group.page}>
      <div className="flex flex-wrap justify-center gap-4">
        {group.items.map((item) => (
          <div key={item.slug} className={`${basis} shrink-0 grow-0`}>
            <LogoTile name={item.name} src={getLogo(group.folder, item.slug)} />
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
