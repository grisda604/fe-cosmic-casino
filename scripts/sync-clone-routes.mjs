import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const casRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dumpRoot = path.resolve(casRoot, "..", "dump");
const routesIndexPath = path.join(dumpRoot, "routes", "ROUTES_INDEX.json");
const generatedDir = path.join(casRoot, "src", "lib", "generated");
const clonesDir = path.join(generatedDir, "clones");

function normalizeAssetUrl(url) {
  return url.replace(/^https:\/\/ptmx-app\.web\.app/, "");
}

function extractNuxtMarkup(html) {
  const body = html.match(/<body[^>]*>([\s\S]*)<\/body>/i)?.[1] ?? html;
  const start = body.indexOf('<div id="__nuxt"');
  const end = body.indexOf('<div id="teleports"');
  if (start === -1) {
    return body.trim();
  }
  const chunk = end === -1 ? body.slice(start) : body.slice(start, end);
  return chunk.replace(/https:\/\/ptmx-app\.web\.app/g, "").trim();
}

function extractStylesheets(html) {
  return [
    ...new Set(
      [...html.matchAll(/<link[^>]+rel=["']stylesheet["'][^>]*>/gi)]
        .map((m) => m[0].match(/href=["']([^"']+)["']/i)?.[1] ?? "")
        .filter(Boolean)
        .map(normalizeAssetUrl)
    ),
  ];
}

function extractInlineStyles(html) {
  return [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)]
    .map((m) => m[1])
    .join("\n");
}

function findRenderedHtml(folderRel) {
  const dir = path.join(dumpRoot, folderRel);
  for (const name of ["rendered.html", "rendered-profile.html"]) {
    const file = path.join(dir, name);
    if (fs.existsSync(file)) return file;
  }
  return null;
}

function routeToSlug(route) {
  if (route === "/") return [];
  return route.replace(/^\//, "").split("/").filter(Boolean);
}

function safeFileKey(route) {
  return route
    .replace(/^\//, "")
    .replace(/\//g, "_")
    .replace(/[?&=:*]/g, "_")
    .replace(/_+/g, "_")
    .replace(/_$/, "") || "_root";
}

function parseRouteQuery(route) {
  const [pathname, search = ""] = route.split("?");
  const query = {};
  if (search) {
    for (const part of search.split("&")) {
      const [k, v] = part.split("=");
      if (k) query[k] = v ?? "";
    }
  }
  return { pathname: pathname || "/", query };
}

function main() {
  if (!fs.existsSync(routesIndexPath)) {
    throw new Error(`Missing ${routesIndexPath}`);
  }

  const index = JSON.parse(fs.readFileSync(routesIndexPath, "utf8"));
  fs.mkdirSync(clonesDir, { recursive: true });

  const clones = [];
  const allStyles = new Set([
    "/_nuxt/css/entry.8X9wOrbK.css",
    "/_nuxt/css/swiper-vue.DJHdZmOr.css",
  ]);
  let inlineCss = "";

  for (const entry of index.routes) {
    const { pathname, query } = parseRouteQuery(entry.route);

    const renderedPath = findRenderedHtml(entry.folder);
    if (!renderedPath) {
      console.warn("skip (no rendered html):", entry.route);
      continue;
    }

    const html = fs.readFileSync(renderedPath, "utf8");
    const markup = extractNuxtMarkup(html);
    const stylesheets = extractStylesheets(html);
    stylesheets.forEach((s) => allStyles.add(s));
    inlineCss += extractInlineStyles(html) + "\n";

    const fileKey = safeFileKey(entry.route);
    const htmlOut = path.join(clonesDir, `${fileKey}.html`);
    fs.writeFileSync(htmlOut, markup);

    clones.push({
      route: pathname,
      query,
      slug: routeToSlug(pathname),
      fileKey,
      title: entry.title,
      folder: entry.folder,
      stylesheets,
    });
  }

  fs.writeFileSync(
    path.join(generatedDir, "clone-manifest.json"),
    JSON.stringify({ generatedAt: new Date().toISOString(), clones }, null, 2)
  );

  fs.mkdirSync(path.join(casRoot, "public", "phantom"), { recursive: true });
  fs.writeFileSync(
    path.join(casRoot, "public", "phantom", "clone-inline.css"),
    inlineCss.slice(0, 500_000)
  );

  fs.writeFileSync(
    path.join(generatedDir, "clone-styles.json"),
    JSON.stringify([...allStyles].sort(), null, 2)
  );

  console.log("Clone routes:", clones.length);
  console.log("Stylesheets union:", allStyles.size);
}

main();
