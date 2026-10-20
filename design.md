# Lobby Design Guide

> คู่มือออกแบบหน้า lobby (หน้าแรก + หน้าแท็บหมวดเกม) หลังปรับดีไซน์ตามภาพอ้างอิง "dark casino lobby"
> ใช้ **token สีของธีมเดิม** (`src/styles/lotto-theme.css`, `themes.css`) — ห้าม hardcode สีพื้น/สีทองใหม่ เพื่อให้สลับธีมได้
> ดีไซน์เดิม (PHANTOM Graphite + Gold) ดูได้จาก git history ของไฟล์นี้ · อ้างอิงเพิ่ม: `docs/design-ctmx-legend-pro.md`

---

## 1. หลักการ

1. **มืด ซ้อนชั้น** — พื้นหลักดำ, การ์ด/pill ใช้ surface อ่อนกว่า 1 ขั้น — **Borderless: ไม่มีเส้นขอบ** แยกชั้นด้วยสีพื้นเท่านั้น — **ไม่มี shadow ใดๆ** (ดู §9.1)
2. **ทองเฉพาะจุดสำคัญ** — active pill, ปุ่มหลัก, hover ของลูกศร/ปุ่ม (ไม่เกิน ~15% ของพื้นที่)
3. **ไม่มีกล่องครอบ section** — หัวข้อ + แถวการ์ดวางบนพื้นหน้าโดยตรง (ยกเว้น ผู้ชนะสูงสุด / ผู้โชคดี ที่คงดีไซน์เดิม)
4. **โค้งมนสม่ำเสมอ** — การ์ดใหญ่ 16 · ไทล์/การ์ดเกม 12 · pill/ปุ่มกลม 999
5. **ภาพ 3D คือจุดสนใจ** — ใช้ภาพโปร่งใสจาก `public/assets` ชิดขวาของการ์ด ข้อความอยู่ซ้าย
6. **Mobile-first** — มือถือเป็น baseline, desktop (≥1024) เพิ่ม sidebar ซ้าย + rail ขวา

## 2. Layout

```
Desktop ≥1024 (sidebar ตรึงซ้ายจอ · hub ชิดขวาสุดจอ)                  Mobile <1024
┌────────┬────────────────── header ───────────────────┐         ┌─ header ─┐
│ ◧ เมนู │   ┌──── main ≤1360px กึ่งกลาง ────┐ │ hub rail│         │ banner   │
│ โฮม    │   │ banner · pills                │ │ เมนูด่วน│         │ ฝาก/ถอน  │
│ หวย    │   │ sections                      │ │ + โปร×2 │         │ pills →  │
│ คาสิโน │   └───────────────────────────────┘ │ (ขวาสุด)│         │ hub →    │
│ ...    │                                       │         │         │ sections │
│ 248/64 │                                       │         │         │ bottom nav│
└────────┴───────────────────────────────────────┴─────────┘         └──────────┘
```

- **Sidebar ซ้าย** (`LobbySidebar`): **การ์ดลอย** (แบบเดียวกับแผงขวา) `position: fixed` — ห่างจาก header 16px (`top` = `--lobby-header-h` 72px + 16) · ห่างขอบจอซ้าย 12px (`--lobby-sidebar-inset`) · **สูง `min(780px, 100dvh − 72px − 32px)`** ไม่ติดขอบล่างจอ · มุมมน 16px ทั้งสี่ · เนื้อหา/header เว้นซ้ายเท่า `inset + ความกว้างแถบย่อ + 16` — **ขยาย 248px** (ไอคอน+ชื่อแนวนอน) / **ย่อ 64px** (ไอคอนอย่างเดียว, ชื่อเป็น tooltip) · ปุ่มบนสุดสลับ · จำค่าไว้ใน `localStorage` (`lobby-sidebar-collapsed`) · ยังไม่เคยเลือก: จอ ≥1440 เริ่มขยาย, แคบกว่าเริ่มย่อ · ดู §5.8
- **Hub rail**: ชิดขวาสุดของจอ (264px, ≥1280 = 300px) · **Main container**: ยืดเต็มพื้นที่ระหว่าง sidebar กับ hub โดยเนื้อหา (`.mainStack`) กว้างไม่เกิน 1360px อยู่กึ่งกลาง (จอ ≥1992px ชดเชย hub/sidebar ให้อยู่กึ่งกลางจอจริง) (`.frame[data-sidebar]` เว้นซ้ายตามความกว้าง sidebar)
- **Rail ขวา** (`LottoShellFrame hubRail`): การ์ด hub (แนะนำเพื่อน · เช็คอิน · วงล้อ · Gems · คูปอง · VIP) ≥1024- **Mobile**: hub เป็นแถวเลื่อนข้าง (`LobbyHubTiles variant="strip"`) ใต้ pill หมวด
- ระยะห่างระหว่าง section: `gap-4` (มือถือ) / `gap-6` (desktop) · ภายใน section หัว→แถวการ์ด `10px`

## 3. Tokens

สีใช้ของธีมเดิมเท่านั้น (ค่าเริ่มต้น dark ใน `lotto-theme.css`):

