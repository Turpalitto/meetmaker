import type { Metadata } from "next";
import { Nunito, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const nunito = Nunito({
  subsets: ["latin", "cyrillic"],
  variable: "--font-nunito",
});

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "MeetMaker — Красивое приглашение на встречу",
  description:
    "Отправь открытку-приглашение вместо переписки. Романтично, уютно, без неловких вопросов.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`dark ${nunito.variable} ${playfair.variable}`}>
      <body className="min-h-screen antialiased font-sans bg-mm-base text-white">
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
