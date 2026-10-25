import { connection } from "next/server";
import { LotteryDataFallback } from "@/components/features/lottery/LotteryDataFallback";
import { LotteryMarketRoundsPage } from "@/components/features/lottery/rounds/LotteryMarketRoundsPage";

export default async function yiki_5RoundsPage() {
  await connection();
  return (
    <LotteryDataFallback roundsSlug="yiki-5">
      <LotteryMarketRoundsPage marketSlug="yiki-5" />
    </LotteryDataFallback>
  );
}
