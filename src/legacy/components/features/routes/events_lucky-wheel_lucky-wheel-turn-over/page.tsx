/** @generated-site-feature — fileKey: events_lucky-wheel_lucky-wheel-turn-over */
import {
  NuxtClonePage,
  nuxtCloneMetadata,
} from "@/legacy/components/legacy/nuxt-clone-page";

const PATHNAME = "/events/lucky-wheel/lucky-wheel-turn-over";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateEventsLuckyWheelLuckyWheelTurnOverMetadata(props: PageProps) {
  return nuxtCloneMetadata(PATHNAME, props.searchParams);
}

export default function EventsLuckyWheelLuckyWheelTurnOverPage(props: PageProps) {
  return <NuxtClonePage pathname={PATHNAME} searchParams={props.searchParams} />;
}
