"use client";

import { ViewTransition, type ReactNode } from "react";
import { LobbySidebar } from "@/components/features/home/LobbySidebar";
import { DesktopFeatureCards } from "@/components/features/home/DesktopFeatureCards";
import { CategoryPills } from "@/components/features/home/CategoryPills";
import { LobbyHubTiles } from "@/components/features/home/LobbyHubTiles";
import { LottoSiteHeader } from "@/components/features/home/LottoSiteHeader";
import { BottomNavLotto } from "@/components/features/home/BottomNavLotto";
import layout from "@/components/features/home/lobby-layout.module.css";
import { useAuth } from "@/components/auth/AuthProvider";
import { useWallet } from "@/hooks/api/account";
import { formatMoney } from "@/lib/lotto/format-money";
import { useSidebarCollapsed } from "@/hooks/useSidebarCollapsed";

/** ยอดกระเป๋าสำหรับ header/sidebar ของหน้าแรก (รูป `{money, credit}` เดิมของ lotto) — glass มียอดเดียว: credit แสดง 0.00 */
export function useLottoWalletSnapshot() {
  const wallet = useWallet();
  return {
    money: formatMoney(wallet.data?.amount ?? 0),
    credit: "0.00",
  };
}

/** header ของ lotto ที่ใช้ซ้ำในหน้าย่อยทุกหน้า (ใช้ component หน้าแรกเดิม ไม่แก้ไข) */
export function LottoShellHeader() {
  const { isAuthenticated } = useAuth();
  const wallet = useLottoWalletSnapshot();
  return <LottoSiteHeader loggedIn={isAuthenticated} wallet={wallet} hideWalletOnDesktop={isAuthenticated} />;
}

/**
 * โครงหน้าย่อย: header + (sidebar เมื่อ login บน desktop) + เนื้อหา + bottom nav — เหมือนโครงหน้าแรก
 */
export function LottoShellFrame({
  children,
  bottomNav = true,
  fit = false,
  hubRail = false,
}: {
  children: ReactNode;
  /** การ์ด hub (แนะนำเพื่อน · เช็คอิน · วงล้อ ...) แถบขวา desktop ≥1024 — ไม่ส่ง = ไม่มีคอลัมน์ขวา */
  hubRail?: boolean;
  bottomNav?: boolean;
  /** มือถือล็อกความสูงเท่าจอ (หวย step 2/3 แบบ glass) — โซนเนื้อหาเลื่อนเองข้างใน */
  fit?: boolean;
}) {
  const { isAuthenticated } = useAuth();
  const [sidebarCollapsed, toggleSidebar] = useSidebarCollapsed();
  const fitClass = (name: string) => (fit ? ` ${name}` : "");
  return (
    <div
      className={`lotto-page ${layout.frame}${fitClass("lotto-fit")}`}
      data-sidebar={sidebarCollapsed ? "collapsed" : "expanded"}
      data-hub={hubRail ? "" : undefined}
    >
      <LottoShellHeader />
      {hubRail ? (
        <div className={layout.navBarSlot}>
          <div className={layout.navBarInner}>
            <CategoryPills bar />
          </div>
        </div>
      ) : null}
      <div className={`${layout.pageShell}${fitClass("lotto-fit__shell")}`}>
        <div className={layout.sidebarSlot} style={{ viewTransitionName: "site-sidebar" }}>
          <LobbySidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
        </div>
        <div className={`${layout.mainColumn}${fitClass("lotto-fit__col")}`}>
          <div className={`${layout.mainStack}${fitClass("lotto-fit__stack")}`}>
            {/* เปลี่ยนหน้า: เนื้อหา crossfade เบา ๆ · header/sidebar/bottom nav ตั้งชื่อไว้ให้อยู่นิ่ง */}
            <ViewTransition enter="page-enter" exit="page-exit" default="none">
              {children}
            </ViewTransition>
          </div>
        </div>
        {hubRail ? (
          <aside className={layout.railSlot}>
            <LobbyHubTiles variant="rail" />
            <DesktopFeatureCards rail />
          </aside>
        ) : null}
      </div>
      {bottomNav ? (
        <div className={layout.bottomNavSlot} style={{ viewTransitionName: "site-bottom-nav", position: "relative", zIndex: 40 }}>
          <BottomNavLotto loggedIn={isAuthenticated} />
        </div>
      ) : null}
    </div>
  );
}