| ใช้กับ | token |
|---|---|
| พื้นหลังหน้า | `--body`, `--BG-Surface-Lighter` — **ธีมมืด: พื้นหลังหน้าต้องสว่างกว่าการ์ด/แผง** (ขาว 12% ทับสีฐานของธีม, cosmic ≈ `#242227`) ไม่งั้นการ์ดกลืนพื้น (กฎอยู่ท้าย `lotto-themes-bridge.css`) · กล่องครอบแบนเนอร์+ปุ่มฝาก/ถอนบนมือถือ (`.panel`) = ดำ 42% ผสม `--BG-Surface-Darker` เข้มกว่าพื้นหลังหน้าชัดเจน |
| พื้น section / กล่อง | `--BG-Surface-Darker`, `--BG-Surface-Normal` |
| การ์ด / pill / ไทล์ | `--ui-surface` (= `--Card-Normal`) |
| ตัวหนังสือ | `--Text-Icon-Title` (หัว) · `--Text-Icon-Body` (รอง) |
| ทอง/สีหลัก | `--Main-Primary`, `--Main-Secondary`, `--btn-gradient1/2`, `--btn-text` |

token โครงสร้างที่เพิ่ม (`:root` ใน `lotto-theme.css`):

| token | ค่า | ใช้กับ |
|---|---|---|
| `--ui-radius-card` | 16px | แบนเนอร์, PromoCard |
| `--ui-radius-tile` | 12px | การ์ดเกม, ไทล์ค่าย |
| `--ui-radius-pill` | 999px | pill, ปุ่มลูกศรกลม |
| `--ui-stroke` | `transparent` | ที่ว่างของขอบ (ไม่แสดงเส้น · คงไว้ให้ขนาด layout ไม่ขยับ) — **ห้ามตั้งเป็นสี** |
| `--ui-hover` | surface + ขาว 8% (light: ดำ 6%) | พื้น hover / focus แทนขอบ |
| `--ui-gray` / `--ui-gray-hover` | `#2a2a2f` / +ขาว 8% (ธีมสว่าง = `--ui-surface`) | **เทาเข้มกลาง ไม่อิงสีธีม** ทุกธีมมืด: ปุ่ม «ดูทั้งหมด», ลูกศรเลื่อนในหัว section, ไทล์โลโก้ค่ายเกม |
| `--ui-glow` | **เลิกใช้** (เดิมเป็นเงาเรืองแบนเนอร์) | — |

**Header มือถือ + Bottom nav บนธีมมืดเรียบ (phantom/cosmic และ navy)**: สี chrome ของสองธีมนี้ใกล้กันมาก จึงบังคับไล่เฉดชัดเจน — บน = `--BG-Surface-Darker` ผสมขาว 14% → ล่าง = `--BG-Surface-Lighter` (ปุ่มนูนกลางของ bottom nav ใช้สีบนเดียวกัน) · กฎอยู่ที่ `lotto-themes-bridge.css` (header) และ `bottom-nav.module.css` (bottom nav) · ธีมอื่นและโหมดสว่างไม่โดน

**ธีมสว่าง (`html[data-mode="light"]`) — กติกาสี**: ใช้ `--ui-theme` (= `--t-ga` สีธีม) เป็นพื้นของส่วนที่ต้องเด่น และ `--ui-on-theme` (ขาว) เป็นตัวหนังสือบนสีนั้น · `--ui-gray` = `#e4e5e9`

| ส่วน | พื้น | ตัวหนังสือ |
|---|---|---|
| Sidebar ซ้าย | เทาอ่อน `#e6e9ee` | เทาเข้ม `#4f586b` · hover `#d8dce3` · **active = `--ui-theme` + ขาว** (ไม่มีแถบทอง) |
| Rail ขวา: แผงเมนูด่วน | เทาอ่อน `#e6e9ee` (การ์ดขาว) | เข้ม · **hover/active = `--ui-theme` + ขาว** |
| Pill หมวดเกม | ไล่เฉดบน→ล่าง ขาว `#fff` → เทา `#d9dbe0` | เข้ม `#3a4150` · **active = เฉดเดิม + ขอบ 2px ไล่เฉดสีธีม (`--ui-theme` อ่อน→เข้ม) + ตัวหนังสือ `--ui-theme`** |
| การ์ดรายละเอียด (PromoCard) | ไล่เฉด `--ui-theme` | ขาว |
| ไทล์ค่ายเกม · «ดูทั้งหมด» · ลูกศรเลื่อน | เทา `--ui-gray` | เทาเข้ม |
| Header desktop (คาสิโน/กีฬา · ค้นหา · กระดิ่ง · โพย · ยอดเงิน) | ขาวโปร่ง 16% บนพื้นสีธีม | ขาว · ตัวที่ active = พื้นขาว + ตัวหนังสือ `--ui-theme` |
| กล่องครอบแบนเนอร์+ฝาก/ถอน (มือถือ) · การ์ดเมนูด่วนแถวเลื่อน (มือถือ) | เทาไล่เฉดเข้มกว่าพื้นขาวของหน้า (`#e2e5eb → #cdd2db` / `#f2f4f7 → #d5dae2`) | เข้ม |
| ปุ่มลอย (ธีม/แชท) | ขาว + ขอบสีธีม | ไอคอนสีธีม |
| การ์ดทั่วไป / แคปชั่นการ์ดเกม (`--ui-surface`, `--grad-*`) | **เทากลาง** ไล่เฉดขาว→เทา (`#fff → #e8eaee`) | เข้ม |

