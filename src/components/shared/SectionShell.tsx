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
      className={`relative mx-auto w-full max-w-[1680px] px-5 py-20 sm:px-6 md:px-8 md:py-24 lg:px-10 lg:py-32 xl:px-14 ${className}`}
    >
      <div className="mb-12 md:mb-16 lg:mb-20">
        <p className="text-[10px] font-medium tracking-[0.24em] text-muted uppercase sm:text-[11px]">
          {label}
        </p>
        <div className="mt-3 h-px w-24 bg-line sm:w-32" />
      </div>

      {children}

      <div className="pointer-events-none absolute right-5 bottom-5 flex flex-col items-end gap-1 text-[10px] tracking-[0.3em] text-muted uppercase sm:right-8 md:right-12 md:bottom-8 lg:right-16 lg:bottom-10">
        <span className="font-display text-sm tracking-[0.4em] text-silver-dim">
          AZAM
        </span>
        <span>{page}</span>
      </div>
    </section>
  );
}
