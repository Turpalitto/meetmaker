import type { Metadata, Viewport } from "next";
import { Playfair_Display, Roboto } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const roboto = Roboto({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "MeetMaker — Приглашение на встречу",
  description:
    "Создай красивую открытку-приглашение. Получатель сам выберет дату, время и место.",
};

export const viewport: Viewport = {
  themeColor: "#FFF8F5",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`postcard-app material-app ${roboto.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <body
        className="min-h-screen antialiased bg-mm-base text-mm-primary md-body font-sans"
        suppressHydrationWarning
      >
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
