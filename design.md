# Cosmicbet Lobby — Design & Build Guide

> เอกสารหลักของ UI ทั้งโปรเจกต์ (หน้า lobby · หน้าหมวดเกม · หน้าเมนู/สมาชิก · หน้าหวย) — โครงเปลือกหน้า, token/สี, ธีมมืด-สว่าง, คอมโพเนนต์, กติกา, logic ฝั่ง UI และสิ่งที่สร้าง/เปลี่ยนทั้งหมด
> ภาพอ้างอิงเดิม: "dark casino lobby" (sidebar ซ้าย · header · แบนเนอร์ · pill หมวด · การ์ดเกม · แผงขวา) — **ใช้เป็นโครง ไม่ลอกข้อมูล/ข้อความจากภาพ**
> ดีไซน์เก่า (PHANTOM Graphite+Gold) อยู่ใน git history ของไฟล์นี้ · อ้างอิงเพิ่ม: `docs/design-ctmx-legend-pro.md`, `docs/THEME-SWITCH-GUIDE.md`, `docs/STRUCTURE.md`

---

## 0. ภาพรวมโปรเจกต์ & วิธีทำงาน

| หัวข้อ | รายละเอียด |
|---|---|
| Stack | Next.js **16.3** (App Router · Turbopack) · React 19.2 · Tailwind v4 · `lucide-react` · `swr` — **Next 16 มี breaking change** ให้อ่าน `node_modules/next/dist/docs/` ก่อนใช้ API ที่ไม่แน่ใจ (ดู `AGENTS.md`) |
| โครงโฟลเดอร์ | โค้ดทั้งหมดอยู่ใต้ `src/` (`app` · `components` · `context` · `data` · `hooks` · `lib` · `styles` · `types`) · `public/` = asset · `scripts/` = สคริปต์ sync · `docs/` = เอกสารรอง · `src/legacy` = โค้ด PHANTOM/clone เดิม **ไม่ถูกใช้ในแอป — ห้ามแก้/ห้ามนับเป็นงานจริง** |
| i18n | route prefix `[lang]` · ภาษา `th en lo my vi zh id fil km` · `th` ต้องครบเสมอ (ปลายทาง fallback) · `th`/`en` แยกไฟล์ต่อ namespace (`messages/<lang>/<ns>.json`) · ภาษาอื่นไฟล์เดียว fallback ตาม `FALLBACK_CHAIN` |
| ข้อมูล | เกือบทั้งหมดเป็น **mock** (`src/data/*`, `public/promotions/*.json`, `lib/lotto/mock-*`) — เพิ่มข้อมูลผ่านที่โหลดเดิม ไม่ฝังในคอมโพเนนต์ |
| ตรวจงาน | `npx tsc --noEmit` · `npx eslint src` · เปิดหน้าจริงทั้งมือถือ (≤390) และ desktop (1024/1280/1440/≥1992) · ทั้งธีมมืดและสว่าง |
| Dev server | `npm run dev` (พอร์ต 3000) · **อย่าลบ `.next` ตอน dev server รันอยู่** (server จะล่ม) — ถ้า type ค้างให้ `npx next typegen` |

---

## 1. หลักการออกแบบ

1. **ซ้อนชั้นด้วยสีพื้น ไม่ใช้เส้น/เงา** — Borderless + **No shadow** (ดู §10) · การ์ดสว่าง/เข้มกว่าพื้นหลังเสมอ
2. **พื้นผิวการ์ด/แท็บ = ไล่เฉดสีเสมอ** (ไม่ใช้พื้นเรียบ) — ผ่าน utility/token กลาง (§3.4)
3. **ใช้ token ของธีม** — ห้าม hardcode สีหลัก/สีทองใหม่; สีธีมใช้กับ "จุดเน้น" (active, ปุ่มหลัก, หัวการ์ด) เท่านั้น
4. **ธีมสว่าง: ห้ามพาสเทลของธีมเป็นพื้น** — พื้นเป็น **เทากลาง** หรือ **สีธีมเต็ม** แล้วเลือกตัวหนังสือคอนทราสต์สูง (เข้มบนเทา · ขาวบนสีธีม)
5. **โค้งมนสม่ำเสมอ** — การ์ดใหญ่ 16 · ไทล์/ปุ่ม/การ์ดเกม 12 · pill/ปุ่มกลม 999
6. **ภาพ 3D คือจุดสนใจ** — ภาพโปร่งใสจาก `public/assets` ชิดขวาการ์ด ข้อความอยู่ซ้าย
7. **Mobile-first** — มือถือเป็น baseline; desktop (≥1024) เพิ่ม sidebar ลอย + แถบเมนูใต้ header + rail ขวา
8. **ไม่ใช้ emoji เป็นไอคอน** (ใช้ `lucide-react` หรือภาพ 3D) · **ไม่ใส่ข้อมูลหลอกตามภาพอ้างอิง** (แชท, Live Bets, ชื่อเกมในรูป)

---

## 2. เปลือกหน้า (Shell) & Layout

### 2.1 Route group ที่ใช้เปลือก lobby

| กลุ่ม | ตัวอย่างหน้า | ตัวห่อ |
|---|---|---|
| `(lobby)/(tabs)` | `/` `/casino` `/slots` `/fishing` `/sport` `/cards` `/lottery` | `LobbyTabsShell` → `LottoShellFrame hubRail` |
| `(sub)` | `/referral` `/missions/check-in` `/wheel` `/gems-store` `/promotions` `/event` `/vip` `/reward/*` `/transactions` `/cashback` `/profile/account` | `SubShellLayout` → `LottoShellFrame hubRail` (+ `ShellProvidedContext`) |
| `(lobby)/[cat]/[provider]` · `lottery/*` (rules, slips) | หน้าค่ายเกม · กติกาหวย · โพย | `SubPageShell` ห่อเอง → `LottoShellFrame` (`hubRail` เมื่อไม่ใช่ `fit`/`compactBar`) |
| หวย step (`/lottery/<ตลาด>` · `/<งวด>` · rules · slips) | งวด · แทง · ใส่ราคา · สรุปโพย · โพย | `SubPageShell` (`fit`/`compactBar` บนมือถือ) — **desktop ใช้เปลือกเดียวกับหน้าอื่น**: แถบเมนู + sidebar + rail ขวา + hero ชื่อหน้า · มือถือคงโครงกะทัดรัดเดิม |

`LottoShellFrame` props: `hubRail` (เปิดแถบเมนูใต้ header + rail ขวา) · `fit` (มือถือล็อกความสูงเท่าจอ) · `bottomNav`.
`SubPageShell` (ทุกหน้าย่อย รวมหวยทุก step): `hubRail` เสมอ + desktop แสดง **hero ชื่อหน้ากึ่งกลาง** (`gaming-category-hero`) แทน h1 ชิดซ้าย (ยกเว้น `hideTitle`); มือถือคง breadcrumb/h1/แถบหัวกะทัดรัดเดิม (กฎ `lotto-fit` ล็อกความสูงมีผลเฉพาะ <1024).

### 2.2 Desktop ≥1024

