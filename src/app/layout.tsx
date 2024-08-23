import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/global/Navbar";
import { CartProvider } from "@/app/context/CartContext";
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MG Événementiel",
  description: "Pouvoir réaliser vos événements avec des produits de qualité",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body className={inter.className}>
        <CartProvider>
          <Navbar />
          <Toaster position="bottom-right" />
          <section>
            {children}
          </section>
        </CartProvider>
      </body>
    </html>
  );
}
