import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { NuxtClonePage, nuxtCloneMetadata } from "@/components/legacy/nuxt-clone-page";
import { findCloneByPathname } from "@/lib/phantom-clone";

type PageProps = {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { slug } = await props.params;
  const pathname = `/${slug.join("/")}`;
  if (findCloneByPathname(pathname, await props.searchParams)) {
    return nuxtCloneMetadata(pathname, props.searchParams);
  }
  return { title: "Phantom" };
}

export default async function SiteCatchAllPage(props: PageProps) {
  const { slug } = await props.params;
  const pathname = `/${slug.join("/")}`;
  if (!findCloneByPathname(pathname, await props.searchParams)) notFound();

  return <NuxtClonePage pathname={pathname} searchParams={props.searchParams} />;
}