```
┌───────────────────────── header (เต็มความกว้างจอ · 72px · z40) ───────────────────────────┐
├──────────────────── แถบเมนูเกม (sticky ใต้ header · 52px · z38 · ขาว→เทา) ───────────────┤
│ ┌──────┐   ┌──────── main ≤1360px กึ่งกลาง ────────┐   ┌────────────┐                   │
│ │sidebar│   │ hero ชื่อหน้า / แบนเนอร์               │   │ rail ขวา   │ ← ชิดขวาสุดจอ    │
│ │ลอย    │   │ เนื้อหา                                │   │ เมนูด่วน   │                   │
│ │64/248 │   │                                        │   │ + การ์ดโปร×2│                   │
│ └──────┘   └────────────────────────────────────────┘   └────────────┘                   │
└──────────────────────────────────────────────────────────────────────────────────────────┘
```

ตัวแปรที่ `.frame` (`lobby-layout.module.css`):

| ตัวแปร | ค่า | ความหมาย |
|---|---|---|
| `--lobby-sidebar-width` | 64px (ย่อ) | ความกว้างแถบตอนย่อ (ขยายเป็น `--lobby-sidebar-expanded` ลอยทับ ไม่ดันเนื้อหา) |
| `--lobby-sidebar-expanded` | 248px | ความกว้างตอนขยาย |
| `--lobby-sidebar-inset` | 12px | ช่องว่างซ้ายของ sidebar ลอย |
| `--lobby-content-left` | `inset + expanded + 16` = **276px** (จอ 1024–1279: `inset + 64 + 16` = 92px) | **ขอบซ้ายของเนื้อหา/header/แถบเมนู** — เว้นเท่าแถบ "ขยาย" เสมอ (ที่ ≥1280) เพื่อให้เนื้อหาไม่ถูก sidebar ทับและไม่ขยับตอนสลับย่อ/ขยาย; ขนาดเนื้อหายืดหยุ่นตามพื้นที่ที่เหลือ |
| `--lobby-header-h` | 72px | ความสูง header desktop |
| `--lobby-bar-h` | 52px เมื่อ `data-hub` (ไม่งั้น 0) | ความสูงแถบเมนูใต้ header |
| `--lobby-rail-width` | 264px (≥1280: 300px) | ความกว้าง rail ขวา |
| `--lobby-rail-reserve` | `rail + 16px` เมื่อ `data-hub` (ไม่งั้น 0) | พื้นที่ขวาที่ header/main/แถบเมนูต้องเว้น |

- **เว้นซ้ายของ content/header/แถบเมนู** = `--lobby-content-left` (276px ที่ ≥1280 · 92px ที่ 1024–1279 ซึ่งแถบขยายจะลอยทับเนื้อหาแทน เพราะที่ไม่พอ) · เว้นขวา = `24 + rail-reserve`
- **main container** (`.mainStack`) กว้างไม่เกิน **1360px** กึ่งกลางพื้นที่ที่เหลือ · จอ **≥1992px** ชดเชย (`padding-left: max(0, rail-reserve + 24 − content-left)`) ให้ main อยู่กึ่งกลาง "จอ" จริง — header และแถบเมนูใช้สูตรเดียวกัน
- **ขยาย sidebar แล้วต้องไม่มีอะไรขยับ**: sidebar (sticky ภายใน pageShell — เลื่อนไปจนสุดเนื้อหาแล้วหยุดเหนือ footer) ลอยทับเนื้อหา (ไม่มีเงา) · header/แถบเมนูไม่ถูกทับ (อยู่เหนือ)
- z-index: header 40 · bottom nav 40 · sidebar 39 · แถบเมนู 38 · แถบ pill มือถือ 30

### 2.3 Mobile <1024

ลำดับบนหน้าแรก (`LobbyTabsShell`): **header → แบนเนอร์ + ฝาก/ถอน (หรือ เข้าสู่ระบบ/สมัคร ถ้ายังไม่ login) → แถบ hub (เลื่อนข้าง) → การ์ดโปร (เลื่อนข้าง · เฉพาะหน้าแรก) → pill หมวดเกม (sticky) → เนื้อหา → bottom nav**.
sidebar / แถบเมนูใต้ header / rail ขวา **ไม่แสดง** บนมือถือ (ซ่อนด้วย CSS ต่ำกว่า 1024).

---

## 3. Tokens & ระบบสี

### 3.1 ไฟล์ CSS & ลำดับ (`app/globals.css`)

`tailwindcss` → `lotto-theme.css` (token พื้นฐาน + `--ui-*`) → `bblotto-header.css` (header มือถือ) → `lobby-desktop-header.css` (header desktop) → `lotto-ui-compat.css` (alias `--soft-*`, utilities, `--grad-*`) → `themes.css` (ธีมทั้งหมด) → `lotto-themes-bridge.css` (สะพานธีม→token + **กฎ override ธีมมืด/สว่าง**) → `lotto-floating-actions.css` → `lottery-*.css` → `gaming-lobby.css` → `motion*.css`.
**กฎ override ต้องอยู่ท้ายไฟล์ที่เกี่ยวข้อง** และใช้ attribute ซ้ำ (`html[data-mode="light"][data-mode="light"]`) เมื่อต้องชนะ specificity ของ `themes.css`.

### 3.2 โหมด/ธีม

`html[data-mode="light"|dark]` (ไม่มี attr = มืด) · `html[data-theme="<ธีม>"]` (ไม่มี attr/`cosmic` = ธีมเริ่มต้น "phantom/cosmic") · สีธีมที่ใช้: `--t-ga` (chrome 1) `--t-gb` (chrome 2) `--t-icon` `--t-action` · alias สำหรับ UI ใหม่: **`--ui-theme` (= `--t-ga`, fallback `#3b2a63`) / `--ui-on-theme` (ขาว)** — ใช้ได้ทุกโหมด.

### 3.3 Token หลัก

| ใช้กับ | token |
|---|---|
| พื้นหลังหน้า | `--body`, `--cosmic-page-base` (ดู §3.5) |
| พื้นส่วน/แผง | `--BG-Surface-Darker`, `--BG-Surface-Normal`, `--BG-Surface-Lighter` |
| การ์ด/ไทล์ | `--ui-surface` (= `--Card-Normal`) |
| ตัวหนังสือ | `--Text-Icon-Title` (หัว) · `--Text-Icon-Body` (รอง) · `--text-muted` |
| สีหลัก/ปุ่ม | `--Main-Primary`, `--Main-Secondary`, `--btn-gradient1/2`, `--btn-text` |
| รัศมี | `--ui-radius-card` 16 · `--ui-radius-tile` 12 · `--ui-radius-pill` 999 |
| ขอบ | `--ui-stroke` / `--ui-stroke-strong` = **`transparent`** (ที่ว่างของขอบ ไม่แสดงเส้น · **ห้ามตั้งเป็นสี**) |
| hover | `--ui-hover` (surface + ขาว 8%; สว่าง: ดำ 6%) — ใช้พื้น hover แทนขอบ |
| เส้นคั่นกลุ่ม | `--ui-divider` (มืด ขาว 16% · สว่าง `rgba(27,34,48,.16)`) — ใช้เฉพาะเส้นคั่นกลุ่มเมนู |
| เทากลาง | `--ui-gray` / `--ui-gray-hover` (มืด `#2a2a2f`; สว่าง `#e4e5e9`/`#d6d7dc`) — ปุ่ม «ดูทั้งหมด», ลูกศรเลื่อน, ไทล์โลโก้ค่าย |
| `--ui-glow` | **เลิกใช้** |

