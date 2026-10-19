import type { Metadata } from "next";
import { Inter, Noto_Sans_Thai } from "next/font/google";

import "./globals.css";
import "./styles/phantom-react.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  variable: "--font-noto-thai",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Phantom",
  description: "Casino & slots — Next.js",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body
        className={`${notoSansThai.className} ${inter.className} min-h-screen overflow-x-hidden antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
