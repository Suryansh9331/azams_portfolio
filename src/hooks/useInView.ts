import { useEffect, useRef, useState } from "react";

type Options = IntersectionObserverInit & {
  once?: boolean;
};

export function useInView<T extends HTMLElement = HTMLElement>(
  options?: Options,
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  const once = options?.once ?? false;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      {
        threshold: options?.threshold ?? 0.18,
        rootMargin: options?.rootMargin ?? "0px 0px -10% 0px",
        root: options?.root,
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, options?.threshold, options?.rootMargin, options?.root]);

  return { ref, inView };
}
