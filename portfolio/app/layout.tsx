import type { Metadata } from "next";
import { Geist, Newsreader } from "next/font/google";
import content from "@/content/site.json";
import EditModeProvider from "./components/EditMode";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: content.name,
  description:
    "Bennett Christian, a Frontier Commons fellow: what I'm building and learning, and how to reach me.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <EditModeProvider>{children}</EditModeProvider>
      </body>
    </html>
  );
}
