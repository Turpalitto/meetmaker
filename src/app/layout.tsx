import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "MeetMaker — красивые приглашения на встречу",
  description:
    "Создавай красивые интерактивные открытки-приглашения на встречу. Задавай даты, время и места — получатель выбирает удобный вариант.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body className="bg-slate-50 text-slate-900 antialiased">{children}</body>
    </html>
  );
}
