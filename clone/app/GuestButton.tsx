"use client";

import { useActionState } from "react";
import { type AuthState, playAsGuest } from "@/app/login/actions";

// One click into a fresh guest account; no sign-up. `next` is where it lands afterwards.
export default function GuestButton({ next = "/" }: { next?: string }) {
  const [state, formAction, pending] = useActionState<AuthState, FormData>(playAsGuest, {
    message: "",
  });

  return (
    <form action={formAction} className="flex flex-col items-center gap-2">
      <input type="hidden" name="next" value={next} />
      <button
        disabled={pending}
        className="rounded-lg border border-amber-400 px-6 py-3 font-semibold text-amber-400 hover:bg-amber-400 hover:text-neutral-900 disabled:opacity-60"
      >
        {pending ? "Setting up your guest game…" : "Play as guest"}
      </button>
      {state.message && (
        <p className="text-sm text-red-400" aria-live="polite">
          {state.message}
        </p>
      )}
    </form>
  );
}
