import Header from "@/components/Header";
import "./globals.css";
import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import { NextAuthProvider } from "./NextAuthProvider";
import { Suspense } from "react";

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
      <head>
        <link rel="manifest" href="/public/manifest.json" />
      </head>
      <NextAuthProvider>
        <body>
          <Header />
          <Suspense fallback={<p>Loading ...</p>}>{children}</Suspense>

          <NavBar />
        </body>
      </NextAuthProvider>
    </html>
  );
}