| หน้าหวยทุก step (hub · งวด · แทง · ใส่ราคา · สรุปโพย · โพย) | ไทล์/การ์ด/ปุ่ม **ขาว → เทา** (`#fff → #e6e9ee`) + outline `#cfd4dc` | เข้ม `#1c1d22` · ตัวที่เลือก/active, นับถอยหลัง, ค่ารางวัล, ring = `--ui-theme` · งวดที่เปิดรับและแบนเนอร์หัวตลาดเป็นสีธีมเต็ม + ขาว |

**กติกาหน้าหวย (ธีมสว่าง, รอบ 2)**: ปุ่มทุกชนิดในโซนหวย **รูปทรงเดียวกัน = มุมโค้ง 12px** (CTA สูง 48px) · ปุ่มหลัก = ไล่เฉด `--ui-theme` + ขาว · ปุ่มรอง = ขาว→เทา + outline + ตัวเข้ม · ตัวที่เลือก = ไล่เฉด `--ui-theme` + ตัวหนังสือ/อัตราจ่ายขาว · **ช่องกรอก/ช่องเลข = พื้นขาว + กรอบ `#98a1b1` 1.5px** (ต่างจากพื้นการ์ดเสมอ) · หัวการ์ด (หัวกลุ่มประเภท, หัวงวด, แบนเนอร์ตลาด) = พื้นสีธีม + ขาว · ตัวเลข/อัตราจ่ายเข้มหนา ไม่ใช้สีจางกลืนพื้น

**หน้าหวยรอบ 3**: หัวการ์ดสีธีมต้อง redefine `--text-on-light` / `--text-muted` เป็นขาวใน scope (ข้อความใน `LotteryDrawCard` ใช้ Tailwind ผ่าน token สองตัวนี้) · **toggle**: ปิด = เทา `#aab2c0` ปุ่มกลมขาวชิดซ้าย, เปิด = เขียว `#16a34a` ปุ่มกลมขาวชิดขวา (ไม่ใช้สีธีม เพราะธีมเข้มทำให้แยกสถานะไม่ออก) · **แถบ ย้อน/ลบเลข**: ไม่มีพื้นหลังรอง ปุ่มสองปุ่มสีธีม + ไอคอนขาว ห่าง 8px

กฎหน้าหวยอยู่ท้าย `lottery-glass.css` (ใช้ `html[data-mode="light"][data-mode="light"]` เพื่อชนะกฎสีธีมใน `themes.css`)

**กลไก**: `lotto-themes-bridge.css` (ท้ายไฟล์) บังคับ `--Card-Normal` `#eef0f3` · `--BG-Surface-Normal` `#f4f5f7` · `--BG-Surface-Darker` `#eceef2` · `--Text-Icon-Body` `#4a5265` · `--text-muted` `#5b6475` ในโหมดสว่างของทุกธีม — คอมโพเนนต์ที่อ่าน token เหล่านี้จึงเป็นเทากลางอัตโนมัติ

**พื้นหลังหน้า (ธีมสว่าง) = เทา gray-300 `#d1d5db`** ไม่ใช้ขาวล้วน — เพื่อให้การ์ด/แผงสีขาวแยกจากพื้นหลังได้ชัด (ตั้ง `--cosmic-page-base` / `--body` ท้าย `lotto-themes-bridge.css`)

**หลักการสีในธีมสว่าง**: ห้ามใช้โทนพาสเทลของธีมเป็นพื้นการ์ด/แถบ (ตัวหนังสือจาง อ่านยาก) — พื้นเป็น **เทากลาง** หรือ **สีธีมเต็ม** เท่านั้น แล้วเลือกสีตัวหนังสือให้คอนทราสต์สูง (เข้มบนเทา · ขาวบนสีธีม)

คอมโพเนนต์ใหม่อ้างผ่าน token ทั้งหมด — ถ้าต้องแก้เฉพาะธีมสว่างให้ override ที่ token ไม่ใช่ที่คอมโพเนนต์

## 4. Typography

| บทบาท | ขนาด / น้ำหนัก |
|---|---|
| หัว section | 18 (มือถือ) / 20 (desktop) · 700 |
| ชื่อการ์ดโปร lg / md | 18 / 15 · 700 |
| ชื่อเกม | 12 · 500 (ellipsis บรรทัดเดียว) |
| ข้อความรอง / จำนวนผู้เล่น / ชิป | 10–12 |
| pill หมวด | 14 · 500 (active 700) |

ฟอนต์: `Noto Sans Thai` (ตั้งไว้ที่ `body`) — ห้ามตั้ง font-family เพิ่มในคอมโพเนนต์

## 5. คอมโพเนนต์

### 5.1 ภาพรวม

