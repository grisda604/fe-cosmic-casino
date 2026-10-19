/** @generated-site-feature — fileKey: events_cash-back_cashback-normal */
import {
  NuxtClonePage,
  nuxtCloneMetadata,
} from "@/components/legacy/nuxt-clone-page";

const PATHNAME = "/events/cash-back/cashback-normal";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateEventsCashBackCashbackNormalMetadata(props: PageProps) {
  return nuxtCloneMetadata(PATHNAME, props.searchParams);
}

export default function EventsCashBackCashbackNormalPage(props: PageProps) {
  return <NuxtClonePage pathname={PATHNAME} searchParams={props.searchParams} />;
}
