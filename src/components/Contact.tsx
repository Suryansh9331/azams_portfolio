import type { ReactNode } from "react";
import contactBg from "../assets/contact.png";
import { useInView } from "../hooks/useInView";

export function Contact() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.15 });

  return (
    <section
      ref={ref}
      id="contact"
      className={`contact-reveal relative min-h-screen w-full overflow-hidden bg-ink-950 ${
        inView ? "in-view" : ""
      }`}
    >
      <img
        src={contactBg}
        alt=""
        aria-hidden
        className="contact-bg pointer-events-none absolute inset-0 h-full w-full object-cover object-right"
      />
      <div
        aria-hidden
        className="contact-wash pointer-events-none absolute inset-0 bg-linear-to-r from-ink-950 via-ink-950/85 to-transparent sm:via-ink-950/70 md:via-ink-950/55 lg:via-ink-950/40"
      />
      <div
        aria-hidden
        className="contact-wash pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-ink-950 via-ink-950/60 to-transparent"
      />

      <div className="relative mx-auto flex min-h-screen w-full max-w-[1680px] flex-col px-4 py-14 sm:px-5 sm:py-16 md:px-6 md:py-20 lg:px-8 lg:py-24 xl:px-10">
        <div className="contact-head">
          <p className="text-[13px] font-medium tracking-[0.24em] text-muted uppercase sm:text-[14px] md:text-[15px] lg:text-[16px]">
            Book Azam
          </p>
          <div className="contact-head-rail mt-3 h-px w-24 bg-line sm:w-32" />
        </div>

        <div className="flex flex-1 flex-col justify-center py-12 md:py-16">
          <h2
            className="font-numeric text-[42px] leading-[0.95] font-black text-silver uppercase sm:text-[56px] md:text-7xl lg:text-[88px] xl:text-[112px]"
            style={{
              letterSpacing: "0.01em",
              wordSpacing: "0.14em",
              fontVariationSettings: '"opsz" 144',
            }}
          >
            <span className="contact-title-line block">Azam Says</span>
            <span className="contact-title-line block bg-linear-to-b from-silver via-silver/90 to-silver/25 bg-clip-text italic text-transparent">
              Contact
            </span>
          </h2>
          <p className="contact-sub mt-6 text-[11px] tracking-[0.3em] text-silver-dim uppercase sm:mt-8 sm:text-[12px] md:text-[13px]">
            For availability, brand activations and stage programming
          </p>
        </div>

        <div className="mt-auto">
          <div className="contact-divider h-px w-full bg-line/80" />

          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 md:mt-10 md:gap-10 lg:grid-cols-4">
            <ContactCol title="Email">
              <a
                href="mailto:azam.magic10@gmail.com"
                className="wrap-break-word text-silver hover:text-white"
              >
                azam.magic10@gmail.com
              </a>
            </ContactCol>

            <ContactCol title="Phone">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-silver">
                <a href="tel:+971505029950" className="hover:text-white">
                  +971 50 502 9950
                </a>
                <span className="text-muted">\</span>
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
                className="wrap-break-word text-silver uppercase hover:text-white"
              >
                www.azammagic.show
              </a>
            </ContactCol>

            <ContactCol title="Social Media">
              <div className="flex flex-col gap-3 text-silver">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                  <SocialLink href="https://www.instagram.com/azam.magic/" label="Instagram">
                    <InstagramIcon />
                  </SocialLink>
                  <SocialLink href="https://www.facebook.com/Azam-107858473927856" label="Facebook (page)">
                    <FacebookIcon />
                  </SocialLink>
                  <SocialLink href="https://www.facebook.com/profile.php?id=100004640555267" label="Facebook (profile)">
                    <FacebookIcon />
                  </SocialLink>
                  <SocialLink href="https://www.tiktok.com/@azam.magic10" label="TikTok">
                    <TikTokIcon />
                  </SocialLink>
                  <SocialLink href="https://www.youtube.com/@AzamMagic1" label="YouTube">
                    <YouTubeIcon />
                  </SocialLink>
                  <SocialLink href="https://t.snapchat.com/TCmCz4AB" label="Snapchat">
                    <SnapchatIcon />
                  </SocialLink>
                </div>
                <span className="text-[12px] tracking-[0.28em] text-silver uppercase sm:text-[13px] md:text-sm">
                  Azam.Magic
                </span>
              </div>
            </ContactCol>
          </div>

          <div className="mt-10 flex justify-end text-[10px] tracking-[0.3em] text-muted uppercase">
            <span>15</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactCol({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="contact-col flex flex-col gap-3">
      <span className="text-[12px] tracking-[0.28em] text-muted uppercase sm:text-[13px] md:text-sm">
        {title}
      </span>
      <div className="text-sm md:text-[15px]">{children}</div>
    </div>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center text-silver transition-colors hover:text-white sm:h-7 sm:w-7"
    >
      <span className="inline-flex h-5 w-5 items-center justify-center">
        {children}
      </span>
    </a>
  );
}

const iconProps = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "currentColor",
  className: "h-full w-full",
};

