import { SiteGuestShell } from "@/components/layout/SiteGuestShell";
import {
  NuxtClonePage,
  nuxtCloneMetadata,
} from "@/components/legacy/nuxt-clone-page";

const PATHNAME = "/";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generatePtmxHomeMetadata(props: PageProps) {
  return nuxtCloneMetadata(PATHNAME, props.searchParams);
}

export function PtmxHomePage(props: PageProps) {
  return (
    <SiteGuestShell activePath="/" showRegister>
      <NuxtClonePage pathname={PATHNAME} searchParams={props.searchParams} />
    </SiteGuestShell>
  );
}
