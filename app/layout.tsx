import "./globals.css";
import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { site } from "@/lib/site";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import { ThemeProvider } from "next-themes";
import Backdrop from "@/components/Backdrop";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk" });

export const metadata: Metadata = {
  title: site.meta.title,
  description: site.meta.description,
  icons: [{ rel: "icon", url: "/icon-192.png" }],
  manifest: "/manifest.webmanifest",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0B0B0C" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0B0C" }
  ],
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "Dudester" },
  openGraph: {
    title: site.meta.title,
    description: site.meta.description,
    type: "website",
    url: "https://dudester.xyz"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${grotesk.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Backdrop />
          {/* Hide chrome on login route via CSS targeting; middleware ensures lock-out elsewhere */}
          <Header />
          <main className="min-h-[calc(100dvh-4rem)]">{children}</main>
          <Footer />
          <BottomNav />
        </ThemeProvider>
      </body>
    </html>
  );
}


