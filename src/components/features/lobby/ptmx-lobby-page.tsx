import { SiteGuestShell } from "@/components/layout/SiteGuestShell";
import {
  NuxtClonePage,
  nuxtCloneMetadata,
} from "@/components/legacy/nuxt-clone-page";

const PATHNAME = "/lobby";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generatePtmxLobbyMetadata(props: PageProps) {
  return nuxtCloneMetadata(PATHNAME, props.searchParams);
}

/** ล็obby คาสิโน — header/หมวดเดียวกับหน้าแรก */
export function PtmxLobbyPage(props: PageProps) {
  return (
    <SiteGuestShell activePath="/lobby" showRegister>
      <NuxtClonePage pathname={PATHNAME} searchParams={props.searchParams} />
    </SiteGuestShell>
  );
}
