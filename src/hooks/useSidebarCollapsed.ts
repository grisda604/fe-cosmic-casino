"use client";

import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "lobby-sidebar-collapsed";
/** ยังไม่เคยเลือก: จอ ≥1440 เริ่มแบบขยาย · แคบกว่านั้นเริ่มแบบย่อ (เนื้อหาไม่โดนบีบ) */
const AUTO_EXPAND_MIN_WIDTH = 1440;

const listeners = new Set<() => void>();

function readStored(): boolean {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === "1") return true;
    if (raw === "0") return false;
  } catch {
    /* localStorage ใช้ไม่ได้ (private mode) → ใช้ค่าเริ่มต้นตามความกว้างจอ */
  }
  return window.innerWidth < AUTO_EXPAND_MIN_WIDTH;
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  window.addEventListener("storage", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

/** สถานะย่อ/ขยายของ sidebar desktop — จำค่าไว้ใน localStorage (ฝั่ง server = ขยาย) */
export function useSidebarCollapsed(): readonly [boolean, () => void] {
  const collapsed = useSyncExternalStore(subscribe, readStored, () => false);
  const toggle = useCallback(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, readStored() ? "0" : "1");
    } catch {
      /* ไม่บันทึกได้ก็แค่ไม่จำค่า */
    }
    listeners.forEach((fn) => fn());
  }, []);
  return [collapsed, toggle] as const;
}
