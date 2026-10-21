/**
 * mock ผู้โชคดีจากการเล่นคาสิโน (Hall of Fame หน้าแรก) — รอเชื่อม API
 * ข้อมูลต่อแถว: โปรไฟล์ (ชื่อปิดบางส่วน + avatar) · ประเภทเกม · ค่ายเกม · จำนวนรางวัลที่ได้ (บาท)
 * ค่ายเกมสุ่มจากรายชื่อที่มีรูปใน public/casino · ประเภทเกมสุ่มจากเกมโต๊ะคาสิโนสด
 */

export type CasinoProvider = {
  /** ชื่อไฟล์ใน public/casino (ไม่รวมนามสกุล .webp) */
  file: string;
  name: string;
};

/** ค่ายคาสิโนสด — ตรงกับไฟล์ใน public/casino และ data/casinoProvidersData.ts */
export const CASINO_PROVIDERS: readonly CasinoProvider[] = [
  { file: "sa", name: "SA Gaming" },
  { file: "ae", name: "AE Sexy" },
  { file: "evo", name: "Evolution" },
  { file: "dream", name: "Dream Gaming" },
  { file: "pretty", name: "Pretty Gaming" },
  { file: "allbet", name: "Allbet" },
  { file: "pragmatic", name: "Pragmatic Play Live" },
  { file: "betgames", name: "BetGames" },
  { file: "mg", name: "Microgaming" },
  { file: "mt", name: "MT Live" },
  { file: "vivo", name: "Vivo Gaming" },
  { file: "winfinity", name: "Winfinity" },
  { file: "wm", name: "WM Casino" },
  { file: "yb", name: "YB Live" },
];

/** ประเภทเกมคาสิโนสด */
export const CASINO_GAME_TYPES: readonly string[] = [
  "Baccarat",
  "Roulette",
  "Dragon Tiger",
  "Blackjack",
  "Sic Bo",
  "Bull Bull",
  "Poker",
];

/** เลขรูป avatar ที่มีใน public/Avartar */
const AVATARS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15] as const;

const NAME_PREFIXES = [
  "som", "pae", "nut", "mint", "boss", "ice", "ton", "joy", "kan", "fah",
  "pin", "art", "may", "win", "bank", "new", "ploy", "tee", "aom", "golf",
] as const;

export type CasinoWinnerItem = {
  id: string;
  /** ชื่อผู้เล่น (ปิดบางส่วน) */
  name: string;
  /** เลขรูป avatar ใน public/Avartar */
  avatar: number;
  gameType: string;
  provider: CasinoProvider;
  /** จำนวนรางวัลที่ได้ (บาท) */
  prize: number;
};

type Rand = () => number;

/** PRNG แบบกำหนดค่าเริ่มต้นได้ (mulberry32) — ใช้ให้รายการเริ่มต้นเหมือนกันทั้ง server/client */
function seededRandom(seed: number): Rand {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const pick = <T,>(items: readonly T[], rand: Rand): T => items[Math.floor(rand() * items.length)];

/** ผู้โชคดี: รางวัล 5,000–200,000 บาท · เอียงไปทางค่าต่ำ (รางวัลใหญ่หายาก) · ปัดเป็นหลักร้อย */
function randomPrize(rand: Rand): number {
  const raw = 5_000 + rand() ** 2 * 195_000;
  return Math.round(raw / 100) * 100;
}

/** สุ่มผู้โชคดี 1 คน: ค่ายเกม · ประเภทเกม · โปรไฟล์ · จำนวนรางวัล */
export function createCasinoWinner(id: string, rand: Rand): CasinoWinnerItem {
  const digits = String(Math.floor(rand() * 100)).padStart(2, "0");
  return {
    id,
    name: `${pick(NAME_PREFIXES, rand)}***${digits}`,
    avatar: pick(AVATARS, rand),
    gameType: pick(CASINO_GAME_TYPES, rand),
    provider: pick(CASINO_PROVIDERS, rand),
    prize: randomPrize(rand),
  };
}

/** รายการเริ่มต้น (กำหนดค่าเริ่มต้นคงที่ จึงตรงกันระหว่าง server render กับ client hydrate) */
export function initialCasinoWinners(count = 6): CasinoWinnerItem[] {
  const rand = seededRandom(20261021);
  return Array.from({ length: count }, (_, i) => createCasinoWinner(`cw-init-${i}`, rand));
}

/** ผู้โชคดีรายใหม่แบบสุ่มจริง (เรียกฝั่ง client เท่านั้น) */
export function nextCasinoWinner(sequence: number): CasinoWinnerItem {
  return createCasinoWinner(`cw-live-${sequence}`, Math.random);
}

export type CasinoTopLeader = CasinoWinnerItem & { rank: number };

/**
 * ผู้ชนะสูงสุด (อันดับ 1–N) — รางวัล 300,000–1,000,000 บาท เรียงมากไปน้อย · ค่ายเกมไม่ซ้ำกันในชุดเดียว
 * ใช้ค่าเริ่มต้นคงที่ (ผลเหมือนกันทั้ง server/client) — "อัปเดตทุกวัน" ให้ตั้ง seed ตามวันที่ฝั่ง server เมื่อต่อ API จริง
 */
export function topCasinoLeaders(count = 5): CasinoTopLeader[] {
  const rand = seededRandom(20261022);
  const providers = [...CASINO_PROVIDERS];
  const leaders = Array.from({ length: count }, (_, i) => {
    const base = createCasinoWinner(`cw-top-${i}`, rand);
    /* ดึงค่ายออกจากกองเพื่อไม่ให้ซ้ำกัน */
    const provider = providers.splice(Math.floor(rand() * providers.length), 1)[0] ?? base.provider;
    const prize = Math.round((300_000 + rand() * 700_000) / 1_000) * 1_000;
    return { ...base, provider, prize };
  });
  return leaders
    .sort((a, b) => b.prize - a.prize)
    .map((leader, index) => ({ ...leader, rank: index + 1 }));
}
