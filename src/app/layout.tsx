// src/app/layout.tsx
import "./globals.css";
import React from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import { ME } from "@/config/constant";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RegisterSW from "@/hooks/RegisterSW";
import Analytics from "@/components/analytics/analytics";
import Script from "next/script";
import { ThemeProvider } from "next-themes";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#667eea",
};

export const metadata: Metadata = {
  metadataBase: new URL(ME.seo.siteUrl),
  title: ME.seo.title,
  keywords: ME.seo.keywords,
  description: ME.seo.description,
  authors: [{ name: ME.name }],
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    url: ME.seo.siteUrl,
    title: ME.seo.title,
    description: ME.seo.description,
    siteName: `${ME.name} Portfolio`,
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${ME.name} — ${ME.title}`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: ME.seo.title,
    description: ME.seo.description,
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={inter.className}>
        <RegisterSW />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />

        <Script id="ga-init" strategy="afterInteractive">
          {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
    `}
        </Script>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <Analytics />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
