"use client";

import type { ReactNode } from "react";
import { LottoShellFrame } from "@/components/layout/LottoShellChrome";
import { usePathname } from "@/lib/i18n/navigation";
import { DesktopFeatureCards } from "./DesktopFeatureCards";
import { HeroBanner } from "./HeroBanner";
import { LobbyHubTiles } from "./LobbyHubTiles";
import { LottoMobileHeroPanel, LottoMobileQuickMenu } from "./LottoMobileQuickMenu";

/**
 * เปลือกถาวรของหน้าแท็บหมวดเกม (/ · /casino · /slots · /fishing · /sport · /cards)
 * อยู่ใน layout จึงไม่ถูกสร้างใหม่เมื่อสลับแท็บ — header / แบนเนอร์ / ปุ่มฝากถอน / เมนูหมวด / bottom nav คงที่
 * เปลี่ยนเฉพาะ {children}
 */
export function LobbyTabsShell({ children }: { children: ReactNode }) {
  const isHome = usePathname() === "/";
  return (
    <LottoShellFrame hubRail>
      <div className="lg:hidden">
        <LottoMobileHeroPanel>
          <HeroBanner />
        </LottoMobileHeroPanel>
      </div>
      <div className="lg:hidden">
        <LobbyHubTiles variant="strip" />
      </div>
      {isHome ? (
        <div className="lg:hidden">
          <DesktopFeatureCards mobile />
        </div>
      ) : null}
      {/* แถบหมวดเกม (sticky ใต้ header) อยู่ล่างการ์ดโปร · ก่อนเนื้อหา */}
      <LottoMobileQuickMenu />
      {children}
    </LottoShellFrame>
  );
}
