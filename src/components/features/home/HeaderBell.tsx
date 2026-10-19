"use client";

import { NotificationBellButton } from "@/components/notifications/NotificationBellButton";
import { useNotifications } from "@/components/notifications/NotificationProvider";

/** กระดิ่งแจ้งเตือนใน header มือถือ — กดแล้วเปิด bottom sheet การแจ้งเตือน */
export function HeaderBell() {
  const { openNotifications } = useNotifications();
  return <NotificationBellButton onClick={openNotifications} className="header-bell" />;
}
