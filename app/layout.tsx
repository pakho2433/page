import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mori Select｜生活選物店",
  description: "簡約、實用、為日常帶來質感的生活選物網店。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
