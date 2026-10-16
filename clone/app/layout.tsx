import type { Metadata } from "next";
import { Geist } from "next/font/google";
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