| คอมโพเนนต์ | ไฟล์ | หน้าที่ |
|---|---|---|
| `SectionHeader` | `components/ui/SectionHeader.tsx` | หัว section มาตรฐาน |
| `CategoryPills` | `features/home/CategoryPills.tsx` | แถว pill หมวดเกม |
| `PromoCard` | `features/home/PromoCard.tsx` | การ์ดโปร (ชื่อ+คำอธิบาย+ลูกศร / ภาพ 3D) |
| `DesktopFeatureCards` | `features/home/DesktopFeatureCards.tsx` | จัดวาง PromoCard (คู่ใหญ่ / แถวเลื่อนมือถือ) |
| `LobbyGameCard` | `features/home/LobbyGameCard.tsx` | การ์ดเกม: ปก + แถบชื่อ/ผู้เล่น |
| `TrendingGames` | `features/home/TrendingGames.tsx` | กริดเกมยอดนิยม |
| `GameShowcaseSection` | `features/home/GameShowcaseSection.tsx` | แถวเกม (หัว + carousel) |
| `LottoPeekCarousel` | `features/home/LottoPeekCarousel.tsx` | carousel; ส่ง `heading` = ลูกศรอยู่ในหัว |
| `LobbyHubTiles` | `features/home/LobbyHubTiles.tsx` | การ์ด hub (rail / strip) |
| `HeroBanner` | `features/home/HeroBanner.tsx` | แบนเนอร์ + ลูกศร + จุด |
| `ProviderLogoMarquee` | `features/home/ProviderLogoMarquee.tsx` | ไทล์โลโก้ค่ายเลื่อนอัตโนมัติ |

### 5.2 SectionHeader

- ซ้าย: ไอคอน 3D 28px + ชื่อ · ขวา: pill «ดูทั้งหมด» (สูง 32, ลูกศร+ข้อความ) + ปุ่มลูกศรกลม 32px ซ้าย/ขวา
- ลูกศรเลื่อนแสดงเฉพาะ ≥768 (มือถือใช้ปัดนิ้ว) · ปุ่ม disabled เมื่อสุดแถว
- ใช้ผ่าน `LottoPeekCarousel heading={{ title, icon, viewAllHref }}` เมื่อมี carousel, หรือใช้ `SectionHeader` ตรง ๆ เมื่อเป็นกริด
- **ห้าม** ทำหัวแบบอื่นใน lobby — section ใหม่ต้องใช้ตัวนี้

### 5.3 CategoryPills

- desktop: สูง 52, padding `0 24 0 14`, ตัวหนังสือ 16, ไอคอน 30 · มือถือ: สูง 32, ตัวหนังสือ 13, ไอคอน 18, มุม 10px (ไม่ใช่ทรงแคปซูล), padding แนวตั้งของแถบ 4px · ปุ่มที่ไม่ active = เทาอ่อน (`--pill-bg` = ขาว 16% บน surface, hover 24%; ธีมสว่างใช้ดำ 8%/14%) · จัดกลุ่ม **กึ่งกลาง** (`justify-content: safe center` — ล้นแล้วชิดซ้ายและเลื่อนได้) ซ่อน scrollbar, `scroll-snap`
- inactive: `--ui-surface` (ไม่มีขอบ) · hover = `--ui-hover` · active: ไล่เฉดทอง `--btn-gradient1→2`, ตัวหนังสือ `--btn-text`
- active คำนวณจาก route (`resolveLobbyCategory`) · ข้อมูลหมวดอยู่ `lobby-category.ts` (ไอคอนจาก `assets/3d/menuicon`)
- **Desktop (≥1024)**: เป็น **แถบเมนูต่อใต้ header** (`CategoryPills bar` ใน `.navBarSlot` ของ `LottoShellFrame` เมื่อ `hubRail`) — เต็มความกว้างจอ พื้น**ไล่เฉดขาว→เทา** `#fff → #e6e9ee` บนลงล่าง (โหมดมืด: `--BG-Surface-Darker`) sticky ใต้ header (z-index 38) สูง 52 · เนื้อหาในแถบจัดแนวเดียวกับ header/main (≤1360 กึ่งกลาง) · เมนูกว้างพอดีเนื้อหา (`padding 0 18`) เรียงชิดกัน **จัดกึ่งกลางกรอบ** ไม่มีพื้นหลังต่อปุ่ม · **ไม่มี ring/outline** และ hover/กดไม่ขยับ UI (ไม่ translate/scale ทับ `.motion-press`) · โฟกัสคีย์บอร์ด = พื้นเทาอ่อน (hover = เทาอ่อน) · **active = ตัวหนังสือสีธีม ตัวหนา + เส้นใต้ 3px สีธีม** · `--lobby-bar-h` (52px) ถูกนำไปคำนวณตำแหน่ง sidebar ลอยและ rail ขวา (อยู่ต่ำลงเท่าแถบนี้)
- มือถือ: **ใต้การ์ดโปร ก่อนเนื้อหา/เกมยอดนิยม** (ลำดับ: แบนเนอร์+ฝาก/ถอน → hub strip → การ์ดโปร → pill หมวด → เนื้อหา) ผ่าน `LottoMobileQuickMenu` — แถบมีพื้นสีอ่อนเต็มความกว้างจอ (`--BG-Surface-Darker` + ขาว 12%; ธีมสว่าง ดำ 8%) และ **sticky ใต้ header**: เลื่อนจนแถบชน header แล้วติดไปด้วย (`position: sticky`, `top` = ความสูง `.lotto-site-header` วัดด้วย ResizeObserver, z-index 30 < header 40) — ห้ามใส่ `overflow` ให้ ancestor ของแถบนี้บนมือถือ · desktop: ใต้แบนเนอร์ในเนื้อหาหน้าแรก

