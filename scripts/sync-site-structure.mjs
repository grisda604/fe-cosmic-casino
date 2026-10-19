import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const casRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = path.join(casRoot, "src", "lib", "generated", "clone-manifest.json");
const siteRoot = path.join(casRoot, "src", "app", "(site)");
const featuresRoot = path.join(casRoot, "src", "components", "features", "routes");

const FEATURE_MARKER = "@generated-site-feature";
const PAGE_MARKER = "@generated-site-page";

function routeToAppDir(route) {
  if (route === "/") return siteRoot;
  return path.join(siteRoot, ...route.replace(/^\//, "").split("/"));
}

function exportBaseName(route, fileKey) {
  if (route === "/") return "Home";
  return fileKey
    .split("_")
    .flatMap((part) => part.split("-"))
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");
}

function pickDefaultClone(clones, pathname) {
  const onPath = clones.filter((c) => c.route === pathname);
  const noQuery = onPath.find((c) => Object.keys(c.query).length === 0);
  return noQuery ?? onPath[0];
}

function featureSource(route, fileKey) {
  const exportName = `${exportBaseName(route, fileKey)}Page`;
  const metaFn = `generate${exportBaseName(route, fileKey)}Metadata`;

  return `/** ${FEATURE_MARKER} — fileKey: ${fileKey} */
import {
  NuxtClonePage,
  nuxtCloneMetadata,
} from "@/components/legacy/nuxt-clone-page";

const PATHNAME = ${JSON.stringify(route)};

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function ${metaFn}(props: PageProps) {
  return nuxtCloneMetadata(PATHNAME, props.searchParams);
}

export default function ${exportName}(props: PageProps) {
  return <NuxtClonePage pathname={PATHNAME} searchParams={props.searchParams} />;
}
`;
}

function appPageSource(route, fileKey) {
  const exportName = `${exportBaseName(route, fileKey)}Page`;
  const metaFn = `generate${exportBaseName(route, fileKey)}Metadata`;
  const importPath = `@/components/features/routes/${fileKey}/page`;

  return `/** ${PAGE_MARKER} — route: ${route} */
export {
  default,
  ${metaFn} as generateMetadata,
} from "${importPath}";
`;
}

function walk(dir, onFile) {
  if (!fs.existsSync(dir)) return;
  for (const name of fs.readdirSync(dir)) {
    if (name === "layout.tsx") continue;
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full, onFile);
    else if (name === "page.tsx") onFile(full);
  }
}

function removeGenerated(dir, marker) {
  walk(dir, (file) => {
    const text = fs.readFileSync(file, "utf8");
    if (!text.includes(marker)) return;
    fs.unlinkSync(file);
    const parent = path.dirname(file);
    if (fs.existsSync(parent) && fs.readdirSync(parent).length === 0) {
      fs.rmdirSync(parent);
    }
  });
}

function removeGeneratedFeatures() {
  if (!fs.existsSync(featuresRoot)) return;
  for (const name of fs.readdirSync(featuresRoot)) {
    const full = path.join(featuresRoot, name);
    if (fs.statSync(full).isDirectory()) {
      const page = path.join(full, "page.tsx");
      if (fs.existsSync(page)) {
        const text = fs.readFileSync(page, "utf8");
        if (text.includes(FEATURE_MARKER)) {
          fs.rmSync(full, { recursive: true, force: true });
        }
      }
    }
  }
}

function main() {
  if (!fs.existsSync(manifestPath)) {
    throw new Error("Run sync:clones first");
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  const pathnames = [...new Set(manifest.clones.map((c) => c.route))].sort();

  fs.mkdirSync(siteRoot, { recursive: true });
  removeGenerated(siteRoot, PAGE_MARKER);
  removeGenerated(path.join(casRoot, "src", "components", "features"), FEATURE_MARKER);
  removeGeneratedFeatures();

  const routeMap = [];

  for (const route of pathnames) {
    const entry = pickDefaultClone(manifest.clones, route);
    if (!entry) continue;

    const featureDir = path.join(featuresRoot, entry.fileKey);
    const existingFeature = path.join(featureDir, "page.tsx");
    if (fs.existsSync(existingFeature)) {
      const text = fs.readFileSync(existingFeature, "utf8");
      if (
        text.includes("@migrated-site-feature") ||
        text.includes("@copied-from-ptmx")
      ) {
        routeMap.push({ route, fileKey: entry.fileKey, skipped: true });
        continue;
      }
    }
    const appDir = routeToAppDir(route);
    fs.mkdirSync(featureDir, { recursive: true });
    fs.mkdirSync(appDir, { recursive: true });
    fs.writeFileSync(path.join(featureDir, "page.tsx"), featureSource(route, entry.fileKey));
    fs.writeFileSync(path.join(appDir, "page.tsx"), appPageSource(route, entry.fileKey));
    routeMap.push({ route, fileKey: entry.fileKey });
  }

  fs.writeFileSync(
    path.join(casRoot, "src", "lib", "generated", "site-routes.json"),
    JSON.stringify({ generatedAt: new Date().toISOString(), routes: routeMap }, null, 2)
  );

  console.log("Site routes:", routeMap.length);
}

main();
