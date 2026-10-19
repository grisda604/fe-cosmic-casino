import manifest from "@/lib/generated/clone-manifest.json";

export type CloneEntry = (typeof manifest.clones)[number];

export {
  findClone,
  findCloneByPathname,
  getAllClonePathnames,
} from "./phantom-clone";

export function getAllCloneParams(): { slug: string[] }[] {
  return manifest.clones.map((c) => ({
    slug: c.slug.length ? c.slug : [],
  }));
}
