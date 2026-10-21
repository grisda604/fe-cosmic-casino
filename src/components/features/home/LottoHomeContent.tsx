import type { LobbyGameItem } from "@/lib/lotto/load-lobby-games";

import { GameShowcaseSection } from "./GameShowcaseSection";
import { HallOfFameSection } from "./HallOfFameSection";
import { HeroBanner } from "./HeroBanner";
import { ProviderLogoMarquee } from "./ProviderLogoMarquee";
import { TopLeadersSection } from "./TopLeadersSection";
import { TrendingGames } from "./TrendingGames";

export type LottoHomeContentProps = {
  casino: LobbyGameItem[];
  slots: LobbyGameItem[];
  sports: LobbyGameItem[];
};

const ICON = "/assets/3d/menuicon";

/**
 * ลำดับ section หน้าแรก (design.md §6):
 * แบนเนอร์ → pill หมวด → เกมยอดนิยม → ค่ายเกม → คาสิโน/สล็อต/กีฬา → ผู้ชนะสูงสุด/ผู้โชคดี
 */
export function LottoHomeContent({
  casino,
  slots,
  sports,
}: LottoHomeContentProps) {
  /* เกมยอดนิยม = เกมเด่นจากรายการเดิม (คาสิโน 6 + สล็อต 6) ไม่มีข้อมูลใหม่ */
  const trending = [...casino.slice(0, 6), ...slots.slice(0, 6)];

  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      {/* แบนเนอร์/pill มือถืออยู่ใน (tabs) layout — ที่นี่เฉพาะ desktop */}
      <div className="hidden flex-col gap-3 lg:flex">
        <HeroBanner />
      </div>
      <TrendingGames items={trending} />
      <ProviderLogoMarquee />
      <GameShowcaseSection
        title="คาสิโนออนไลน์"
        iconSrc={`${ICON}/casino.avif`}
        items={casino}
        cardVariant="wide"
        carousel
        showViewAll
      />
      <GameShowcaseSection
        title="สล็อตออนไลน์"
        iconSrc={`${ICON}/slot.avif`}
        items={slots}
        cardVariant="wide"
        carousel
        showViewAll
      />
      <GameShowcaseSection
        title="กีฬาออนไลน์"
        iconSrc={`${ICON}/sport.avif`}
        items={sports}
        cardVariant="wide"
        carousel
        showViewAll
      />
      <TopLeadersSection />
      <HallOfFameSection />
    </div>
  );
}
