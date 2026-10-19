export const TICKER_TEXT =
  "Phantom — ยินดีต้อนรับสู่แพลตฟอร์มสล็อตและคาสิโนออนไลน์ · ฝากถอนออโต้ 24 ชม.";

export const HERO_IMAGE =
  "https://d2wf3ul4znju53.cloudfront.net/phantom/banner/defaultPromotion.1E5marjt.webp";

export const PROMO_TILES = [
  { id: "p1", label: "Daily Rewards", gradient: "from-[#1a1f24] via-[#2a2218] to-[#121416]" },
  {
    id: "p2",
    label: "NEW MEMBER 100% BONUS",
    gradient: "from-[#1c1510] via-[#3d2e18] to-[#0f0d0a]",
    wide: true,
  },
  { id: "p3", label: "CASHBACK SLOT 5%", gradient: "from-[#181b1d] via-[#2a2412] to-[#0d0f10]" },
] as const;

export const ROOMS = [
  { id: "r1", name: "PrettyXPG92", players: 727 },
  { id: "r2", name: "PrettyXPG88", players: 540 },
] as const;

export const CATEGORIES = [
  { id: "home", label: "หน้าหลัก" },
  { id: "casino", label: "คาสิโน" },
  { id: "slot", label: "สล็อต" },
] as const;

export const GAME_TABS = ["เกมฮิต", "เล่นล่าสุด", "เกมโปรด"] as const;

export const GAMES = [
  { id: "g1", title: "LUCKY MISCHIEF", players: 1284, tags: ["Hot", "New"] as const, hue: 28 },
  { id: "g2", title: "SUGAR BANG 1000", players: 956, tags: ["Hot"] as const, hue: 320 },
  { id: "g3", title: "MINOTAUR REBURN", players: 742, tags: ["New"] as const, hue: 200 },
  { id: "g4", title: "GOLD RUSH", players: 611, tags: ["Hot"] as const, hue: 45 },
] as const;
