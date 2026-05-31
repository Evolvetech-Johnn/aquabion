'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CloudinaryImage from './media/CloudinaryImage';

interface CarouselImage {
  url?: string;
  publicId?: string;
  alt?: string;
}

interface ImageCarouselProps {
  images: CarouselImage[];
  autoPlayInterval?: number;
}

export default function ImageCarousel({ 
  images, 
  autoPlayInterval = 5000 
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const validImages = images.filter(img => img.url || img.publicId);

  const nextSlide = useCallback(() => {
    if (validImages.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % validImages.length);
  }, [validImages.length]);

  const prevSlide = useCallback(() => {
    if (validImages.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + validImages.length) % validImages.length);
  }, [validImages.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Auto play logic
  useEffect(() => {
    if (isPaused || validImages.length <= 1) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      return;
    }

    timeoutRef.current = setTimeout(() => {
      nextSlide();
    }, autoPlayInterval);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentIndex, isPaused, nextSlide, autoPlayInterval, validImages.length]);

  if (validImages.length === 0) {
    return null;
  }

  return (
    <section 
      className="relative w-full overflow-hidden bg-slate-900"
      aria-roledescription="carrossel"
      aria-label="Imagens em destaque da Aquabion"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div 
        className="flex transition-transform duration-700 ease-out h-[400px] md:h-[500px] lg:h-[600px]"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {validImages.map((image, index) => (
          <div 
            key={index} 
            className="w-full flex-shrink-0 relative h-full"
            aria-hidden={index !== currentIndex}
          >
            <CloudinaryImage 
              url={image.url}
              publicId={image.publicId}
              alt={image.alt || `Imagem ${index + 1} do carrossel`}
              width={1920}
              height={1080}
              fill
              crop="fill"
              className="object-cover object-center"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {validImages.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            aria-label="Ir para a imagem anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            aria-label="Ir para a próxima imagem"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Indicators */}
          <div 
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3"
            role="tablist"
            aria-label="Indicadores de slides"
          >
            {validImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-white scale-125' 
                    : 'bg-white/40 hover:bg-white/70'
                }`}
                role="tab"
                aria-selected={index === currentIndex}
                aria-label={`Ir para o slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
