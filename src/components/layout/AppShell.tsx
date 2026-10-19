import type { ReactNode } from "react";

import { AnnouncementTicker } from "./AnnouncementTicker";
import { BottomNavigation } from "./BottomNavigation";
import { FloatingControls } from "./FloatingControls";
import { TopHeader } from "./TopHeader";
import { WalletActionRow } from "./WalletActionRow";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="phantom-react-shell relative min-h-screen">
      <TopHeader />
      <WalletActionRow />
      <main
        className="mx-auto flex max-w-[480px] flex-col gap-[var(--section-gap)] pb-[calc(var(--bottom-nav-h)+20px)] pt-2"
      >
        <AnnouncementTicker />
        {children}
      </main>
      <FloatingControls />
      <BottomNavigation />
    </div>
  );
}
