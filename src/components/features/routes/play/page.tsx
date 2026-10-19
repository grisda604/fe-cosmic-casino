/** @generated-site-feature — fileKey: play */
import {
  NuxtClonePage,
  nuxtCloneMetadata,
} from "@/components/legacy/nuxt-clone-page";

const PATHNAME = "/play";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generatePlayMetadata(props: PageProps) {
  return nuxtCloneMetadata(PATHNAME, props.searchParams);
}

export default function PlayPage(props: PageProps) {
  return <NuxtClonePage pathname={PATHNAME} searchParams={props.searchParams} />;
}
