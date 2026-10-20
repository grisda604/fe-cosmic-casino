import Image from "next/image";
import Link from "@/lib/i18n/navigation";
import { buildGamePlayHref } from "@/lib/gamePlayPaths";
import type { LobbyGameItem } from "@/lib/lotto/load-lobby-games";
import { gameCardEnterClassName, gameCardEnterStyle } from "@/lib/gameCardEnterMotion";
import { LiveOnlineCount } from "./LiveOnlineCount";
import styles from "./game-card.module.css";

type Props = {
  item: LobbyGameItem;
  variant?: "tall" | "wide";
  width?: string;
  layout?: "fixed" | "carousel" | "grid";
  /** ลำดับในแถว — ใช้หน่วง stagger ตอนการ์ดเข้า (motion-game-card-enter) */
  index?: number;
  /** แสดงแถบ "ผู้เล่นออนไลน์" (mock สุ่มทุก 3 วิ) ใต้ภาพ — ไม่ส่ง = ไม่มีแถบ (แถวคาสิโน/สล็อต/กีฬา) */
  online?: boolean;
};

/** การ์ดเกม: ภาพปก + (ทางเลือก `online`) แถบผู้เล่นออนไลน์สีธีมด้านล่าง (design.md §5.5) */
export function LobbyGameCard({
  item,
  variant = "tall",
  width,
  layout = "fixed",
  index = 0,
  online = false,
}: Props) {
  const href = item.href ?? buildGamePlayHref({ id: item.id, title: item.title });
  const style = { ...(width ? ({ "--card-width": width } as React.CSSProperties) : null), ...gameCardEnterStyle(index) };

  return (
    <article
      className={`${gameCardEnterClassName("motion-lift")} ${styles.card} ${variant === "wide" ? styles.cardWide : ""} ${layout === "carousel" ? styles.cardCarousel : ""} ${layout === "grid" ? styles.cardGrid : ""}`}
      style={style}
    >
      <Link href={href} aria-label={item.title} className={styles.link}>
        <div className={styles.wrapper}>
          <Image
            src={item.image}
            alt={item.title}
            width={500}
            height={500}
            className={styles.image}
            unoptimized
          />
          <div className={styles.tags}>
            {item.live ? <span className={styles.tagLive}>สด</span> : null}
            {item.isHot ? <span className={styles.tagHot}>ฮิต</span> : null}
            {item.isNew ? <span className={styles.tagNew}>ใหม่</span> : null}
          </div>
        </div>
        {online ? (
          <div className={styles.caption}>
            <LiveOnlineCount base={item.players} className={styles.players} />
          </div>
        ) : null}
      </Link>
    </article>
  );
}
