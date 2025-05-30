import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AntdProvider from "@/components/providers/AntdProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "MANRELBDG - Manajemen Relawan Bandung",
  description: "Sistem Manajemen Relawan dan Pendukung Kampanye Bandung",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.variable} antialiased`}>
        <AntdProvider>
          {children}
        </AntdProvider>
      </body>
    </html>
  );
}
