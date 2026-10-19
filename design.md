# 🎨 PHANTOM — Locked UI Design System
> **สถานะ:** ✅ Design Locked  
> **Visual Source of Truth:** ภาพ UI PHANTOM เวอร์ชัน **Graphite Black + Metallic Gold** ที่ผู้ใช้ยืนยันล่าสุด  
> **Framework เป้าหมาย:** Next.js + React + Tailwind CSS v4  
> **แนวทาง:** Mobile-first, premium casino / gaming interface, glossy-dark, controlled bevel, restrained glow  
> **อัปเดต:** 6 ตุลาคม 2026

---

# 0. DESIGN LOCK — กฎสูงสุดของระบบ

เอกสารนี้ใช้แทน guideline เดิมในส่วนที่ขัดแย้งกันทั้งหมด โดยให้ภาพอ้างอิงล่าสุดเป็น **Visual Source of Truth** ของสี, ความหนาแน่น, radius, spacing, contrast, border, shadow และลำดับชั้นของ UI

## 0.1 สิ่งที่ “ล็อค” และห้ามเปลี่ยนโดยพลการ

1. **ธีมหลัก = Graphite Black + Warm Metallic Gold**
   - พื้นหลังหลักต้องเป็นดำ/เทาดำ
   - ห้ามเปลี่ยน Surface หลักไปเป็นม่วง, burgundy, blue-black หรือ neon
   - ทองใช้เฉพาะจุดสำคัญ เช่น CTA, Active State, Logo, Highlight, Icon สำคัญ

2. **ภาพรวมต้องมืด แต่ไม่แบน**
   - ใช้ดำหลายระดับเพื่อสร้าง Layer
   - ใช้เส้นขอบ metallic gray/silver แบบบาง
   - ใช้ inset highlight และ shadow นุ่มเพื่อสร้างความนูน

3. **ไม่ใช่ Borderless**
   - ดีไซน์อ้างอิงมีกรอบชัดแบบ premium beveled panel
   - การ์ดหลัก, ปุ่ม, search, room section และ bottom nav ใช้ border 1px / highlight บาง
   - หลีกเลี่ยงกรอบหนาและ glow รอบทุกองค์ประกอบ

4. **ทองไม่ครองทั้งหน้า**
   - ทอง = Action / Active / Brand Accent
   - Surface ส่วนใหญ่ยังต้องเป็นดำ/Graphite
   - ใช้ทองประมาณ 10–20% ของพื้นที่ UI เท่านั้น

5. **Mobile-first เป็น baseline**
   - หน้าจออ้างอิงคือ layout หลัก
   - Desktop เป็นการ “ขยายระบบ” ไม่ใช่ออกแบบใหม่คนละสไตล์

---

# 1. Design Language

## 1.1 Mood & Tone

- Premium
- Casino / Gaming
- Modern luxury
- Dark cinematic
- Metallic
- Dense but organized
- High contrast
- Smooth glossy surfaces
- Controlled depth
- ไม่มี neon purple
- ไม่มี glassmorphism โปร่งมากเกินไป
- ไม่มี card สีเทาสว่าง
- ไม่มี gradient สีรุ้ง

## 1.2 Core Visual Formula

```txt
Near-black canvas
+ dark graphite layered panels
+ thin metallic silver borders
+ warm metallic gold active states
+ soft top highlight / inset bevel
+ restrained shadow
+ vivid game artwork as content contrast
```

---

# 2. Core Layout Shell — Mobile Reference

## 2.1 ลำดับองค์ประกอบหลัก

```txt
AppShell
├─ TopHeader
│  ├─ WalletSummary
│  ├─ CenterLogo
│  └─ HeaderActions
├─ WalletActionRow
│  ├─ Deposit CTA
│  └─ Withdraw CTA
├─ AnnouncementTicker
├─ HeroCarousel
├─ PromoGrid (3)
├─ PopularRoomsSection
├─ SearchBar
├─ GameLobby
│  ├─ CategoryRail
│  └─ GameContent
│     ├─ GameTabs
│     └─ GameCards
├─ FloatingControls
└─ BottomNavigation
```

