import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Proof } from "./components/Proof";
import { Social } from "./components/Social";
import { BrandGrid } from "./components/BrandGrid";
import { WhyBrands } from "./components/WhyBrands";
import { Creates } from "./components/Creates";
import { Formats } from "./components/Formats";
import { Process } from "./components/Process";
import { Contact } from "./components/Contact";
import { brandGroups } from "./data/brands";

function App() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-[color:var(--color-ink-950)] text-[color:var(--color-silver)]">
      <Hero />
      <About />
      <Proof />
      <Social />
      {brandGroups.map((group) => (
        <BrandGrid key={group.id} group={group} />
      ))}
      <WhyBrands />
      <Creates />
      <Formats />
      <Process />
      <Contact />
    </main>
  );
}

export default App;
