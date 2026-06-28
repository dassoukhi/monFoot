import Header from "@/components/Header";
import "./globals.css";
import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import { NextAuthProvider } from "./NextAuthProvider";
import { Suspense } from "react";
import SideBarProvider from "@/context/SideBarContext";
import { ThemeProvider } from "@/context/ThemeContext";
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
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme') ||
                  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                document.documentElement.classList.add(theme);
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <ThemeProvider>
          <SideBarProvider>
            <NextAuthProvider>
              <Header />
              <Suspense fallback={<LoaderCercle />}>{children}</Suspense>
              <NavBar />
            </NextAuthProvider>
          </SideBarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
