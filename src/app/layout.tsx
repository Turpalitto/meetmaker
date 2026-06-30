import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "MeetMaker — Договориться о встрече красиво",
  description:
    "Самый красивый способ договориться о встрече. Отправьте открытку вместо переписки.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`dark ${inter.variable}`}>
      <body
        className={`${inter.className} min-h-screen bg-black antialiased`}
      >
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
