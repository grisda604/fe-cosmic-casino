"use client";

import Image from "next/image";
import Link, { useRouter } from "@/lib/i18n/navigation";
import { DESKTOP_RIGHT_MENU_TILES } from "@/data/desktopLobbyMockData";
import { menuActionRequiresAuth, menuHrefRequiresAuth } from "@/data/menuMockData";
import { useRequireAuthAction } from "@/hooks/useRequireAuthAction";
import { useCouponUI } from "@/context/CouponUIContext";
import { useT } from "@/lib/i18n/I18nProvider";
import styles from "./lobby-hub.module.css";

type Props = {
  /** rail = กริด 2 คอลัมน์แถบขวา desktop · strip = แถวเลื่อนข้างบนมือถือ */
  variant: "rail" | "strip";
};

/** การ์ดเมนู hub (แนะนำเพื่อน · เช็คอิน · วงล้อ · Gems · คูปอง · VIP) — ย้ายจาก sidebar ซ้าย ใช้ข้อมูลเดิม */
export function LobbyHubTiles({ variant }: Props) {
  const t = useT("nav");
  const tHome = useT("home");
  const router = useRouter();
  const { openCoupon } = useCouponUI();
  const { runWithAuth } = useRequireAuthAction();

  const tiles = DESKTOP_RIGHT_MENU_TILES;
  const isRail = variant === "rail";

  const list = (
    <div
      className={isRail ? styles.rail : styles.strip}
      aria-label={t("desktop.quickMenu")}
    >
      {tiles.map((tile) => {
        const cardClass = styles.hubCard;
        const needsAuth =
          "action" in tile && tile.action
            ? menuActionRequiresAuth(tile.action)
            : "href" in tile
              ? menuHrefRequiresAuth(tile.href)
              : false;
        const body = (
          <>
            <Image
              src={tile.visualSrc}
              alt=""
              fill
              sizes={isRail ? "160px" : "140px"}
              unoptimized
              className={styles.hubBg}
            />
            <span className={styles.hubTitle}>{tHome(tile.titleKey)}</span>
          </>
        );

        if ("action" in tile && tile.action) {
          const action = tile.action;
          return (
            <button
              key={tile.id}
              type="button"
              className={cardClass}
              aria-label={tHome(tile.ariaLabelKey)}
              onClick={() =>
                runWithAuth(needsAuth, () => {
                  if (action === "coupon") openCoupon();
                  else if (action === "vip-rank") router.push("/vip");
                })
              }
            >
              {body}
            </button>
          );
        }

        if ("href" in tile) {
          const href = tile.href;
          return (
            <Link
              key={tile.id}
              href={href}
              className={cardClass}
              title={tHome(tile.ariaLabelKey)}
              onClick={(event) => {
                if (!needsAuth) return;
                event.preventDefault();
                runWithAuth(true, () => router.push(href));
              }}
            >
              {body}
            </Link>
          );
        }
        return null;
      })}
    </div>
  );

  if (!isRail) return list;
  return (
    <section className={styles.panel}>
      <h2 className={styles.panelHead}>
        <span className={styles.panelDot} aria-hidden />
        {t("desktop.quickMenu")}
      </h2>
      {list}
    </section>
  );
}
