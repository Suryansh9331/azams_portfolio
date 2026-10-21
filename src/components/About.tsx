import secondSectionImg from "../assets/second-section.png";
import { StatBlock } from "./shared/StatBlock";

export function About() {
  return (
    <section id="about" className="relative w-full overflow-hidden bg-ink-950">
      <div className="relative mx-auto w-full max-w-[1600px]">
        <div className="grid min-h-[100svh] grid-cols-1 lg:grid-cols-[1.05fr_1fr]">
          <div className="relative flex flex-col justify-center px-5 pt-20 pb-10 sm:px-8 sm:pt-24 md:px-12 md:pt-28 lg:px-16 lg:py-28">
            <div className="mb-10 md:mb-14">
              <p className="text-[10px] font-medium tracking-[0.24em] text-muted uppercase sm:text-[11px]">
                Who is Azam?
              </p>
              <div className="mt-3 h-px w-24 bg-line sm:w-32" />
            </div>

            <h2 className="font-display text-[clamp(2rem,4.4vw,3.75rem)] leading-[1.05] font-normal text-silver">
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
                simply perform for the room — he connects with it, surprises it and
                leaves it talking.
              </p>
            </div>

            <div className="mt-12 h-px w-full max-w-[520px] bg-line" />

            <p className="mt-6 max-w-[520px] font-display text-base leading-snug italic text-silver-dim md:text-lg">
              Meet Azam once — and you'll understand why people remember the
              experience.
            </p>
          </div>

          <div className="relative order-first h-[55vh] w-full lg:order-last lg:h-auto lg:min-h-full">
            <img
              src={secondSectionImg}
              alt="Azam holding an Ace of Spades"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div
              className="pointer-events-none absolute inset-y-0 left-0 w-[35%]"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, rgba(5,7,12,1) 0%, rgba(5,7,12,0.5) 40%, rgba(5,7,12,0) 100%)",
              }}
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[35%] lg:hidden"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, rgba(5,7,12,0) 0%, rgba(5,7,12,0.7) 60%, rgba(5,7,12,1) 100%)",
              }}
            />
          </div>
        </div>

        <div className="relative z-10 -mt-10 px-5 pb-16 sm:px-8 md:px-12 md:pb-20 lg:-mt-24 lg:px-16 lg:pb-28">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 md:gap-10">
            <StatBlock value="99+" label="Magic Shows Worldwide" />
            <StatBlock value="30+" label="TV Episodes" />
            <StatBlock value="7M+" label="Social Media Followers" />
            <StatBlock value="5B+" label="Views" />
          </div>
        </div>

        <div className="pointer-events-none absolute right-5 bottom-5 flex flex-col items-end gap-1 text-[10px] tracking-[0.3em] text-muted uppercase sm:right-8 md:right-12 md:bottom-8 lg:right-16 lg:bottom-10">
          <span className="font-display text-sm tracking-[0.4em] text-silver-dim">
            AZAM
          </span>
          <span>02</span>
        </div>
      </div>
    </section>
  );
}
