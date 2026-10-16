import content from "@/content/site.json";
import Editable from "./Editable";

export default function Resume() {
  const { heading, blurb, openLabel, downloadLabel, sections } =
    content.resume;

  return (
    <section id="resume" className="border-t border-line py-12">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <h2 className="font-serif text-3xl">
          <Editable path="resume.heading" text={heading} />
        </h2>
        <a
          href={content.resumeFile.href}
          download
          className="rounded-full border border-accent px-4 py-1.5 text-sm text-accent hover:bg-accent hover:text-background"
        >
          <Editable path="resume.downloadLabel" text={downloadLabel} /> ↓
        </a>
      </div>
      <p className="mt-4 leading-relaxed text-muted">
        <Editable path="resume.blurb" text={blurb} />
      </p>

      <details className="group mt-6 rounded-lg border border-line">
        <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 font-serif text-xl [&::-webkit-details-marker]:hidden">
          <Editable path="resume.openLabel" text={openLabel} />
          <span className="text-accent transition-transform group-open:rotate-45">
            +
          </span>
        </summary>
        <div className="max-h-[70vh] space-y-10 overflow-y-auto border-t border-line px-5 py-6">
          {sections.map((section, i) => (
            <div key={i}>
              <h3 className="text-xs uppercase tracking-widest text-accent">
                <Editable
                  path={`resume.sections.${i}.title`}
                  text={section.title}
                />
              </h3>
              <div className="mt-4 space-y-6">
                {section.entries.map((entry, j) => {
                  const base = `resume.sections.${i}.entries.${j}`;
                  return (
                    <div key={j}>
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                        <h4 className="font-serif text-lg">
                          <Editable path={`${base}.title`} text={entry.title} />
                        </h4>
                        <span className="text-xs uppercase tracking-widest text-muted">
                          <Editable path={`${base}.dates`} text={entry.dates} />
                        </span>
                      </div>
                      {entry.subtitle && (
                        <p className="text-sm italic text-muted">
                          <Editable
                            path={`${base}.subtitle`}
                            text={entry.subtitle}
                          />
                        </p>
                      )}
                      {entry.points.length > 0 && (
                        <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted marker:text-line">
                          {entry.points.map((point, k) => (
                            <li key={k}>
                              <Editable
                                path={`${base}.points.${k}`}
                                text={point}
                              />
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </details>
    </section>
  );
}
