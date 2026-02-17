import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Buy Aged Instagram Accounts (2010-2026) | OGE & 2FA Verified",
  description: "Premium aged social media accounts for IG, Threads, X, and TikTok. Secure delivery via Telegram @luke_of. Crypto & Wise accepted.",
};

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LiveActivity } from "@/components/LiveActivity";
import { MobileStickyCTA } from "@/components/MobileStickyCTA";
import { AnnouncementBar } from "@/components/AnnouncementBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0B0B0B] text-white`}
      >
        <AnnouncementBar />
        <Header />
        <main>{children}</main>
        <LiveActivity />
        <MobileStickyCTA />
        <Footer />
      </body>
    </html>
  );
}
