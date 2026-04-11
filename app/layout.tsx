import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackgroundPattern from "@/components/BackgroundPattern";
import SessionGuard from "@/components/SessionGuard";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "敏盛I社區醫學管理平台",
  description: "社區醫學業務整合管理系統 — 居家失能、出院準備、四癌篩檢、轉診中心與健康促進",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-Hant"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white">
        <SessionGuard>
          <BackgroundPattern />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </SessionGuard>
      </body>
    </html>
  );
}
