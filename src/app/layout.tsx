import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Aquabion Brasil | A Nova Engenharia da Água",
  description: "Tecnologia alemã patenteada que elimina incrustações sem química, sem energia e sem manutenção.",
  openGraph: {
    title: "Aquabion Brasil | A Nova Engenharia da Água",
    description: "Tecnologia alemã patenteada que elimina incrustações sem química, sem energia e sem manutenção.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={cn(
        "min-h-screen bg-[#071B34] font-sans antialiased flex flex-col",
        inter.variable
      )}>
        <Navbar />
        <main className="pt-20 flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
