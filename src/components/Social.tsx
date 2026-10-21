import { SectionShell } from "./shared/SectionShell";
import { BarMeter } from "./shared/BarMeter";
import { SocialIcon } from "./shared/SocialIcon";
import { socials, ageGroups, topCountries } from "../data/content";

export function Social() {
  return (
    <SectionShell id="social" label="Audience & Social Presence" page="04">
      <div
        className="grid grid-cols-2 divide-x divide-y divide-line sm:grid-cols-3 lg:grid-cols-5 lg:divide-y-0"
        style={{
          border: "1px solid var(--color-line)",
        }}
      >
          {socials.map((s) => (
            <a
              key={s.platform}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col gap-5 px-5 py-7 transition-colors hover:bg-line-soft sm:px-6 sm:py-8 lg:gap-7 lg:px-7 lg:py-9"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <SocialIcon
                    platform={s.platform}
                    className="h-5 w-5 text-silver sm:h-[22px] sm:w-[22px]"
                  />
                  <span className="text-[11px] font-medium tracking-[0.18em] text-silver-dim uppercase sm:text-xs">
                    {s.platform}
                  </span>
                </div>
                <span className="text-muted transition-colors group-hover:text-silver">
                  ↗
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-display text-4xl leading-none font-medium text-silver sm:text-5xl lg:text-6xl">
                  {s.followers}
                </span>
                <span className="text-[10px] tracking-[0.22em] text-muted uppercase">
                  Followers
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-12 lg:mt-20 lg:grid-cols-[1fr_1.3fr_1.5fr] lg:gap-12">
        <div>
          <p className="mb-5 text-[11px] tracking-[0.22em] text-muted uppercase">
            Engagement Rate
          </p>
          <div className="flex items-end gap-2">
            <span className="font-display text-7xl leading-none font-medium text-silver sm:text-8xl lg:text-[160px]">
              92
            </span>
            <span className="pb-4 font-display text-2xl font-normal text-silver-dim lg:text-3xl">
              %
            </span>
          </div>
        </div>

        <div>
          <p className="mb-6 text-[11px] tracking-[0.22em] text-muted uppercase">
            Age Groups
          </p>
          <div className="flex flex-col gap-4 sm:gap-5">
            {ageGroups.map((g) => (
              <BarMeter key={g.label} label={g.label} value={g.value} labelWidth="sm" />
            ))}
          </div>
        </div>

        <div className="rounded-sm bg-[rgba(14,19,36,0.5)] p-5 sm:p-6 md:p-8">
          <p className="mb-6 text-[11px] tracking-[0.22em] text-muted uppercase">
            Top Countries
          </p>
          <div className="flex flex-col gap-3 sm:gap-4">
            {topCountries.map((c) => (
              <BarMeter key={c.label} label={c.label} value={c.value} labelWidth="lg" />
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
