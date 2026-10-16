import content from "@/content/site.json";
import Editable from "./Editable";

export default function Learning() {
  const { heading, entries } = content.learning;

  return (
    <section id="learning" className="border-t border-line py-12">
      <h2 className="font-serif text-3xl">
        <Editable path="learning.heading" text={heading} />
      </h2>
      <ol className="mt-8 space-y-6">
        {entries.map((entry, i) => (
          <li key={i} className="grid gap-1 sm:grid-cols-[5rem_1fr] sm:gap-6">
            <span className="text-xs uppercase tracking-widest text-muted sm:pt-1.5">
              <Editable path={`learning.entries.${i}.date`} text={entry.date} />
            </span>
            <div>
              <h3 className="font-serif text-xl">
                <Editable
                  path={`learning.entries.${i}.topic`}
                  text={entry.topic}
                />
              </h3>
              <p className="mt-1 leading-relaxed text-muted">
                <Editable
                  path={`learning.entries.${i}.note`}
                  text={entry.note}
                />
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
