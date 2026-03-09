import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Portfolio from "@/components/Portfolio";
import About from "@/components/About";

import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Process />
      <Portfolio />
      <About />

      <FAQ />
      <Contact />
    </main>
  );
}
