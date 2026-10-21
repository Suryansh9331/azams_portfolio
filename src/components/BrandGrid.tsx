import { SectionShell } from "./shared/SectionShell";
import { LogoTile } from "./shared/LogoTile";
import type { BrandGroup } from "../data/brands";

const colClassMap: Record<number, string> = {
  3: "grid-cols-2 sm:grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4",
  5: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",
  6: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6",
};

export function BrandGrid({ group }: { group: BrandGroup }) {
  const cols = colClassMap[group.columns] ?? colClassMap[5];
  return (
    <SectionShell id={group.id} label={group.label} page={group.page}>
      <div className={`grid gap-3 sm:gap-4 md:gap-5 lg:gap-6 ${cols}`}>
        {group.items.map((name) => (
          <LogoTile key={name} name={name} />
        ))}
      </div>
    </SectionShell>
  );
}