## 2.2 Mobile viewport

- Target width: `360px – 430px`
- Safe horizontal padding: `8px – 12px`
- Main section vertical gap: `10px – 14px`
- UI ต้องไม่มี horizontal overflow โดยไม่ได้ตั้งใจ
- Bottom nav เป็น fixed/sticky shell
- Main content ต้องมี `padding-bottom` เผื่อ bottom nav

---

# 3. Color System — LOCKED

## 3.1 Surface Scale

```css
:root {
  /* === Canvas / Graphite === */
  --surface-0: #08090a;
  --surface-1: #0d0f10;
  --surface-2: #121416;
  --surface-3: #181b1d;
  --surface-4: #202326;
  --surface-5: #2a2e31;

  /* === Metallic Border === */
  --border-subtle: rgba(214, 217, 220, 0.18);
  --border-default: rgba(214, 217, 220, 0.36);
  --border-strong: rgba(232, 234, 236, 0.58);

  /* === Gold === */
  --gold-50: #fff8dc;
  --gold-100: #f8e7ae;
  --gold-200: #edcf7b;
  --gold-300: #dfb451;
  --gold-400: #c89432;
  --gold-500: #a87320;

  --gold-primary: #e6c260;
  --gold-highlight: #f7e9b0;
  --gold-deep: #b67d25;

  /* === Text === */
  --text-primary: #f7f7f4;
  --text-secondary: #c6c8ca;
  --text-muted: #898d91;
  --text-disabled: #5d6165;

  /* === Status === */
  --status-hot: #e51f28;
  --status-new: #1eab55;
  --status-info: #3d8df5;
  --status-success: #1cab61;
  --status-warning: #d9a529;

  /* === Overlay === */
  --overlay-deep: rgba(0, 0, 0, 0.74);
}
```

## 3.2 ห้ามใช้สีต่อไปนี้เป็น Theme Accent

```txt
Purple / Violet / Fuchsia / Burgundy / Neon Blue
```

ยกเว้นเป็นสีที่มาจาก **ภาพปกเกมจริง** เท่านั้น

## 3.3 Legacy Token Compatibility

ถ้าโค้ดเดิมมีชื่อ token แบบ `purple-*` ให้คงชื่อไว้ชั่วคราวเพื่อไม่ให้ระบบพัง แต่ map ค่าใหม่เป็น Graphite/Gold เท่านั้น

```css
:root {
  --purple-300: var(--gold-primary);
  --purple-400: var(--gold-300);
  --purple-500: var(--gold-400);
  --purple-600: var(--gold-500);

  --surface-purple: var(--surface-3);
  --surface-purple-gradient:
    linear-gradient(180deg, #202326 0%, #101214 100%);
}
```

---

# 4. Surface & Depth System

## 4.1 Standard Panel

ใช้กับ section container เช่น “ห้องยอดนิยม”

```css
.panel-dark {
  background:
    linear-gradient(180deg, #171a1c 0%, #0e1011 100%);
  border: 1px solid var(--border-default);
  border-radius: 16px;
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.08),
    0 8px 24px rgba(0,0,0,.26);
}
```

## 4.2 Elevated Control

ใช้กับ search, tabs, header icon button

```css
.surface-control {
  background:
    linear-gradient(180deg, #202326 0%, #111315 100%);
  border: 1px solid var(--border-default);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.10),
    0 3px 10px rgba(0,0,0,.32);
}
```

## 4.3 กฎการใช้ Glow

- Gold glow ใช้เฉพาะ selected CTA / center action / logo highlight
- ห้ามมี glow รอบ card ทุกใบ
- ห้ามใช้ glow สีม่วง
- ค่าแนะนำ:
  `0 0 12px rgba(226, 187, 85, .16)`

---

# 5. Metallic Gold Component System

## 5.1 Gold Gradient

```css
--gold-gradient:
  linear-gradient(
    180deg,
    #fff7d8 0%,
    #f4dda0 18%,
    #e9c96c 48%,
    #d6a943 72%,
    #f2d46f 100%
  );
```

