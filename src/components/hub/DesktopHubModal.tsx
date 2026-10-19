"use client";

import React from "react";
import dynamic from "next/dynamic";
import { OverlayPanel } from "@/components/ui/OverlayPanel";
import type { DesktopHubId, OpenHubOptions } from "./hubModalRegistry";
import { HUB_MODAL_TITLE_KEYS, getHubSheetSize } from "./hubModalRegistry";
import { useT } from "@/lib/i18n/I18nProvider";

/** เนื้อหา hub โหลดแยก chunk ตอนเปิด — ไม่ลากทุกหน้า hub เข้า bundle หลักของทุก route */
const ActivitiesHubPageContent = dynamic(() =>
  import("@/components/features/activities/ActivitiesHubPageContent").then((m) => m.ActivitiesHubPageContent),
);
const PromotionsHubPageContent = dynamic(() =>
  import("@/components/features/promotions/PromotionsHubPageContent").then((m) => m.PromotionsHubPageContent),
);
const CashbackPageContent = dynamic(() =>
  import("@/components/features/cashback/CashbackPageContent").then((m) => m.CashbackPageContent),
);
const TransactionsPageContent = dynamic(() =>
  import("@/components/features/transactions/TransactionsPageContent").then((m) => m.TransactionsPageContent),
);
const VipPageContent = dynamic(() =>
  import("@/components/features/vip/VipPageContent").then((m) => m.VipPageContent),
);
const ProfileAccountPageContent = dynamic(() =>
  import("@/components/features/profile/ProfileAccountPageContent").then((m) => m.ProfileAccountPageContent),
);
const ReferralPageContent = dynamic(() =>
  import("@/components/features/referral/ReferralPageContent").then((m) => m.ReferralPageContent),
);
const GemsStorePageContent = dynamic(() =>
  import("@/components/features/gems-store/GemsStorePageContent").then((m) => m.GemsStorePageContent),
);
const DailyCheckInPageContent = dynamic(() =>
  import("@/components/features/missions/DailyCheckInPageContent").then((m) => m.DailyCheckInPageContent),
);

interface DesktopHubModalProps {
  hubId: DesktopHubId | null;
  options: OpenHubOptions | undefined;
  onClose: () => void;
}

/** เนื้อหา hub ตาม id — ใช้ component หน้าเดิมของ sport แบบ embedded */
function HubModalBody({ hubId, options }: { hubId: DesktopHubId; options: OpenHubOptions | undefined }) {
  return (
    <>
      {hubId === "promotions" ? <PromotionsHubPageContent embedded /> : null}
      {hubId === "activities" ? <ActivitiesHubPageContent embedded /> : null}
      {hubId === "cashback" ? (
        <CashbackPageContent
          key={`cashback-${options?.cashbackTab ?? "play"}`}
          embedded
          initialTab={options?.cashbackTab ?? "play"}
        />
      ) : null}
      {hubId === "transactions" ? (
        <TransactionsPageContent
          key={`tx-${options?.transactionKind ?? "deposit"}`}
          embedded
          initialKind={options?.transactionKind ?? "deposit"}
        />
      ) : null}
      {hubId === "vip" ? (
        <VipPageContent key={`vip-${options?.vipTab ?? "my-level"}`} embedded initialTab={options?.vipTab ?? "my-level"} />
      ) : null}
      {hubId === "account" ? <ProfileAccountPageContent embedded /> : null}
      {hubId === "referral" ? <ReferralPageContent embedded /> : null}
      {hubId === "gems-store" ? <GemsStorePageContent embedded /> : null}
      {hubId === "check-in" ? <DailyCheckInPageContent embedded /> : null}
    </>
  );
}

/** Modal hub บน desktop (lg+) — โฮสต์เนื้อหาหน้าเดิมของ sport แบบ embedded ครบทุก hub */
export function DesktopHubModal({ hubId, options, onClose }: DesktopHubModalProps) {
  const t = useT("nav");
  const size = hubId ? getHubSheetSize(hubId) : "compact";
  const maxWidthClassName =
    size === "wide" ? "md:max-w-[min(94vw,1040px)] md:min-h-[min(70dvh,560px)]" : "md:max-w-[min(92vw,720px)]";

  return (
    <OverlayPanel
      open={hubId != null}
      onClose={onClose}
      title={hubId ? t(HUB_MODAL_TITLE_KEYS[hubId]) : ""}
      maxWidthClassName={maxWidthClassName}
      zClassName="z-[85]"
    >
      {hubId ? <HubModalBody hubId={hubId} options={options} /> : null}
    </OverlayPanel>
  );
}
