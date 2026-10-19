/** @generated-site-feature — fileKey: events_affiliate_affiliate-detail */
import {
  NuxtClonePage,
  nuxtCloneMetadata,
} from "@/legacy/components/legacy/nuxt-clone-page";

const PATHNAME = "/events/affiliate/affiliate-detail";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateEventsAffiliateAffiliateDetailMetadata(props: PageProps) {
  return nuxtCloneMetadata(PATHNAME, props.searchParams);
}

export default function EventsAffiliateAffiliateDetailPage(props: PageProps) {
  return <NuxtClonePage pathname={PATHNAME} searchParams={props.searchParams} />;
}
