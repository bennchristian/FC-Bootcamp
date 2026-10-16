import content from "@/content/site.json";
import Editable from "./Editable";

export default function Contact() {
  const { heading, methods } = content.contact;

  return (
    <section id="contact" className="border-t border-line py-12">
      <h2 className="font-serif text-3xl">
        <Editable path="contact.heading" text={heading} />
      </h2>
      <dl className="mt-6 space-y-3">
        {methods.map((method, i) => (
          <div
            key={method.href}
            className="grid gap-0.5 sm:grid-cols-[7rem_1fr] sm:gap-6"
          >
            <dt className="text-xs uppercase tracking-widest text-muted sm:pt-1">
              <Editable
                path={`contact.methods.${i}.label`}
                text={method.label}
              />
            </dt>
            <dd>
              <a
                className="text-accent underline underline-offset-4"
                href={method.href}
              >
                <Editable
                  path={`contact.methods.${i}.text`}
                  text={method.text}
                />
              </a>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
