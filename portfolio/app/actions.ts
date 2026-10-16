"use server";

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const contentFile = path.join(process.cwd(), "content", "site.json");

// Edit mode is for localhost only. The live site has no backend, and anyone
// could call this action there, so it refuses outside `next dev`.
export async function saveText(keyPath: string, value: string) {
  if (process.env.NODE_ENV !== "development") {
    throw new Error("Editing only works on localhost.");
  }

  const content = JSON.parse(await readFile(contentFile, "utf8"));
  const keys = keyPath.split(".");
  const last = keys.pop()!;
  const parent = keys.reduce((node, key) => node?.[key], content);

  if (typeof parent?.[last] !== "string") {
    throw new Error(`No text at ${keyPath}`);
  }

  parent[last] = value;
  await writeFile(contentFile, JSON.stringify(content, null, 2) + "\n");
}
