"use client";

import React from "react";
import type { PromotionDetailId } from "@/types/promotions";
import { usePromotionDetail } from "@/hooks/api/promotions";
import { EmptyState } from "@/components/ui/StatusState";
import { ResourceGate } from "@/components/ui/ResourceGate";
import { PromotionDetailPanel } from "./PromotionDetailPanel";
import { useT } from "@/lib/i18n/I18nProvider";

/** เนื้อหาหน้ารายละเอียดโปรโมชั่น (/promotions/[id]) — โหลดจาก GET /api/promotions/[id] */
export function PromotionDetailPageContent({ id }: { id: string }) {
  const t = useT("promotions");
  const detail = usePromotionDetail(id as PromotionDetailId);

  if (detail.data === null && detail.error?.status === 404) {
    return (
      <div className="flex justify-center">
        <EmptyState title={t("detail.notFound")} description={t("detail.notFoundDesc")} />
      </div>
    );
  }

  return (
    <ResourceGate
      resource={detail}
      loadingLabel={t("detail.loading")}
      errorTitle={t("detail.notFound")}
    >
      {(content) => <PromotionDetailPanel content={content} variant="page" />}
    </ResourceGate>
  );
}
