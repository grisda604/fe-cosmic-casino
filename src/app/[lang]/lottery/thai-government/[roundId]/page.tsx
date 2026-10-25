import { LotteryDataFallback } from "@/components/features/lottery/LotteryDataFallback";
import { LotteryPlayPage } from "@/components/features/lottery/LotteryPlayPage";

type PageProps = {
  params: Promise<{ roundId: string }>;
};

export default async function ThaiGovernmentPlayPage({ params }: PageProps) {
  const { roundId } = await params;
  return (
    <LotteryDataFallback thaiBoard>
      <LotteryPlayPage marketId="thai-government" roundId={roundId} />
    </LotteryDataFallback>
  );
}
