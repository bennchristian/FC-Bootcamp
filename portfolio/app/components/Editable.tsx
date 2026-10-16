"use client";

import { saveText } from "../actions";
import { useEditMode } from "./EditMode";

// One piece of text from content/site.json. `path` is where it lives in that
// file, e.g. "projects.items.0.summary". Clicking away saves it.
export default function Editable({ path, text }: { path: string; text: string }) {
  const editing = useEditMode();
  if (!editing) return text;

  return (
    <span
      key={text}
      contentEditable
      suppressContentEditableWarning
      className="rounded-sm outline-1 outline-offset-2 outline-accent/50 outline-dashed focus:outline-solid"
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          event.currentTarget.blur();
        }
      }}
      onBlur={async (event) => {
        const value = event.currentTarget.innerText.trim();
        if (value === text) return;
        try {
          await saveText(path, value);
        } catch {
          alert(`Couldn't save "${path}". Is the dev server running?`);
        }
      }}
    >
      {text}
    </span>
  );
}
