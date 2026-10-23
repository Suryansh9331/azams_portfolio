import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { brandGroups, type BrandGroup } from "../data/brands";
import { getLogo } from "../data/logos";
import { useInView } from "../hooks/useInView";

type IndustryKey = BrandGroup["id"];

const ICONS: Record<IndustryKey, ReactNode> = {
  "global-brands": <GlobeIcon />,
  hospitality: <HotelIcon />,
  "real-estate": <BuildingIcon />,
  events: <FlagIcon />,
  media: <BroadcastIcon />,
};

// Short label for the industry cards (the full `label` is used in the detail header).
const SHORT_LABEL: Record<IndustryKey, string> = {
  "global-brands": "Global Brands",
  hospitality: "Hospitality",
  "real-estate": "Real Estate",
  events: "Govt & Events",
  media: "Media",
};

export function Industries() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.1 });
  const [activeId, setActiveId] = useState<IndustryKey>(brandGroups[0].id);

  const active = useMemo(
    () => brandGroups.find((g) => g.id === activeId) ?? brandGroups[0],
    [activeId],
  );

  return (
    <section
      ref={ref}
      id="industries"
      className={`industries-reveal relative overflow-hidden bg-ink-950 py-16 sm:py-20 md:py-24 lg:py-28 ${
        inView ? "in-view" : ""
      }`}
    >
      <div className="mx-auto w-full max-w-[1680px] px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10">
        {/* Header */}
        <div className="mb-10 md:mb-14 lg:mb-16">
          <p className="industries-label text-[13px] font-medium tracking-[0.24em] text-muted uppercase sm:text-[14px] md:text-[15px] lg:text-[16px]">
            Trusted by the World
          </p>
          <div className="industries-rail mt-3 h-px w-24 bg-line sm:w-32" />
          <h3 className="industries-headline mt-6 font-display text-2xl leading-[1.15] font-normal text-silver sm:text-3xl md:text-4xl lg:text-5xl">
            Pick an industry,{" "}
            <span className="italic text-silver-dim">meet the partners.</span>
          </h3>
          <p className="industries-sub mt-4 max-w-xl text-[13px] leading-relaxed text-silver-dim sm:text-sm">
            Luxury hospitality, government, real-estate, media and global
            consumer brands — tap a tile to see who's hosted Azam on their
            rooms, screens and stages.
          </p>
        </div>

        {/* Industry selector */}
        <div
          role="tablist"
          aria-label="Industries"
          className="industries-grid grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-5 lg:gap-4"
        >
          {brandGroups.map((group) => {
            const isActive = group.id === activeId;
            return (
              <button
                key={group.id}
                role="tab"
                type="button"
                aria-selected={isActive}
                aria-controls={`industry-panel-${group.id}`}
                id={`industry-tab-${group.id}`}
                onClick={() => setActiveId(group.id)}
                className={`industry-card group relative flex aspect-[5/4] flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border px-3 py-3 text-center transition-all duration-300 ease-out sm:aspect-[4/3] sm:gap-3 sm:px-4 sm:py-4 ${
                  isActive
                    ? "border-accent/60 bg-[rgba(138,160,255,0.08)] shadow-[0_10px_30px_rgba(138,160,255,0.15)]"
                    : "border-line bg-ink-900/60 hover:border-silver-dim/50 hover:bg-ink-800/70 hover:-translate-y-0.5"
                }`}
              >
                {/* Soft glow on active */}
                {isActive && (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-70"
                    style={{
                      backgroundImage:
                        "radial-gradient(ellipse at center top, rgba(138,160,255,0.18) 0%, transparent 65%)",
                    }}
                  />
                )}

                <span
                  className={`relative flex h-9 w-9 items-center justify-center rounded-full border transition-colors duration-300 sm:h-10 sm:w-10 md:h-11 md:w-11 ${
                    isActive
                      ? "border-accent/60 bg-accent/15 text-silver"
                      : "border-line text-silver-dim group-hover:border-silver-dim group-hover:text-silver"
                  }`}
                >
                  {ICONS[group.id as IndustryKey]}
                </span>

                <span
                  className={`relative text-[11px] font-medium tracking-[0.08em] uppercase sm:text-[12px] md:text-[13px] ${
                    isActive ? "text-silver" : "text-silver-dim"
                  }`}
                >
                  {SHORT_LABEL[group.id as IndustryKey]}
                </span>

                <span
                  className={`relative font-numeric text-[11px] font-medium transition-colors duration-300 sm:text-[12px] ${
                    isActive ? "text-accent" : "text-muted"
                  }`}
                >
                  {group.items.length} brand{group.items.length === 1 ? "" : "s"}
                </span>
              </button>
            );
          })}
        </div>

        {/* Divider */}
        <div className="industries-divider mt-10 h-px w-full bg-line/70 md:mt-14" />

        {/* Panel: logos for the selected industry */}
        <div
          key={active.id}
          role="tabpanel"
          id={`industry-panel-${active.id}`}
          aria-labelledby={`industry-tab-${active.id}`}
          className="industries-panel mt-8 md:mt-12"
        >
          <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 md:mb-8">
            <h4 className="industries-panel-title font-display text-xl font-normal text-silver sm:text-2xl md:text-3xl">
              {active.label}
            </h4>
            <span className="text-[11px] tracking-[0.22em] text-muted uppercase sm:text-[12px]">
              <span className="font-numeric text-silver-dim">
                {active.items.length}
              </span>{" "}
              partners
            </span>
          </div>

          <div className="industries-logo-grid grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3 md:grid-cols-5 md:gap-3 lg:grid-cols-6 lg:gap-4 xl:grid-cols-7">
            {active.items.map((item, i) => {
              const src = getLogo(active.folder, item.slug);
              return (
                <div
                  key={item.slug}
                  className="industries-logo-cell flex aspect-[4/3] items-center justify-center rounded-md bg-white px-2 py-1.5 shadow-[0_4px_14px_rgba(0,0,0,0.3)] transition-transform duration-300 hover:scale-[1.04] sm:aspect-[16/10] sm:rounded-lg sm:px-3 sm:py-2"
                  style={{ "--logo-delay": `${i * 32}ms` } as React.CSSProperties}
                >
                  {src ? (
                    <img
                      src={src}
                      alt={item.name}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <span className="text-center text-[10px] font-semibold tracking-wide text-neutral-800">
                      {item.name}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute right-4 bottom-5 flex flex-col items-end gap-1 text-[10px] tracking-[0.3em] text-muted uppercase sm:right-5 md:right-6 md:bottom-8 lg:right-8 lg:bottom-10">
        <span className="font-display text-sm tracking-[0.4em] text-silver-dim">
          AZAM
        </span>
        <span>06</span>
      </div>
    </section>
  );
}

/* === Minimal line icons (currentColor so they match active/inactive state) === */

function GlobeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 sm:h-[18px] sm:w-[18px] md:h-5 md:w-5"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a13 13 0 010 18M12 3a13 13 0 000 18" />
    </svg>
  );
}

function HotelIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 sm:h-[18px] sm:w-[18px] md:h-5 md:w-5"
      aria-hidden
    >
      <path d="M3 20h18" />
      <path d="M5 20V7l7-4 7 4v13" />
      <path d="M9 10h2M13 10h2M9 14h2M13 14h2" />
      <path d="M11 20v-3h2v3" />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 sm:h-[18px] sm:w-[18px] md:h-5 md:w-5"
      aria-hidden
    >
      <path d="M3 20h18" />
      <path d="M5 20V5h8v15" />
      <path d="M13 20V9h6v11" />
      <path d="M7 8h2M7 11h2M7 14h2M15 12h2M15 15h2" />
    </svg>
  );
}

function FlagIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 sm:h-[18px] sm:w-[18px] md:h-5 md:w-5"
      aria-hidden
    >
      <path d="M5 21V4" />
      <path d="M5 4h11l-2 4 2 4H5" />
      <circle cx="18" cy="18" r="1.5" />
    </svg>
  );
}

function BroadcastIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 sm:h-[18px] sm:w-[18px] md:h-5 md:w-5"
      aria-hidden
    >
      <circle cx="12" cy="12" r="2" />
      <path d="M8.5 8.5a5 5 0 000 7" />
      <path d="M15.5 8.5a5 5 0 010 7" />
      <path d="M5.5 5.5a9 9 0 000 13" />
      <path d="M18.5 5.5a9 9 0 010 13" />
    </svg>
  );
}
