/** @generated-site-feature — fileKey: fav */
import {
  NuxtClonePage,
  nuxtCloneMetadata,
} from "@/legacy/components/legacy/nuxt-clone-page";

const PATHNAME = "/fav";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateFavMetadata(props: PageProps) {
  return nuxtCloneMetadata(PATHNAME, props.searchParams);
}

export default function FavPage(props: PageProps) {
  return <NuxtClonePage pathname={PATHNAME} searchParams={props.searchParams} />;
}
