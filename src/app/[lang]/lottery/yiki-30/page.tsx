import { connection } from "next/server";
import { LotteryDataFallback } from "@/components/features/lottery/LotteryDataFallback";
import { LotteryMarketRoundsPage } from "@/components/features/lottery/rounds/LotteryMarketRoundsPage";

export default async function yiki_30RoundsPage() {
  await connection();
  return (
    <LotteryDataFallback roundsSlug="yiki-30">
      <LotteryMarketRoundsPage marketSlug="yiki-30" />
    </LotteryDataFallback>
  );
}
