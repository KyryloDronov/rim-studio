import { readFile } from "node:fs/promises";

/**
 * Read a JSON store file. Uses a static default path when no override is set
 * so Turbopack does not trace the entire repo for serverless bundles.
 */
export async function readJsonStore(
  defaultPath: string,
  envOverride: string | undefined,
): Promise<string> {
  const custom = envOverride?.trim();
  if (custom) {
    return readFile(/* turbopackIgnore: true */ custom, "utf8");
  }
  return readFile(defaultPath, "utf8");
}
