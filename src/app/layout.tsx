
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import AnimatedPageWrapper from "@/components/AnimatedPageWrapper";
import { OrganizationSchema, WebSiteSchema } from "@/components/StructuredData";

export const metadata: Metadata = {
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
    url: "https://aquabion.com.br",
    siteName: "Aquabion Brasil",
    title: "Aquabion Brasil | A Nova Engenharia da Água",
    description: "Tecnologia alemã patenteada que elimina incrustações sem química, sem energia e sem manutenção.",
    images: [
      {
        url: "https://aquabion.com.br/og-image.jpg",
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
    images: ["https://aquabion.com.br/og-image.jpg"],
    creator: "@aquabion",
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
    canonical: "https://aquabion.com.br",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='48' fill='%2306b6d4'/%3E%3Ctext x='50' y='62' font-size='50' font-family='Arial' font-weight='700' text-anchor='middle' fill='white'%3EA%3C/text%3E%3C/svg%3E" />
        <link rel="apple-touch-icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='48' fill='%2306b6d4'/%3E%3Ctext x='50' y='62' font-size='50' font-family='Arial' font-weight='700' text-anchor='middle' fill='white'%3EA%3C/text%3E%3C/svg%3E" />
        <meta name="theme-color" content="#06b6d4" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
          OrganizationSchema({
            name: "Aquabion Brasil",
            url: "https://aquabion.com.br",
            logo: "/logoaquabion.png",
            description: "Tecnologia alemã patenteada que elimina incrustações sem química, sem energia e sem manutenção.",
            sameAs: [
              "https://www.linkedin.com/company/aquabion",
              "https://www.instagram.com/aquabion",
            ],
          }),
          WebSiteSchema({
            name: "Aquabion Brasil",
            url: "https://aquabion.com.br",
            description: "Tecnologia alemã patenteada que elimina incrustações sem química, sem energia e sem manutenção.",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://aquabion.com.br/?search_term_string={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        ]) }} />
      </head>
      <body className={cn("min-h-screen bg-slate-50 text-slate-950 font-sans antialiased flex flex-col", inter.variable)}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 rounded bg-slate-950 px-4 py-2 text-white">Pular para o conteúdo</a>
        <Navbar />
        <AnimatedPageWrapper>{children}</AnimatedPageWrapper>
        <Footer />
        <WhatsAppButton variant="floating" />
      </body>
    </html>
  );
}
