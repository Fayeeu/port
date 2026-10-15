import type { Metadata } from "next";
import { Inter, Mali, Noto_Sans_Thai_Looped } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SmoothScroll } from "@/components/smooth-scroll";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const thai = Noto_Sans_Thai_Looped({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-thai",
});

const mali = Mali({
  subsets: ["thai", "latin"],
  weight: ["500", "600", "700"],
  variable: "--font-mali",
});

export const metadata: Metadata = {
  title: "feye ==> เฟย์",
  description: "My personal website and blog. A place to share my thoughts, ideas, and projects;>",
  icons: {
    icon: "/avatar.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" className={`${inter.variable} ${thai.variable} ${mali.variable}`}>
      <body className="min-h-screen bg-paper text-ink selection:bg-ink selection:text-paper antialiased">
        <SmoothScroll>
          <SiteHeader />
          <main className="mx-auto w-full max-w-6xl px-4 pb-28 pt-16 sm:px-6 md:pb-16 md:pt-24 lg:px-8">
            {children}
          </main>
        </SmoothScroll>
      </body>
    </html>
  );
}
