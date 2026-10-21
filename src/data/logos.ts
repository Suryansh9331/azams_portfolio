import type { BrandCategoryFolder } from "./brands";

const modules = import.meta.glob(
  [
    "../assets/global-brands/*.png",
    "../assets/hospitality-lifestyle/*.png",
    "../assets/real-estate/*.png",
    "../assets/govt-events/*.png",
    "../assets/media/*.png",
  ],
  { eager: true, import: "default" },
) as Record<string, string>;

const lookup = new Map<string, string>();
for (const [path, url] of Object.entries(modules)) {
  const match = path.match(/\.\.\/assets\/([^/]+)\/([^/]+)\.png$/);
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
