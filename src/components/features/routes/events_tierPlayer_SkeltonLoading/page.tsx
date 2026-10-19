/** @generated-site-feature — fileKey: events_tierPlayer_SkeltonLoading */
import {
  NuxtClonePage,
  nuxtCloneMetadata,
} from "@/components/legacy/nuxt-clone-page";

const PATHNAME = "/events/tierPlayer/SkeltonLoading";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateEventsTierPlayerSkeltonLoadingMetadata(props: PageProps) {
  return nuxtCloneMetadata(PATHNAME, props.searchParams);
}

export default function EventsTierPlayerSkeltonLoadingPage(props: PageProps) {
  return <NuxtClonePage pathname={PATHNAME} searchParams={props.searchParams} />;
}
