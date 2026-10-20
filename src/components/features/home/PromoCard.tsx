import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "@/lib/i18n/navigation";
import styles from "./promo-card.module.css";

type Props = {
  href: string;
  title: string;
  desc: string;
  /** ภาพ 3D ชิดขวา (โปร่งใส) */
  art: string;
  /** lg = การ์ดใหญ่ (คู่บน) · md = การ์ดรอง */
  size?: "lg" | "md";
  /** สีเรืองของการ์ด */
  tone?: "gold" | "blue" | "purple" | "orange";
  /** ชิปทางลัดใต้คำอธิบาย (เฉพาะ desktop) */
  chips?: readonly string[];
};

/** การ์ดโปรโมต: ชื่อ + คำอธิบาย + ปุ่มลูกศรกลม ซ้าย · ภาพ 3D ขวา (design.md §5.4) */
export function PromoCard({ href, title, desc, art, size = "md", tone = "gold", chips }: Props) {
  return (
    <Link href={href} className={`motion-lift ${styles.card} ${styles[size]} ${styles[tone]}`}>
      <span className={styles.body}>
        <span className={styles.title}>{title}</span>
        <span className={styles.desc}>{desc}</span>
        {chips?.length ? (
          <span className={styles.chips} aria-hidden>
            {chips.map((chip) => (
              <span key={chip} className={styles.chip}>
                {chip}
              </span>
            ))}
          </span>
        ) : null}
        <span className={styles.go} aria-hidden>
          <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
        </span>
      </span>
      <span className={styles.art} aria-hidden>
        <Image src={art} alt="" fill sizes="200px" unoptimized className={styles.artImg} />
      </span>
    </Link>
  );
}
