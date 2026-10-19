# โครงสร้างโปรเจกต์ Next (Phantom)

## หลักการ

- **Next.js App Router** เป็นตัว host ทุก URL
- **หนึ่ง route = หนึ่ง feature module** ใน `components/features/`
- **หน้า app** เป็น thin re-export เท่านั้น (`app/(site)/.../page.tsx`)
- Markup จาก dump อยู่ชั้น `components/legacy/` — ค่อยๆ แทนที่ด้วย React ใน feature เดียวกัน

## โฟลเดอร์

```txt
src/
  app/
    (site)/                 # เว็บหลัก (ทุกหน้าใน manifest)
      layout.tsx            # CSS ร่วม + theme-polish
      page.tsx              # → components/features/home/page.tsx
      bank/deposit/page.tsx # → components/features/bank/deposit/page.tsx
      [...slug]/page.tsx    # fallback + query variants
    styles/                 # CSS ของ React shell
    layout.tsx              # root html/body

  components/
    features/
      routes/               # หนึ่ง module ต่อหนึ่ง dump clone (fileKey)
        _root/page.tsx      # หน้า /
        profile/page.tsx
        bank_deposit/page.tsx
    layout/                 # React shell + WalletSummary ตาม design.md (ใช้เมื่อ migrate แล้ว)
    ui/                     # ปุ่ม, ไอคอน
    legacy/                 # NuxtClonePage, NuxtMarkupView (ชั่วคราว)

  lib/
    phantom-clone.ts        # แมป route → fileKey HTML
    generated/              # clone HTML, manifest (จาก sync:clones)

docs/                       # STRUCTURE.md, design-ctmx-legend-pro.md
design.md                   # สเปก design หลัก (อ้างโดย .cursor/rules และ skills)

public/
  _nuxt/                  # asset/CSS จาก dump (จนกว่าจะตัดออก)
  phantom/                # inline + theme-polish

scripts/
  sync-phantom-from-dump.mjs
  sync-clone-routes.mjs
  sync-site-structure.mjs # สร้าง components/features/routes/* + app/(site)/*
```

## คำสั่ง

```bash
pnpm run sync:all   # phantom assets + clones + site structure
```

## การ migrate หน้าเป็น React จริง

**หน้าแรก `/`:** copy 1:1 จาก [ptmx-app.web.app](https://ptmx-app.web.app/) → `clones/_root.html` ผ่าน `PtmxHomePage` (`@copied-from-ptmx`)

**React prototype (design.md):** ยังอยู่ที่ `components/features/home/HomePage.tsx` ใช้เมื่อ migrate จริงทีหลัง

1. แก้ `components/features/routes/<fileKey>/page.tsx` — ใส่ `@migrated-site-feature` แล้ว `sync:site` จะไม่ทับ
2. ประกอบจาก `components/layout` + `components/features/<domain>/`
2. ลบ stylesheet link ที่ไม่ใช้ใน feature
3. อ้างอิง `design.md` §24
