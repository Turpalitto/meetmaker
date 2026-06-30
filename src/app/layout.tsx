import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "MeetMaker — Договориться о встрече красиво",
  description: "Самый красивый способ договориться о встрече. Отправьте открытку вместо переписки.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="dark">
      <body className="min-h-screen bg-black antialiased">
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}