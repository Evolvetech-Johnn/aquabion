import { Metadata } from 'next';
import NewsClient from './NewsClient';

export const metadata: Metadata = {
  title: 'Notícias | Aquabion Brasil',
  description: 'As últimas notícias sobre Aquabion, tecnologia de tratamento de água, inovações industriais e sustentabilidade.',
  keywords: ['notícias aquabion', 'tratamento de água', 'tecnologia alemã', 'sustentabilidade', 'incrustações'],
  openGraph: {
    title: 'Notícias | Aquabion Brasil',
    description: 'As últimas notícias sobre Aquabion, tecnologia de tratamento de água, inovações industriais e sustentabilidade.',
    url: 'https://aquabion.com.br/noticias',
    siteName: 'Aquabion Brasil',
    type: 'website',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Notícias | Aquabion Brasil',
    description: 'As últimas notícias sobre Aquabion, tecnologia de tratamento de água, inovações industriais e sustentabilidade.',
  },
  alternates: {
    canonical: 'https://aquabion.com.br/noticias',
  },
};

export default function NoticiasPage() {
  return <NewsClient />;
}
