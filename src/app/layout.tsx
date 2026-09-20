import type { Metadata } from "next";
import { Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-noto-arabic",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Registration Dashboard",
  description: "داشبۆردی تۆمارکردنی فێرخوازان",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Registration",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
  themeColor: "#f9fafb",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ku" dir="rtl">
      <body
        className={`${notoSansArabic.className} antialiased bg-gray-50`}
      >
        {children}
      </body>
    </html>
  );
}
