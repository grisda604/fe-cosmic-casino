"use client";

import { useT } from "@/lib/i18n/I18nProvider";
import type { LotteryHubData } from "@/lib/api/lotteryContent";
import { LotteryHubContent } from "./LotteryHubContent";

/**
 * หน้าหมวดหวย — โครงเดียวกับหมวดเกมอื่น (GamingCategoryPage):
 * desktop: hero ชื่อหมวดกึ่งกลาง (ไทยใหญ่ · อังกฤษเล็ก) แล้วเนื้อหา · มือถือ: หัวข้อ h2 + เนื้อหา
 */
export function LotteryHubPage({ hub }: { hub?: LotteryHubData }) {
  const t = useT("lottery");
  return (
    <>
      <div className="gaming-category-hero" data-category="lottery">
        <h1 className="gaming-category-hero__title">
          <span className="gaming-category-hero__th">หวย</span>
          <span className="gaming-category-hero__en">Lottery</span>
        </h1>
      </div>

      <div className="w-full px-0 py-3 sm:px-2 lg:px-4 lg:py-5">
        <h2 className="mb-3 text-lg font-semibold text-[var(--text-on-light)] lg:hidden">{t("hub.title")}</h2>
        <LotteryHubContent showTitle={false} featured={hub?.featured} gridItems={hub?.grid} results={hub?.latest} />
      </div>
    </>
  );
}
