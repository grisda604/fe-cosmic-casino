/** @generated-site-feature — fileKey: events_tier */
import {
  NuxtClonePage,
  nuxtCloneMetadata,
} from "@/legacy/components/legacy/nuxt-clone-page";

const PATHNAME = "/events/tier";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateEventsTierMetadata(props: PageProps) {
  return nuxtCloneMetadata(PATHNAME, props.searchParams);
}

export default function EventsTierPage(props: PageProps) {
  return <NuxtClonePage pathname={PATHNAME} searchParams={props.searchParams} />;
}
