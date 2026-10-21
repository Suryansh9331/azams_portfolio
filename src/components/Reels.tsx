import { useEffect, useRef } from "react";
import { reels, type Reel } from "../data/reels";
import { useInView } from "../hooks/useInView";

export function Reels() {
  const { ref: sectionRef, inView } = useInView<HTMLDivElement>();
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.75;
    el.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div
      ref={sectionRef}
      className={`reels-reveal relative ${inView ? "in-view" : ""}`}
    >
      <section
        id="reels"
        className="relative mx-auto w-full max-w-[1680px] px-5 py-20 sm:px-6 md:px-8 md:py-24 lg:px-10 lg:py-32 xl:px-14"
      >
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between md:mb-14 lg:mb-16">
          <div>
            <p className="reels-label text-[13px] font-medium tracking-[0.24em] text-muted uppercase sm:text-[14px] md:text-[15px] lg:text-[16px]">
              Reels
            </p>
            <div className="reels-rail mt-3 h-px w-24 bg-line sm:w-32" />
            <h3 className="reels-headline mt-6 font-display text-3xl leading-[1.1] font-normal text-silver sm:text-4xl md:text-5xl lg:text-6xl">
              Moments <span className="italic text-silver-dim">worth filming.</span>
            </h3>
          </div>

          <div className="reels-controls hidden items-center gap-3 md:flex">
            <ScrollButton direction="left" onClick={() => scroll("left")} />
            <ScrollButton direction="right" onClick={() => scroll("right")} />
          </div>
        </div>

        <div className="relative">
          <div
            ref={scrollerRef}
            className="reels-scroller flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-4 sm:gap-5 md:gap-6"
          >
            {reels.map((reel, i) => (
              <ReelCard key={reel.id} reel={reel} index={i} />
            ))}
            <div className="shrink-0 pr-2 sm:pr-4" aria-hidden />
          </div>

          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-ink-950 to-transparent sm:w-16"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-ink-950 to-transparent sm:w-16"
            aria-hidden
          />
        </div>

        <div className="pointer-events-none absolute right-5 bottom-5 flex flex-col items-end gap-1 text-[10px] tracking-[0.3em] text-muted uppercase sm:right-8 md:right-12 md:bottom-8 lg:right-16 lg:bottom-10">
          <span className="font-display text-sm tracking-[0.4em] text-silver-dim">
            AZAM
          </span>
          <span>R</span>
        </div>
      </section>
    </div>
  );
}

function ScrollButton({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "left" ? "Previous reels" : "Next reels"}
      className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-line text-silver transition-all duration-300 hover:border-silver-dim hover:bg-line-soft lg:h-12 lg:w-12"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(138,160,255,0.18) 0%, transparent 70%)",
        }}
      />
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="relative h-4 w-4 lg:h-[18px] lg:w-[18px]"
      >
        {direction === "left" ? (
          <>
            <path d="M19 12H5" />
            <path d="M12 19l-7-7 7-7" />
          </>
        ) : (
          <>
            <path d="M5 12h14" />
            <path d="M12 5l7 7-7 7" />
          </>
        )}
      </svg>
    </button>
  );
}

function ReelCard({ reel, index }: { reel: Reel; index: number }) {
  const { ref, inView } = useInView<HTMLAnchorElement>({ threshold: 0.4 });
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (inView) {
      video.play().catch(() => {
        /* autoplay rejected — ignore */
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
      aria-label={`View ${reel.caption} on Instagram`}
      className="reel-card group relative block flex-shrink-0 snap-start overflow-hidden rounded-md border border-line bg-ink-900 shadow-[0_14px_38px_rgba(0,0,0,0.55)] transition-transform duration-500 ease-out hover:scale-[1.02]"
      style={{ ["--i" as string]: String(index) }}
    >
      <div className="relative aspect-[9/16] w-[220px] sm:w-[240px] md:w-[260px] lg:w-[280px] xl:w-[300px]">
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
              "linear-gradient(180deg, rgba(5,7,12,0.35) 0%, rgba(5,7,12,0) 25%, rgba(5,7,12,0) 55%, rgba(5,7,12,0.85) 100%)",
          }}
        />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 ring-1 ring-silver-dim/30 transition-opacity duration-300 group-hover:opacity-100"
        />

        <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-ink-950/70 px-2.5 py-1 backdrop-blur-md sm:top-4 sm:left-4">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          <span className="text-[9px] font-medium tracking-[0.22em] text-silver uppercase">
            Reel
          </span>
        </div>

        <div className="absolute right-3 bottom-3 left-3 flex items-end justify-between gap-2 sm:right-4 sm:bottom-4 sm:left-4">
          <span className="text-[10px] tracking-[0.18em] text-silver uppercase drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)] sm:text-[11px]">
            {reel.caption}
          </span>
          <span
            aria-hidden
            className="flex h-7 w-7 items-center justify-center rounded-full bg-ink-950/70 text-silver backdrop-blur-md transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:h-8 sm:w-8"
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
