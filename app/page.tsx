import Hero from "@/components/landing/Hero";
import Projects from "@/components/landing/Projects";
import Archive from "@/components/landing/Archive";
import Philosophy from "@/components/landing/Philosophy";
import Expertise from "@/components/landing/Expertise";
import Process from "@/components/landing/Process";
import Build from "@/components/landing/Build";
import Behind from "@/components/landing/Behind";
import About from "@/components/landing/About";
import Resume from "@/components/landing/Resume";
import Contact from "@/components/landing/Contact";
import LandingMotion from "@/components/landing/LandingMotion";
import Lightbox from "@/components/landing/Lightbox";

export default function Home() {
  return (
    <main id="landing">
      <Hero />
      <Projects />
      <Archive />
      <Philosophy />
      <Expertise />
      <Process />
      <Build />
      <Behind />
      <About />
      <Resume />
      <Contact />
      <LandingMotion />
      <Lightbox />
    </main>
  );
}
