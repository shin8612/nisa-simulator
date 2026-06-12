import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "新NISAかんたん積立シミュレーター",
  description: "毎月の積立額・想定利回り・積立年数から将来の資産額をかんたん試算できます。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
