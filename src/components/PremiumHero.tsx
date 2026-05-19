'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, PlayCircle, CheckCircle2 } from 'lucide-react';

export default function PremiumHero() {
  const badges = [
    { text: 'Tecnologia Alemã' },
    { text: 'Patenteada' },
    { text: 'Sem Química' },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-cyan-500 via-sky-500 to-slate-950 text-white">
      <div className="absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-cyan-400/40 via-transparent to-transparent pointer-events-none" />
      <div className="absolute right-0 top-16 h-72 w-72 rounded-full bg-cyan-200/40 blur-3xl" />
      <div className="absolute left-0 top-28 h-56 w-56 rounded-full bg-slate-100/20 blur-3xl" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 py-24 lg:py-32 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-wrap gap-3 mb-8">
              {badges.map((badge, index) => (
                <span key={index} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-4 py-2 text-sm font-semibold text-white shadow-sm backdrop-blur-sm">
                  <CheckCircle2 className="w-4 h-4 text-cyan-100" />
                  {badge.text}
                </span>
              ))}
            </div>

            <h1 className="text-5xl md:text-6xl font-semibold tracking-tight leading-tight mb-6">
              A solução de água mais moderna para operações que exigem confiança absoluta.
            </h1>
            <p className="max-w-2xl text-lg text-cyan-100 leading-8 mb-10">
              Aquabion transforma água e infraestrutura com um sistema galvânico passivo, sem energia ativa, sem química e com performance comprovada.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contato">
                <Button size="lg" className="h-16 px-8 bg-white text-slate-950 shadow-xl hover:bg-slate-100">
                  Agendar Diagnóstico Técnico
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/tecnologia">
                <Button size="lg" variant="outline" className="h-16 px-8 border-white text-white hover:bg-white/10">
                  <PlayCircle className="w-5 h-5 mr-2" />
                  Ver Como Funciona
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="overflow-hidden rounded-[2.5rem] border border-white/15 bg-white shadow-[0_30px_80px_-40px_rgba(15,23,42,0.18)]">
              <div className="p-8 md:p-10">
                <div className="rounded-[2rem] bg-slate-950 px-6 py-5 text-white shadow-lg">
                  <p className="text-sm uppercase tracking-[0.24em] text-cyan-300 font-semibold">Solução passiva</p>
                  <h2 className="mt-4 text-3xl font-semibold leading-tight">Proteção sem compromissos</h2>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50 p-5">
                    <p className="text-3xl font-semibold text-slate-950">0%</p>
                    <p className="mt-2 text-sm text-slate-500">Energia ativa</p>
                  </div>
                  <div className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50 p-5">
                    <p className="text-3xl font-semibold text-slate-950">100%</p>
                    <p className="mt-2 text-sm text-slate-500">Livre de química</p>
                  </div>
                  <div className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50 p-5">
                    <p className="text-3xl font-semibold text-slate-950">24x7</p>
                    <p className="mt-2 text-sm text-slate-500">Proteção contínua</p>
                  </div>
                  <div className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50 p-5">
                    <p className="text-3xl font-semibold text-slate-950">ROI</p>
                    <p className="mt-2 text-sm text-slate-500">Retorno rápido em menos de 24 meses</p>
                  </div>
                </div>

                <div className="mt-8 rounded-[2rem] bg-cyan-50/80 border border-cyan-100 p-6">
                  <p className="text-sm uppercase tracking-[0.24em] text-cyan-600 font-semibold">Confiança comprovada</p>
                  <p className="mt-3 text-slate-700 text-lg leading-7">
                    Projetado para operações grandes e críticas que não podem parar. Menos manutenção, menos custo e mais previsibilidade para o seu negócio.
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
