import { SiteGuestShell } from "@/legacy/layout/SiteGuestShell";
import {
  NuxtClonePage,
  nuxtCloneMetadata,
} from "@/legacy/components/legacy/nuxt-clone-page";

const PATHNAME = "/games";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generatePtmxGamesMetadata(props: PageProps) {
  return nuxtCloneMetadata(PATHNAME, props.searchParams);
}

export function PtmxGamesPage(props: PageProps) {
  return (
    <SiteGuestShell activePath="/games" showRegister>
      <NuxtClonePage pathname={PATHNAME} searchParams={props.searchParams} />
    </SiteGuestShell>
  );
}
