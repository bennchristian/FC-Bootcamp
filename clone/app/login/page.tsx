import { Suspense } from "react";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <main className="mx-auto flex w-full max-w-sm flex-1 flex-col gap-6 px-4 py-10">
      <h1 className="text-2xl font-bold">Sign in or sign up</h1>
      <p className="text-sm text-neutral-400">
        An account saves your progress and puts you on the leaderboard.
      </p>
      <Suspense>
        <LoginForm />
      </Suspense>
    </main>
  );
}
