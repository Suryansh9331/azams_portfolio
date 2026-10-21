import { useEffect, useRef, useState } from "react";

export function useInView<T extends HTMLElement = HTMLElement>(
  options?: IntersectionObserverInit,
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -10% 0px", ...options },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}
