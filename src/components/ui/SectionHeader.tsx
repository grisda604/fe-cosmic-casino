import Image from "next/image";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import Link from "@/lib/i18n/navigation";
import styles from "./section-header.module.css";

type Props = {
  title: string;
  /** ไอคอน 3D ขนาดเล็ก (public/assets/3d/menuicon/*) */
  icon?: string;
  /** ปุ่ม pill «ดูทั้งหมด» — ไม่ส่ง = ไม่แสดง */
  viewAllHref?: string;
  /** ปุ่มลูกศรเลื่อนซ้าย/ขวา (ส่งมาจาก carousel) */
  nav?: ReactNode;
  headingId?: string;
};

/** หัว section มาตรฐานของ lobby: ไอคอน + ชื่อ ซ้าย · ดูทั้งหมด + ลูกศร ขวา (design.md §5.2) */
export function SectionHeader({ title, icon, viewAllHref, nav, headingId }: Props) {
  return (
    <div className={styles.header}>
      <div className={styles.left}>
        {icon ? <Image src={icon} alt="" width={28} height={28} unoptimized className={styles.icon} aria-hidden /> : null}
        <h2 className={styles.title} id={headingId}>
          {title}
        </h2>
      </div>
      <div className={styles.right}>
        {viewAllHref ? (
          <Link href={viewAllHref} className={`motion-press ${styles.viewAll}`}>
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            <span>ดูทั้งหมด</span>
          </Link>
        ) : null}
        {nav}
      </div>
    </div>
  );
}
