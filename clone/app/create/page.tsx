import Link from "next/link";
import { Suspense } from "react";
import { getCurrentPlayer } from "@/lib/player";
import CreateForm from "./CreateForm";

// Server actions on this page include the Gemini auto-fill call, so allow it up to 60s.
export const maxDuration = 60;

export default function CreatePage() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-4 py-8">
      <h1 className="text-2xl font-bold">Make a puzzle</h1>
      <Suspense fallback={<p className="text-neutral-500">Loading…</p>}>
        <CreateLoader />
      </Suspense>
    </main>
  );
}

async function CreateLoader() {
  const player = await getCurrentPlayer();
  if (!player) {
    return (
      <Link
        href="/login?next=/create"
        className="self-start rounded-lg bg-amber-400 px-6 py-3 font-semibold text-neutral-900 hover:bg-amber-300"
      >
        Sign in to make a puzzle
      </Link>
    );
  }
  return <CreateForm isEditor={player.isEditor} />;
}
