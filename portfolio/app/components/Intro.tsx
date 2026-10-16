import Image from "next/image";
import content from "@/content/site.json";
import photo from "@/public/bennett.jpg";
import Editable from "./Editable";

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
        <Editable path="name" text={content.name} />
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-muted">
        <Editable path="intro.bio" text={content.intro.bio} />
      </p>
    </section>
  );
}
