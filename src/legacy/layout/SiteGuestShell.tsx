import type { ReactNode } from "react";

import { GuestRegisterBar } from "./GuestRegisterBar";
import { SiteCategoryNav } from "./SiteCategoryNav";
import { SiteHeaderGuest } from "./SiteHeaderGuest";

type SiteGuestShellProps = {
  children: ReactNode;
  /** path ปัจจุบัน สำหรับ highlight หมวด */
  activePath: string;
  /** แสดงปุ่มสมัครสมาชิก (guest) */
  showRegister?: boolean;
};

/** Header + หมวด (รวมคาสิโน) + เนื้อหา ptmx clone */
export function SiteGuestShell({
  children,
  activePath,
  showRegister = true,
}: SiteGuestShellProps) {
  return (
    <div className="ptmx-guest-shell phantom-react-shell">
      <div className="sticky top-0 z-[60] bg-[#000000]">
        <SiteHeaderGuest />
        {showRegister ? <GuestRegisterBar /> : null}
        <SiteCategoryNav activePath={activePath} />
      </div>
      <div className="ptmx-guest-clone">{children}</div>
    </div>
  );
}
