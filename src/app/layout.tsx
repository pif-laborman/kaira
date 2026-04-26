import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Kaira - The Intelligent Yoga Experience That Adapts to You",
  description: "Build custom yoga sequences with smart suggestions. Get guided through them with voice, gongs, or video. Practice your way.",
  openGraph: {
    title: "Kaira - Your Practice, Your Flow",
    description: "The intelligent yoga app that adapts to how you practice.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
