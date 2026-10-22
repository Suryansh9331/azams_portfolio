import { lazy, Suspense } from "react";
import { Hero } from "./components/Hero";
import { About } from "./components/About";

// Only Hero + About load eagerly (above the fold). Everything else is
// code-split so initial JS payload stays small and main-thread work is
// reduced for faster TBT / FCP / LCP.
const Proof = lazy(() => import("./components/Proof").then((m) => ({ default: m.Proof })));
const Social = lazy(() => import("./components/Social").then((m) => ({ default: m.Social })));
const Reels = lazy(() => import("./components/Reels").then((m) => ({ default: m.Reels })));
const BrandMarquee = lazy(() => import("./components/BrandMarquee").then((m) => ({ default: m.BrandMarquee })));
const WhyBrands = lazy(() => import("./components/WhyBrands").then((m) => ({ default: m.WhyBrands })));
const Creates = lazy(() => import("./components/Creates").then((m) => ({ default: m.Creates })));
const Formats = lazy(() => import("./components/Formats").then((m) => ({ default: m.Formats })));
const Process = lazy(() => import("./components/Process").then((m) => ({ default: m.Process })));
const Contact = lazy(() => import("./components/Contact").then((m) => ({ default: m.Contact })));
const ScrollToTop = lazy(() => import("./components/ScrollToTop").then((m) => ({ default: m.ScrollToTop })));

// Minimal placeholder — matches section background so there's no visible flash
// while the chunk streams in.
const SectionFallback = () => <div className="h-[60vh] bg-ink-950" aria-hidden />;

function App() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-[color:var(--color-ink-950)] text-[color:var(--color-silver)]">
      <Hero />
      <About />
      <Suspense fallback={<SectionFallback />}>
        <Proof />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Social />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Reels />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <BrandMarquee />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <WhyBrands />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Creates />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Formats />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Process />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Contact />
      </Suspense>
      <Suspense fallback={null}>
        <ScrollToTop />
      </Suspense>
    </main>
  );
}

export default App;
