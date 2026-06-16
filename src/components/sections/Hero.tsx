
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import AnimatedButton from '../ui/AnimatedButton';
import Reveal from '../ui/Reveal';
import { Zap, Droplets, Leaf } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
      {/* Background Gradients */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full animated-gradient opacity-50" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-50/30 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <Reveal>
              <div className="hero-pill">
                <span className="h-2 w-2 rounded-full bg-cyan-500 animate-pulse" />
                Tecnologia Alemã Certificada
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-950 leading-tight">
                Tratamento de Água <br />
                <span className="gradient-text">Sustentável & Eficiente</span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                Sistema galvânico passivo que reduz custos operacionais, protege equipamentos e preserva a água, sem energia ou produtos químicos.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4">
                <AnimatedButton size="lg" showArrow>
                  Agendar Visita Gratuita
                </AnimatedButton>
                <AnimatedButton variant="outline" size="lg">
                  Ver como funciona
                </AnimatedButton>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="flex items-center gap-8 pt-4">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center">
                         <span className="text-xs font-bold text-slate-600">U{i}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                       {[1,2,3,4,5].map(i => (
                         <span key={i} className="text-yellow-500">★</span>
                       ))}
                    </div>
                    <span className="text-sm text-slate-600">+100k clientes no mundo</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Content - Hero Visual */}
          <Reveal delay={0.2} className="relative">
            <div className="relative">
               {/* Main Card */}
               <motion.div
                 initial={{ scale: 0.95, opacity: 0 }}
                 animate={{ scale: 1, opacity: 1 }}
                 transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                 className="premium-card relative overflow-hidden"
               >
                 {/* Decorative elements */}
                 <div className="absolute top-4 right-4 w-20 h-20 bg-cyan-100 rounded-full blur-2xl opacity-50" />

                 <div className="space-y-8">
                    {/* Icon Grid */}
                    <div className="grid grid-cols-3 gap-4">
                       {[
                         { icon: Zap, color: 'text-yellow-500', bg: 'bg-yellow-50' },
                         { icon: Droplets, color: 'text-cyan-500', bg: 'bg-cyan-50' },
                         { icon: Leaf, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                       ].map((item, i) => (
                          <motion.div
                            key={i}
                            whileHover={{ y: -5 }}
                            className={`p-4 rounded-2xl ${item.bg} border border-slate-100 flex flex-col items-center justify-center aspect-square`}
                          >
                            <item.icon className={`w-8 h-8 ${item.color}`} />
                          </motion.div>
                       ))}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4">
                       <div className="p-4 bg-slate-50 rounded-xl">
                          <span className="text-2xl font-bold text-slate-950">50+</span>
                          <p className="text-xs text-slate-500">Países Atendidos</p>
                       </div>
                       <div className="p-4 bg-slate-50 rounded-xl">
                          <span className="text-2xl font-bold text-slate-950">25+</span>
                          <p className="text-xs text-slate-500">Anos de Mercado</p>
                       </div>
                    </div>
                 </div>
               </motion.div>

               {/* Floating Badge */}
               <motion.div
                 initial={{ x: 30, opacity: 0 }}
                 animate={{ x: 0, opacity: 1 }}
                 transition={{ delay: 0.5, duration: 0.6 }}
                 className="absolute -left-6 top-1/4 bg-white shadow-premium p-4 rounded-2xl border border-slate-100 flex items-center gap-3"
               >
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                    ✓
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">0 Químicos</p>
                    <p className="text-[10px] text-slate-500">100% Passivo</p>
                  </div>
               </motion.div>

            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

