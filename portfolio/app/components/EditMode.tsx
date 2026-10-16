"use client";

import { createContext, useContext, useEffect, useState } from "react";

const EditModeContext = createContext(false);

export function useEditMode() {
  return useContext(EditModeContext);
}

// The "Edit text" toggle only renders under `next dev`, so visitors to the
// live site never see it.
export default function EditModeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [editing, setEditing] = useState(false);

  // While editing, clicking a link places the cursor instead of navigating.
  useEffect(() => {
    if (!editing) return;
    const stopLinks = (event: MouseEvent) => {
      if ((event.target as Element).closest("a")) event.preventDefault();
    };
    document.addEventListener("click", stopLinks, true);
    return () => document.removeEventListener("click", stopLinks, true);
  }, [editing]);

  return (
    <EditModeContext value={editing}>
      {children}
      {process.env.NODE_ENV === "development" && (
        <button
          type="button"
          className="fixed right-4 bottom-4 z-20 rounded-full bg-foreground px-4 py-2 text-sm text-background shadow-lg"
          onClick={() => setEditing(!editing)}
        >
          {editing ? "Done editing" : "Edit text"}
        </button>
      )}
    </EditModeContext>
  );
}
