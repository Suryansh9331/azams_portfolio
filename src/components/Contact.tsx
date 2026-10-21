import type { ReactNode } from "react";
import { PortraitPlaceholder } from "./shared/PortraitPlaceholder";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative mx-auto w-full max-w-[1400px] overflow-hidden px-5 py-20 sm:px-8 md:px-12 md:py-24 lg:px-16 lg:py-32"
    >
      <div className="mb-12 md:mb-16 lg:mb-20">
        <p className="text-[10px] font-medium tracking-[0.24em] text-muted uppercase sm:text-[11px]">
          Book Azam
        </p>
        <div className="mt-3 h-px w-24 bg-line sm:w-32" />
      </div>

      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div>
          <h2 className="font-display text-5xl leading-[0.95] font-medium text-silver sm:text-6xl md:text-7xl lg:text-8xl">
            AZAM SAYS
            <br />
            <span className="italic">CONTACT</span>
          </h2>
          <p className="mt-6 max-w-md text-[10px] tracking-[0.3em] text-silver-dim uppercase sm:mt-8 sm:text-[11px]">
            For availability, brand activations and stage programming
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-xs lg:mt-4 lg:max-w-sm">
          <div className="glow-radial absolute -inset-10 blur-3xl" />
          <PortraitPlaceholder aspect="tall" caption="Contact portrait" />
        </div>
      </div>

      <div className="mt-16 h-px w-full bg-line md:mt-20" />

      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 md:gap-10">
        <ContactCol title="Email">
          <a
            href="mailto:azam.magic10@gmail.com"
            className="break-words text-silver hover:text-white"
          >
            azam.magic10@gmail.com
          </a>
        </ContactCol>

        <ContactCol title="Phone">
          <div className="flex flex-col gap-1 text-silver">
            <a href="tel:+971505029950" className="hover:text-white">
              +971 50 502 9950
            </a>
            <a href="tel:+971544466020" className="hover:text-white">
              +971 54 446 6020
            </a>
          </div>
        </ContactCol>

        <ContactCol title="Website">
          <a
            href="https://www.azammagic.show"
            target="_blank"
            rel="noopener noreferrer"
            className="break-words text-silver uppercase hover:text-white"
          >
            www.azammagic.show
          </a>
        </ContactCol>

        <ContactCol title="Social Media">
          <div className="flex flex-col gap-3 text-silver">
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm tracking-wide">
              <a href="https://instagram.com/azam.magic" target="_blank" rel="noopener noreferrer" className="hover:text-white">IG</a>
              <a href="https://facebook.com/Azaam.Magic" target="_blank" rel="noopener noreferrer" className="hover:text-white">FB</a>
              <a href="https://tiktok.com/@azam.magic" target="_blank" rel="noopener noreferrer" className="hover:text-white">TT</a>
              <a href="https://youtube.com/@azammagic" target="_blank" rel="noopener noreferrer" className="hover:text-white">YT</a>
              <a href="https://snapchat.com/add/azam.magic" target="_blank" rel="noopener noreferrer" className="hover:text-white">SC</a>
              <a href="https://x.com/azammagic" target="_blank" rel="noopener noreferrer" className="hover:text-white">X</a>
            </div>
            <span className="text-[10px] tracking-[0.3em] text-muted uppercase">
              @azam.magic
            </span>
          </div>
        </ContactCol>
      </div>

      <div className="mt-14 flex items-end justify-end text-[10px] tracking-[0.3em] text-muted uppercase">
        <span>14</span>
      </div>
    </section>
  );
}

function ContactCol({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <span className="text-[11px] tracking-[0.22em] text-muted uppercase">
        {title}
      </span>
      <div className="text-sm md:text-base">{children}</div>
    </div>
  );
}
