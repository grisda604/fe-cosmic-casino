import type { StoredUser } from "@/types/auth";
import { getDemoLoginPassword, getDemoLoginPhone } from "./demoCredentials";
import { hashPassword } from "./password";

/**
 * เปิดบัญชีเดโมไหม — dev เปิดเสมอ · production ต้องตั้ง AUTH_ENABLE_DEMO_USER=1 เอง (ค่าเริ่มต้นปิด)
 */
export function isDemoUserEnabled(): boolean {
  return process.env.NODE_ENV !== "production" || process.env.AUTH_ENABLE_DEMO_USER === "1";
}

let demoUserCache: StoredUser | null = null;

function phoneDigits(phone: string): string {
  return phone.replace(/\D/g, "");
}

function buildDemoUser(): StoredUser {
  const phone = getDemoLoginPhone();
  const digits = phoneDigits(phone);
  return {
    id: `demo-user-${digits}`,
    phone,
    firstName: "Demo",
    lastName: "Player",
    bankAccountNumber: "1234567890",
    bankId: "scb",
    channelId: "facebook",
    passwordHash: hashPassword(getDemoLoginPassword()),
    createdAt: "2026-10-01T00:00:00.000Z",
    avatarPresetId: "avatar-1",
  };
}

function getDemoUserRecord(): StoredUser {
  if (!demoUserCache) demoUserCache = buildDemoUser();
  return demoUserCache;
}

/**
 * อัปเดต preset avatar บัญชีเดโม (in-memory — ใช้ตอน dev / ไม่มี .data)
 */
export function setDemoUserAvatarPreset(avatarPresetId: string): void {
  getDemoUserRecord().avatarPresetId = avatarPresetId;
}

/**
 * คืนบัญชีเดโมเมื่อเบอร์ตรงชุดที่ตั้งจาก env
 */
export function findDemoUserByPhone(phone: string): StoredUser | undefined {
  if (!isDemoUserEnabled()) return undefined;
  if (phoneDigits(phone) !== phoneDigits(getDemoUserRecord().phone)) return undefined;
  return getDemoUserRecord();
}

/**
 * คืนบัญชีเดโมเมื่อ session ชี้มาที่ id คงที่
 */
export function findDemoUserById(id: string): StoredUser | undefined {
  if (!isDemoUserEnabled() || id !== getDemoUserRecord().id) return undefined;
  return getDemoUserRecord();
}
