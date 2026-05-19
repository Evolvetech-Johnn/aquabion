'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, PlayCircle, CheckCircle2 } from 'lucide-react';

export default function PremiumHero() {
  const badges = [
    { text: 'Tecnologia Alemã' },
    { text: 'Patenteada' },
    { text: 'Zero Química' },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24">
      <div className="absolute inset-0 animated-gradient opacity-50" />
      
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex flex-wrap gap-3 mb-8">
                {badges.map((badge, index) => (
                  <div
                    key={index}
                    className="glass px-4 py-2 rounded-full text-sm font-medium text-cyan-300"
                  >
                    <CheckCircle2 className="w-4 h-4 inline mr-2" />
                    {badge.text}
                  </div>
                ))}
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                A Nova
                <span className="gradient-text block">Engenharia da Água</span>
              </h1>

              <p className="text-xl md:text-2xl text-slate-400 leading-relaxed mb-8">
                Tecnologia alemã patenteada que elimina incrustações sem química,
                sem energia e sem manutenção.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contato">
                  <Button size="lg" className="btn-premium h-16 px-8 text-lg">
                    Agendar Diagnóstico Técnico
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/tecnologia">
                  <Button size="lg" className="btn-outline h-16 px-8 text-lg">
                    <PlayCircle className="w-5 h-5 mr-2" />
                    Ver Como Funciona
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="aspect-square rounded-[3rem] glass p-8 shadow-glass">
              <div className="w-full h-full rounded-[2.5rem] bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center animate-float">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-cyan-500 to-emerald-500/50 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-300 to-blue-400" />
                    </div>
                  </div>
                  <p className="text-cyan-300 text-lg font-medium">
                    Tecnologia Galvânica Passiva
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
