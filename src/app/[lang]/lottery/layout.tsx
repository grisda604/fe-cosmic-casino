import type { ReactNode } from "react";
import { LotteryDataFallback } from "@/components/features/lottery/LotteryDataFallback";
import { LotteryMarketsLayout } from "@/components/features/lottery/rounds/LotteryMarketsLayout";

/**
 * /lottery/* — seed ข้อมูลคงที่ (catalog + กระดานหวยไทย) ครั้งเดียว + shell หน้ารายการรอบที่คงอยู่ข้ามการเปลี่ยนตลาด
 * รอบอิงเวลาจริง ไม่ seed ที่นี่ (ดึงฝั่ง client + อุ่น cache — ดู usePrefetchLotteryRounds)
 */
export default function LotteryLayout({ children }: { children: ReactNode }) {
  return (
    <LotteryDataFallback catalog thaiBoard>
      <LotteryMarketsLayout>{children}</LotteryMarketsLayout>
    </LotteryDataFallback>
  );
}
