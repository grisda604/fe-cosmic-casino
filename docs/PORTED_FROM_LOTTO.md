# พอร์ตจาก lotto → cas

- ต้นทาง: `../lotto` (working tree ณ 2026-10-20) — ไม่ copy `.env*`, `.next`, `node_modules`, `agent/`
- ชื่อแบรนด์ในข้อความ/ manifest / alt: `CM-SaturnLotto` → `Phantom` (ชื่อไฟล์/คอมโพเนนต์ `Lotto*` และชื่อธีม `cosmic` คงเดิมเพื่อให้ diff กับ lotto ตามง่าย)
- จัดโฟลเดอร์ใหม่ (ใช้สคริปต์เขียน import ใหม่ทั้งหมด): `app/components/*` + `components/*` → `components/{ui,layout,...}` และ `components/features/*`;
  `app/{data,hooks,types,lib,styles}` → `src/{data,hooks,types,lib,styles}`; `components/lotto` → `features/home`; `components/gaming` → `features/lobby`
- ตรวจแล้ว: `tsc` ผ่าน, `npm test` ผ่าน, eslint ไม่มี error, screenshot เทียบกับ lotto 8 หน้า × (390, 1280) ต่างกัน ≤ 0.03% ของพิกเซล
- ตั้งค่า: `next.config.ts`/`postcss`/`eslint` จาก lotto (ปรับ path ให้มี `src/`); โคลน PHANTOM เดิมย้ายไป `src/legacy/`
