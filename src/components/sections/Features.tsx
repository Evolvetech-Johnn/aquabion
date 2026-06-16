
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, TrendingUp } from 'lucide-react';
import Reveal from '../ui/Reveal';

const features = [
  {
    icon: Zap,
    title: 'Zero Energia',
    description: 'Sistema 100% passivo que funciona sem demanda elétrica ou componentes eletrônicos.',
    color: 'text-yellow-500',
    bg: 'bg-yellow-50',
  },
  {
    icon: Shield,
    title: 'Proteção Contínua',
    description: 'Previne incrustações e corrosão, prolongando a vida útil de equipamentos e tubulações.',
    color: 'text-cyan-500',
    bg: 'bg-cyan-50',
  },
  {
    icon: TrendingUp,
    title: 'Retorno Rápido',
    description: 'Economia real que se paga em até 24 meses com redução de custos operacionais.',
    color: 'text-emerald-500',
    bg: 'bg-emerald-50',
  },
];

export default function Features() {
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

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <Reveal key={i} delay={i * 0.15}>
              <motion.div
                whileHover={{ y: -8 }}
                className="premium-card group"
              >
                <div className={`w-16 h-16 rounded-2xl ${feature.bg} ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-950 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
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

