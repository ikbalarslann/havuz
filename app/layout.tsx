import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import "./globals.css";
import "@uploadthing/react/styles.css";
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Havuz ve Havuz",
    template: "%s | Havuz ve Havuz",
  },
  description: "Pool renting made easy",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={inter.className}>
          <Toaster />
          {children}
        </body>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-VXT78VLQC1"
        />
        <Script id="gtag">
          {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-VXT78VLQC1');`}
        </Script>
      </html>
    </SessionProvider>
  );
}