### 3.4 พื้นผิวไล่เฉด (`lotto-ui-compat.css`)

- `--grad-panel` / `--grad-card` / `--grad-modal` = ไล่เฉด **บน→ล่าง (180deg)**: ขาว 7–9% ทับสีฐาน → ดำ 7–8% ทับสีฐาน (ธีมสว่างบังคับเป็นเทา: panel `#fff→#eef0f3` · card `#fff→#e8eaee`)
- utility ที่ต้องใช้ (**ห้ามเขียน `bg-[var(--soft-card)]` ตรง ๆ**): `soft-panel` · `soft-card` · `soft-card-dark` · `modal-surface` · คลาสพื้น `soft-panel-bg` · `soft-card-bg`
- **แท็บแบบมีพื้น**: ไม่ active = `soft-tab` (ไล่เฉด ไม่มีขอบ) · active = `soft-tab-active` (ไล่เฉด `--btn-gradient1→2` + `--btn-text`) · แท็บ VIP ไล่เฉดที่ตัวราง · แท็บเส้นใต้ (`SoftLineTabs`) คงเดิม

### 3.5 ธีมมืด

- **พื้นหลังหน้าต้องสว่างกว่าการ์ด**: `color-mix(#fff 12%, ฐาน)` (cosmic ≈ `#242227`) — ไม่งั้นการ์ด/แผงกลืนพื้น (ท้าย `lotto-themes-bridge.css`)
- กล่องแบนเนอร์+ฝาก/ถอน (มือถือ, `.panel`) = ดำ 42% ผสม `--BG-Surface-Darker` (เข้มกว่าพื้นหน้าชัด)
- **header มือถือ + bottom nav บนธีมมืดเรียบ (cosmic/phantom, navy)**: ไล่เฉดบน = `--BG-Surface-Darker` + ขาว 14% → ล่าง = `--BG-Surface-Lighter` (ปุ่มนูนกลาง bottom nav ใช้สีบน) · ธีมอื่นไม่โดน
- ปุ่ม/ทอง: active pill/ปุ่มหลักใช้ `--btn-gradient`; ทอง ≤ ~15% ของพื้นที่

### 3.6 ธีมสว่าง (สรุปกติกา — รายละเอียดแต่ละส่วนอยู่ §7)

- พื้นหลังหน้า = **gray-300 `#d1d5db`** (ไม่ใช้ขาวล้วน เพื่อให้การ์ดขาวแยกชัด) — ตั้งทั้ง token (`--cosmic-page-base`/`--body`) และ `body`/`.lotto-page`
- token พื้นผิวถูกบังคับเป็นเทากลางทุกธีม: `--Card-Normal #eef0f3` · `--BG-Surface-Normal #f4f5f7` · `--BG-Surface-Darker #eceef2` · `--Text-Icon-Body #4a5265` · `--text-muted #5b6475` → คอมโพเนนต์ที่อ่าน token เหล่านี้เป็นเทาอัตโนมัติ
- สีธีมเต็มใช้กับ: active ของ sidebar/pill, ปุ่มหลัก, หัวการ์ด, การ์ดโปรใน rail, header (ตัวหนังสือขาว)

---

## 4. Typography

ฟอนต์ `Noto Sans Thai` ตั้งที่ `body` (ห้ามตั้ง font-family เพิ่ม) · หัว section 18/20 · 700 · ชื่อการ์ดโปร lg/md 18/15 · 700 · ข้อความรอง/ชิป 10–12 · pill หมวด 13–16 (active 700) · ตัวเลขเงิน/จำนวน `tabular-nums`.
ตัวหนังสือบนสีธีมใช้ `--ui-on-theme` (ขาว) · ตัวเลข/อัตราจ่ายในหวยเข้ม-หนา ไม่ใช้สีจางกลืนพื้น.

---

## 5. คอมโพเนนต์

### 5.1 แผนที่คอมโพเนนต์

| คอมโพเนนต์ | ไฟล์ | หน้าที่ |
|---|---|---|
| `LottoShellFrame` / `SubShellLayout` / `SubPageShell` | `components/layout/*` | เปลือกหน้า (§2) |
| `LottoSiteHeader` (+ `LottoDesktopHeader`) | `features/home` | header มือถือ / desktop |
| `LobbySidebar` | `features/home` | sidebar ลอย ย่อ/ขยาย |
| `CategoryPills` | `features/home` | pill หมวด (มือถือ) / แถบเมนู (`bar`) |
| `LobbyHubTiles` | `features/home` | การ์ด hub (`rail` แผงขวา · `strip` มือถือ) |
| `DesktopFeatureCards` + `PromoCard` | `features/home` | การ์ดโปรโมชั่น/กิจกรรม (`rail` · `mobile`) |
| `HeroBanner` | `features/home` | แบนเนอร์ + ลูกศร + จุด |
| `TrendingGames` · `GameShowcaseSection` · `LottoPeekCarousel` · `LobbyGameCard` · `LiveOnlineCount` | `features/home` | กริด/แถวเกม |
| `ProviderLogoMarquee` | `features/home` | ไทล์โลโก้ค่ายเลื่อนอัตโนมัติ |
| `TopLeadersSection` · `HallOfFameSection` | `features/home` | ผู้ชนะสูงสุด / ผู้โชคดี (**คงเดิม** §11) |
| `SectionHeader` | `components/ui` | หัว section มาตรฐาน |
| `GamingCategoryPage` | `features/lobby` | หน้าหมวดเกม (hero + ตัวกรอง + กริดค่าย) |
| `LotteryHubPage` / `LotteryHubContent` | `features/lottery/hub` | หน้าหมวดหวย |
| `ReferralTable` | `features/referral` | ตาราง 2 คอลัมน์ |
| `PromotionsMobileFeed` (กริดการ์ดโปร) | `features/promotions` | รายการโปรโมชั่น (ทุกจอ) |
| `BottomNavLotto` · `FloatingActions` · `LottoMenuDrawer` | `home`/`layout`/`menu` | bottom nav มือถือ · ปุ่มลอย · ลิ้นชักเมนู |

### 5.2 Header

**Desktop** (`LottoDesktopHeader`, CSS `lobby-desktop-header.css`): เต็มความกว้างจอ สูง 72 — ซ้าย: สวิตช์ คาสิโน/กีฬา + ช่องค้นหา (submit → `/slots?q=` — ยังไม่มีหน้าอ่าน `q`) · กลาง: โลโก้ (absolute กลางกรอบ) · ขวา: กระดิ่ง (`openNotifications`) · โพยค้าง (badge จำนวน) · ยอดเงิน (`formatMoney`) + ปุ่ม `+` ทอง (`openDeposit`) · avatar (guest: เข้าสู่ระบบ/สมัครสมาชิก + DevQuickLogin เฉพาะ dev) · ทุกชิ้นแคปซูลกลม ไม่มีขอบ · `data-scrolled` เพิ่มพื้นเมื่อเลื่อน.
**มือถือ** (`LottoSiteHeader`): โลโก้ · กล่องเครดิต · กระดิ่ง · hamburger (เปิด `LottoMenuDrawer` ผ่าน `HomeActionBridge`) — ซ่อนส่วน desktop ที่ <1024.

