/** @generated-site-feature — fileKey: events_cash-back */
import {
  NuxtClonePage,
  nuxtCloneMetadata,
} from "@/components/legacy/nuxt-clone-page";

const PATHNAME = "/events/cash-back";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateEventsCashBackMetadata(props: PageProps) {
  return nuxtCloneMetadata(PATHNAME, props.searchParams);
}

export default function EventsCashBackPage(props: PageProps) {
  return <NuxtClonePage pathname={PATHNAME} searchParams={props.searchParams} />;
}
