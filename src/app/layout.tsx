import type { Metadata } from "next";
import { Bebas_Neue, Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Toaster } from "react-hot-toast";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CleanSchile — Detailing & Mantención Automotriz Premium",
  description:
    "Taller especializado en detailing y mantención automotriz en La Cisterna, Santiago. Protección cerámica, pulido, restauración de faros y más.",
  keywords: ["detailing automotriz", "ceramic coating", "pulido auto", "La Cisterna", "Santiago", "CleanSchile"],
  authors: [{ name: "CleanSchile" }],
  openGraph: {
    title: "CleanSchile — Detailing Automotriz Premium",
    description: "Protección y cuidado premium para tu vehículo. Santiago, Chile.",
    type: "website",
    locale: "es_CL",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${bebasNeue.variable} ${spaceGrotesk.variable} ${inter.variable} font-inter bg-black text-white antialiased overflow-x-hidden`}
      >
        <CustomCursor />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#0D0D10",
              color: "#fff",
              border: "1px solid rgba(201,168,76,0.3)",
              borderRadius: "12px",
            },
          }}
        />
      </body>
    </html>
  );
}