### 5.3 Sidebar (`LobbySidebar`) — การ์ดลอย

- ช่อง `.sidebarSlot` = flex item กว้าง 0 `position: sticky` ใน `.pageShell` (แบบเดียวกับ rail ขวา · หยุดที่ขอบล่างเนื้อหา → ไม่ทับ footer) · การ์ดข้างในเป็น absolute · `top = header-h + bar-h + 16` · `left = 12` · สูง `min(780px, 100dvh − header − bar − 32)` · มุมมน 16 · z 39 · พื้น `--BG-Surface-Darker` (ธีมสว่าง `#e6e9ee`)
- **ย่อ 64px** (ไอคอนกลาง, ชื่อเป็น tooltip) / **ขยาย 248px** (ไอคอนซ้าย + ชื่อ) — ปุ่มบนสุดสลับ · `useSidebarCollapsed()` เก็บใน `localStorage["lobby-sidebar-collapsed"]` · ยังไม่เคยเลือก: จอ ≥1440 เริ่มขยาย, แคบกว่าเริ่มย่อ · เฟรมตั้ง `data-sidebar="expanded|collapsed"`
- เมนู 3 กลุ่ม คั่นด้วยเส้น `--ui-divider` 2 เส้น: **หมวดเกม** — หน้าหลัก · คาสิโน · สล็อต · ยิงปลา · กีฬา · หวย · เกมไพ่ → **โปรโมชั่น** — โปรโมชั่น · กิจกรรม · ลุ้นรางวัล → **ตั้งค่า** (ล่างสุด) — เลือกธีมสี · ภาษา (ธง+ตัวย่อ)
- แถว: สูง 44 · ไอคอน `lucide` 22 · ชื่อ 14 · active (มืด) = ตัวหนังสือ `--Main-Secondary` + พื้น `--Main-Primary` 12% + แถบทอง 3px; (สว่าง) = พื้น `--ui-theme` + ขาว
- ลำดับหมวดเกมแหล่งเดียว: `features/home/lobby-category.ts` (`หน้าหลัก · คาสิโน · สล็อต · ยิงปลา · กีฬา · หวย · เกมไพ่`) — sidebar มีรายการของตัวเองในลำดับเดียวกัน **แก้ลำดับต้องแก้ 2 ที่**
- ห้ามใส่ wallet/ฝาก-ถอนใน sidebar (อยู่ใน header)

### 5.4 แถบเมนูเกม (`CategoryPills bar`) — desktop ใต้ header

เต็มความกว้างจอ · พื้น **ไล่เฉดขาว→เทา `#fff → #e6e9ee`** (มืด: `--BG-Surface-Darker`) · sticky ใต้ header · เนื้อหาจัดแนวเดียวกับ header/main (≤1360 กึ่งกลาง) · เมนูกว้างพอดีเนื้อหา (`padding 0 18`) เรียงชิดกัน **จัดกึ่งกลาง** · ไม่มีพื้นหลังต่อปุ่ม · **active = ตัวหนังสือสีธีม ตัวหนา + เส้นใต้ 3px สีธีม** (มืด: `--Main-Secondary`/`--Main-Primary`) · **ไม่มี ring/outline** · hover/กด **ไม่ขยับ UI** (ทับ `.motion-press` ด้วย `transform:none`) · โฟกัสคีย์บอร์ด = พื้นเทาอ่อน · ข้อมูลหมวดและ active (`resolveLobbyCategory`) จาก `lobby-category.ts` (หน้าหลัก = `/`, หวย = `/lottery`).

### 5.5 Pill หมวดเกม (มือถือ) — `LottoMobileQuickMenu`

อยู่ใต้การ์ดโปร · แถบพื้นสว่างกว่าพื้นหน้าเต็มความกว้าง (`--BG-Surface-Darker` + ขาว 12%; สว่าง ดำ 8%) · **sticky ใต้ header** (`top` = ความสูง `.lotto-site-header` วัดด้วย ResizeObserver, z 30) — ห้ามใส่ `overflow` ให้ ancestor บนมือถือ · pill สูง 32 · ตัวหนังสือ 13 · ไอคอน 18 · มุม 10px (ไม่ใช่แคปซูล) · ไม่ active = เทาอ่อน (`--pill-bg`) · active = ไล่เฉดทอง (สว่าง: ขาว + ขอบไล่เฉดสีธีม)

### 5.6 แผงขวา (rail) & hub

- `LobbyHubTiles variant="rail"`: แผง "เมนูด่วน" — หัวแผง + การ์ด **คอลัมน์เดียว** สูง 64: แนะนำเพื่อน · เช็คอิน · วงล้อ · ร้านค้าเพชร (Gems) · คูปอง (เปิด `CouponUI`) · VIP (`/vip`) — ใช้ `useRequireAuthAction`/`menuHrefRequiresAuth` (ต้อง login ก่อนเปิด) · ข้อมูลจาก `DESKTOP_RIGHT_MENU_TILES`
- `DesktopFeatureCards rail`: การ์ดโปรโมชั่น + กิจกรรมพิเศษ (ขนาด `md`, ไม่มีชิป) ใต้แผงเมนูด่วน
- มือถือ: `LobbyHubTiles variant="strip"` แถวเลื่อนข้าง (การ์ดกว้าง 8.5rem) + `DesktopFeatureCards mobile` แถวเลื่อน (การ์ดละ 78%)
- `PromoCard`: ชื่อ+คำอธิบาย(≤2 บรรทัด)+ปุ่มลูกศรกลม ซ้าย (≤62%) · ภาพ 3D ชิดขวา (46%) · `tone` gold/blue/purple/orange · hover brightness 1.1

### 5.7 การ์ดเกม & กริด

