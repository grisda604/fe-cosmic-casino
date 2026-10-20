"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { useAuthUI } from "@/context/AuthUIContext";
import { useDeposit } from "@/context/DepositContext";
import { CategoryPills } from "./CategoryPills";
import layout from "./lobby-layout.module.css";
import styles from "./lotto-mobile-quick.module.css";

/**
 * มือถือ: กล่องพื้นทึบมนครอบ แบนเนอร์ (children) + ปุ่มฝาก/ถอน
 * desktop: ไม่มีกล่อง/ปุ่ม (ใช้ sidebar) — แสดงเฉพาะ children
 */
export function LottoMobileHeroPanel({ children }: { children?: ReactNode }) {
  const { openDeposit, openWithdraw } = useDeposit();
  const { isAuthenticated } = useAuth();
  const { openLogin, openRegister } = useAuthUI();

  return (
    <div className={styles.panel}>
      {children}
      <div className={`${layout.hideDesktop} ${styles.actions}`}>
        <button type="button" className={`${styles.btnPrimary} motion-press`} onClick={isAuthenticated ? openDeposit : openLogin}>
          {isAuthenticated ? "ฝากเงิน" : "เข้าสู่ระบบ"}
        </button>
        <button type="button" className={`${styles.btnSecondary} motion-press`} onClick={isAuthenticated ? openWithdraw : openRegister}>
          {isAuthenticated ? "ถอนเงิน" : "สมัครสมาชิก"}
        </button>
      </div>
    </div>
  );
}

/**
 * หมวดเกม — มือถือเท่านั้น (desktop ใช้ sidebar + CategoryPills ในเนื้อหาหน้าแรก) · หมวด active ตาม route
 * sticky: เลื่อนจนแถบนี้ชนใต้ header แล้วจะติดอยู่ใต้ header ตลอด (top = ความสูง header จริง วัดด้วย ResizeObserver)
 */
export function LottoMobileQuickMenu() {
  const [headerH, setHeaderH] = useState(0);

  useEffect(() => {
    const header = document.querySelector<HTMLElement>(".lotto-site-header");
    if (!header) return;
    const measure = () => setHeaderH(Math.round(header.getBoundingClientRect().height));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(header);
    return () => ro.disconnect();
  }, []);

  return (
    <div className={`${layout.hideDesktop} ${styles.root}`} style={{ top: headerH }}>
      <CategoryPills />
    </div>
  );
}
