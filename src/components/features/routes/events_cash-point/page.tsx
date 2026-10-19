/** @generated-site-feature — fileKey: events_cash-point */
import {
  NuxtClonePage,
  nuxtCloneMetadata,
} from "@/components/legacy/nuxt-clone-page";

const PATHNAME = "/events/cash-point";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateEventsCashPointMetadata(props: PageProps) {
  return nuxtCloneMetadata(PATHNAME, props.searchParams);
}

export default function EventsCashPointPage(props: PageProps) {
  return <NuxtClonePage pathname={PATHNAME} searchParams={props.searchParams} />;
}
