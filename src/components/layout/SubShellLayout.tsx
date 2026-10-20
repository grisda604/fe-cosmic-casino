"use client";

import type { ReactNode } from "react";
import { LottoShellFrame } from "./LottoShellChrome";
import { ShellProvidedContext } from "./shell-context";

/**
 * เปลือกถาวรของหน้าย่อย (โปรโมชั่น · VIP · cashback · โปรไฟล์ ฯลฯ) — อยู่ใน layout ของกลุ่ม route (sub)
 * header / แถบเมนูเกม / sidebar / rail ขวา (hubRail) / bottom nav จึงไม่ถูกสร้างใหม่ตอนเปลี่ยนระหว่างหน้าเหล่านี้ — โครงเดียวกับหน้าหมวดเกม · SubPageShell ในหน้าจะข้ามการห่อเปลือกเอง
 */
export function SubShellLayout({ children }: { children: ReactNode }) {
  return (
    <ShellProvidedContext.Provider value>
      <LottoShellFrame hubRail>{children}</LottoShellFrame>
    </ShellProvidedContext.Provider>
  );
}
