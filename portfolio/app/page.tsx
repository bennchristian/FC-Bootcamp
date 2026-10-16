import Contact from "./components/Contact";
import Intro from "./components/Intro";
import Learning from "./components/Learning";
import Projects from "./components/Projects";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-[680px] px-6 py-16 sm:py-24">
      <Intro />
      <Projects />
      <Learning />
      <Contact />
    </main>
  );
}