## 5.2 Primary Gold Button

```css
.btn-gold {
  min-height: 48px;
  border-radius: 12px;
  border: 1px solid #b7832f;
  background: var(--gold-gradient);
  color: #171717;
  font-weight: 800;
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.9),
    inset 0 -1px 0 rgba(151,100,22,.28),
    0 2px 7px rgba(0,0,0,.35),
    0 0 10px rgba(228,188,76,.14);
}
```

## 5.3 Secondary Dark Button

ใช้เช่น “ถอน”

```css
.btn-dark {
  min-height: 48px;
  border-radius: 12px;
  border: 1px solid rgba(224,226,228,.48);
  background: linear-gradient(180deg, #222527 0%, #0c0e0f 100%);
  color: var(--text-primary);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.10),
    0 2px 8px rgba(0,0,0,.34);
}
```

## 5.4 Active State

Active menu / tab ให้ใช้ gold surface เดียวกันทั้งระบบ

```css
.is-active-gold {
  background: var(--gold-gradient);
  color: #171717;
  border-color: #b7832f;
}
```

---

# 6. Typography

## 6.1 Font Roles

ภาษาไทย:
- `Noto Sans Thai`
- `LINE Seed Sans TH`
- `IBM Plex Sans Thai`

ภาษาอังกฤษ / ตัวเลข:
- `Inter`
- `Manrope`
- `Archivo`

## 6.2 Weight

| Role | Weight |
|---|---:|
| Display / Logo-like text | 700–800 |
| Section Heading | 700 |
| Tab / Button | 700 |
| Card title | 600–700 |
| Body | 400–500 |
| Number / Wallet | 700 |

## 6.3 Mobile Scale

```txt
Display hero: 24–32px
Section heading: 18–22px
Primary button: 16–18px
Tab: 14–16px
Body: 13–15px
Caption: 11–12px
Badge: 9–11px
```

---

# 7. Radius System

| Token | Radius | Use |
|---|---:|---|
| `radius-xs` | 6px | badge |
| `radius-sm` | 10px | small control |
| `radius-md` | 12px | button / game card |
| `radius-lg` | 16px | search / hero / card |
| `radius-xl` | 20px | section container |
| `radius-pill` | 999px | icon button / pill tab |

```css
:root {
  --radius-xs: 6px;
  --radius-sm: 10px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 20px;
  --radius-pill: 999px;
}
```

---

# 8. Top Header — LOCKED COMPOSITION

## 8.1 Desktop/Tablet behavior

Desktop สามารถเพิ่มพื้นที่ว่าง แต่คง composition:
- Wallet: ซ้าย
- Brand: center
- Actions: ขวา

## 8.2 Mobile

ความสูงโดยรวม `64–72px`

### Wallet Summary
- width ~ `120–140px`
- 2 rows
- icon left
- amount right
- dark glossy panel
- rounded `14–16px`

### Logo
- center aligned
- metallic gold
- ไม่ใส่พื้นหลัง block ใหญ่

### Header Actions
- 3 circular actions
- diameter `38–44px`
- dark gradient
- metallic gray border
- icon off-white / light-gold

---

# 9. Wallet Action Row

วางใต้ header ทันที

```txt
[      ฝาก      ] [      ถอน      ]
```

- 2 columns
- gap `8–10px`
- height `48–56px`
- Deposit = gold primary
- Withdraw = dark secondary
- icon + label centered
- ไม่ใช้ gradient หลายสี

---

# 10. Announcement Ticker

- height `36–42px`
- background `surface-1`
- top/bottom separator 1px subtle
- speaker icon = gold
- text = secondary gray
- arrow = gold-light
- marquee text ต้องไม่เร็วเกินไป
- pause on hover/focus

---

# 11. Hero Banner

## 11.1 Geometry
- Full content width
- Radius `14–18px`
- Mobile aspect ratio: ประมาณ `3.8:1 – 4.2:1`
- overflow hidden

## 11.2 Image treatment
- ภาพ banner เป็น asset
- HTML/CSS ไม่ควรพยายามสร้าง character artwork
- สามารถ overlay `linear-gradient` สีดำบางๆ เพื่อ readability