- `LobbyGameCard`: ปกใช้ **สัดส่วนเดิมของไฟล์ภาพ** (ปัจจุบัน 1:1) ไม่บังคับ aspect/ไม่ crop · มุม 12 ไม่มีขอบ · **ไม่มีชื่อเกม** · ป้าย `สด/ฮิต/ใหม่` มุมซ้ายบน · prop `online` = แถบ **ผู้เล่นออนไลน์** (ไอคอนคน + ตัวเลข กึ่งกลาง) พื้นไล่เฉดสีธีม ตัวหนังสือขาว — **ใช้เฉพาะ `TrendingGames`** (แถวคาสิโน/สล็อต/กีฬาเป็นภาพปกล้วน)
- `LiveOnlineCount` (client): ค่าเริ่มต้น = ค่าฐาน (ตรงกับ server กัน hydration mismatch) แล้ว mock สุ่มใหม่ **ทุก 3 วินาที** ในช่วง ±120 รอบค่าฐาน (เริ่มจังหวะต่างกันเล็กน้อยต่อการ์ด)
- `TrendingGames`: **carousel แถวเดียว** (`LottoPeekCarousel mode="7grid"` เหมือนแถวเกมอื่น) ประกอบจากเกมที่โหลดแล้ว (คาสิโน 6 + สล็อต 6 = 12 ใบ)
- **แถวเกมทุกแถว** (เกมยอดนิยม · คาสิโน · สล็อต · กีฬา — `LottoPeekCarousel mode="7grid"`) = carousel แถวเดียว **เห็นใบเต็ม + ใบถัดไปโผล่ครึ่งใบเสมอ**: มือถือ 3 + peek · แท็บเล็ต (768–1023) 4 + peek · desktop ≥1024 จำนวนใบเต็มปรับตาม **ความกว้างของแถว** (container query บน `.carouselWrap`): <700px = 4 · ≥700px = 5 · **≥900px = 6** (+ peek 0.5) · ลูกศรเลื่อนอยู่ในหัว section (≥768) เลื่อนทีละ "จำนวนใบที่เห็นเต็มตอนนั้น" (อ่านจาก `--carousel-visible`) · สูตรความกว้าง slide: `(100% − gaps·gap) / (visible + peek)` โดย `--carousel-peek-gaps` = จำนวนช่องว่างระหว่างใบที่เห็น
- `SectionHeader`: ไอคอน 3D 28 + ชื่อ ซ้าย · pill «ดูทั้งหมด» (พื้น `--ui-gray`) + ลูกศรกลม ขวา — **ทุก section ใน lobby ต้องใช้ตัวนี้**

### 5.8 แบนเนอร์ & ค่ายเกม

- `HeroBanner`: `public/HomeProBanner/*` (1916×821) มุม 16 · ลูกศรกลมมุมขวาล่าง (≥768) + จุดกลางล่าง
- `ProviderLogoMarquee`: ไทล์สูง 56 กว้าง `clamp(7rem,13vw,9.5rem)` พื้น `--ui-gray` ไม่มีขอบ · **โลโก้สีปกติ ห้าม grayscale/filter** · hover เปลี่ยนที่พื้นไทล์เท่านั้น · เลื่อนอัตโนมัติ (หยุดเมื่อ hover; `prefers-reduced-motion` ปิด)

### 5.9 Bottom nav & ปุ่มลอย (มือถือ)

`BottomNavLotto`: ฝากเงิน · ถอนเงิน · **[เล่นเกม กลาง — ภาพชิป `public/assets/3d/chip.webp` ปุ่มนูน; ลิงก์ `/enterlotto`]** · คืนยอด · ติดต่อ (แชทยังไม่เชื่อมต่อ → toast) · ปุ่มลอย (ธีม/แชท) เหนือ bottom nav; light: ขาว + ขอบ/ไอคอนสีธีม

### 5.10 ตาราง · พื้นผิว · แท็บ

- **ข้อมูลแบบแถว = `<table>` จริง** (หัว `th scope="col"` + แถวเต็มความกว้าง) **ห้ามทำเป็นการ์ด/แคปซูลต่อแถว** · แยกแถวด้วยสีสลับ (zebra) ไม่มีเส้น · กรอบนอกโค้ง · ข้อมูลหลักซ้าย ค่า/วันที่ชิดขวา — ใช้ `ReferralTable` (ประวัติรายได้, เพื่อนที่แนะนำ)
- ปุ่มทุกชนิดที่ไม่ใช่ pill ใน lobby ใช้มุม 12; ปุ่มกลมใช้ `--ui-radius-pill`

---

## 6. หน้าต่าง ๆ

| หน้า | ลักษณะ |
|---|---|
| **หน้าแรก `/`** | desktop: แบนเนอร์ → เกมยอดนิยม (carousel) → ค่ายเกม → คาสิโน/สล็อต/กีฬาออนไลน์ → **ผู้ชนะสูงสุด (คาสิโน) → ผู้โชคดี (คาสิโน)** (การ์ดโปรอยู่ rail ขวา; pill หมวดอยู่แถบใต้ header) · มือถือ: ดู §2.3 แล้วเนื้อหาเดียวกัน |
| **หมวดเกม** (`/casino /slots /fishing /sport /cards`) | `GamingCategoryPage`: hero ชื่อหมวดกึ่งกลาง (ไทยใหญ่ · อังกฤษเล็ก, `gaming-category-hero`) + ตัวกรองซ้าย + กริดค่าย · ระยะขอบข้างเนื้อหา: มือถือ `px-0` · ≥640 `px-2` · ≥1024 `px-4` |
| **หมวดหวย `/lottery`** | `LotteryHubPage`: hero `หวย / Lottery` กึ่งกลาง → `LotteryHubContent` (คำบรรยาย + ปุ่มโพยของฉัน · การ์ดตลาด · ผลหวยล่าสุดตาราง) · มือถือมี h2 "แทงหวย" แทน hero |
| **หวย step** (งวด · แทง · ใส่ราคา · สรุปโพย · โพย) | เปลือกกะทัดรัด `fit`/`compactBar` ไม่มีแถบเมนู/rail · สไตล์ธีมสว่างดู §7.2 |
| **หน้าเมนู/สมาชิก** (`(sub)`) | เปลือกเดียวกับหมวดเกม + hero ชื่อหน้ากึ่งกลาง (VIP ก็ใช้ — แบนเนอร์ VIP ต่อใต้ hero, desktop `margin 16px 0 0` มุม 18) |
| **โปรโมชั่น `/promotions`** | ทุกจอเป็น **กริดการ์ด thumbnail**: ภาพ 16:9 บน · ชื่อโปรใต้ภาพ · วันหมดเขต · ปุ่ม `soft-tab-active` เต็มการ์ด «อ่านรายละเอียดโปรโมชั่น» (1 คอลัมน์มือถือ · 2 ที่ ≥640 · 3 ที่ ≥1024) + แท็บแคปซูลกึ่งกลาง (ทั้งหมด/สมาชิกใหม่/ประจำวัน/สิทธิพิเศษ) · ข้อมูล `catalog.mobileList` (`public/promotions/*`) · embedded (modal desktop) ใช้ master–detail เดิม |
| **แนะนำเพื่อน `/referral`** | แท็บแบบมีพื้น (`soft-tab`/`soft-tab-active`) · ประวัติรายได้ + เพื่อนที่แนะนำเป็นตาราง (`ReferralTable`) |

**ไม่ได้ทำ (ไม่มีข้อมูลรองรับ):** Live Bets · General Chat · Footer ตามภาพอ้างอิง.
**ลบออกแล้วตามสั่ง (ห้ามนำกลับ):** carousel ประเภทการแทงหวยบนหน้าแรก · แถบตรวจสลาก · ผลหวยทั้งหมดบนหน้าแรก/rail (`ResultsRail`, `ThaiLottoCard`, `LottoForeignResults`, `LottoResultCard`).

---

## 7. สเปกธีมสว่างรายส่วน

### 7.1 ทั่วไป

