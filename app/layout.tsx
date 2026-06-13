import type { Metadata } from "next";
import Script from "next/script";
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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        {children}

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-6QCY0M8997"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-6QCY0M8997');
          `}
        </Script>
      </body>
    </html>
  );
}