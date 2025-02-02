// app/layout.tsx
import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
import "./globals.css";
import { StarknetProvider } from "@/components/StarknetProvider";

const pixelFont = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
});

export const metadata: Metadata = {
  title: "STARKicks",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${pixelFont.variable}`}>
      <body className="antialiased bg-slate-500">
        <StarknetProvider>{children}</StarknetProvider>
      </body>
    </html>
  );
}
