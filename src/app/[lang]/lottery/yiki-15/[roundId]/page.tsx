import { LotteryDataFallback } from "@/components/features/lottery/LotteryDataFallback";
import { LotteryPlayPage } from "@/components/features/lottery/LotteryPlayPage";

type PageProps = {
  params: Promise<{ roundId: string }>;
};

export default async function yiki_15PlayPage({ params }: PageProps) {
  const { roundId } = await params;
  return (
    <LotteryDataFallback yikiBoard>
      <LotteryPlayPage marketId="yiki-15" roundId={roundId} />
    </LotteryDataFallback>
  );
}
