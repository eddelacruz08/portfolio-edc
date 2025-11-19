import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { QueryProvider } from "@/providers/query-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import LetterGlitch from "@/components/LetterGlitch";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Edmon Dela Cruz - Software Engineer",
  description: "Full-stack software engineer focused on building fast, accessible web applications with modern technologies.",
  keywords: ["software engineer", "web developer", "react", "nextjs", "typescript"],
  authors: [{ name: "Edmon Dela Cruz" }],
  openGraph: {
    title: "Edmon Dela Cruz - Software Engineer",
    description: "Full-stack software engineer portfolio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <QueryProvider>
            <LetterGlitch
              glitchSpeed={50}
              centerVignette={true}
              outerVignette={false}
              smooth={true}
            />
            <div className="relative flex min-h-screen flex-col">
              <Nav />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Analytics />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
