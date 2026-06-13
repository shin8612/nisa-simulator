import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "新NISA・FIREかんたん診断",
  description: "新NISAとFIRE達成時期を無料でシミュレーション",
  verification: {
    google: "4mfPsiXloyMo4UvTZGjtp-OSfa9lTliLRGTUsZliMWQ",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}