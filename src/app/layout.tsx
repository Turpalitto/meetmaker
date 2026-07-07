import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Golos_Text } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

// Редизайн «Тёплая бумага»: единый гротеск с полной кириллицей.
// Одна переменная используется и для дисплейных заголовков, и для UI —
// в globals.css --font-display и --font-ui указывают на неё же.
const golos = Golos_Text({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-golos",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "MeetMaker — приглашение с душой",
    template: "%s · MeetMaker",
  },
  description:
    "Создайте личную открытку-приглашение на встречу: свидание, кофе или прогулку. Тёплое «да» вместо сухого сообщения.",
  applicationName: "MeetMaker",
  openGraph: {
    title: "MeetMaker — приглашение с душой",
    description: "Личная открытка-приглашение на встречу: свидание, кофе или прогулка.",
    type: "website",
    locale: "ru_RU",
  },
};

export const viewport: Viewport = {
  themeColor: "#FBF2E9",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" data-theme="romantic" className={golos.variable}>
      <body className="antialiased">
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
