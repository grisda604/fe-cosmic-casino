"use client";

import { Suspense } from "react";
import { SubPageShell } from "@/components/layout/SubPageShell";
import { LotterySlipsPageContent } from "@/components/features/lottery/LotterySlipsPageContent";
import { useLotteryI18n } from "@/components/features/lottery/useLotteryI18n";
import { LoadingState } from "@/components/ui/StatusState";

/**
 * โพยทั้งหมด (/lottery/slips) — แท็บ "กำลังดำเนินการ" / "ประวัติ" + ตัวกรอง
 * ต้อง login (proxy.ts) · ตัวกรองอยู่ใน query string จึงต้องห่อ Suspense ให้ useSearchParams
 */
export default function LotterySlipsListPage() {
  const { t } = useLotteryI18n();

  return (
    <SubPageShell title={t("slips.title")} backHref="/lottery" compactBar>
      <Suspense fallback={<LoadingState label={t("slips.loading")} />}>
        <LotterySlipsPageContent />
      </Suspense>
    </SubPageShell>
  );
}