| ส่วน | พื้น | ตัวหนังสือ |
|---|---|---|
| พื้นหลังหน้า | gray-300 `#d1d5db` | — |
| Header desktop | สีธีมเต็ม · แคปซูลภายในขาวโปร่ง 16% | ขาว · สวิตช์ที่ active = พื้นขาว + ตัวสีธีม |
| Sidebar ซ้าย | เทาอ่อน `#e6e9ee` | เทาเข้ม `#4f586b` · hover `#d8dce3` · **active = `--ui-theme` + ขาว** (ไม่มีแถบทอง) |
| แผง "เมนูด่วน" (rail) | เทาอ่อน `#e6e9ee` · การ์ดภายในขาว | เข้ม · **hover/active การ์ด = `--ui-theme` + ขาว** |
| การ์ดโปรใน rail (`PromoCard`) | ไล่เฉด `--ui-theme` | ขาว |
| แถบเมนูเกม (desktop) | ไล่เฉด ขาว→เทา | เข้ม · active = ตัวสีธีม + เส้นใต้สีธีม |
| Pill หมวดเกม (มือถือ) | ไล่เฉด ขาว `#fff → #d9dbe0` | `#3a4150` · active = เฉดเดิม + ขอบ 2px ไล่เฉดสีธีม + ตัวสีธีม |
| ไทล์ค่าย · «ดูทั้งหมด» · ลูกศรเลื่อน | เทา `--ui-gray` | เทาเข้ม |
| กล่องแบนเนอร์+ฝาก/ถอน (มือถือ) | **พื้นขาว** ไล่เฉด `#ffffff → #eef0f3` (สว่างกว่าพื้นหน้า gray-300 ชัดเจน) | — |
| การ์ดเมนูด่วนแถวเลื่อน (มือถือ) | เทาไล่เฉด `#f2f4f7 → #d5dae2` | เข้ม |
| ปุ่มลอย (ธีม/แชท) | ขาว + ขอบสีธีม | ไอคอนสีธีม |
| การ์ดทั่วไป / แถบผู้เล่นออนไลน์ | เทากลางไล่เฉด / สีธีม | เข้ม / ขาว |

### 7.2 หน้าหวย (กฎท้าย `lottery-glass.css`)

- **การ์ด/ไทล์/ชิป/ปุ่มตัวเลข**: ขาว→เทา (`#fff → #e6e9ee`) + outline `#cfd4dc` · ตัวหนังสือ `#1c1d22` · การ์ดตลาด/งวด/แถวผลตาม (งวดที่เปิดรับ + แบนเนอร์หัวตลาดคงเป็นสีธีมเต็ม + ขาว)
- **ปุ่มทุกชนิดรูปทรงเดียวกัน = มุม 12px** (CTA สูง 48) · ปุ่มหลัก (แทงหวย/ใส่ราคา/ส่งโพย/แทงต่อ) = ไล่เฉด `--ui-theme` + ขาว · ปุ่มรอง (กลับแก้ไขเลข/โพยทั้งหมด/แก้ไข) = ขาว→เทา + outline + ตัวเข้ม
- **ตัวที่เลือก** (chip/ปุ่มเลข/ชิปราคา/segment) = ไล่เฉด `--ui-theme` + ตัวหนังสือ **และอัตราจ่ายเป็นขาว** (เดิมน้ำตาลเข้มบนพื้นเข้ม อ่านไม่ออก) · ไม่เลือก = อัตราจ่ายเข้ม-หนา
- **ช่องกรอก/ช่องเลข = พื้นขาว + กรอบเข้ม `#98a1b1` 1.5px** (ต่างจากพื้นการ์ดเสมอ) · ช่องถัดไปกรอบสีธีม · ชิปราคาด่วน 5/10/20/50/100 คงโทนสีเดิม (`#0ea5e9/#16a34a/#d97706/#ea580c/#e11d48`) ตัวขาวหนา
- **หัวการ์ด** (หัวกลุ่มประเภทในโพย/สรุปโพย · หัวงวด · แบนเนอร์ตลาด) = พื้นสีธีม + ขาว — **ต้อง redefine `--text-on-light` / `--text-muted` เป็นขาวใน scope** (ข้อความใน `LotteryDrawCard` ใช้ Tailwind ผ่าน token สองตัวนี้)
- **toggle (กลับเลข)**: ปิด = เทา `#aab2c0` + ปุ่มกลมขาวชิดซ้าย · เปิด = เขียว `#16a34a` + ปุ่มกลมชิดขวา (ไม่ใช้สีธีมเพราะธีมเข้มแยกสถานะไม่ออก)
- **แถบย้อน/ลบเลข**: ไม่มีพื้นหลังรอง · สองปุ่มสีธีม + ไอคอนขาว ห่าง 8px
- ⚠ ชื่อคลาสบางตัวในกฎนี้ (เช่น `.is-active`, `.lottery-slip-summary__group-head`) อ้างจากโค้ด/เดา — ตรวจด้วยตาในทุก step เมื่อแก้

---

## 8. Logic ฝั่ง UI

| เรื่อง | พฤติกรรม |
|---|---|
| ย่อ/ขยาย sidebar | `useSidebarCollapsed` (`useSyncExternalStore` + `localStorage`) · SSR = ขยาย · ซิงค์ข้ามแท็บผ่าน `storage` event |
| sticky pill มือถือ | วัดความสูง header จริงด้วย ResizeObserver แล้วตั้ง `top` |
| ยอดเงิน | `formatMoney` (`lib/lotto/format-money.ts`): `Intl en-US` 2 ทศนิยม คั่นหลักพัน (12450 → `12,450.00`) — ใช้กับยอดใน header/wallet snapshot |
| ผู้เล่นออนไลน์ (mock) | `LiveOnlineCount` สุ่มทุก 3 วิ (§5.7) |
| hub/เมนูที่ต้อง login | `useRequireAuthAction` + `menuActionRequiresAuth/menuHrefRequiresAuth` — ยังไม่ login จะเปิดหน้า login ก่อน |
| ปุ่มใน component หน้าแรกเดิม | `HomeActionBridge` ดักคลิกระดับ document (ฝาก/ถอน/เข้าสู่ระบบ/สมัคร/ฮัมเบอร์เกอร์) — component เดิมไม่ต้องแก้ |
| ธีม/ภาษา | ปุ่มใน sidebar เปิด `ThemePickerSheet` / `LanguagePickerSheet` (โหลดแบบ lazy ด้วย `useLazyOverlayMount`) |
| โปรโมชั่น | `PromotionsCatalogProvider` โหลด `/api/promotions` (จาก `public/promotions/catalog.json`) · กดการ์ด → `/promotions/[id]` |
| เปลี่ยนหน้า | `ViewTransition` ใน `LottoShellFrame`: เนื้อหา crossfade · header/sidebar/bottom nav ตั้ง `viewTransitionName` ให้อยู่นิ่ง |

---

## 9. แผนที่ภาพ (`public/`)

| ตำแหน่ง | ไฟล์ |
|---|---|
| ไอคอนหัว section | `assets/3d/menuicon/{lotto,casino,slot,sport,rank,information}.avif` |
| pill/แถบเมนู/sidebar (ไอคอน 3D) | `assets/3d/menuicon/{home,casino,slot,fish,sport,lotto,card,promotion,event}.avif` |
| การ์ดโปร | `menuicon/promotion.avif` · `menuicon/event.avif` |
| hub | `assets/3d/{cashback,checkin,wheel,diamond,coupon,vip}.avif` |
| bottom nav กลาง | `assets/3d/chip.webp` |
| แบนเนอร์หลัก | `HomeProBanner/Mbanner-{1,2}.avif` |
| ปกเกม (1:1, 500×500) | `casino/* slots/* sport/* fishing/*` (ผ่าน `load-lobby-games.ts`) |
| โลโก้ค่าย | `provider logo/*` |
| โปรโมชั่น | `promotions/mock-pro{1,2,3}.avif` + `catalog.json`/`details.json` |
| ไอคอนหวย | `lottery/*` |

