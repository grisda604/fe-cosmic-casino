import { sanitizePhone } from "@/lib/fieldInput";

const DEFAULT_DEMO_PHONE = "0999999999";
const DEFAULT_DEMO_PASSWORD = "1111";

/**
 * เบอร์บัญชีเดโม — ตั้งใน production ด้วย AUTH_DEMO_LOGIN_PHONE (server-only)
 * ค่าเริ่มต้น 0999999999 · ต้องเปิด AUTH_ENABLE_DEMO_USER=1 บน production ถึงจะ login ได้
 */
export function getDemoLoginPhone(): string {
  const fromEnv = process.env.AUTH_DEMO_LOGIN_PHONE?.trim();
  if (!fromEnv) return DEFAULT_DEMO_PHONE;
  return sanitizePhone(fromEnv) || DEFAULT_DEMO_PHONE;
}

/**
 * รหัสผ่านบัญชีเดโม — ตั้งใน production ด้วย AUTH_DEMO_LOGIN_PASSWORD (server-only, ห้ามใช้ NEXT_PUBLIC_)
 */
export function getDemoLoginPassword(): string {
  const fromEnv = process.env.AUTH_DEMO_LOGIN_PASSWORD;
  if (fromEnv === undefined || fromEnv === "") return DEFAULT_DEMO_PASSWORD;
  return fromEnv;
}

/** ค่า default สำหรับ client dev (DevQuickLogin) — ต้องตรงกับที่ server ใช้เมื่อไม่ตั้ง env */
export const DEMO_LOGIN_PHONE = DEFAULT_DEMO_PHONE;
export const DEMO_LOGIN_PASSWORD = DEFAULT_DEMO_PASSWORD;
