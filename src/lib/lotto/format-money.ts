const MONEY_FORMAT = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** ยอดเงินแสดงผล: คั่นหลักพันด้วย comma + ทศนิยม 2 ตำแหน่ง (12450 → "12,450.00") */
export function formatMoney(amount: number): string {
  return MONEY_FORMAT.format(Number.isFinite(amount) ? amount : 0);
}
