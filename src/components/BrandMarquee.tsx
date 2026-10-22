import { brandGroups, type BrandItem, type BrandCategoryFolder } from "../data/brands";
import { getLogo } from "../data/logos";
import { useInView } from "../hooks/useInView";

type ResolvedLogo = BrandItem & { folder: BrandCategoryFolder; src?: string };

// Flatten + resolve all logos across every category.
const allLogos: ResolvedLogo[] = brandGroups.flatMap((group) =>
  group.items.map((item) => ({
    ...item,
    folder: group.folder,
    src: getLogo(group.folder, item.slug),
  })),
);

// Split roughly in half for two rows. Interleave categories so each row has a
// mix of brands (Dior next to Dubai Police looks richer than Dior next to Pepsi).
const rowOne = allLogos.filter((_, i) => i % 2 === 0);
const rowTwo = allLogos.filter((_, i) => i % 2 === 1);

export function BrandMarquee() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.08 });

  return (
    <section
      ref={ref}
      id="brands"
      className={`brand-marquee-reveal relative overflow-hidden bg-ink-950 py-16 sm:py-20 md:py-24 lg:py-28 ${
        inView ? "in-view" : ""
      }`}
    >
      <div className="mx-auto mb-10 w-full max-w-[1680px] px-4 sm:px-5 md:mb-14 md:px-6 lg:mb-16 lg:px-8 xl:px-10">
        <p className="brand-marquee-label text-[13px] font-medium tracking-[0.24em] text-muted uppercase sm:text-[14px] md:text-[15px] lg:text-[16px]">
          Trusted by the World
        </p>
        <div className="brand-marquee-rail mt-3 h-px w-24 bg-line sm:w-32" />
        <h3 className="brand-marquee-headline mt-6 font-display text-2xl leading-[1.15] font-normal text-silver sm:text-3xl md:text-4xl lg:text-5xl">
          Global brands,{" "}
          <span className="italic text-silver-dim">one stage.</span>
        </h3>
        <p className="brand-marquee-sub mt-4 max-w-xl text-[13px] leading-relaxed text-silver-dim sm:text-sm">
          Luxury hospitality, government, real-estate, media and global
          consumer brands — all have hosted Azam on their rooms, screens and
          stages.
        </p>
      </div>

      <MarqueeRow logos={rowOne} direction="left" speed={60} />
      <div className="mt-3 sm:mt-4 md:mt-5">
        <MarqueeRow logos={rowTwo} direction="right" speed={70} />
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

function MarqueeRow({
  logos,
  direction,
  speed,
}: {
  logos: ResolvedLogo[];
  direction: "left" | "right";
  speed: number; // seconds per full loop
}) {
  // Duplicate the list so the translate(-50%) loop is seamless.
  const sequence = [...logos, ...logos];

  return (
    <div className="brand-marquee-row group relative w-full">
      <div
        className="brand-marquee-track flex w-max gap-2 sm:gap-3 md:gap-4"
        style={{
          animationName:
            direction === "left" ? "brand-scroll-left" : "brand-scroll-right",
          animationDuration: `${speed}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
        }}
      >
        {sequence.map((logo, i) => (
          <LogoChip key={`${direction}-${logo.slug}-${i}`} logo={logo} />
        ))}
      </div>

      {/* Left/right edge fades so logos appear and disappear softly, not with a hard clip */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-24 md:w-32 lg:w-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(5,7,12,1) 0%, rgba(5,7,12,0.85) 50%, rgba(5,7,12,0) 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-24 md:w-32 lg:w-40"
        style={{
          backgroundImage:
            "linear-gradient(to left, rgba(5,7,12,1) 0%, rgba(5,7,12,0.85) 50%, rgba(5,7,12,0) 100%)",
        }}
      />
    </div>
  );
}

function LogoChip({ logo }: { logo: ResolvedLogo }) {
  return (
    <div className="brand-marquee-chip group/chip flex aspect-[16/10] w-[92px] shrink-0 items-center justify-center rounded-md bg-white px-2 py-1.5 shadow-[0_6px_18px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:scale-[1.04] sm:w-[115px] sm:px-3 sm:py-2 md:w-[135px] md:rounded-lg lg:w-[160px] lg:px-4 lg:py-2.5 xl:w-[180px]">
      {logo.src ? (
        <img
          src={logo.src}
          alt={logo.name}
          loading="lazy"
          className="h-full w-full object-contain"
        />
      ) : (
        <span className="text-center text-[10px] leading-tight font-semibold tracking-wide text-neutral-800 sm:text-xs">
          {logo.name}
        </span>
      )}
    </div>
  );
}