### 5.4 PromoCard

- โครง: `[ชื่อ / คำอธิบาย ≤2 บรรทัด / ปุ่มลูกศรกลม 28px]` ซ้าย (กว้างสูงสุด 62%) · ภาพ 3D ชิดขวา (กว้าง 46%, `object-fit: contain`)
- พื้น: gradient surface + เรืองสี `tone` ที่มุมขวา · hover: สว่างขึ้น (`brightness 1.1`), ปุ่มลูกศรเป็นทอง
- `size`: `lg` (สูง ≥132/148) สำหรับคู่บน · `md` (สูง ≥104) สำหรับแถวสาม
- `tone`: `gold` (ค่าเริ่มต้น) `blue` `purple` `orange` — ใช้เพื่อแยกประเภท ไม่ใช่ตกแต่ง
- `chips`: ชิปทางลัดใต้คำอธิบาย เฉพาะ desktop
- Desktop: การ์ดโปรโมชั่น + กิจกรรมพิเศษ อยู่ใน **rail ขวา** เรียงคอลัมน์เดียวใต้แผง "เมนูด่วน" (`<DesktopFeatureCards rail />`, ขนาด `md`, ไม่มีชิป) — ไม่อยู่ใน main · Mobile: แถวเดียวเลื่อนข้าง การ์ดละ 78% ใต้แถบ hub (`mobile`)

### 5.5 การ์ดเกม + กริด

- `LobbyGameCard`: ปกใช้ **สัดส่วนเดิมของไฟล์ภาพ** (ปัจจุบัน 1:1) ไม่บังคับ aspect-ratio ไม่ crop — ความสูงการ์ดตามภาพ ทุก carousel/กริด ในกรอบมน 12 (ไม่มีขอบ) · **ไม่มีชื่อเกม** · prop `online` = เพิ่มแถบ**ผู้เล่นออนไลน์** (ไอคอนคน + ตัวเลข กึ่งกลาง) ใต้ภาพ พื้นไล่เฉดสีธีม (`--ui-theme`) ตัวหนังสือขาว — ตัวเลขเป็น mock สุ่มใหม่ทุก 3 วินาที (±120 รอบค่าฐาน, `LiveOnlineCount`) · ใช้เฉพาะ `TrendingGames` · แถวคาสิโน/สล็อต/กีฬาเป็นภาพปกล้วน ไม่มีแถบ
- ป้าย `สด` / `ฮิต` / `ใหม่` มุมซ้ายบนของภาพ (ซ้อนได้ตามเงื่อนไข)
- `layout`: `carousel` (กว้าง 100% ของ slide) · `grid` · `fixed` (กว้างตาม `--card-width`)
- แถวเกม `7grid` (ชื่อโหมดเดิม): desktop เห็น **5 ใบเต็มแถว ไม่ peek** · แท็บเล็ต 4 + peek · มือถือ 3 + peek ครึ่งใบ
- `TrendingGames`: มือถือ: แถวเดียวเลื่อนข้าง (`overflow-x` + snap) เห็น 3 ใบ + ใบถัดไปโผล่ ทั้ง 10 ใบ · ≥768 5 คอลัมน์ × 2 แถว (10 ใบ) — ประกอบจากเกมที่โหลดแล้ว (คาสิโน 5 + สล็อต 5) ไม่มีแหล่งข้อมูลใหม่

### 5.6 HeroBanner

- ภาพ `public/HomeProBanner/*` อัตราส่วน 1916×821, มุม 16
- ลูกศรกลม 28px มุมขวาล่าง (≥768) + จุดกลางล่าง (active ยาว 22 สีหลัก)

### 5.7 ค่ายเกม (ProviderLogoMarquee)

- ไทล์สูง 56 กว้าง `clamp(7rem,13vw,9.5rem)`, พื้น `--ui-surface` (ไม่มีขอบ), โลโก้ **สีปกติ** (ห้าม grayscale / filter) · hover เปลี่ยนที่พื้นไทล์เท่านั้น: ทอง 12%
- เลื่อนอัตโนมัติ (CSS ใน `motion-glass.css`) หยุดเมื่อ hover · ปรับ `prefers-reduced-motion` ตามเดิม

### 5.8 Sidebar (LobbySidebar)

