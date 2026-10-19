/** @generated-site-feature — fileKey: events_commissionfourstep */
import {
  NuxtClonePage,
  nuxtCloneMetadata,
} from "@/components/legacy/nuxt-clone-page";

const PATHNAME = "/events/commissionfourstep";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateEventsCommissionfourstepMetadata(props: PageProps) {
  return nuxtCloneMetadata(PATHNAME, props.searchParams);
}

export default function EventsCommissionfourstepPage(props: PageProps) {
  return <NuxtClonePage pathname={PATHNAME} searchParams={props.searchParams} />;
}
