import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const serif = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vee’s Bite & Events Center | Tema, Ghana",
  description:
    "Tema's premier destination for delicious authentic Ghanaian dining and memorable events. Signature Jollof, Banku & Tilapia, event hall and garden venue bookings.",
  keywords: [
    "Vees Bite",
    "Events Center Tema",
    "Ghana Restaurant",
    "Tema Food Delivery",
    "Jollof Rice Tema",
    "Wedding Venue Tema",
    "Banku and Tilapia",
    "Tema Catering",
  ],
  authors: [{ name: "Vee’s Bite & Events Center" }],
  openGraph: {
    title: "Vee’s Bite & Events Center | Restaurant & Venue",
    description: "Authentic Ghanaian culinary excellence and grand event celebrations in Tema, Ghana.",
    images: ["/images/hero.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} dark h-full`}>
      <body className="min-h-full flex flex-col bg-brand-dark text-gray-100 font-sans selection:bg-brand-gold selection:text-brand-dark antialiased">
        <CartProvider>
          <Navbar />
          <CartDrawer />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
