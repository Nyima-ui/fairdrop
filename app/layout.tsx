import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/AuthContext";
import ToastProvider from "@/context/ToastContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FairDrop",
  description:
    "Track flight prices and get notified the moment fares drop. Book smarter, never overpay.",
  openGraph: {
    title: "FairDrop",
    description:
      "Track flight prices and get notified the moment fares drop. Book smarter, never overpay.",
    url: "https://fairdrop-sage.vercel.app/",
    siteName: "FairDrop",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FairDrop",
    description:
      "Track flight prices and get notified the moment fares drop. Book smarter, never overpay.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased font-inter text-foreground bg-background px-5 md:px-10 lg:px-20 pt-7.5`}
      >
        <ToastProvider>
          <AuthProvider>{children}</AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
