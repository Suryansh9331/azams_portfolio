import { useEffect, useRef } from "react";
import { reels, type Reel } from "../data/reels";
import { useInView } from "../hooks/useInView";

export function Reels() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`reels-reveal relative overflow-hidden bg-ink-950 py-20 sm:py-24 md:py-28 lg:py-32 ${
        inView ? "in-view" : ""
      }`}
    >
      <div className="mx-auto mb-12 w-full max-w-[1680px] px-5 sm:px-6 md:mb-16 md:px-8 lg:mb-20 lg:px-10 xl:px-14">
        <p className="reels-label text-[13px] font-medium tracking-[0.24em] text-muted uppercase sm:text-[14px] md:text-[15px] lg:text-[16px]">
          Reels
        </p>
        <div className="reels-rail mt-3 h-px w-24 bg-line sm:w-32" />
        <h3 className="reels-headline mt-6 font-display text-3xl leading-[1.1] font-normal text-silver sm:text-4xl md:text-5xl lg:text-6xl">
          Moments{" "}
          <span className="italic text-silver-dim">worth filming.</span>
        </h3>
        <p className="reels-sub mt-5 max-w-xl text-[13px] leading-relaxed text-silver-dim sm:text-sm">
          A rolling look at Azam's latest brand activations and stage moments —
          hover to pause, tap any clip to watch the full reel on Instagram.
        </p>
      </div>

      <div className="reels-marquee group relative w-full overflow-hidden">
        <div
          className="reels-marquee-track flex w-max gap-4 sm:gap-5 md:gap-6"
          style={{ ["--marquee-duration" as string]: "70s" }}
        >
          {reels.map((reel, i) => (
            <ReelCard key={`a-${reel.id}-${i}`} reel={reel} />
          ))}
          {reels.map((reel, i) => (
            <ReelCard
              key={`b-${reel.id}-${i}`}
              reel={reel}
              aria-hidden={true}
            />
          ))}
        </div>

        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10"
          aria-hidden
          style={{
            width: "var(--section-left-gap, 1.25rem)",
            backgroundImage:
              "linear-gradient(to right, rgba(5,7,12,1) 0%, rgba(5,7,12,1) 55%, rgba(5,7,12,0) 100%)",
          }}
        />
      </div>

      <div className="pointer-events-none absolute right-5 bottom-5 flex flex-col items-end gap-1 text-[10px] tracking-[0.3em] text-muted uppercase sm:right-8 md:right-12 md:bottom-8 lg:right-16 lg:bottom-10">
        <span className="font-display text-sm tracking-[0.4em] text-silver-dim">
          AZAM
        </span>
        <span>05</span>
      </div>
    </div>
  );
}

function ReelCard({
  reel,
  "aria-hidden": ariaHidden,
}: {
  reel: Reel;
  "aria-hidden"?: boolean;
}) {
  const { ref, inView } = useInView<HTMLAnchorElement>({ threshold: 0.3 });
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (inView) {
      video.play().catch(() => {
        /* autoplay rejected */
      });
    } else {
      video.pause();
    }
  }, [inView]);

  return (
    <a
      ref={ref}
      href={reel.instagramUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaHidden ? undefined : `View ${reel.caption} on Instagram`}
      aria-hidden={ariaHidden}
      tabIndex={ariaHidden ? -1 : undefined}
      className="reel-card group/card relative block flex-shrink-0 overflow-hidden rounded-lg border border-line/70 bg-ink-900 shadow-[0_18px_42px_rgba(0,0,0,0.6)] ring-1 ring-silver-dim/0 transition-all duration-500 ease-out hover:scale-[1.015] hover:ring-silver-dim/40"
    >
      <div className="relative aspect-[9/16] w-[220px] sm:w-[240px] md:w-[270px] lg:w-[290px] xl:w-[310px]">
        <video
          ref={videoRef}
          src={reel.video}
          poster={reel.poster}
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(5,7,12,0.4) 0%, rgba(5,7,12,0) 22%, rgba(5,7,12,0) 55%, rgba(5,7,12,0.9) 100%)",
          }}
        />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 ring-1 ring-inset ring-accent/40 transition-opacity duration-500 group-hover/card:opacity-100"
        />

        <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full border border-silver-dim/15 bg-ink-950/70 px-2.5 py-1 backdrop-blur-md sm:top-4 sm:left-4">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          <span className="text-[9px] font-medium tracking-[0.24em] text-silver uppercase">
            Reel
          </span>
        </div>

        <div className="absolute right-3 bottom-3 left-3 flex items-end justify-between gap-3 sm:right-4 sm:bottom-4 sm:left-4">
          <div className="flex min-w-0 flex-col gap-1">
            <span className="text-[9px] tracking-[0.3em] text-silver-dim uppercase">
              @azam.magic
            </span>
            <span className="truncate text-[11px] font-medium tracking-[0.14em] text-silver uppercase drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)] sm:text-[12px]">
              {reel.caption}
            </span>
          </div>
          <span
            aria-hidden
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-silver-dim/25 bg-ink-950/70 text-silver backdrop-blur-md transition-all duration-300 group-hover/card:border-silver-dim/60 group-hover/card:bg-ink-900/90 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 sm:h-9 sm:w-9"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3.5 w-3.5 sm:h-4 sm:w-4"
            >
              <path d="M7 17L17 7" />
              <path d="M8 7h9v9" />
            </svg>
          </span>
        </div>
      </div>
    </a>
  );
}
