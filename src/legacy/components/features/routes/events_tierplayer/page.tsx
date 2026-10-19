/** @generated-site-feature — fileKey: events_tierplayer */
import {
  NuxtClonePage,
  nuxtCloneMetadata,
} from "@/legacy/components/legacy/nuxt-clone-page";

const PATHNAME = "/events/tierplayer";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateEventsTierplayerMetadata(props: PageProps) {
  return nuxtCloneMetadata(PATHNAME, props.searchParams);
}

export default function EventsTierplayerPage(props: PageProps) {
  return <NuxtClonePage pathname={PATHNAME} searchParams={props.searchParams} />;
}
