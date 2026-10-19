import type { ThaiLottoDraw } from "@/types/lottery";
import { useLotteryI18n } from "@/components/features/lottery/useLotteryI18n";
import { LotteryDrawCard } from "@/components/features/lottery/play/LotteryDrawCard";

export function ThaiLottoDrawCard({
  draw,
  remainingMs,
}: {
  draw: ThaiLottoDraw;
  remainingMs: number | null;
}) {
  const { t, roundLabel } = useLotteryI18n();
  return (
    <LotteryDrawCard
      title={t("markets.thaiGovernment")}
      drawLabel={roundLabel(draw.drawLabel)}
      remainingMs={remainingMs}
      flagLabel="TH"
      flagTone="th"
      marketSlug="thai-government"
    />
  );
}
