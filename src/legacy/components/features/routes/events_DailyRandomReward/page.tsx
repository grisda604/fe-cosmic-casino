/** @generated-site-feature — fileKey: events_DailyRandomReward */
import {
  NuxtClonePage,
  nuxtCloneMetadata,
} from "@/legacy/components/legacy/nuxt-clone-page";

const PATHNAME = "/events/DailyRandomReward";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateEventsDailyRandomRewardMetadata(props: PageProps) {
  return nuxtCloneMetadata(PATHNAME, props.searchParams);
}

export default function EventsDailyRandomRewardPage(props: PageProps) {
  return <NuxtClonePage pathname={PATHNAME} searchParams={props.searchParams} />;
}
