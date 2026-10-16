import Contact from "./components/Contact";
import Intro from "./components/Intro";
import Learning from "./components/Learning";
import Nav from "./components/Nav";
import Projects from "./components/Projects";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="mx-auto w-full max-w-[680px] px-6 py-12 sm:py-20">
        <Intro />
        <Projects />
        <Learning />
        <Contact />
      </main>
    </>
  );
}
