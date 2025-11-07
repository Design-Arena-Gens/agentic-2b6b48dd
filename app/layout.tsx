import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Лучшие VoIP сервисы",
  description:
    "Подборка лучших во всём мире VoIP платформ для бизнеса, поддержки клиентов и командной работы."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${inter.variable}`}>
      <body className="bg-night text-slate-100 antialiased">{children}</body>
    </html>
  );
}
