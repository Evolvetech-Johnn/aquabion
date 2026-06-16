
import type { Metadata } from 'next';
import ImageCarousel from '@/components/ImageCarousel';
import PremiumHero from '@/components/PremiumHero';
import Features from '@/components/sections/Features';
import SocialProof from '@/components/sections/SocialProof';
import Pricing from '@/components/sections/Pricing';
import FAQ from '@/components/sections/FAQ';
import DesafioSection from '@/components/sections/DesafioSection';
import { getPageImages } from '@/services/media.service';

export const metadata: Metadata = {
  title: 'Aquabion Brasil | Tecnologia de Tratamento de Água Sustentável',
  description: 'Sistema galvânico passivo de tratamento de água que reduz custos, aumenta vida útil de equipamentos e opera sem energia ativa ou produtos químicos.',
};

export const revalidate = 60;

export default async function Home() {
  const pageImages = await getPageImages();
  
  // Prepare carousel images
  const carouselImages = [
    { url: pageImages['carousel-1']?.url, publicId: pageImages['carousel-1']?.publicId },
    { url: pageImages['carousel-2']?.url, publicId: pageImages['carousel-2']?.publicId },
    { url: pageImages['carousel-3']?.url, publicId: pageImages['carousel-3']?.publicId },
    { url: pageImages['carousel-4']?.url, publicId: pageImages['carousel-4']?.publicId },
    { url: pageImages['carousel-5']?.url, publicId: pageImages['carousel-5']?.publicId },
    { url: pageImages['carousel-6']?.url, publicId: pageImages['carousel-6']?.publicId },
  ];
  
  return (
    <>
      <ImageCarousel images={carouselImages} />
      <PremiumHero 
        heroImageUrl={pageImages['hero-main']?.url} 
        heroPublicId={pageImages['hero-main']?.publicId} 
      />
      <DesafioSection 
        imageUrl={pageImages['desafio-main']?.url}
        publicId={pageImages['desafio-main']?.publicId}
      />
      <Features pageImages={pageImages} />
      <SocialProof />
      <Pricing />
      <FAQ />
    </>
  );
}
