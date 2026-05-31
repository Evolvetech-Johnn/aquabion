import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { OrganizationSchema, WebSiteSchema } from "@/components/StructuredData";
import WhatsAppButton from "@/components/WhatsAppButton";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aquabion.com.br"),
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20100%20100'%3E%3Ccircle%20cx='50'%20cy='50'%20r='48'%20fill='%2306b6d4'/%3E%3Ctext%20x='50'%20y='62'%20font-size='50'%20font-family='Arial'%20font-weight='700'%20text-anchor='middle'%20fill='white'%3EA%3C/text%3E%3C/svg%3E" />
        <link rel="apple-touch-icon" href="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20100%20100'%3E%3Ccircle%20cx='50'%20cy='50'%20r='48'%20fill='%2306b6d4'/%3E%3Ctext%20x='50'%20y='62'%20font-size='50'%20font-family='Arial'%20font-weight='700'%20text-anchor='middle'%20fill='white'%3EA%3C/text%3E%3C/svg%3E" />
        <meta name="theme-color" content="#06b6d4" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
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
        <WhatsAppButton variant="floating" />
      </body>
    </html>
  );
}
