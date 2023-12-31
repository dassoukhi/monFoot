import Header from "@/components/Header";
import "./globals.css";
import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import { NextAuthProvider } from "./NextAuthProvider";
import { Suspense } from "react";
import SideBarProvider from "@/context/SideBarContext";
import LoaderCercle from "@/components/LoaderCercle";

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
      <SideBarProvider>
        <NextAuthProvider>
          <body>
            <Header />
            <Suspense fallback={<LoaderCercle />}>{children}</Suspense>

            <NavBar />
          </body>
        </NextAuthProvider>
      </SideBarProvider>
    </html>
  );
}
