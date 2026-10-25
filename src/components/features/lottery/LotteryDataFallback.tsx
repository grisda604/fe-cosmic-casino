import type { ReactNode } from "react";
import { SwrFallback, type SwrFallbackEntry } from "@/components/providers/SwrFallback";
import { fetchLotteryPlayRounds, fetchThaiLottoBoard, fetchYikiBoard } from "@/lib/api/lotteryContent";

type LotteryDataFallbackProps = {
  /** กระดานยี่กี/หวยหุ้น (หน้าแทง) */
  yikiBoard?: boolean;
  /** กระดานหวยรัฐบาล (หน้าแทง · หน้ารอบของหวยรัฐบาล) */
  thaiBoard?: boolean;
  /** รอบของตลาด — อิงเวลาจริง หน้าที่ใช้ต้อง `await connection()` ก่อน เพื่อไม่ให้ถูก prerender ตอน build */
  roundsSlug?: string;
  children: ReactNode;
};

/** ดึงข้อมูลหวยฝั่ง server ครั้งเดียวแล้วส่งเข้า SWR cache — ใช้ห่อหน้าแทง/หน้ารอบ */
export async function LotteryDataFallback({ yikiBoard, thaiBoard, roundsSlug, children }: LotteryDataFallbackProps) {
  const [yiki, thai, rounds] = await Promise.all([
    yikiBoard ? fetchYikiBoard() : null,
    thaiBoard ? fetchThaiLottoBoard() : null,
    roundsSlug ? fetchLotteryPlayRounds(roundsSlug) : null,
  ]);
  const entries: SwrFallbackEntry[] = [];
  if (yiki?.ok) entries.push({ key: ["yiki-board"], data: yiki.data });
  if (thai?.ok) entries.push({ key: ["thai-lotto-board"], data: thai.data });
  if (rounds?.ok && roundsSlug) entries.push({ key: ["lottery-rounds", roundsSlug], data: rounds.data });
  return <SwrFallback entries={entries}>{children}</SwrFallback>;
}
