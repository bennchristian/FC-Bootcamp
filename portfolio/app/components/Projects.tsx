import content from "@/content/site.json";
import Editable from "./Editable";

export default function Projects() {
  const { heading, items } = content.projects;

  return (
    <section id="projects" className="border-t border-line py-12">
      <h2 className="font-serif text-3xl">
        <Editable path="projects.heading" text={heading} />
      </h2>
      <div className="mt-8 space-y-10">
        {items.map((project, i) => (
          <article key={i}>
            <h3 className="font-serif text-2xl">
              <Editable path={`projects.items.${i}.name`} text={project.name} />
            </h3>
            <p className="mt-1 text-xs uppercase tracking-widest text-muted">
              <Editable
                path={`projects.items.${i}.stack`}
                text={project.stack}
              />
            </p>
            <p className="mt-3 leading-relaxed text-muted">
              <Editable
                path={`projects.items.${i}.summary`}
                text={project.summary}
              />
            </p>
            {"note" in project && project.note && (
              <p className="mt-3 border-l-2 border-accent pl-3 text-sm italic leading-relaxed text-muted">
                <Editable path={`projects.items.${i}.note`} text={project.note} />
              </p>
            )}
            <p className="mt-3 flex gap-5">
              {project.links.map((link, j) => (
                <a
                  key={link.href}
                  className="text-accent underline underline-offset-4"
                  href={link.href}
                >
                  <Editable
                    path={`projects.items.${i}.links.${j}.label`}
                    text={link.label}
                  />{" "}
                  →
                </a>
              ))}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
