import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { findCloneByPathname } from "@/legacy/lib/phantom-clone";
import { NuxtMarkupView } from "@/legacy/components/legacy/nuxt-markup-view";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

async function resolveEntry(pathname: string, searchParams: SearchParams) {
  const sp = await searchParams;
  return findCloneByPathname(pathname, sp);
}

export async function nuxtCloneMetadata(
  pathname: string,
  searchParams: SearchParams
): Promise<Metadata> {
  const entry = await resolveEntry(pathname, searchParams);
  return { title: entry?.title ?? "Phantom" };
}

/** หน้า Next ที่แสดง markup 1:1 จาก dump (แทน Nuxt runtime) — แทนที่ด้วย React ใน feature เดียวกันทีหลัง */
export async function NuxtClonePage({
  pathname,
  searchParams,
}: {
  pathname: string;
  searchParams: SearchParams;
}) {
  const entry = await resolveEntry(pathname, searchParams);
  if (!entry) notFound();

  const html = fs.readFileSync(
    path.join(process.cwd(), "src/lib/generated/clones", `${entry.fileKey}.html`),
    "utf8"
  );

  return (
    <>
      {entry.stylesheets.map((href) => (
        <link key={href} rel="stylesheet" href={href} crossOrigin="" />
      ))}
      <NuxtMarkupView html={html} />
    </>
  );
}