function InstagramIcon() {
  return (
    <svg {...iconProps}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.805.248 2.227.413.56.218.96.478 1.38.898.42.42.68.82.898 1.38.165.422.36 1.057.413 2.227.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.248 1.805-.413 2.227a3.7 3.7 0 0 1-.898 1.38 3.7 3.7 0 0 1-1.38.898c-.422.165-1.057.36-2.227.413-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.805-.248-2.227-.413a3.7 3.7 0 0 1-1.38-.898 3.7 3.7 0 0 1-.898-1.38c-.165-.422-.36-1.057-.413-2.227-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.054-1.17.248-1.805.413-2.227.218-.56.478-.96.898-1.38.42-.42.82-.68 1.38-.898.422-.165 1.057-.36 2.227-.413 1.266-.058 1.646-.07 4.85-.07M12 0C8.741 0 8.332.014 7.052.072 5.774.13 4.902.333 4.14.63a5.9 5.9 0 0 0-2.126 1.384A5.9 5.9 0 0 0 .63 4.14C.333 4.902.131 5.774.072 7.052.014 8.332 0 8.741 0 12s.014 3.668.072 4.948c.059 1.278.26 2.15.558 2.913.306.788.717 1.459 1.384 2.126a5.9 5.9 0 0 0 2.126 1.384c.763.297 1.635.5 2.913.558C8.332 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.278-.058 2.15-.26 2.913-.558a5.9 5.9 0 0 0 2.126-1.384 5.9 5.9 0 0 0 1.384-2.126c.297-.763.5-1.635.558-2.913.058-1.28.072-1.689.072-4.948s-.014-3.668-.072-4.948c-.058-1.278-.26-2.15-.558-2.913a5.9 5.9 0 0 0-1.384-2.126A5.9 5.9 0 0 0 19.86.63C19.098.333 18.226.131 16.948.072 15.668.014 15.259 0 12 0m0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324M12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8m6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg {...iconProps}>
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.019 4.388 11.009 10.125 11.927v-8.437H7.078v-3.49h3.047V9.413c0-3.023 1.792-4.69 4.533-4.69 1.312 0 2.686.235 2.686.235v2.971h-1.513c-1.49 0-1.956.934-1.956 1.891v2.253h3.328l-.532 3.49h-2.796V24C19.612 23.082 24 18.092 24 12.073" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg {...iconProps}>
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg {...iconProps}>
      <path d="M23.498 6.186a3.02 3.02 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.02 3.02 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.02 3.02 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.02 3.02 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814M9.545 15.568V8.432L15.818 12z" />
    </svg>
  );
}

function SnapchatIcon() {
  return (
    <svg {...iconProps}>
      <path d="M12.166 0h-.332C8.286 0 5.368 2.84 5.368 6.377v2.28c0 .36-.063.698-.17 1.012-.5-.233-1.015-.336-1.516-.336-.605 0-1.19.175-1.68.5-.49.325-.864.802-1.016 1.346-.17.608.015 1.198.49 1.615.482.422 1.166.578 1.77.44.084.272.213.544.388.816.336.528.78.888 1.05 1.064-.082.288-.213.656-.42 1.08-.244.5-.57 1.014-.95 1.398-.473.473-1.043.774-1.623.908-.483.112-.752.622-.552 1.08.082.197.21.37.395.473.273.157.616.233.973.293.174.03.344.056.504.088.13.027.263.057.398.1l.163.054c.248.082.52.17.78.34.145.096.283.213.412.33.26.235.562.5.952.7.73.37 1.512.414 2.264.414.263 0 .524-.01.78-.02.166-.008.325-.016.47-.016.252 0 .49.02.73.057.302.047.62.113.945.207.308.09.634.19.98.26.56.117 1.1.14 1.616.07.593-.08 1.164-.285 1.69-.606.6-.366 1.165-.822 1.685-1.292l.055-.05c.117-.107.242-.207.37-.3.246-.168.52-.26.775-.337l.14-.044c.136-.044.273-.075.407-.102.166-.032.337-.058.512-.088.355-.06.698-.137.97-.294.183-.106.311-.277.395-.475.2-.456-.07-.966-.552-1.08-.58-.133-1.15-.434-1.624-.908-.38-.384-.705-.898-.95-1.398-.206-.424-.337-.792-.42-1.08.27-.176.714-.536 1.05-1.064.175-.272.303-.544.388-.816.605.138 1.29-.018 1.77-.44.475-.417.66-1.007.49-1.615-.152-.544-.526-1.02-1.016-1.346a2.98 2.98 0 0 0-1.68-.5c-.503 0-1.016.104-1.516.336a3.32 3.32 0 0 1-.17-1.012v-2.28C18.631 2.84 15.714 0 12.167 0M9.5 10c-.552 0-1-.448-1-1s.448-1 1-1 1 .448 1 1-.448 1-1 1m5 0c-.552 0-1-.448-1-1s.448-1 1-1 1 .448 1 1-.448 1-1 1" />
    </svg>
  );
}

