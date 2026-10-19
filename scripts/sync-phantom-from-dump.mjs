import fs from "node:fs";
import path from "node:path";
import { cpSync } from "node:fs";
import { fileURLToPath } from "node:url";

const casRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dumpRoot = path.resolve(casRoot, "..", "dump");
const renderedPath = path.join(dumpRoot, "rendered-home.html");
const indexPath = path.join(dumpRoot, "index.html");
const publicDir = path.join(casRoot, "public");
const generatedDir = path.join(casRoot, "src", "lib", "generated");
const REMOTE = "https://ptmx-app.web.app";

async function fetchRemoteAsset(relativePath) {
  const res = await fetch(`${REMOTE}${relativePath}`);
  if (!res.ok) return false;
  const local = path.join(publicDir, relativePath.replace(/^\//, ""));
  fs.mkdirSync(path.dirname(local), { recursive: true });
  fs.writeFileSync(local, Buffer.from(await res.arrayBuffer()));
  return true;
}

async function fetchViteMapDeps(entryRelativePath) {
  const entryLocal = path.join(publicDir, entryRelativePath.replace(/^\//, ""));
  if (!fs.existsSync(entryLocal)) return;
  const entry = fs.readFileSync(entryLocal, "utf8");
  const deps = [
    ...new Set([...entry.matchAll(/"\.\/([^"]+)"/g)].map((m) => m[1])),
  ];
  for (const dep of deps) {
    const rel = `/_nuxt/${dep.replace(/^\//, "")}`;
    const local = path.join(publicDir, rel.replace(/^\//, ""));
    if (fs.existsSync(local)) continue;
    await fetchRemoteAsset(rel);
  }
}

async function fetchJsDepGraph(seedFiles) {
  const nuxtDir = path.join(publicDir, "_nuxt");
  const queue = [...seedFiles];
  const seen = new Set();

  while (queue.length > 0) {
    const rel = queue.pop();
    if (!rel || seen.has(rel)) continue;
    seen.add(rel);

    const local = path.join(nuxtDir, rel);
    let source = "";
    if (fs.existsSync(local)) {
      source = fs.readFileSync(local, "utf8");
    } else {
      const ok = await fetchRemoteAsset(`/_nuxt/${rel}`);
      if (!ok) continue;
      source = fs.readFileSync(local, "utf8");
    }

    for (const match of source.matchAll(/"\.\/(\/?[^"]+\.js)"/g)) {
      const dep = match[1].replace(/^\//, "");
      if (!seen.has(dep)) queue.push(dep);
    }
  }
}

function readRenderedHtml() {
  if (fs.existsSync(renderedPath)) return fs.readFileSync(renderedPath, "utf8");
  return fs.readFileSync(indexPath, "utf8");
}

function readIndexHtml() {
  return fs.readFileSync(indexPath, "utf8");
}

function normalizeAssetUrl(url) {
  return url.replace(/^https:\/\/ptmx-app\.web\.app/, "");
}

function extractBodyMarkup(html) {
  const body = html.match(/<body[^>]*>([\s\S]*)<\/body>/i)?.[1] ?? "";
  const start = body.indexOf('<div id="__nuxt"');
  const end = body.indexOf('<div id="teleports"');
  if (start === -1) throw new Error("Could not find #__nuxt in dump HTML");
  let chunk = end === -1 ? body.slice(start) : body.slice(start, end);
  chunk = chunk.replace(/https:\/\/ptmx-app\.web\.app/g, "");
  return chunk.trim();
}

function parseNuxtBoot(indexHtml) {
  const head = indexHtml.match(/<head[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? "";

  const stylesheets = [
    ...new Set(
      [...head.matchAll(/<link[^>]+rel=["']stylesheet["'][^>]*>/gi)]
        .map((m) => m[0].match(/href=["']([^"']+)["']/i)?.[1] ?? "")
        .filter(Boolean)
        .map(normalizeAssetUrl)
    ),
  ];

  const modulepreloads = [
    ...new Set(
      [...head.matchAll(/<link[^>]+rel=["']modulepreload["'][^>]*>/gi)]
        .map((m) => m[0].match(/href=["']([^"']+)["']/i)?.[1] ?? "")
        .filter(Boolean)
        .map(normalizeAssetUrl)
    ),
  ];

  const deferScripts = [
    ...new Set(
      [...head.matchAll(/<script[^>]+src=["']([^"']+)["'][^>]*defer[^>]*>/gi)]
        .map((m) => normalizeAssetUrl(m[1]))
        .filter((src) => !src.includes("_nuxt/entry."))
    ),
  ];

  const entryModule =
    head.match(/<script[^>]+type=["']module["'][^>]+src=["']([^"']+)["']/i)?.[1] ??
    indexHtml.match(/<script[^>]+type=["']module["'][^>]+src=["']([^"']+)["']/i)?.[1];
  if (!entryModule) throw new Error("Nuxt entry module not found in dump/index.html");
  const entryModulePath = normalizeAssetUrl(entryModule);

  const colorModeScript =
    head.match(
      /<script>"use strict";[\s\S]*?function getCookie[\s\S]*?<\/script>/i
    )?.[0] ?? "";
  const colorModeInline = colorModeScript
    .replace(/^<script>/i, "")
    .replace(/<\/script>$/i, "")
    .trim();

  const nuxtDataMatch = indexHtml.match(
    /<script[^>]*id=["']__NUXT_DATA__["'][^>]*>([\s\S]*?)<\/script>/i
  );
  const nuxtDataContent = nuxtDataMatch?.[1]?.trim() ?? "";

  const nuxtConfigMatch = indexHtml.match(
    /<script>window\.__NUXT__=\{[\s\S]*?<\/script>/i
  );
  const nuxtConfigInline = nuxtConfigMatch?.[0]
    ?.replace(/^<script>/i, "")
    .replace(/<\/script>$/i, "")
    .trim();

  if (!nuxtConfigInline) throw new Error("__NUXT__ config script not found");

  const title =
    indexHtml.match(/<title>([^<]*)<\/title>/i)?.[1]?.trim() ??
    "Phantom - Phantom Description";

  return {
    title,
    stylesheets,
    modulepreloads,
    deferScripts,
    entryModule: entryModulePath,
    colorModeInline,
    nuxtDataContent,
    nuxtConfigInline,
  };
}

async function main() {
  const renderedHtml = readRenderedHtml();
  const indexHtml = readIndexHtml();
  const boot = parseNuxtBoot(indexHtml);

  const stylesheetsRendered = [
    ...new Set(
      [...renderedHtml.matchAll(/<link[^>]+rel=["']stylesheet["'][^>]*>/gi)]
        .map((m) => m[0].match(/href=["']([^"']+)["']/i)?.[1] ?? "")
        .filter(Boolean)
        .map(normalizeAssetUrl)
    ),
  ];

  const inlineCss = [...renderedHtml.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)]
    .map((m) => m[1])
    .join("\n");

  const titleRendered =
    renderedHtml.match(/<title>([^<]*)<\/title>/i)?.[1]?.trim() ?? boot.title;

  fs.mkdirSync(generatedDir, { recursive: true });
  fs.mkdirSync(path.join(publicDir, "phantom"), { recursive: true });

  fs.writeFileSync(
    path.join(generatedDir, "phantom-body.html"),
    extractBodyMarkup(renderedHtml)
  );
  fs.writeFileSync(
    path.join(generatedDir, "phantom-meta.json"),
    JSON.stringify({ title: titleRendered, stylesheets: stylesheetsRendered }, null, 2)
  );
  fs.writeFileSync(path.join(generatedDir, "phantom-boot.json"), JSON.stringify(boot, null, 2));
  fs.writeFileSync(path.join(publicDir, "phantom", "inline.css"), inlineCss);

  for (const dir of ["_nuxt", "assets"]) {
    const src = path.join(dumpRoot, dir);
    const dest = path.join(publicDir, dir);
    if (fs.existsSync(src)) {
      fs.rmSync(dest, { recursive: true, force: true });
      cpSync(src, dest, { recursive: true });
    }
  }

  for (const file of ["favicon.png", "geetest-v4.js", "pixel.js"]) {
    const src = path.join(dumpRoot, file);
    if (fs.existsSync(src)) fs.copyFileSync(src, path.join(publicDir, file));
  }

  const localesDir = path.join(publicDir, "locales");
  fs.mkdirSync(localesDir, { recursive: true });
  const localeFiles = ["th", "en", "km", "zh", "vi", "lao", "my"];
  for (const locale of localeFiles) {
    const res = await fetch(`${REMOTE}/locales/${locale}.yml`);
    if (res.ok) {
      fs.writeFileSync(path.join(localesDir, `${locale}.yml`), await res.text());
    }
  }

  await fetchViteMapDeps(boot.entryModule);
  await fetchJsDepGraph([
    boot.entryModule.replace("/_nuxt/", ""),
    "default.DxAodAly.js",
    "index.D2Ic7exC.js",
    "otherLobby.BALGFLef.js",
    "MainImageSlide.Czz4xtj1.js",
    "GameGrid.BAgX8TPW.js",
  ]);

  console.log("Generated phantom-boot.json from dump/index.html");
  console.log("Entry:", boot.entryModule);
  console.log("Defer scripts:", boot.deferScripts.join(", "));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
