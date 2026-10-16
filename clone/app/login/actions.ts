"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type AuthState = { message: string };

const USERNAME = /^[a-z0-9-]{3,20}$/;

// Only same-site paths, so a crafted ?next= can't send players to another site.
function safeNext(value: FormDataEntryValue | null): string {
  const next = String(value ?? "");
  return next.startsWith("/") && !next.startsWith("//") ? next : "/";
}

export async function authenticate(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const mode = formData.get("mode");
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const supabase = await createClient();

  if (mode === "signup") {
    const username = String(formData.get("username") ?? "").trim().toLowerCase();
    if (!USERNAME.test(username)) {
      return { message: "Pick a username of 3–20 lowercase letters, numbers or hyphens." };
    }
    const { data: taken } = await supabase
      .from("profiles")
      .select("id")
      .eq("username", username)
      .maybeSingle();
    if (taken) return { message: `The username ${username} is taken.` };

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username } },
    });
    if (error) return { message: error.message };
    if (!data.session) return { message: "Check your email to confirm your account." };
  } else {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { message: error.message };
  }

  redirect(safeNext(formData.get("next")));
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