## 11.3 Border
- 1px silver/gold-neutral
- ไม่ใช้ gold glow แรง

---

# 12. Promo Grid

หลัง Hero เป็น 3 tiles

```txt
[ small ][       wide       ][ small ]
```

แนะนำสัดส่วน:
- `1fr 1.8fr 1fr`
- gap `8px`

บนมือถือจอแคบมากสามารถ horizontal scroll ได้ แต่ baseline ให้คง 3 tile composition ถ้าพื้นที่พอ

แต่ละ tile:
- radius `12–14px`
- border `1px solid var(--border-default)`
- artwork เต็ม tile
- ไม่มี shadow ใหญ่

---

# 13. Popular Rooms Section

## 13.1 Container
- dark elevated panel
- radius `20px`
- padding `12–16px`
- border silver thin
- section title อยู่บน panel เดียวกัน

## 13.2 Header
- icon crown / room icon = gold
- title = white, weight 700
- chevron right = gold-light

## 13.3 Room Cards
- 2 columns mobile
- gap `8–10px`
- radius `10–12px`
- live image upper section
- meta strip middle
- bead/roadmap lower section

## 13.4 Pagination
- active dot gold
- inactive dot dark gray
- centered

---

# 14. Search Bar

- height `44–48px`
- radius `14–16px`
- surface dark
- border default
- icon gray-light
- placeholder muted
- focus = border stronger + very soft gold ring

```css
.search-field:focus-within {
  border-color: rgba(230,194,96,.65);
  box-shadow: 0 0 0 2px rgba(230,194,96,.10);
}
```

---

# 15. Game Lobby Layout — Mobile Signature

ส่วนนี้เป็นเอกลักษณ์สำคัญของภาพอ้างอิง

```txt
┌──────────┬──────────────────────────────┐
│ Category │ Game Tabs                   │
│  Rail    ├──────────────────────────────┤
│          │ Game Cards                  │
│          │                              │
└──────────┴──────────────────────────────┘
```

## 15.1 Category Rail
- width `72–84px`
- vertically stacked
- gap `6–8px`
- active item = gold
- inactive = dark graphite
- icon top + label below
- min height per item `64–72px`

## 15.2 Game Content
- flexible width
- left gap `8–10px`

## 15.3 Game Tabs
- segmented pill control
- 3 tabs
- container dark
- active tab gold
- radius full
- tab height `38–44px`

## 15.4 Game Cards
- image poster ratio `3:4`
- radius `12px`
- show ~2.3–3 cards depending viewport
- horizontal scroll or compact grid
- no outer gold border
- tags at top-left
- heart top-right
- player count bottom

---

# 16. Game Card

```css
.game-card {
  position: relative;
  aspect-ratio: 3 / 4;
  border-radius: 12px;
  overflow: hidden;
  background: var(--surface-3);
  box-shadow: 0 4px 14px rgba(0,0,0,.28);
}

.game-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

## 16.1 Tags
- HOT = red
- NEW = green
- ไม่ recolor ให้เป็น gold เพราะเป็น status language

## 16.2 Favorite
- circular dark translucent button
- white stroke heart
- selected = gold fill

## 16.3 Player Count
- dark translucent capsule
- text white / muted
- `font-variant-numeric: tabular-nums`

---

# 17. Floating Controls

## 17.1 Chat / Contact
- position fixed right
- ไม่ทับ game CTA
- dark panel
- border metallic
- active icon gold

## 17.2 Theme control
ถ้ายังต้องมี:
- ไม่ควรเด่นกว่าคอนเทนต์
- diameter 36–40px
- neutral dark

---

# 18. Bottom Navigation — LOCKED

## 18.1 Composition
5 items:
1. หน้าหลัก
2. เล่นเกม
3. ฝาก/ถอน (center action)
4. โปรโมชั่น
5. โปรไฟล์

## 18.2 Shell
- fixed bottom
- height `72–84px`
- dark gradient
- top border subtle
- background nearly opaque
- `backdrop-filter` ใช้เบามากหรือไม่ใช้

## 18.3 Standard item
- icon 24–28px
- label 11–13px
- inactive = muted gray / warm white

## 18.4 Selected item
- gold tile / gold button
- dark foreground
- radius `12–14px`

## 18.5 Center Wallet Action
- raised circular / medallion treatment
- gold coin feel
- สามารถยกขึ้น `8–14px`
- ห้ามใช้ glow แรงจนลอยผิดระบบ

---

# 19. Icons

## 19.1 Style
- simple 2D / light 3D metallic
- visual weight เท่ากัน
- gold only for active / important
- inactive icon = off-white / gray

## 19.2 ห้าม
- icon neon
- inner glow หนัก
- icon คนละ perspective
- icon หนา/บางปะปน

---

# 20. Shadows & Bevel

## 20.1 Standard card
```css
--shadow-card:
  0 5px 18px rgba(0,0,0,.30);
