"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/** Radix ไม่รับค่าว่าง ("") เป็น value ของ item → map เป็น sentinel ภายในเท่านั้น (ค่าที่ส่งออกยังเป็น "" ตามเดิม) */
const EMPTY = "__empty__";

export type AppSelectOption = { value: string; label: string };

type AppSelectProps = {
  value: string;
  onValueChange: (value: string) => void;
  options: AppSelectOption[];
  ariaLabel?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
};

/**
 * Select แบบ shadcn/ui (Radix) — แทน <select> เนทีฟ: ปุ่มพื้นทึบตามธีม ไม่มีเส้นขอบ/เงา · เมนูเป็นการ์ดโค้งมน
 * รายการที่เลือกใช้สีธีม (`--ui-theme`) · portal ที่ z-[200] เหนือ dialog/sheet ทั้งหมด
 */
export function AppSelect({ value, onValueChange, options, ariaLabel, placeholder, className, disabled }: AppSelectProps) {
  const toInner = (v: string) => (v === "" ? EMPTY : v);
  const toOuter = (v: string) => (v === EMPTY ? "" : v);
  return (
    <SelectPrimitive.Root value={toInner(value)} onValueChange={(v) => onValueChange(toOuter(v))} disabled={disabled}>
      <SelectPrimitive.Trigger
        aria-label={ariaLabel}
        className={cn(
          "app-select-trigger flex h-10 w-full min-w-0 items-center justify-between gap-2 rounded-[var(--radius-soft-sm)] px-3 text-left text-sm text-[var(--text-on-light)] outline-none",
          "disabled:opacity-50",
          className,
        )}
      >
        <span className="min-w-0 flex-1 truncate">
          <SelectPrimitive.Value placeholder={placeholder} />
        </span>
        <SelectPrimitive.Icon asChild>
          <ChevronDown className="h-4 w-4 shrink-0 opacity-70" aria-hidden />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          sideOffset={6}
          collisionPadding={12}
          className="app-select-content z-[200] max-h-[min(320px,var(--radix-select-content-available-height))] min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-[14px] p-1.5"
        >
          <SelectPrimitive.Viewport className="max-h-[inherit] overflow-y-auto">
            {options.map((option) => (
              <SelectPrimitive.Item
                key={toInner(option.value)}
                value={toInner(option.value)}
                className="app-select-item relative flex min-h-9 cursor-pointer select-none items-center rounded-[10px] py-1.5 pl-3 pr-8 text-sm outline-none"
              >
                <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator className="absolute right-2.5 inline-flex">
                  <Check className="h-4 w-4" aria-hidden />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}
