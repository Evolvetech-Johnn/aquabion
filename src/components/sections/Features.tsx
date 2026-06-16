'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Droplets, Zap, Shield, Leaf, Clock } from 'lucide-react';
import Reveal from '../ui/Reveal';
import ImageCard from '../ImageCard';

interface FeaturesProps {
  pageImages?: Record<string, { url?: string; publicId?: string }>;
}

export default function Features({ pageImages = {} }: FeaturesProps) {
  const features = [
    {
      icon: TrendingUp,
      title: 'Redução de custos',
      description: 'Economia de até 50% no consumo energético e eliminação de custos com produtos químicos e manutenção.',
      color: 'text-cyan-500',
      bg: 'bg-cyan-50',
      slotId: 'benefit-1'
    },
    {
      icon: Droplets,
      title: 'Zero desperdício',
      description: 'Nenhuma água é desperdiçada no processo, diferente de outras tecnologias como osmose reversa.',
      color: 'text-blue-500',
      bg: 'bg-blue-50',
      slotId: 'benefit-2'
    },
    {
      icon: Zap,
      title: 'Aumento de vida útil',
      description: 'Equipamentos duram mais, protegidos contra incrustações e corrosão.',
      color: 'text-emerald-500',
      bg: 'bg-emerald-50',
      slotId: 'benefit-3'
    },
    {
      icon: Shield,
      title: 'Manutenção reduzida',
      description: 'Sistema passivo sem necessidade de intervenções frequentes.',
      color: 'text-purple-500',
      bg: 'bg-purple-50',
      slotId: 'benefit-4'
    },
    {
      icon: Leaf,
      title: '100% sustentável',
      description: 'Nenhum produto químico, zero energia ativa e impacto ambiental positivo.',
      color: 'text-green-500',
      bg: 'bg-green-50',
      slotId: 'benefit-5'
    },
    {
      icon: Clock,
      title: 'ROI rápido',
      description: 'Retorno do investimento em menos de 22 meses com resultados imediatos.',
      color: 'text-yellow-500',
      bg: 'bg-yellow-50',
      slotId: 'benefit-6'
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Reveal className="text-center mb-16">
          <span className="text-sm font-semibold uppercase tracking-wider text-cyan-600">
            Por que escolher Aquabion?
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-slate-950">
            Tecnologia que transforma negócios
          </h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Benefícios comprovados em mais de 100 mil instalações ao redor do mundo.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <Reveal key={i} delay={i * 0.15}>
              <motion.div
                whileHover={{ y: -8 }}
                className="premium-card group h-full flex flex-col"
              >
                <div className="mb-6 relative">
                  <ImageCard
                    locationId={feature.slotId}
                    imageUrl={pageImages[feature.slotId]?.url}
                    publicId={pageImages[feature.slotId]?.publicId}
                    aspectRatio="video"
                    className="w-full rounded-2xl overflow-hidden"
                  />
                  <div className={`absolute -bottom-4 -right-2 w-16 h-16 rounded-2xl ${feature.bg} ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg border-4 border-white`}>
                    <feature.icon className="w-8 h-8" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-950 mb-3 mt-4">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed flex-grow">
                  {feature.description}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
