import { connection } from "next/server";
import { LotteryDataFallback } from "@/components/features/lottery/LotteryDataFallback";
import { LotteryMarketRoundsPage } from "@/components/features/lottery/rounds/LotteryMarketRoundsPage";

type PageProps = {
  params: Promise<{ marketId: string }>;
};

export default async function LotteryMarketPage({ params }: PageProps) {
  await connection();
  const { marketId } = await params;
  return (
    <LotteryDataFallback roundsSlug={marketId}>
      <LotteryMarketRoundsPage marketSlug={marketId} />
    </LotteryDataFallback>
  );
}
