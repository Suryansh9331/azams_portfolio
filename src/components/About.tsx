import secondSectionImg from "../assets/second-section.png";
import { StatBlock } from "./shared/StatBlock";

export function About() {
  return (
    <section
      id="about"
      className="relative w-full overflow-hidden bg-ink-950 pt-16 sm:pt-20 md:pt-24 lg:pt-32"
    >
      <div className="relative mx-auto w-full max-w-[1680px] px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:min-h-[100svh] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <div className="relative flex flex-col justify-center pt-6 pb-10 md:pt-10 lg:order-first lg:py-24">
            <div className="mb-10 md:mb-12">
              <p className="text-[10px] font-medium tracking-[0.24em] text-muted uppercase sm:text-[11px]">
                Who is Azam?
              </p>
              <div className="mt-3 h-px w-24 bg-line sm:w-32" />
            </div>

            <h2 className="font-display text-[clamp(2rem,4.2vw,3.75rem)] leading-[1.05] font-normal text-silver">
              You don't just watch Azam.
              <br />
              <span className="italic">You experience him.</span>
            </h2>

            <div className="mt-10 flex max-w-[520px] flex-col gap-5 text-[15px] leading-[1.75] text-silver-dim">
              <p>
                Azam is an illusionist and experience creator who turns impossible
                moments into powerful human reactions. His performances combine
                illusion, mentalism and audience psychology to create experiences
                that feel personal, unexpected and impossible to forget.
              </p>
              <p>
                From global brands and major events to VIP audiences, Azam doesn't
                simply perform for the room — he connects with it, surprises it
                and leaves it talking.
              </p>
            </div>

            <div className="mt-12 h-px w-full max-w-[520px] bg-line" />

            <p className="mt-6 max-w-[520px] font-display text-base leading-snug italic text-silver-dim md:text-lg">
              Meet Azam once — and you'll understand why people remember the
              experience.
            </p>

            <div className="mt-14 grid max-w-[640px] grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 sm:gap-x-10 md:mt-20">
              <StatBlock value="99+" label="Magic Shows Worldwide" />
              <StatBlock value="30+" label="TV Episodes" />
              <StatBlock value="7M+" label="Social Media Followers" />
              <StatBlock value="5B+" label="Views" />
            </div>
          </div>

          <div
            className="relative order-first h-[55vh] w-full sm:h-[65vh] md:h-[75vh] lg:order-last lg:h-auto lg:min-h-full"
            style={{
              marginRight:
                "var(--about-image-bleed, 0px)",
            }}
          >
            <img
              src={secondSectionImg}
              alt="Azam holding an Ace of Spades"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div
              className="pointer-events-none absolute inset-y-0 left-0 w-[45%]"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, rgba(5,7,12,1) 0%, rgba(5,7,12,0.75) 25%, rgba(5,7,12,0.3) 65%, rgba(5,7,12,0) 100%)",
              }}
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 w-[22%] md:w-[18%] lg:w-[14%]"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, rgba(5,7,12,0) 0%, rgba(5,7,12,0.55) 55%, rgba(5,7,12,1) 100%)",
              }}
            />
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-[18%]"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, rgba(5,7,12,0.9) 0%, rgba(5,7,12,0) 100%)",
              }}
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[25%]"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, rgba(5,7,12,0) 0%, rgba(5,7,12,0.9) 100%)",
              }}
            />
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute right-5 bottom-5 flex flex-col items-end gap-1 text-[10px] tracking-[0.3em] text-muted uppercase sm:right-8 md:right-12 md:bottom-8 lg:right-16 lg:bottom-10">
        <span className="font-display text-sm tracking-[0.4em] text-silver-dim">
          AZAM
        </span>
        <span>02</span>
      </div>
    </section>
  );
}
