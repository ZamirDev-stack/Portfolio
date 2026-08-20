import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CommandPalette } from "@/components/layout/command-palette";
import { EasterEgg } from "@/components/layout/easter-egg";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Education } from "@/components/sections/education";
import { Journey } from "@/components/sections/journey";
import { Achievements } from "@/components/sections/achievements";
import { GitHubActivity } from "@/components/sections/github-activity";
import { Resume } from "@/components/sections/resume";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <CommandPalette />
      <EasterEgg />
      <main className="flex-1">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Journey />
        <Achievements />
        <GitHubActivity />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
