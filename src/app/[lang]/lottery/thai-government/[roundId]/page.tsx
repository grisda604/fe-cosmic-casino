"use client";

import { use } from "react";
import { LotteryPlayPage } from "@/components/features/lottery/LotteryPlayPage";

type PageProps = {
  params: Promise<{ roundId: string }>;
};

export default function ThaiGovernmentPlayPage({ params }: PageProps) {
  const { roundId } = use(params);
  return (
    <LotteryPlayPage marketId="thai-government" roundId={roundId} />
  );
}
