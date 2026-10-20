import type { ReactNode } from "react";
import { LobbyTabsShell } from "@/components/features/home/LobbyTabsShell";

/**
 * Layout ของแท็บหมวดเกม — เปลือก (header / แบนเนอร์ / ฝาก-ถอน / เมนูหมวด / bottom nav) อยู่ที่นี่ที่เดียว
 * หน้าในกลุ่มนี้ (page.tsx) render เฉพาะเนื้อหา เพื่อไม่ให้เปลือกถูกสร้างใหม่ตอนสลับแท็บ
 */
export default function LobbyTabsLayout({ children }: { children: ReactNode }) {
  return <LobbyTabsShell>{children}</LobbyTabsShell>;
}
