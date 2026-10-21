import { BarMeter } from "./shared/BarMeter";
import { SocialIcon } from "./shared/SocialIcon";
import { socials, ageGroups, topCountries } from "../data/content";
import { useInView } from "../hooks/useInView";

export function Social() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`social-reveal relative ${inView ? "in-view" : ""}`}
    >
      <section
        id="social"
        className="relative mx-auto grid min-h-screen w-full max-w-[1680px] grid-rows-[auto_1fr] px-5 py-20 sm:px-6 md:px-8 md:py-24 lg:px-10 lg:py-32 xl:px-14"
      >
        <div className="mb-12 md:mb-16 lg:mb-20">
          <p className="social-section-label text-[10px] font-medium tracking-[0.24em] text-muted uppercase sm:text-[11px]">
            Audience & Social Presence
          </p>
          <div className="social-rail mt-3 h-px w-24 bg-line sm:w-32" />
        </div>

        <div className="flex min-h-0 flex-col justify-center">
          <div className="social-cards-grid grid grid-cols-2 divide-x divide-y divide-line border-t border-b border-line sm:grid-cols-3 lg:grid-cols-5 lg:divide-y-0">
            <div className="social-spotlight" aria-hidden="true" />
            {socials.map((s) => (
              <a
                key={s.platform}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-card group relative z-[1] flex flex-col gap-5 px-5 py-7 transition-colors hover:bg-line-soft sm:px-6 sm:py-8 lg:gap-7 lg:px-7 lg:py-9"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="social-icon inline-flex">
                      <SocialIcon
                        platform={s.platform}
                        className="h-5 w-5 text-silver sm:h-[22px] sm:w-[22px]"
                      />
                    </span>
                    <span className="text-[11px] font-medium tracking-[0.18em] text-silver-dim uppercase sm:text-xs">
                      {s.platform}
                    </span>
                  </div>
                  <span className="text-muted transition-colors group-hover:text-silver">
                    ↗
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="social-number font-display text-4xl leading-none font-medium text-silver sm:text-5xl lg:text-6xl">
                    {s.followers}
                  </span>
                  <span className="social-sublabel text-[10px] tracking-[0.22em] text-muted uppercase">
                    Followers
                  </span>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-16 grid grid-cols-1 gap-12 lg:mt-20 lg:grid-cols-[1fr_1.3fr_1.5fr] lg:gap-12">
            <div>
              <p className="social-engagement-label mb-5 text-[11px] tracking-[0.22em] text-muted uppercase">
                Engagement Rate
              </p>
              <div className="flex items-end gap-2">
                <span className="social-engagement-value font-display text-7xl leading-none font-medium text-silver sm:text-8xl lg:text-[160px]">
                  92
                </span>
                <span className="social-engagement-percent pb-4 font-display text-2xl font-normal text-silver-dim lg:text-3xl">
                  %
                </span>
              </div>
            </div>

            <div>
              <p className="social-group-label mb-6 text-[11px] tracking-[0.22em] text-muted uppercase">
                Age Groups
              </p>
              <div className="flex flex-col gap-4 sm:gap-5">
                {ageGroups.map((g) => (
                  <div key={g.label} className="social-ag-bar social-bar">
                    <BarMeter label={g.label} value={g.value} labelWidth="sm" />
                  </div>
                ))}
              </div>
            </div>

            <div className="social-countries-panel rounded-sm bg-[rgba(14,19,36,0.5)] p-5 sm:p-6 md:p-8">
              <p className="social-group-label mb-6 text-[11px] tracking-[0.22em] text-muted uppercase">
                Top Countries
              </p>
              <div className="flex flex-col gap-3 sm:gap-4">
                {topCountries.map((c) => (
                  <div key={c.label} className="social-cn-bar social-bar">
                    <BarMeter label={c.label} value={c.value} labelWidth="lg" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute right-5 bottom-5 flex flex-col items-end gap-1 text-[10px] tracking-[0.3em] text-muted uppercase sm:right-8 md:right-12 md:bottom-8 lg:right-16 lg:bottom-10">
          <span className="font-display text-sm tracking-[0.4em] text-silver-dim">
            AZAM
          </span>
          <span>04</span>
        </div>
      </section>
    </div>
  );
}
