"use client";

import { useState } from "react";
import content from "@/content/site.json";
import Editable from "./Editable";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-10 border-b border-line bg-background/90 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-[680px] items-center justify-between px-6 py-4">
        <a href="#about" className="font-serif text-lg">
          <Editable path="name" text={content.name} />
        </a>
        <button
          type="button"
          className="text-sm uppercase tracking-widest sm:hidden"
          aria-expanded={open}
          aria-controls="nav-links"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Menu"}
        </button>
        <ul
          id="nav-links"
          className={`${open ? "flex" : "hidden"} absolute inset-x-0 top-full flex-col gap-4 border-b border-line bg-background px-6 py-5 sm:static sm:flex sm:flex-row sm:gap-6 sm:border-0 sm:bg-transparent sm:p-0`}
        >
          {content.nav.map((link, i) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-muted hover:text-accent sm:text-sm"
                onClick={() => setOpen(false)}
              >
                <Editable path={`nav.${i}.label`} text={link.label} />
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