ข้อควรระวัง: `assets/3d/โปรโมชั่น.webp`, `event.webp`, `tournament/*` มีพื้นหลังทึบ/สว่าง — ห้ามวางบนการ์ดมืด ใช้ตัวโปร่งใสใน `menuicon/` · ไฟล์ชื่อภาษาไทยต้อง `encodeURI` ก่อนใช้.

---

## 10. กติกาที่ห้ามละเมิด

### 10.1 No shadow
ไม่ใช้ shadow ทุกชนิดในแอป: `box-shadow` ที่เบลอ · `text-shadow` · `filter: drop-shadow()` · Tailwind `shadow-*`/`drop-shadow-*` · glow ทุกแบบ — แยกชั้นด้วยสีพื้นแทน. **ยกเว้น `box-shadow` ที่ blur = 0** (ring/เส้นขอบ/focus ring/hairline เช่น `0 0 0 2px …`, `inset 0 0 0 1px …`, เส้นใต้ `inset 0 -3px 0`). เว้น `src/legacy` และ CSS ใน `public/` (ไม่ได้ใช้).

### 10.2 Borderless
ไม่มีเส้นขอบในคอมโพเนนต์ใหม่ (`--ui-stroke` โปร่งใส) · hover/focus = เปลี่ยนพื้น (`--ui-hover`) · เส้นที่อนุญาต: เส้นคั่นกลุ่มเมนู (`--ui-divider`), outline ของการ์ดหวยธีมสว่าง, กรอบช่องกรอกธีมสว่าง, เส้นใต้ active ของแถบเมนู.

### 10.3 Motion
class เดิม: `motion-reveal` · `motion-lift` · `motion-press` · `gameCardEnterClassName` · transition ปุ่ม/พื้น 150ms · **ห้ามเพิ่ม animation วนลูป** นอกจาก marquee ค่ายเกม · แถบเมนูใต้ header ห้าม translate/scale ตอน hover/กด.

### 10.4 Do / Don't
**Do**: ใช้ `SectionHeader` · ใช้ token/utility กลาง · เพิ่มข้อมูลผ่านตัวโหลดเดิม · แก้ธีมสว่างที่ token ไม่ใช่ที่คอมโพเนนต์ · ตรวจมือถือ+desktop+สองโหมด.
**Don't**: hardcode สีหลักใหม่ · ทำกล่องครอบ section · ใช้ `bg-[var(--soft-card)]` ตรง ๆ · ใช้ข้อมูล/ข้อความจากภาพอ้างอิงตรง ๆ · ลบ `.next` ตอน dev รัน · แก้ `src/legacy`.

---

## 11. คอมโพเนนต์ที่คงไว้ (ห้ามเปลี่ยนดีไซน์)

- `TopLeadersSection` (ผู้ชนะสูงสุด) และ `HallOfFameSection` (ผู้โชคดี) — ใช้ `showcase.module.css` เดิม **ห้ามแก้ไฟล์นี้** (ยังอ้างคลาส `section/header/title/viewAll`) · **หน้าตาคงเดิม** (กรอบ section, แถวตาราง live feed) แต่ **ข้อมูล "ผู้โชคดี" เปลี่ยนเป็นผู้โชคดีจากการเล่นคาสิโน** (ดู §11.1)

### 11.1 ผู้ชนะสูงสุด + ผู้โชคดี — ข้อมูลคาสิโน (mock สุ่ม)

- **ผู้ชนะสูงสุด** (`TopLeadersSection`): 5 อันดับ จากการเล่นคาสิโน — การ์ด: avatar + ใบลอเรล + ริบบิ้นอันดับ · จำนวนรางวัล (`฿`, 300,000–1,000,000 เรียงมากไปน้อย) · ชื่อปิดบางส่วน · ตารางย่อย **ประเภทเกม | ค่ายเกม** (ชื่ออย่างเดียว ไม่มีรูปค่าย) · ค่ายเกมไม่ซ้ำกันใน 5 อันดับ · ใช้ `topCasinoLeaders()` (ค่าเริ่มต้นคงที่ — อัปเดตรายวันให้ตั้ง seed ตามวันที่ฝั่ง server เมื่อต่อ API จริง)
- **ผู้โชคดี** (`HallOfFameSection`): รายละเอียดด้านล่าง

- คอลัมน์: **ผู้เล่น** (avatar `public/Avartar` + ชื่อปิดบางส่วน เช่น `som***89` — โปรไฟล์แบบเดิม) · **ประเภทเกม** (Baccarat · Roulette · Dragon Tiger · Blackjack · Sic Bo · Bull Bull · Poker) · **ค่ายเกม** (แสดง **ชื่อเท่านั้น ไม่มี thumbnail** — ชื่อ: SA Gaming · AE Sexy · Evolution · Dream Gaming · Pretty Gaming · Allbet · Pragmatic Play Live · BetGames · Microgaming · MT Live · Vivo Gaming · Winfinity · WM Casino · YB Live) · **จำนวนรางวัลที่ได้** (`฿` ตัวเลขเด่น สีทอง/สีรอง ชิดขวา)
- ข้อมูล/ตัวสุ่ม: `lib/lotto/mock-casino-winners.ts` — สุ่มค่ายเกม + ประเภทเกม + โปรไฟล์ + รางวัล 5,000–200,000 บาท (เอียงไปทางค่าต่ำ ปัดหลักร้อย — ต่ำกว่าผู้ชนะสูงสุดเสมอ) · `initialCasinoWinners()` ใช้ PRNG ค่าเริ่มต้นคงที่ (server/client ตรงกัน กัน hydration mismatch) · `nextCasinoWinner()` สุ่มจริงฝั่ง client
- พฤติกรรม: แสดง 6 แถว · **ทุก 5 วินาที** มีผู้โชคดีรายใหม่ (สุ่ม) เข้ามาบนสุด แทนที่รายเก่าสุด (live feed)
- มือถือ: บรรทัด 1 = ผู้เล่น · บรรทัด 2 = **ประเภทเกม + ค่ายเกม อยู่บรรทัดเดียวกัน** · จำนวนรางวัลชิดขวาคร่อมสองบรรทัด · desktop: 4 คอลัมน์ + หัวตาราง
- เพิ่มค่ายเกม/ประเภทเกม: แก้ `CASINO_PROVIDERS` / `CASINO_GAME_TYPES` (ฟิลด์ `file` ใช้อ้างอิงรูปใน `public/casino` เผื่อใช้ภายหลัง — ตอนนี้ไม่แสดงรูป) — ต่อ API จริงแล้วให้แทนที่ `initialCasinoWinners`/`nextCasinoWinner`

---

