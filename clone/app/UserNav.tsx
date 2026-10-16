import Link from "next/link";
import { signOut } from "@/app/login/actions";
import { getCurrentPlayer } from "@/lib/player";

export default async function UserNav() {
  const player = await getCurrentPlayer();

  if (!player) {
    return (
      <Link href="/login" className="text-sm font-semibold text-amber-400 hover:text-amber-300">
        Sign in
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-3 text-sm">
      <Link href="/create" className="font-semibold text-amber-400 hover:text-amber-300">
        Create
      </Link>
      <span className="text-neutral-300">{player.username}</span>
      <form action={signOut}>
        <button className="text-neutral-400 underline hover:text-neutral-200">Sign out</button>
      </form>
    </div>
  );
}