- **ขยายแล้วต้องไม่มีอะไรขยับ**: เนื้อหา (`.pageShell`) เว้นซ้ายเท่าแถบ "ย่อ" (64px) + 24 เสมอ — ตอนขยาย (248px) sidebar ลอยทับเนื้อหาด้วย `position: fixed` (ไม่มีเงา) · **header อยู่เต็มความกว้างจอและไม่ถูก sidebar ทับ** จึงไม่ต้องเว้นที่ให้แถบขยาย; เนื้อหาใน header จัดแนวเดียวกับ main (เว้นซ้าย `64 + 24`, ที่ ≥1992px ชดเชยให้อยู่กึ่งกลางเหมือน main)
- header จัดแนวเดียวกับ main container: กรอบ `.dh-inner` กว้าง ≤1360 กึ่งกลาง เว้นขวาเท่า hub rail (`--lobby-rail-reserve`) — ตัวแปร `--lobby-sidebar-width`, `--lobby-sidebar-expanded`, `--lobby-rail-width`, `--lobby-rail-reserve` นิยามที่ `.frame`
- สถานะ: `useSidebarCollapsed()` (`hooks/useSidebarCollapsed.ts`) → ส่ง `collapsed` / `onToggle` จาก `LottoShellFrame` · เฟรมตั้ง `data-sidebar="expanded|collapsed"` ให้ CSS เว้นซ้าย/ปรับความกว้าง (transition 200ms)
- พื้น `--BG-Surface-Darker` (ไม่มีเส้นขอบ) · z-index 39 (ใต้ header ที่ 40)
- บนสุด: ปุ่มสลับ (`PanelLeftClose/Open`) · กลุ่มหมวดเกม: **หน้าหลัก · คาสิโน · สล็อต · ยิงปลา · กีฬา · หวย · เกมไพ่** (ลำดับมาตรฐานเดียวกับแถบเมนูใต้ header — แหล่งเดียว `lobby-category.ts`) · เส้นคั่น · โปรโมชั่น · กิจกรรม · **ลุ้นรางวัล** · ล่างสุด (ตั้งค่า): ธีม · ภาษา (ธง+ตัวย่อ)
- แถวเมนู: สูง 44, ไอคอน `lucide` 22 + ชื่อ 14px, มุม `--ui-radius-tile` · ย่อ = ไอคอนกึ่งกลาง ซ่อนชื่อ (`title` เป็น tooltip)
- **เส้นคั่นกลุ่ม** 2 เส้น (token `--ui-divider`: มืด ขาว 16% · สว่าง เข้ม 16% — ต่างจาก `--ui-stroke` ที่โปร่งใส): ① คั่น หมวดเกม | โปรโมชั่น/กิจกรรม/ลุ้นรางวัล ② คั่น กลุ่มโปรโมชั่น | ตั้งค่า (ธีม · ภาษา)
- active: ไอคอน+ชื่อ `--Main-Secondary`, พื้น `--Main-Primary` 12%, แถบทอง 3px ขอบซ้าย
- ห้ามใส่ wallet / ปุ่มฝาก-ถอนในแถบนี้ — อยู่ใน header

### 5.9 Header desktop (LottoDesktopHeader · CSS `styles/lobby-desktop-header.css`)

- ซ้าย: สวิตช์ คาสิโน/กีฬา + ช่องค้นหา · กลาง: โลโก้ · ขวา: กระดิ่ง · โพยค้าง (badge) · ยอดเงิน + ปุ่ม `+` ทอง · avatar (guest: เข้าสู่ระบบ / สมัครสมาชิก)
- ทุกชิ้นเป็นแคปซูลกลม `--ui-radius-pill` (ไม่มีขอบ) · hover = พื้น `--ui-hover` · มือถือใช้ header เดิมใน `LottoSiteHeader`

## 6. ลำดับ section หน้าแรก

1. แบนเนอร์ (`HeroBanner`)
2. Pill หมวดเกม (`CategoryPills`)
3. (desktop: การ์ดโปรย้ายไป rail ขวา · mobile: แถวการ์ดโปรใต้ pill/hub)
4. เกมยอดนิยม (`TrendingGames`)
5. ค่ายเกม (`ProviderLogoMarquee`)
6. คาสิโนออนไลน์ → สล็อตออนไลน์ → กีฬาออนไลน์ (`GameShowcaseSection`)
7. **ผู้ชนะสูงสุด → ผู้โชคดี** (คงดีไซน์เดิม)

ภาพอ้างอิงมี Live Bets / General Chat / Footer — **ไม่ได้ทำ** เพราะไม่มีข้อมูลรองรับในระบบ (ห้ามใส่ข้อมูลหลอกตามรูป)

**หน้าโปรโมชั่น (`/promotions`)**: ทุกขนาดจอเป็น **กริดการ์ด thumbnail** — ภาพ 16:9 ด้านบน · ชื่อโปรใต้ภาพ · วันหมดเขต · ปุ่ม `soft-tab-active` ความกว้างเต็มการ์ด «อ่านรายละเอียดโปรโมชั่น» (1 คอลัมน์มือถือ · 2 ที่ ≥640 · 3 ที่ ≥1024) + แท็บหมวด (ทั้งหมด/สมาชิกใหม่/ประจำวัน/สิทธิพิเศษ) — ข้อมูลจาก `catalog.mobileList` (`bannerSrc` = `public/promotions/*`) · เลิกใช้แถวรายการแบบกราฟิก SVG + hero เดิมบน desktop

