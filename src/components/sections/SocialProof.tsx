
'use client';

import React from 'react';
import Reveal from '../ui/Reveal';

const stats = [
  { value: '50+', label: 'Países Atendidos' },
  { value: '100k+', label: 'Instalações' },
  { value: '25+', label: 'Anos de Mercado' },
  { value: '0', label: 'Químicos' },
];

export default function SocialProof() {
  return (
    <section className="py-20 bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-950 mb-2">
              Confiança Global
            </h2>
            <p className="text-slate-600">
              Números que inspiram confiança e resultados comprovados
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="p-6">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-600 to-slate-950 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <p className="text-slate-600 font-medium">
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

