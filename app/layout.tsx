import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextAuthProvider } from "./provider/NextAuthProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | RPG",
    default: "RPG"
  },
  description: "自分の人生の経験値を可視化してみよう！： Visualize your life experiences!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NextAuthProvider>
      <html lang="ja">
        <body className={inter.className}>{children}</body>
      </html>
    </NextAuthProvider>
  );
}
