"use client";

import * as Popover from "@radix-ui/react-popover";
import { CalendarDays } from "lucide-react";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { enUS, th } from "date-fns/locale";
import { useLocale } from "@/lib/i18n/navigation";
import { cn } from "@/lib/utils";

type AppDatePickerProps = {
  /** วันที่ที่เลือก (null = ยังไม่เลือก) */
  value: Date | null;
  onChange: (date: Date) => void;
  min?: Date;
  max?: Date;
  ariaLabel?: string;
  placeholder?: string;
  className?: string;
};

/**
 * Date picker แบบ shadcn/ui (Popover + react-day-picker) — แทน <input type="date"> เนทีฟ
 * สีธีมเดียวกับ AppSelect · วันที่เลือกใช้ `--ui-theme`
 */
export function AppDatePicker({ value, onChange, min, max, ariaLabel, placeholder, className }: AppDatePickerProps) {
  const [open, setOpen] = useState(false);
  const locale = useLocale();
  const dfLocale = locale === "th" ? th : enUS;
  const label = value
    ? value.toLocaleDateString(locale === "th" ? "th-TH" : "en-GB", { day: "2-digit", month: "short", year: "numeric" })
    : (placeholder ?? "");
  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger
        aria-label={ariaLabel}
        className={cn(
          "app-select-trigger flex h-10 w-full min-w-0 items-center justify-between gap-2 rounded-[var(--radius-soft-sm)] px-3 text-left text-sm text-[var(--text-on-light)] outline-none",
          className,
        )}
      >
        <span className="min-w-0 flex-1 truncate">{label}</span>
        <CalendarDays className="h-4 w-4 shrink-0 opacity-70" aria-hidden />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          sideOffset={6}
          collisionPadding={12}
          align="start"
          className="app-select-content app-datepicker z-[200] rounded-[16px] p-3"
        >
          <DayPicker
            mode="single"
            locale={dfLocale}
            selected={value ?? undefined}
            defaultMonth={value ?? max ?? undefined}
            disabled={[...(min ? [{ before: min }] : []), ...(max ? [{ after: max }] : [])]}
            onSelect={(date) => {
              if (!date) return;
              onChange(date);
              setOpen(false);
            }}
            showOutsideDays
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
