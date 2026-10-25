import { connection } from "next/server";
import { LotteryDataFallback } from "@/components/features/lottery/LotteryDataFallback";
import { LotteryMarketRoundsPage } from "@/components/features/lottery/rounds/LotteryMarketRoundsPage";

export default async function yiki_15RoundsPage() {
  await connection();
  return (
    <LotteryDataFallback roundsSlug="yiki-15">
      <LotteryMarketRoundsPage marketSlug="yiki-15" />
    </LotteryDataFallback>
  );
}
