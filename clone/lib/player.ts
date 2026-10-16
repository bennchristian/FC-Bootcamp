import { createClient } from "@/lib/supabase/server";

export type Player = {
  id: string;
  username: string;
  isEditor: boolean;
  isGuest: boolean;
};

// The signed-in player with their profile, or null when signed out.
export async function getCurrentPlayer(): Promise<Player | null> {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const id = data?.claims.sub;
  if (!id) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("username, is_editor, is_guest")
    .eq("id", id)
    .maybeSingle();

  return {
    id,
    username: profile?.username ?? "player",
    isEditor: profile?.is_editor ?? false,
    isGuest: profile?.is_guest ?? false,
  };
}
