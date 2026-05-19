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
  metadataBase: new URL("https://aquabionbrasil.com.br"),
  title: {
    default: "Aquabion Brasil | A Nova Engenharia da Água",
    template: "%s | Aquabion Brasil",
  },
  description: "Tecnologia alemã patenteada que elimina incrustações sem química, sem energia e sem manutenção. Solução sustentável para indústrias, agronegócio, hospitais e mais.",
  keywords: ["aquabion", "tratamento de água", "incrustações", "galvânica", "sustentabilidade", "tecnologia alemã", "sem química", "economia de energia"],
  authors: [{ name: "Aquabion Brasil" }],
  creator: "Aquabion Brasil",
  publisher: "Aquabion Brasil",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://aquabionbrasil.com.br",
    siteName: "Aquabion Brasil",
    title: "Aquabion Brasil | A Nova Engenharia da Água",
    description: "Tecnologia alemã patenteada que elimina incrustações sem química, sem energia e sem manutenção.",
    images: [
      {
        url: "https://aquabionbrasil.com.br/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Aquabion Brasil - Tecnologia de Tratamento de Água",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aquabion Brasil | A Nova Engenharia da Água",
    description: "Tecnologia alemã patenteada que elimina incrustações sem química, sem energia e sem manutenção.",
    images: ["https://aquabionbrasil.com.br/og-image.jpg"],
    creator: "@aquabionbrasil",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "seu-codigo-google",
  },
  alternates: {
    canonical: "https://aquabionbrasil.com.br",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Aquabion Brasil",
              alternateName: "Aquabion",
              url: "https://aquabionbrasil.com.br",
              logo: "https://aquabionbrasil.com.br/logo.png",
              description: "Tecnologia alemã patenteada que elimina incrustações sem química, sem energia e sem manutenção.",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+55-11-99999-9999",
                contactType: "customer service",
                availableLanguage: ["Portuguese", "English"],
              },
              sameAs: [
                "https://www.linkedin.com/company/aquabionbrasil",
                "https://www.instagram.com/aquabionbrasil",
              ],
            }),
          }}
        />
      </head>
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
