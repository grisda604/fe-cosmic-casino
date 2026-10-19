"use client";

import { PromotionsHubPageContent } from "@/components/features/promotions/PromotionsHubPageContent";
import { SubPageShell } from "@/components/layout/SubPageShell";
import { useT } from "@/lib/i18n/I18nProvider";

export default function PromotionsPage() {
  const t = useT("promotions");
  return (
    <SubPageShell title={t("title")} nav="promo">
      <PromotionsHubPageContent />
    </SubPageShell>
  );
}
