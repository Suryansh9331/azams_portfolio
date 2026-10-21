import { useEffect, useState } from "react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 600);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Scroll to top"
      className="scroll-top-btn group fixed right-4 bottom-20 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-line bg-ink-900/80 text-silver backdrop-blur-md transition-colors hover:border-silver-dim hover:bg-ink-900 sm:right-5 sm:bottom-20 sm:h-12 sm:w-12 md:right-6 md:bottom-24 md:h-13 md:w-13"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(138,160,255,0.18) 0%, transparent 70%)",
        }}
      />
      <svg
        viewBox="0 0 24 24"
        className="scroll-top-arrow relative h-4 w-4 sm:h-[18px] sm:w-[18px] md:h-5 md:w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 19V5" />
        <path d="M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
