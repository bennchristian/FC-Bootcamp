const methods = [
  {
    label: "Email",
    text: "bennettbarlaan@gmail.com",
    href: "mailto:bennettbarlaan@gmail.com",
  },
  {
    label: "Work email",
    text: "bennett.christian@ifiusa.org",
    href: "mailto:bennett.christian@ifiusa.org",
  },
  { label: "Phone", text: "+65 9383 7624", href: "tel:+6593837624" },
  {
    label: "LinkedIn",
    text: "in/bennett-christian-dvb",
    href: "https://www.linkedin.com/in/bennett-christian-dvb",
  },
  {
    label: "GitHub",
    text: "github.com/bennchristian",
    href: "https://github.com/bennchristian",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="border-t border-line py-12">
      <h2 className="font-serif text-3xl">Get in touch</h2>
      <dl className="mt-6 space-y-3">
        {methods.map((method) => (
          <div
            key={method.href}
            className="grid gap-0.5 sm:grid-cols-[7rem_1fr] sm:gap-6"
          >
            <dt className="text-xs uppercase tracking-widest text-muted sm:pt-1">
              {method.label}
            </dt>
            <dd>
              <a
                className="text-accent underline underline-offset-4"
                href={method.href}
              >
                {method.text}
              </a>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
