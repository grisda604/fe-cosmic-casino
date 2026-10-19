import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  // ไฟล์ glass ที่ก๊อปมามี eslint-disable เดิม — ไม่ต้องเตือนเมื่อปิดกฎด้านล่างแล้ว
  { linterOptions: { reportUnusedDisableDirectives: "off" } },
  ...nextVitals,
  ...nextTs,
  // ลิงก์/redirect ต้องผ่าน lib/i18n เพื่อให้ URL มี prefix ภาษาเสมอ
  {
    files: ["**/*.{ts,tsx}"],
    ignores: ["src/lib/i18n/**", "src/app/api/**", "src/components/features/home/**"],
    rules: {
      "@typescript-eslint/no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "next/link",
              message: "ใช้ Link จาก @/lib/i18n/navigation (เติม prefix ภาษาให้)",
              allowTypeImports: true,
            },
            {
              name: "next/navigation",
              importNames: ["useRouter", "usePathname", "redirect", "permanentRedirect"],
              message: "ใช้ตัวจาก @/lib/i18n/navigation หรือ @/lib/i18n/server",
            },
          ],
        },
      ],
    },
  },
  // ไฟล์ logic ที่ก๊อปจาก glass ตามเดิม (ห้าม refactor) — ปิดกฎ React Compiler / unused-vars เฉพาะไฟล์เหล่านี้
  {
    files: ["src/hooks/**", "src/data/**", "src/lib/api/**"],
    rules: {
      "react-hooks/refs": "off",
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/exhaustive-deps": "off",
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // build output ของ lottery kit และไฟล์ dump ชั่วคราว
    "exports/**",
    ".tmp-*",
    // สคริปต์สร้างธีมที่ copy จาก glass (CommonJS)
    "scripts/themes/**",
    // โคลน PHANTOM เดิม (ไม่ถูก route)
    "src/legacy/**",
  ]),
]);

export default eslintConfig;
