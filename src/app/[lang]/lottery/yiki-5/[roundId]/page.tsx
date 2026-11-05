import { LotteryDataFallback } from "@/components/features/lottery/LotteryDataFallback";
import { LotteryPlayPage } from "@/components/features/lottery/LotteryPlayPage";

type PageProps = {
  params: Promise<{ roundId: string }>;
};

/**
 * รอบสร้างตามเวลา — ไม่ prerender ตอน build แต่ render ครั้งแรกแล้วแคชเป็นหน้า static
 * (เดิมเป็น dynamic → <Link> ไม่ prefetch กดรอบแล้วต้องรอ server render ทุกครั้ง)
 */
export function generateStaticParams() {
  return [];
}

export default async function yiki_5PlayPage({ params }: PageProps) {
  const { roundId } = await params;
  return (
    <LotteryDataFallback yikiBoard>
      <LotteryPlayPage marketId="yiki-5" roundId={roundId} />
    </LotteryDataFallback>
  );
}
