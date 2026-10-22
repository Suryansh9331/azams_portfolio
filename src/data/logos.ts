import type { BrandCategoryFolder } from "./brands";

const modules = import.meta.glob(
  [
    "../assets/global-brands/*.webp",
    "../assets/hospitality-lifestyle/*.webp",
    "../assets/real-estate/*.webp",
    "../assets/govt-events/*.webp",
    "../assets/media/*.webp",
  ],
  { eager: true, import: "default" },
) as Record<string, string>;

const lookup = new Map<string, string>();
for (const [path, url] of Object.entries(modules)) {
  const match = path.match(/\.\.\/assets\/([^/]+)\/([^/]+)\.webp$/);
  if (!match) continue;
  const [, folder, slug] = match;
  lookup.set(`${folder}/${slug}`, url);
}

export function getLogo(
  folder: BrandCategoryFolder,
  slug: string,
): string | undefined {
  return lookup.get(`${folder}/${slug}`);
}
