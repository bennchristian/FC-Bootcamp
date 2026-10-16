import Image from "next/image";
import photo from "@/public/bennett.jpg";

export default function Intro() {
  return (
    <section id="about" className="pb-12">
      <Image
        src={photo}
        width={288}
        height={288}
        alt="Bennett Christian smiling on a grassy hill, with a green mountain behind him"
        placeholder="blur"
        preload
        className="size-32 rounded-full border border-line object-cover sm:size-36"
      />
      <h1 className="mt-8 font-serif text-5xl tracking-tight">
        Bennett Christian
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-muted">
        I&apos;m a Frontier Commons fellow learning to build software. This
        week I&apos;m working through the Build Bootcamp with Claude Code,
        GitHub and Vercel.
      </p>
    </section>
  );
}
