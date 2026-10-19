import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const casRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = path.join(casRoot, "src", "lib", "generated", "clone-manifest.json");
const phantomRoot = path.join(casRoot, "src", "app", "(phantom)");
const generatedMarker = "@generated-phantom-page";

function routeToPageDir(route) {
  if (route === "/") return phantomRoot;
  return path.join(phantomRoot, ...route.replace(/^\//, "").split("/"));
}

function pageSource(pathname) {
  const routeLiteral = pathname === "/" ? "/" : pathname;
  return `/** ${generatedMarker} — sync:pages */
import {
  PhantomCloneRoute,
  phantomCloneMetadata,
} from "@/app/(phantom)/_components/phantom-clone-route";

const PATHNAME = ${JSON.stringify(routeLiteral)};

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata(props: PageProps) {
  return phantomCloneMetadata(PATHNAME, props.searchParams);
}

export default function Page(props: PageProps) {
  return <PhantomCloneRoute pathname={PATHNAME} searchParams={props.searchParams} />;
}
`;
}

function walk(dir, onFile) {
  if (!fs.existsSync(dir)) return;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (name === "_components" || name === "layout.tsx") continue;
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      walk(full, onFile);
    } else if (name === "page.tsx") {
      onFile(full);
    }
  }
}

function removeOldGeneratedPages() {
  walk(phantomRoot, (file) => {
    const text = fs.readFileSync(file, "utf8");
    if (text.includes(generatedMarker)) {
      fs.unlinkSync(file);
      const dir = path.dirname(file);
      if (fs.readdirSync(dir).length === 0) {
        fs.rmdirSync(dir);
      }
    }
  });
}

function main() {
  const mode = process.env.PHANTOM_PAGES_MODE ?? "next";
  if (mode === "nuxt-live") {
    removeOldGeneratedPages();
    console.log("PHANTOM_PAGES_MODE=nuxt-live — removed generated pages (use Nuxt mount in layout)");
    return;
  }

  if (!fs.existsSync(manifestPath)) {
    throw new Error(`Run sync:clones first — missing ${manifestPath}`);
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  const pathnames = [...new Set(manifest.clones.map((c) => c.route))].sort();

  fs.mkdirSync(phantomRoot, { recursive: true });
  removeOldGeneratedPages();

  for (const pathname of pathnames) {
    const dir = routeToPageDir(pathname);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "page.tsx"), pageSource(pathname));
  }

  fs.writeFileSync(
    path.join(casRoot, "src", "lib", "generated", "phantom-page-routes.json"),
    JSON.stringify({ generatedAt: new Date().toISOString(), pathnames }, null, 2)
  );

  console.log("Next phantom pages:", pathnames.length);
}

main();
