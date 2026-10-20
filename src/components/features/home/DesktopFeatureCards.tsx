import { PromoCard } from "./PromoCard";
import styles from "./desktop-feature-cards.module.css";

const ART = "/assets/3d/menuicon";

/** ข้อความ mock — ยังไม่เชื่อมข้อมูลจริง (ข้อความเดิมของการ์ดฟีเจอร์) */
const DUO_CARDS = [
  {
    key: "promotions",
    href: "/promotions",
    title: "โปรโมชั่น",
    desc: "โบนัสฝากแรก คืนยอดเสีย และสิทธิพิเศษสำหรับสมาชิก เลือกรับได้ตามเงื่อนไข",
    art: `${ART}/promotion.avif`,
    tone: "gold",
  },
  {
    key: "events",
    href: "/events",
    title: "กิจกรรมพิเศษ",
    desc: "ร่วมกิจกรรมสุดพิเศษ สะสมแต้มและลุ้นรางวัลทุกวัน",
    art: `${ART}/event.avif`,
    tone: "purple",
  },
] as const;

/**
 * การ์ดโปร โปรโมชั่น + กิจกรรมพิเศษ (design.md §5.4)
 * rail: เรียงคอลัมน์เดียวใต้แผง "เมนูด่วน" ของ rail ขวา desktop (≥1024) · mobile: แถวเลื่อนข้างแบบ snap ใต้ pill หมวด
 */
export function DesktopFeatureCards({ mobile = false, rail = false }: { mobile?: boolean; rail?: boolean }) {
  return (
    <section className={`${styles.root} ${rail ? styles.rootRail : ""} ${mobile ? styles.rootMobile : ""}`} aria-label="ฟีเจอร์แนะนำ">
      <div className={styles.duo}>
        {DUO_CARDS.map(({ key, ...card }) => (
          <PromoCard key={key} size={rail ? "md" : "lg"} {...card} />
        ))}
      </div>
    </section>
  );
}