```

## 20.2 Raised action
```css
--shadow-action:
  inset 0 1px 0 rgba(255,255,255,.75),
  inset 0 -1px 0 rgba(104,67,13,.30),
  0 4px 12px rgba(0,0,0,.35);
```

## 20.3 Dark inset
```css
--shadow-dark-control:
  inset 0 1px 0 rgba(255,255,255,.08),
  inset 0 -8px 18px rgba(0,0,0,.18),
  0 3px 10px rgba(0,0,0,.30);
```

---

# 21. Responsive Rules

## Mobile Base
`360–430px`
- exact reference layout
- left category rail + game content
- fixed bottom nav

## Small Tablet `sm: 640px`
- content max-width can increase
- game cards 3–4 visible
- room cards stay 2–3 cols

## Tablet `md: 768px`
- hero grows
- promos retain visual ratio
- game lobby can widen rail to 90px

## Desktop `lg: 1024px+`
- page centered in max-width container
- optional secondary side content
- bottom nav can transform into persistent side/top navigation only if product requirement demands
- visual language must stay the same

---

# 22. Tailwind v4 Theme Tokens

```css
@import "tailwindcss";

@theme {
  --color-surface-0: #08090a;
  --color-surface-1: #0d0f10;
  --color-surface-2: #121416;
  --color-surface-3: #181b1d;
  --color-surface-4: #202326;
  --color-surface-5: #2a2e31;

  --color-gold-50: #fff8dc;
  --color-gold-100: #f8e7ae;
  --color-gold-200: #edcf7b;
  --color-gold-300: #dfb451;
  --color-gold-400: #c89432;
  --color-gold-500: #a87320;

  --color-ui-text: #f7f7f4;
  --color-ui-muted: #898d91;
}
```

---

# 23. Recommended CSS Utilities

```css
@utility surface-panel {
  background:
    linear-gradient(180deg, #171a1c 0%, #0e1011 100%);
  border: 1px solid rgba(214,217,220,.32);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.07),
    0 8px 24px rgba(0,0,0,.25);
}

@utility surface-control {
  background:
    linear-gradient(180deg, #202326 0%, #111315 100%);
  border: 1px solid rgba(214,217,220,.30);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.08),
    0 3px 10px rgba(0,0,0,.28);
}

@utility gold-fill {
  background:
    linear-gradient(
      180deg,
      #fff7d8 0%,
      #f4dda0 18%,
      #e9c96c 48%,
      #d6a943 72%,
      #f2d46f 100%
    );
}

