import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "WoW Dashboard | Azure Protocol",
    template: "%s | Azure Protocol"
  },
  description: "Plateforme premium de suivi World of Warcraft. Analyse de performance Mythic+, collections de montures et actualités Azeroth.",
  keywords: ["World of Warcraft", "WoW", "Raider.io", "Mythic Plus", "Azure Protocol", "Moussman", "Mamènne"],
  openGraph: {
    title: "WoW Dashboard | Azure Protocol",
    description: "Plateforme premium de suivi World of Warcraft.",
    type: "website",
    locale: "fr_FR",
    siteName: "WoW Dashboard",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <body className={inter.className}>
        {/* Global Video Background */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-20 grayscale brightness-50"
          >
            <source src="/videofond.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/60" />
          <div className="noise-overlay" />
        </div>

        <SmoothScroll>
          <main className="relative z-10">{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}
