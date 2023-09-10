import Header from "@/components/Header";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "@/components/NavBar";
import { NextAuthProvider } from "./NextAuthProvider";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mon Foot",
  description: "Mon App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <NextAuthProvider>
        <body className={inter.className}>
          <Header />
          <Suspense fallback={<p>Loading ...</p>}>{children}</Suspense>

          <NavBar />
        </body>
      </NextAuthProvider>
    </html>
  );
}
