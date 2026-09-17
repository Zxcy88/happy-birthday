const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Prefixes a media path with the deployment base path.
 *
 * Next rewrites its own bundles and `next/image` sources, but the plain
 * <img>, <video> and <audio> paths coming from birthday.ts are ordinary
 * strings. Without this they resolve against the domain root and 404 whenever
 * the site is served from a subfolder, which is how GitHub Pages hosts a
 * project repo (/happy-birthday/).
 */
export function asset(path: string): string {
  if (!path) return path;
  if (/^(https?:|data:|blob:|\/\/)/.test(path)) return path;
  if (!path.startsWith("/")) return path;
  return `${BASE}${path}`;
}
