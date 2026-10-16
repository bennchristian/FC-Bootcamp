import Contact from "./components/Contact";
import Intro from "./components/Intro";
import Projects from "./components/Projects";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-[680px] px-6 py-16 sm:py-24">
      <Intro />
      <Projects />
      <Contact />
    </main>
  );
}
