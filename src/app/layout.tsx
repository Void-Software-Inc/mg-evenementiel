import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/global/Navbar";
import { CartProvider } from "@/app/context/CartContext";
import { Toaster } from "@/components/ui/sonner"
import Footer from "@/components/global/Footer";
import CookieConsent from "@/components/global/CookieConsent";
import ClientMessage from "@/components/global/ClientMessage";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MG Événementiel - Location de Matériel et Mobilier pour Événements dans le Sud de la France",
  description: "Découvrez MG Événementiel, experts en location de mobilier et matériel pour réceptions dans le Sud de la France. Service rapide et fiable, basé à Toulouse, dans le 31.",
  icons: [
    { rel: 'icon', url: '/favicon_io/favicon.ico' },
    { rel: 'apple-touch-icon', sizes: '180x180', url: '/favicon_io/apple-touch-icon.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', url: '/favicon_io/favicon-32x32.png' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', url: '/favicon_io/favicon-16x16.png' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <title>MG Événements</title>
        
        <meta property="og:description" content="Réalisez vos événements avec des produits de qualité et un service impeccable." />
        <meta property="og:image" content="/path/to/og-image.jpg" />
        <meta property="og:url" content="https://www.mgevénementiel.com" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.mgevenements.com" />
        <link rel="icon" href="/favicon_io/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon_io/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon_io/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon_io/favicon-16x16.png" />
        <link rel="manifest" href="/favicon_io/site.webmanifest" />
      </head>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <CartProvider>
          <Navbar />
          <CookieConsent />
          <ClientMessage />
          <Toaster position="bottom-left" />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}