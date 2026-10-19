/** @generated-site-feature — fileKey: promotion */
import {
  NuxtClonePage,
  nuxtCloneMetadata,
} from "@/legacy/components/legacy/nuxt-clone-page";

const PATHNAME = "/promotion";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generatePromotionMetadata(props: PageProps) {
  return nuxtCloneMetadata(PATHNAME, props.searchParams);
}

export default function PromotionPage(props: PageProps) {
  return <NuxtClonePage pathname={PATHNAME} searchParams={props.searchParams} />;
}
