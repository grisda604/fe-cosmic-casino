"use client";

import { SWRConfig, unstable_serialize } from "swr";

export type SwrFallbackEntry = {
  /** key เดียวกับที่ hook ใน hooks/api/* ส่งให้ useApi (ไม่รวม scope) */
  key: readonly unknown[];
  data: unknown;
};

/**
 * ส่งข้อมูลที่ server ดึงแล้วเข้า cache ของ SWR (resource สาธารณะ → scope "public" เหมือน useApi)
 * ผล: useApi() มี data ตั้งแต่ render แรก → HTML แรกมีเนื้อหาจริง ไม่ต้องรอ hydrate + fetch ฝั่ง client (LCP)
 * SWR ยัง revalidate ตอน mount ตามปกติ
 */
export function SwrFallback({ entries, children }: { entries: SwrFallbackEntry[]; children: React.ReactNode }) {
  const fallback = Object.fromEntries(entries.map((entry) => [unstable_serialize([...entry.key, "public"]), entry.data]));
  return <SWRConfig value={{ fallback }}>{children}</SWRConfig>;
}
