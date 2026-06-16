'use client';

import React from 'react';
import Reveal from '../ui/Reveal';
import ImageCard from '../ImageCard';

interface DesafioSectionProps {
  imageUrl?: string;
  publicId?: string;
}

export default function DesafioSection({ imageUrl, publicId }: DesafioSectionProps) {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <Reveal>
            <div className="premium-card relative overflow-hidden h-full">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-950 mb-6 relative z-10">
                O Desafio da Água Industrial
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed relative z-10 mb-4">
                A incrustação severa e a corrosão representam um desafio constante para indústrias e grandes instalações, causando perdas de eficiência, paradas não programadas e custos elevados de manutenção.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed relative z-10">
                Lidar com a água dura exige soluções que vão além da química tradicional, buscando proteção física que preserve os ativos e o meio ambiente simultaneamente.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <ImageCard
              locationId="desafio-main"
              imageUrl={imageUrl}
              publicId={publicId}
              aspectRatio="video"
              className="w-full"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