**ระยะขอบข้างของเนื้อหาหมวดเกม/หวย**: มือถือ `px-0` (เหลือแค่ช่องไฟ 12px ของเปลือกหน้า) · ≥640 `px-2` · ≥1024 `px-4` — ไม่ใส่ `px-4` บนมือถือ เพื่อให้กริดค่ายเกมกว้างเต็มที่

**หน้าเมนูทุกหน้า (แนะนำเพื่อน · เช็คอิน · วงล้อ · ร้านค้าเพชร · โปรโมชั่น · กิจกรรม · ลุ้นรางวัล · ธุรกรรม · คืนยอด ฯลฯ — กลุ่ม route `(sub)`)** ใช้เปลือกเดียวกับหน้าหมวดเกม: `SubShellLayout` → `LottoShellFrame hubRail` (แถบเมนูใต้ header · sidebar ลอย · rail ขวา = เมนูด่วน + การ์ดโปร) · `SubPageShell` แสดง **hero ชื่อหน้ากึ่งกลางจอ** (`gaming-category-hero`) บน desktop แทน h1 ชิดซ้าย (ยกเว้นหน้า `fit`/`compactBar` ของหวย step — หน้า VIP ก็มี hero ชื่อหน้าเหมือนกัน แล้วแบนเนอร์ VIP ต่อใต้มัน) · `SubPageShell` ที่ใช้นอกกลุ่ม (เช่น หน้าค่ายเกม) ได้ `hubRail` อัตโนมัติเมื่อไม่ใช่ `fit`/`compactBar`

**หมวดหวย (`/lottery`)** ใช้เปลือก lobby เดียวกับหมวดเกมอื่น — route อยู่ใน `(lobby)/(tabs)/lottery` (แถบเมนูใต้ header · sidebar · rail ขวา) + hero ชื่อหมวดกึ่งกลางจอ (`หวย` / `Lottery`, คลาส `gaming-category-hero` เดียวกับ สล็อต/ยิงปลา) แล้วต่อด้วยเนื้อหา `LotteryHubContent` (คำบรรยาย + ปุ่มโพยของฉัน · การ์ดตลาด · ผลหวยล่าสุด) — component: `features/lottery/hub/LotteryHubPage.tsx`

**ลบออกแล้ว (ตามสั่ง):** carousel ประเภทการแทงหวย · แถบตรวจสลาก · ผลหวยทั้งหมด (`ResultsRail`, `ThaiLottoCard`, `LottoForeignResults`, `LottoResultCard`) — ห้ามนำกลับมาโดยไม่ได้รับคำสั่ง

## 7. แผนที่ภาพจาก `public/assets` (+ โฟลเดอร์ public อื่น)

| ตำแหน่ง | ไฟล์ |
|---|---|
| ไอคอนหัว: หวย / คาสิโน / สล็อต / กีฬา | `assets/3d/menuicon/{lotto,casino,slot,sport}.avif` |
| ไอคอนหัว: เกมยอดนิยม / ค่ายเกม | `assets/3d/menuicon/rank.avif` / `information.avif` |
| pill หมวด + sidebar | `assets/3d/menuicon/{lotto,casino,slot,fish,sport,card,home,promotion,event}.avif` |
| PromoCard: โปรโมชั่น / กิจกรรม | `assets/3d/menuicon/promotion.avif` / `event.avif` |
| PromoCard: ยี่กี / ค่ายหวย | `lottery/ic-stock_yk15-effect.webp` / `lottery/ic-government-effect.webp` |
| PromoCard: ผู้ชนะสูงสุด | `assets/coins/coins1.webp` |
| Hub: แนะนำเพื่อน / เช็คอิน / วงล้อ / Gems / คูปอง / VIP | `assets/3d/{cashback,checkin,wheel,diamond,coupon,vip}.avif` |
| แบนเนอร์หลัก | `HomeProBanner/Mbanner-{1,2}.avif` |
| ปกเกม | `casino/*`, `slots/*`, `sport/*` (ผ่าน `load-lobby-games.ts`) |
| โลโก้ค่าย | `provider logo/*` |

ข้อควรระวัง: `assets/3d/โปรโมชั่น.webp`, `event.webp`, `tournament/*` มีพื้นหลังทึบ/สว่าง — **ห้ามวางบนการ์ดมืด** ใช้ตัวโปร่งใสใน `menuicon/` แทน · ไฟล์ชื่อภาษาไทยต้อง `encodeURI` ก่อนใช้

## 8. คอมโพเนนต์ที่คงไว้ (ห้ามเปลี่ยนดีไซน์)

- `TopLeadersSection` (ผู้ชนะสูงสุด) และ `HallOfFameSection` (ผู้โชคดี) — ใช้ `showcase.module.css` เดิม **ห้ามแก้ไฟล์นี้** (ทั้งสองส่วนยังอ้างคลาส `section/header/title/viewAll`)

## 9. Motion

### 8.0 พื้นผิวการ์ดและแท็บ = ไล่เฉดสีเสมอ

