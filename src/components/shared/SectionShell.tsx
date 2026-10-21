import type { ReactNode } from "react";

type Props = {
  id?: string;
  label: string;
  page: string;
  children: ReactNode;
  className?: string;
};

export function SectionShell({ id, label, page, children, className = "" }: Props) {
  return (
    <section
      id={id}
      className={`relative mx-auto grid min-h-screen w-full max-w-[1680px] grid-rows-[auto_1fr] px-4 py-20 sm:px-5 md:px-6 md:py-24 lg:px-8 lg:py-32 xl:px-10 ${className}`}
    >
      <div className="mb-12 md:mb-16 lg:mb-20">
        <p className="text-[13px] font-medium tracking-[0.24em] text-muted uppercase sm:text-[14px] md:text-[15px] lg:text-[16px]">
          {label}
        </p>
        <div className="mt-3 h-px w-24 bg-line sm:w-32" />
      </div>

      <div className="flex min-h-0 flex-col justify-center">{children}</div>

      <div className="pointer-events-none absolute right-4 bottom-5 flex flex-col items-end gap-1 text-[10px] tracking-[0.3em] text-muted uppercase sm:right-5 md:right-6 md:bottom-8 lg:right-8 lg:bottom-10">
        <span className="font-display text-sm tracking-[0.4em] text-silver-dim">
          AZAM
        </span>
        <span>{page}</span>
      </div>
    </section>
  );
}
