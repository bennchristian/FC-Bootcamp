"use client";

import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { type AuthState, authenticate } from "./actions";

const input = "rounded-md border border-neutral-600 bg-neutral-900 px-3 py-2";

export default function LoginForm() {
  const next = useSearchParams().get("next") ?? "/";
  const [state, formAction, pending] = useActionState<AuthState, FormData>(authenticate, {
    message: "",
  });

  return (
    <form action={formAction} className="flex flex-col gap-3">
      <input type="hidden" name="next" value={next} />
      <label className="flex flex-col gap-1 text-sm">
        Email
        <input className={input} type="email" name="email" required autoComplete="email" />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Password
        <input
          className={input}
          type="password"
          name="password"
          required
          minLength={6}
          autoComplete="current-password"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Username <span className="text-neutral-500">(only needed to sign up)</span>
        <input className={input} type="text" name="username" autoComplete="username" />
      </label>

      {state.message && (
        <p className="text-sm text-red-400" aria-live="polite">
          {state.message}
        </p>
      )}

      <div className="flex gap-3">
        <button
          name="mode"
          value="signin"
          disabled={pending}
          className="flex-1 rounded-md bg-amber-400 px-4 py-2 font-semibold text-neutral-900 hover:bg-amber-300 disabled:opacity-60"
        >
          {pending ? "Working…" : "Sign in"}
        </button>
        <button
          name="mode"
          value="signup"
          disabled={pending}
          className="flex-1 rounded-md border border-neutral-500 px-4 py-2 font-semibold hover:border-neutral-300 disabled:opacity-60"
        >
          Sign up
        </button>
      </div>
    </form>
  );
}
