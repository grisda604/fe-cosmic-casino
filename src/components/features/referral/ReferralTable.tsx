import type { ReactNode } from "react";

type Row = { id: string; left: ReactNode; right: ReactNode };

type Props = {
  /** หัวตาราง [คอลัมน์ซ้าย, คอลัมน์ขวา] */
  head: readonly [string, string];
  rows: readonly Row[];
  caption: string;
};

/**
 * ตาราง 2 คอลัมน์ของหน้าแนะนำเพื่อน — แถวเรียบเต็มความกว้าง ไม่ใช้แคปซูล/การ์ดต่อแถว
 * แยกแถวด้วยสีพื้นสลับ (zebra) ไม่มีเส้นขอบ · ซ้าย = ข้อมูลหลัก · ขวา = ค่า/วันที่ ชิดขวา
 */
export function ReferralTable({ head, rows, caption }: Props) {
  return (
    <div className="overflow-hidden rounded-lg soft-panel-bg">
      <table className="w-full border-collapse text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="bg-[color-mix(in_srgb,var(--text-on-light)_9%,transparent)] text-xs text-[var(--text-muted)]">
            <th scope="col" className="px-3 py-2 text-left font-semibold">
              {head[0]}
            </th>
            <th scope="col" className="px-3 py-2 text-right font-semibold">
              {head[1]}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="even:bg-[color-mix(in_srgb,var(--text-on-light)_5%,transparent)]">
              <td className="max-w-0 truncate px-3 py-2.5 text-left font-semibold">{row.left}</td>
              <td className="whitespace-nowrap px-3 py-2.5 text-right text-xs tabular-nums text-[var(--text-muted)]">
                {row.right}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