@utility gold-text {
  background: linear-gradient(180deg, #fff6cf 0%, #d5a844 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

---

# 24. Component Mapping

```txt
components/
├─ layout/
│  ├─ AppShell.tsx
│  ├─ TopHeader.tsx
│  ├─ WalletActionRow.tsx
│  ├─ AnnouncementTicker.tsx
│  ├─ BottomNavigation.tsx
│  └─ FloatingControls.tsx
│
├─ home/
│  ├─ HeroCarousel.tsx
│  ├─ PromoGrid.tsx
│  ├─ PopularRooms.tsx
│  ├─ SearchGameInput.tsx
│  ├─ GameLobby.tsx
│  ├─ CategoryRail.tsx
│  ├─ GameTabs.tsx
│  └─ GameCard.tsx
│
├─ wallet/
│  ├─ WalletSummary.tsx
│  ├─ DepositButton.tsx
│  └─ WithdrawButton.tsx
│
└─ ui/
   ├─ GoldButton.tsx
   ├─ DarkButton.tsx
   ├─ MetallicPanel.tsx
   ├─ IconButton.tsx
   └─ SegmentedTabs.tsx
```

---

# 25. Motion System

## 25.1 Principle
Motion ต้องทำให้ UI ดู responsive ไม่ใช่ flashy

```css
:root {
  --motion-instant: 90ms;
  --motion-fast: 160ms;
  --motion-base: 240ms;
  --motion-slow: 340ms;

  --ease-out: cubic-bezier(.22,1,.36,1);
  --ease-spring: cubic-bezier(.34,1.56,.64,1);
}
```

## 25.2 Allowed
- press scale `.98`
- tab active slide
- card lift `-3px`
- icon active scale `1.06`
- modal fade + scale
- bottom sheet slide
- hero crossfade
- ticker marquee

## 25.3 Avoid
- continuous glow pulse หลายจุด
- animated border ทุก card
- particle background
- parallax
- scroll hijacking
- large blur animation

## 25.4 Reduced Motion
ต้องรองรับ:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: .001ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: .001ms !important;
  }
}
```

---

# 26. Migration Guide — ปรับจาก design เดิม

ส่วนนี้เป็นสิ่งที่ต้องเปลี่ยนจากไฟล์ design เดิมเพื่อให้ตรงภาพ Locked Design

## 26.1 เปลี่ยนแนวคิด Card
**เดิม:** Borderless / Thrill-inspired  
**ใหม่:** Controlled Metallic Border + Glossy Dark Surface

Action:
- เพิ่ม border 1px แบบ silver neutral
- เพิ่ม inset top highlight
- ลด shadow glow
- ใช้ gradient เฉพาะ dark tonal gradient

## 26.2 Theme Accent
**เดิม:** Deep Yellow / Amber  
**ใหม่:** Warm Metallic Gold

Action:
- ลดความเหลืองสด
- เพิ่ม cream-gold highlight
- ใช้ dark bronze ในขอบล่าง
- ไม่ใช้ `#f9c93c` เป็นสี fill หลักทุกจุด

## 26.3 Layout
**เดิม:** desktop/category-nav-first layout  
**ใหม่:** locked mobile app shell

Action:
- Header = Wallet + Center Logo + Actions
- เพิ่ม Wallet Action Row “ฝาก/ถอน”
- ticker อยู่ก่อน hero
- promos 3 ช่อง
- popular rooms 2 คอลัมน์
- game lobby = vertical category rail + game content
- bottom nav = fixed 5 items

## 26.4 Game Card
**เดิม:** radius 16px / hover lift มาก  
**ใหม่:** radius 12px / compact

Action:
- ลด radius
- ลด shadow
- image เป็นพระเอก
- overlay controls เล็กและชัด

## 26.5 Surface
**เดิม:** solid matte graphite  
**ใหม่:** graphite + subtle glossy tonal gradient

Action:
- ใช้ gradient 2–3 stop ที่ค่าความสว่างใกล้กัน
- ห้าม gradient มีสีม่วง/น้ำเงิน

## 26.6 Active State
ทุก active state ต้องใช้ gold system เดียวกัน:
- ฝาก
- game tab active
- category active
- selected bottom nav
- focus highlight สำคัญ

---

# 27. Implementation Priority

## Phase 1 — Visual Foundation
- [ ] Update tokens
- [ ] Remove purple/burgundy remnants
- [ ] Create gold gradient utility
- [ ] Create metallic dark panel utility
- [ ] Standardize radius
- [ ] Standardize borders/shadows

## Phase 2 — Locked Mobile Shell
- [ ] TopHeader
- [ ] WalletActionRow
- [ ] AnnouncementTicker
- [ ] HeroCarousel
- [ ] PromoGrid
- [ ] PopularRooms
- [ ] SearchGameInput
- [ ] GameLobby + CategoryRail
- [ ] BottomNavigation

