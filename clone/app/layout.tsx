import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";
import { Suspense } from "react";
import UserNav from "./UserNav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cadgy clone",
  description: "A bootcamp clone of OneLook's Cadgy word game.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <header className="flex items-center justify-between border-b border-neutral-800 px-4 py-3">
          <Link href="/" className="font-bold tracking-[0.3em]">
            CADGY
          </Link>
          <Suspense>
            <UserNav />
          </Suspense>
        </header>
        {children}
        <footer className="px-4 py-6 text-center text-xs text-neutral-500">
          A bootcamp clone of{" "}
          <a className="underline" href="https://www.onelook.com/cadgy/">
            OneLook&apos;s Cadgy
          </a>
          . Not affiliated with OneLook or Datamuse.
        </footer>
      </body>
    </html>
  );
}
