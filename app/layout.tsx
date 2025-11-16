import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {Navbar} from "./components/Navbar";
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DealHawk",
  description: "DealHawk - Find the best deals and save money",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          <Navbar/>
        <div className="max-w-10xl mx-auto">
        {children}
        </div>
        <Toaster />
        </main>
        </body>
    </html>
  );
}