## 12. สิ่งที่สร้าง/เปลี่ยนในโปรเจกต์ (สรุป)

1. **จัดโครงสร้าง**: ยุบโฟลเดอร์ซ้อน `cas/cas` · ย้ายโค้ดเข้า `src/` · ลบ `agent/` (ซ้ำ `.cursor/`) · เอกสารไป `docs/` · ย้าย PHANTOM clone ไป `src/legacy` (ไม่ใช้)
2. **ระบบ lobby ใหม่**: tokens `--ui-*` / `--grad-*` · `SectionHeader` · `CategoryPills` · `PromoCard`/`DesktopFeatureCards` · `LobbyHubTiles` · `TrendingGames` · การ์ดเกมสัดส่วนเดิม + `LiveOnlineCount` · แถวเกมแบบ 5 ใบ · hero banner + ลูกศร
3. **เปลือกหน้า**: header desktop เต็มกว้างตามภาพอ้างอิง · sidebar การ์ดลอย ย่อ/ขยาย (จำค่า) · แถบเมนูเกมใต้ header · rail ขวา (เมนูด่วน + การ์ดโปร) · main ≤1360 กึ่งกลาง (+ชดเชยจอกว้าง) · `SubShellLayout`/`SubPageShell` ให้หน้าเมนูทั้งหมดและหน้าหวยใช้เปลือกเดียวกับหมวดเกม + hero ชื่อหน้า
4. **มือถือ**: ลำดับ แบนเนอร์→hub→โปร→pill(sticky)→เนื้อหา · pill กะทัดรัด · TrendingGames เลื่อนข้าง · bottom nav กลาง "เล่นเกม" (ชิป) · padding ข้างลดลง
5. **ธีม**: Borderless · ไม่มี shadow ทั้งแอป · พื้นผิว/แท็บไล่เฉด · ธีมมืด (พื้นหลังสว่างกว่าการ์ด, header/bottom nav ไล่เฉด, แผงแบนเนอร์เข้ม) · **ธีมสว่างทั้งระบบ** (พื้นเทา gray-300, token เทากลาง, สีธีมเต็มที่ active/หัวการ์ด, header ขาวโปร่ง)
6. **หน้าหวย**: ย้าย `/lottery` เข้าเปลือก lobby + hero · ธีมสว่างทุก step (การ์ดขาว→เทา, ปุ่มรูปทรงเดียว, ช่องกรอกชัด, toggle เขียว/เทา, หัวการ์ดสีธีม)
7. **หน้าอื่น**: โปรโมชั่นเป็นกริด thumbnail · แนะนำเพื่อนใช้ตารางจริง · VIP มี hero ชื่อหน้า
8. **ลบ**: carousel/ตรวจสลาก/ผลหวยบนหน้าแรก · shadow ทั้งแอป · ชื่อเกมบนการ์ด
9. **อื่น ๆ**: `formatMoney` · `useSidebarCollapsed` · เลิกใช้ `--ui-glow`

---

## 13. ข้อจำกัด & งานที่ยังค้าง

- ข้อมูล mock: ผู้เล่นออนไลน์, โปรโมชั่น (รูป thumbnail ใช้ 3 ภาพซ้ำ), ผู้ชนะสูงสุด (คาสิโน, ค่าคงที่), ผู้โชคดีคาสิโน (สุ่มทุก 5 วิ) — ต้องต่อ backend จริง
- ช่องค้นหาใน header ส่งไป `/slots?q=` แต่ยังไม่มีหน้าอ่านค่า `q`
- `lib/lotto/load-dump-snapshots.ts`, `mock-home-data.ts`, `lotto-bet-types.ts` ไม่ถูกใช้บนหน้าแรกแล้ว (ยังไม่ลบ) · `LottoShellHeader` ยังส่ง prop `hideWalletOnDesktop` ที่ไม่มีผลบน desktop แล้ว
- กฎธีมสว่างของหน้าหวยบางส่วนอ้างชื่อคลาสจากโค้ดโดยไม่ได้ทดสอบภาพจริงทุก step
- ปุ่ม "เล่นเกม" ใน bottom nav ยังลิงก์ `/enterlotto` (หน้าหวย)
- ยังไม่มี visual regression / e2e test — ตรวจด้วยตาทุกครั้ง

---

## 14. Checklist ก่อนส่งงาน UI

- [ ] `npx tsc --noEmit` และ `npx eslint src` ผ่าน
- [ ] มือถือ 360/390/430: ไม่มี horizontal scroll ของหน้า · pill/hub/โปรเลื่อนข้างได้ · pill sticky ใต้ header
- [ ] 768 / 1024 / 1280 / 1440 / ≥1992: แถบเมนู+rail+sidebar ไม่ซ้อนกัน · ขยาย sidebar แล้วเนื้อหาไม่ขยับ · main กึ่งกลางจอเมื่อ ≥1992
- [ ] ธีมมืด: การ์ดสว่าง/เข้มต่างจากพื้นหลังชัด · ธีมสว่าง: ไม่มีพื้นพาสเทลของธีม ตัวหนังสืออ่านง่าย
- [ ] หน้าเมนู (แนะนำเพื่อน/เช็คอิน/วงล้อ/…): มี hero ชื่อหน้ากึ่งกลาง + rail ขวา + แถบเมนู
- [ ] หน้าหวยทุก step: ปุ่มรูปทรงเดียว · ช่องกรอกเห็นชัด · ตัวที่เลือกอ่านออก
- [ ] ไม่มี shadow เบลอ / emoji ไอคอน / ข้อมูลหลอกจากภาพ · ผู้ชนะสูงสุด/ผู้โชคดีหน้าตาเหมือนเดิม

### Footer
- พื้น `.cosmic-footer` = สีธีม (`--ui-theme`) ไล่เฉดบน→ล่าง (`88% + ขาว` → `70% + ดำ`) ทุกขนาดจอ ทั้งโหมดมืด/สว่าง · ตัวอักษร/โลโก้ขาว · ไม่มีเส้นขอบ/เงา (กฎท้าย `src/styles/footer.css`)

### Select / Date picker (shadcn/ui)
- ห้ามใช้ `<select>` / `<input type="date">` เนทีฟ → ใช้ `components/ui/select.tsx` (`AppSelect`, Radix Select) และ `components/ui/date-picker.tsx` (`AppDatePicker`, Radix Popover + react-day-picker + date-fns locale th/en)
- พื้นปุ่ม/เมนูทึบตามธีม (มืด `--ui-surface` · สว่างขาว) ไม่มีเส้นขอบ/เงา · รายการ/วันที่ที่เลือก = `--ui-theme` ตัวอักษร `--ui-on-theme` · portal z-[200] · สไตล์ `.app-select-*` ท้าย `lotto-ui-compat.css`
- ค่าว่าง `""` ของ option ถูก map เป็น sentinel ภายใน (Radix ไม่รับค่าว่าง) — ค่าที่ส่งออกยังเป็น `""`
- ใช้แล้วที่: หวย (โพยของฉัน ตลาด/ผลลัพธ์/ช่วงวันที่), cashback เลือกเดือน, TransactionDateRangeDialog (เดือน/ปี), AuthSheet (ธนาคาร/ช่องทาง)
