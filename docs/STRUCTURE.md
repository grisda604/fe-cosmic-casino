# โครงสร้างโปรเจกต์ Next (Phantom)

UI/ลอจิกทั้งหมดพอร์ตมาจาก `lotto` แบบ 1:1 (ดู `docs/PORTED_FROM_LOTTO.md`) แล้วจัดโฟลเดอร์ใหม่ใต้ `src/`
alias `@/*` ชี้ไป `src/*`

```txt
src/
  app/                 # routes ล้วน ๆ (App Router): [lang]/..., api/, manifest, sw, globals.css
  components/
    ui/                # primitive ใช้ร่วม: OverlayPanel, SoftDialog, TabPanelTransition, ...
    layout/            # shell: HeaderBar, SubPageShell, FloatingActions, ...
    providers/         # AppProviders
    auth/  wallet/  coupon/  menu/  notifications/  i18n/  theme/  pwa/  hub/   # ส่วนร่วมทั้งเว็บ
    features/          # หนึ่งโฟลเดอร์ต่อหนึ่งฟีเจอร์/หน้า
      home/  lobby/  lottery/  vip/  promotions/  activities/  cashback/
      gems-store/  missions/  profile/  referral/  reward/  transactions/  wheel/  game/
  context/             # React context ระดับแอป
  hooks/               # custom hooks (+ hooks/api)
  data/                # mock data
  types/               # type ของโดเมน
  lib/                 # api, auth, domain, i18n (+ messages), lottery, promotions, server, utils
  styles/              # global CSS (theme, motion, lottery, lobby, ...)
  proxy.ts             # i18n/auth proxy (Next 16)
  legacy/              # โคลน PHANTOM เดิม (HTML dump + route stub) — ไม่ถูก route, ไม่ผ่าน tsc/eslint
public/                # asset (ของ lotto + _nuxt/phantom ของโคลนเดิม)
scripts/               # dev-login, sync:* (ของโคลนเดิม ชี้ไป src/legacy แล้ว)
design.md              # สเปก design หลักของ Phantom
```

## กติกา
- หน้าใน `app/` ต้องบาง: import เนื้อหาจาก `components/features/<ฟีเจอร์>/`
- ของที่ใช้หลายฟีเจอร์ → `components/ui|layout|<ส่วนร่วม>`; ของเฉพาะฟีเจอร์ → ในโฟลเดอร์ฟีเจอร์นั้น
- ห้าม import จาก `@/legacy/**` ในโค้ดหลัก
