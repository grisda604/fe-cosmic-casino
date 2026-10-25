import { connection } from "next/server";
import { LotteryDataFallback } from "@/components/features/lottery/LotteryDataFallback";
import { LotteryMarketRoundsPage } from "@/components/features/lottery/rounds/LotteryMarketRoundsPage";

export default async function ThaiGovernmentRoundsPage() {
  await connection();
  return (
    <LotteryDataFallback thaiBoard roundsSlug="thai-government">
      <LotteryMarketRoundsPage marketSlug="thai-government" />
    </LotteryDataFallback>
  );
}