- **Surface card ทั้งโปรเจค ไม่ใช้พื้นสีเรียบ**: ใช้ utility `soft-panel` / `soft-card` / `soft-card-dark` / `modal-surface` และคลาสพื้น `soft-panel-bg` / `soft-card-bg` (ห้ามเขียน `bg-[var(--soft-card)]` ฯลฯ ตรง ๆ)
- ไล่เฉดบน→ล่าง (`180deg`): ขาว 8–9% ทับสีฐาน (บน) → ดำ 7–8% ทับสีฐาน (ล่าง) · แท็บ active ไล่ `--btn-gradient1→2` บน→ล่างเช่นกัน (เคยลองซ้าย→ขวาแล้ว ตัดสินใจกลับมาแบบนี้) (token `--grad-panel`, `--grad-card`, `--grad-modal` ใน `lotto-ui-compat.css`) — ธีมสว่าง/มืดใช้สูตรเดียวกัน สีฐานมาจาก token ของธีม
- **แท็บ** (ปุ่มแท็บแบบมีพื้น): ไม่ active = `soft-tab` (ไล่เฉด ไม่มีขอบ) · active = `soft-tab-active` (ไล่เฉด `--btn-gradient1→2` ตัวหนังสือ `--btn-text`) · แท็บ VIP ใช้ไล่เฉดบนตัวรางแท็บ · แท็บเส้นใต้ (`SoftLineTabs`) คงเดิม

### 8.1 รายการข้อมูล = ตาราง (ไม่ใช้แคปซูล)

- รายการแบบแถว (ประวัติรายได้, รายชื่อเพื่อนที่แนะนำ ฯลฯ) ใช้ `<table>` จริง: หัวตาราง (`th scope="col"`) + แถวเต็มความกว้าง **ไม่ทำเป็นการ์ด/แคปซูลต่อแถว**
- แยกแถวด้วยสีพื้นสลับ (zebra) ไม่มีเส้นขอบ · ตัวตารางโค้งมนที่กรอบนอกเท่านั้น · ข้อมูลหลักซ้าย ค่า/วันที่ชิดขวา (`tabular-nums`)
- คอมโพเนนต์: `features/referral/ReferralTable.tsx` (2 คอลัมน์) — ใช้ซ้ำสำหรับรายการแบบเดียวกัน

### 9.1 ห้ามมี Shadow

- **ไม่ใช้ shadow ทุกชนิดทั้งโปรเจค**: `box-shadow` ที่เบลอ, `text-shadow`, `filter: drop-shadow()`, Tailwind `shadow-*` / `drop-shadow-*`, และ glow ทุกแบบ — ความลึกใช้สีพื้น (surface) แยกชั้นแทน
- **ยกเว้น** `box-shadow` ที่ **blur = 0** (ring/เส้นขอบ/focus ring/hairline เช่น `0 0 0 2px …`, `inset 0 0 0 1px …`) — ไม่ใช่เงา ใช้เป็นเส้นขอบได้
- เว้นโค้ด legacy (`src/legacy`) และ CSS ที่ dump ไว้ใน `public/` ซึ่งไม่ได้ถูกใช้ในแอปปัจจุบัน


- ใช้ class เดิม: `motion-reveal` (section เข้า), `motion-lift` (การ์ด hover ยก), `motion-press` (ปุ่มกด), `gameCardEnterClassName` (การ์ดเกมเข้าแบบ stagger)
- transition ปุ่ม/พื้น 150ms `ease` · ห้ามเพิ่ม animation วนลูปใหม่นอกจาก marquee ค่ายเกม

## 10. Do / Don't

**Do**
- ใช้ `SectionHeader` ทุก section · ใช้ token ของธีม · ตรวจทั้งมือถือ (≤390px) และ desktop (1024 / 1280 / 1440)
- เพิ่มข้อมูลใหม่ผ่านที่โหลดเดิม (`load-lobby-games.ts`, `lib/lotto/*`) ไม่ใส่ในคอมโพเนนต์

**Don't**
- hardcode สีทอง/ดำใหม่ · ทำกล่องครอบ section · ใช้ emoji เป็นไอคอน (ใช้ `lucide-react` หรือภาพ 3D)
- ใช้ข้อมูล/ข้อความจากภาพอ้างอิงตรง ๆ (เช่น ชื่อเกม, แชท, ตาราง Live Bets)

## 11. Checklist ก่อนส่งงาน UI

- [ ] `npx tsc --noEmit` และ `npx eslint src` ผ่าน
- [ ] มือถือ 360 / 390 / 430: ไม่มี horizontal scroll ของหน้า, pill/hub/promo เลื่อนข้างได้
- [ ] 768, 1024, 1280, 1440: rail ขวา (เมนูด่วน) แสดงตั้งแต่ 1024
- [ ] ธีมสว่าง/มืดอ่านออก (ตรวจ pill active, การแยกชั้นด้วยสีพื้น, ตัวหนังสือบนการ์ด)
- [ ] ผู้ชนะสูงสุด / ผู้โชคดี หน้าตาเหมือนเดิม
