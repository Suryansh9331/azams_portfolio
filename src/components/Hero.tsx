import heroBanner from "../assets/hero-banner.webp";
import heroBannerMobile from "../assets/hero-banner-mobile.webp";

export function Hero() {
  return (
    <section className="relative flex min-h-svh w-full items-center justify-center overflow-hidden bg-ink-950">
      <picture className="hero-image absolute inset-0 h-full w-full">
        <source media="(min-width: 1024px)" srcSet={heroBanner} />
        <img
          src={heroBannerMobile}
          alt="Azam on stage"
          className="absolute inset-0 h-full w-full object-contain object-center sm:object-cover"
          fetchPriority="high"
        />
      </picture>

      <div
        className="hero-overlay absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(5,7,12,0.55) 0%, rgba(5,7,12,0.1) 22%, rgba(5,7,12,0.05) 55%, rgba(5,7,12,0.7) 88%, rgba(5,7,12,0.98) 100%)",
        }}
      />
      <div
        className="hero-overlay absolute inset-y-0 left-0 w-[18%]"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(5,7,12,0.55) 0%, rgba(5,7,12,0) 100%)",
        }}
      />
      <div
        className="hero-overlay absolute inset-y-0 right-0 w-[18%]"
        style={{
          backgroundImage:
            "linear-gradient(270deg, rgba(5,7,12,0.55) 0%, rgba(5,7,12,0) 100%)",
        }}
      />

      <div className="relative z-10 flex min-h-svh w-full max-w-[1680px] flex-col px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10">
        <div className="flex items-center justify-center pt-6 sm:pt-8 md:pt-10">
          <div className="flex items-center gap-2 text-center text-[10px] tracking-[0.22em] text-silver-dim uppercase sm:gap-4 sm:text-[11px] sm:tracking-[0.3em] md:text-[13px] md:tracking-[0.4em] md:whitespace-nowrap">
            <span className="hero-rail-left hidden h-px w-8 bg-silver-dim/40 sm:block md:w-10" />
            <span className="hero-tagline">
              Illusionist · Mentalist · Live Experience Creator
            </span>
            <span className="hero-rail-right hidden h-px w-8 bg-silver-dim/40 sm:block md:w-10" />
          </div>
        </div>

        <div className="flex flex-1 flex-col items-center justify-end pb-20 sm:pb-24 md:pb-28 lg:pb-32">
          <h1 className="hero-headline font-display text-center text-[clamp(2.25rem,6.5vw,5.5rem)] leading-[1.1] font-medium italic text-silver drop-shadow-[0_4px_28px_rgba(0,0,0,0.75)]">
            Open the impossible
          </h1>
        </div>

        <div className="flex items-end justify-between pb-5 text-[10px] tracking-[0.25em] text-silver-dim/80 uppercase md:pb-8 md:text-[11px] md:tracking-[0.3em] lg:text-[12px]">
          <span className="hero-foot-left">Worldwide Magician</span>
          <span className="hero-foot-right hidden sm:inline">
            Live Experience Creator
          </span>
        </div>
      </div>
    </section>
  );
}
