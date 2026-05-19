import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { OrganizationSchema, WebSiteSchema } from "@/components/StructuredData";

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
    <html lang="pt-BR">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              OrganizationSchema({
                name: "Aquabion Brasil",
                url: "https://aquabionbrasil.com.br",
                logo: "https://aquabionbrasil.com.br/logo.png",
                description: "Tecnologia alemã patenteada que elimina incrustações sem química, sem energia e sem manutenção.",
                sameAs: [
                  "https://www.linkedin.com/company/aquabionbrasil",
                  "https://www.instagram.com/aquabionbrasil",
                ],
              }),
              WebSiteSchema({
                name: "Aquabion Brasil",
                url: "https://aquabionbrasil.com.br",
                description: "Tecnologia alemã patenteada que elimina incrustações sem química, sem energia e sem manutenção.",
                potentialAction: {
                  "@type": "SearchAction",
                  target: "https://aquabionbrasil.com.br/?search_term_string={search_term_string}",
                  "query-input": "required name=search_term_string",
                },
              }),
            ]),
          }}
        />
      </head>
      <body className={cn(
        "min-h-screen bg-slate-50 text-slate-950 font-sans antialiased flex flex-col",
        inter.variable
      )}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 rounded bg-slate-950 px-4 py-2 text-white"
        >
          Pular para o conteúdo
        </a>
        <Navbar />
        <main id="main-content" className="pt-20 flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