## Phase 3 — Interaction
- [ ] Active tabs slide
- [ ] horizontal swipe game cards
- [ ] hero swipe
- [ ] ticker pause
- [ ] modal/bottom sheet motion
- [ ] reduced motion

## Phase 4 — QA
- [ ] 360px
- [ ] 375px
- [ ] 390px
- [ ] 414px
- [ ] 430px
- [ ] iOS safe area
- [ ] Android browser bottom bar
- [ ] no horizontal overflow
- [ ] active gold consistency
- [ ] no purple surface

---

# 28. Visual QA Checklist — ต้องผ่านก่อน Merge

## Color
- [ ] Background เป็นดำ/Graphite จริง
- [ ] ไม่มีม่วงปนใน surface
- [ ] Gold ไม่สดเป็น yellow neon
- [ ] Border เป็น metallic neutral

## Hierarchy
- [ ] Deposit ชัดที่สุดใน action row
- [ ] Hero เด่นกว่า promo
- [ ] Section title อ่านง่าย
- [ ] Game artwork เด่นกว่ากรอบ

## Density
- [ ] ช่องว่างไม่เยอะเกิน reference
- [ ] UI compact แต่ไม่อึดอัด
- [ ] Bottom nav ไม่กินพื้นที่มากเกินไป

## Effects
- [ ] ไม่มี glow รอบทุก card
- [ ] inset highlight เบา
- [ ] shadow ไม่ฟุ้งเกิน
- [ ] gold selected state เด่นแต่ไม่แสบตา

## Mobile
- [ ] touch target ≥ 40px
- [ ] fixed nav ไม่ทับ content
- [ ] category rail กดง่าย
- [ ] game cards swipe ได้
- [ ] safe-area ถูกต้อง

---

# 29. Source of Truth Summary

```txt
PHANTOM Locked Theme
────────────────────────────────
Canvas        = Near-black
Surface       = Graphite layers
Border        = Thin metallic silver
Accent        = Warm metallic gold
Text          = Warm white / cool gray
Radius        = 10–20px
Depth         = Soft shadow + inset highlight
Glow          = Minimal
Cards         = Compact
Layout        = Mobile app shell
Bottom Nav    = Fixed 5-item navigation
Category      = Vertical rail
Game Area     = Tabs + compact poster cards
────────────────────────────────
```

> **Rule:** หาก implementation ใหม่ดู “สว่างกว่า / ม่วงกว่า / neon กว่า / borderless กว่า” ภาพอ้างอิง ให้ถือว่าผิด direction และต้องกลับมาเทียบ Design Lock นี้ก่อน merge

---

# 30. Example Root Styles

```css
html,
body {
  background: var(--surface-0);
  color: var(--text-primary);
}

body {
  min-height: 100dvh;
  background:
    radial-gradient(
      circle at 50% -10%,
      rgba(255,255,255,.035),
      transparent 34%
    ),
    linear-gradient(
      180deg,
      #0d0f10 0%,
      #08090a 100%
    );
}

.app-shell {
  min-height: 100dvh;
  padding-bottom: calc(82px + env(safe-area-inset-bottom));
}

@media (min-width: 768px) {
  .app-shell {
    max-width: 1180px;
    margin: 0 auto;
  }
}
```

---

# 31. Final Rule for AI / Designer / Developer

เมื่อสร้างหน้าหรือ component ใหม่ ให้ถาม 5 ข้อนี้ก่อน:

1. Surface เป็น **Graphite Black** หรือยัง?
2. Gold ถูกใช้เป็น **accent** ไม่ใช่ background หลักทั้งหน้าหรือยัง?
3. Border บางแบบ metallic และ shadow นุ่มหรือยัง?
4. Component density ใกล้ภาพ Locked Design หรือยัง?
5. Mobile 390px ยังสมดุลและกดง่ายหรือยัง?

ถ้าคำตอบข้อใดข้อหนึ่งคือ “ไม่” ให้แก้ก่อนส่งงาน
