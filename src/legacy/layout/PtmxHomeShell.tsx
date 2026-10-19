import type { ReactNode } from "react";

import { SiteGuestShell } from "./SiteGuestShell";

/** @deprecated ใช้ SiteGuestShell */
export function PtmxHomeShell({ children }: { children: ReactNode }) {
  return (
    <SiteGuestShell activePath="/" showRegister>
      {children}
    </SiteGuestShell>
  );
}
