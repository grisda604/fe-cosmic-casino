import Link from "next/link";

/** ปุ่มสมัครสมาชิกใต้ header (guest) */
export function GuestRegisterBar() {
  return (
    <div className="w-full bg-[#000000] px-4 pb-2 pt-0">
      <div className="mx-auto max-w-[var(--body-width,480px)]">
        <Link
          href="/login"
          className="flex h-11 w-full items-center justify-center rounded-[14px] border border-[#c89432] bg-gradient-to-b from-[#1a1810] to-[#0a0a0a] text-[15px] font-bold text-[var(--text-primary)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-transform active:scale-[0.99]"
        >
          สมัครสมาชิก
        </Link>
      </div>
    </div>
  );
}
