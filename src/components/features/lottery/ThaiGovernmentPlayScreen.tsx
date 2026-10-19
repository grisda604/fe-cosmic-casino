"use client";

import { useMemo } from "react";
import { getThaiLottoDrawByRoundId } from "@/data/lotteryRoundsMockData";
import { useThaiLottoBoard } from "@/hooks/api/lottery";
import { useThaiGovernmentBetSubmit } from "@/hooks/useLotteryBetSubmit";
import { useLotteryI18n } from "@/components/features/lottery/useLotteryI18n";
import { LotteryBetResultDialog } from "@/components/features/lottery/LotteryBetResultDialog";
import { EmptyState, LoadingState } from "@/components/ui/StatusState";
import { ThaiLottoBetBoard } from "@/components/features/lottery/thai/ThaiLottoBetBoard";

type ThaiGovernmentPlayScreenProps = {
  roundId: string;
  onStepChange?: (step: "pick" | "price") => void;
};

/** Step 3 — แทงหวยรัฐบาลไทยตามรอบที่เลือก (ส่งโพยผ่าน useThaiGovernmentBetSubmit → /api/lottery/bets) */
export function ThaiGovernmentPlayScreen({ roundId, onStepChange }: ThaiGovernmentPlayScreenProps) {
  const { t, roundLabel } = useLotteryI18n();
  const thaiBoard = useThaiLottoBoard().data;
  const draw = useMemo(() => getThaiLottoDrawByRoundId(roundId), [roundId]);
  const betMeta = draw
    ? {
        drawLabel: roundLabel(draw.drawLabel),
        drawCloseAt: draw.closeAt,
        continuePlayHref: `/lottery/thai-government/${roundId}`,
      }
    : null;
  const { onSubmit, dialog, closeDialog, isSubmitting } = useThaiGovernmentBetSubmit(
    roundId,
    betMeta ?? { drawLabel: "", drawCloseAt: "", continuePlayHref: "/lottery/thai-government" },
  );

  if (!draw) {
    return (
      <EmptyState
        className="mt-4"
        title={t("board.roundNotFoundTitle")}
        description={t("board.roundNotFoundOther")}
        primaryAction={{ label: t("board.viewAllRounds"), href: "/lottery/thai-government" }}
      />
    );
  }

  if (!thaiBoard) {
    return <LoadingState label={t("board.loading")} />;
  }

  return (
    <div className="lottery-thai-theme flex min-h-0 flex-1 flex-col gap-2">
      <ThaiLottoBetBoard
        draw={draw}
        groups={thaiBoard.groups}
        betTypes={thaiBoard.betTypes}
        backHref="/lottery/thai-government"
        onStepChange={onStepChange}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
      />
      <LotteryBetResultDialog state={dialog} onClose={closeDialog} />
    </div>
  );
}
