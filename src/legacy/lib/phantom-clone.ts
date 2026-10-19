import manifest from "@/legacy/lib/generated/clone-manifest.json";

export type PhantomCloneEntry = (typeof manifest.clones)[number];

export function findCloneByPathname(
  pathname: string,
  searchParams: Record<string, string | string[] | undefined>
): PhantomCloneEntry | undefined {
  const normalizedQuery: Record<string, string> = {};
  for (const [key, value] of Object.entries(searchParams)) {
    if (typeof value === "string") normalizedQuery[key] = value;
    else if (Array.isArray(value) && value[0]) normalizedQuery[key] = value[0];
  }

  const withQuery = manifest.clones.find((c) => {
    if (c.route !== pathname) return false;
    const q = c.query as Record<string, string>;
    const keys = Object.keys(q);
    if (keys.length === 0) return Object.keys(normalizedQuery).length === 0;
    return keys.every((k) => normalizedQuery[k] === q[k]);
  });
  if (withQuery) return withQuery;

  if (Object.keys(normalizedQuery).length === 0) {
    return manifest.clones.find(
      (c) => c.route === pathname && Object.keys(c.query as object).length === 0
    );
  }

  return manifest.clones.find((c) => c.route === pathname);
}

export function findClone(
  slug: string[] | undefined,
  searchParams: Record<string, string | string[] | undefined>
) {
  const pathname = slug?.length ? `/${slug.join("/")}` : "/";
  return findCloneByPathname(pathname, searchParams);
}

export function getAllClonePathnames(): string[] {
  return [...new Set(manifest.clones.map((c) => c.route))];
}
