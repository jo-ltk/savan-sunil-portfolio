import Hero from "@/components/landing/Hero";
import Projects from "@/components/landing/Projects";
import Philosophy from "@/components/landing/Philosophy";
import Expertise from "@/components/landing/Expertise";
import { About, Behind, Contact, Process, Resume } from "@/components/landing/Sections";
import LandingMotion from "@/components/landing/LandingMotion";

export default function Home() {
  return (
    <main id="landing">
      <Hero />
      <Projects />
      <Philosophy />
      <Expertise />
      <Process />
      <Behind />
      <About />
      <Resume />
      <Contact />
      <LandingMotion />
    </main>
  );
}
