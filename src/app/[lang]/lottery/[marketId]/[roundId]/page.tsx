import { LotteryDataFallback } from "@/components/features/lottery/LotteryDataFallback";
import { LotteryPlayPage } from "@/components/features/lottery/LotteryPlayPage";

type PageProps = {
  params: Promise<{ marketId: string; roundId: string }>;
};

export default async function LotteryMarketPlayPage({ params }: PageProps) {
  const { marketId, roundId } = await params;
  return (
    <LotteryDataFallback yikiBoard>
      <LotteryPlayPage marketId={marketId} roundId={roundId} />
    </LotteryDataFallback>
  );
}
