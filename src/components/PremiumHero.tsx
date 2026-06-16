'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, PlayCircle, CheckCircle2 } from 'lucide-react';
import ImageCard from './ImageCard';
import WhatsAppButton from './WhatsAppButton';

interface PremiumHeroProps {
  heroImageUrl?: string;
  heroPublicId?: string;
}

export default function PremiumHero({ heroImageUrl, heroPublicId }: PremiumHeroProps) {
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
            <div className="space-y-8 max-w-xl bg-white/10 backdrop-blur-sm p-6 rounded-lg">

              <div className="flex flex-wrap gap-3 mb-4">
                {badges.map((badge, index) => (
                  <span key={index} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                    <CheckCircle2 className="w-3 h-3 text-cyan-100" />
                    {badge.text}
                  </span>
                ))}
              </div>

              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-snug text-white">
                A solução de água mais moderna para operações que exigem confiança absoluta.
              </h1>
              <p className="text-base md:text-lg text-cyan-100 leading-relaxed">
                Aquabion transforma água e infraestrutura com um sistema galvânico passivo, sem energia ativa, sem química e com performance comprovada.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contato">
                  <Button size="lg" className="h-14 px-6 bg-white text-slate-950 shadow-md hover:bg-slate-100">
                    Agendar Diagnóstico Técnico
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
                <Link href="/tecnologia">
                  <Button size="lg" className="h-14 px-6 bg-white/20 text-white border border-white/30 hover:bg-white/30 backdrop-blur-sm shadow-md">
                    <PlayCircle className="w-4 h-4 mr-1" />
                    Ver Como Funciona
                  </Button>
                </Link>
                <WhatsAppButton
                  message="Olá! Gostaria de agendar um diagnóstico técnico."
                  className="h-14 px-4 rounded-full shadow-lg hover:shadow-xl transition-shadow"
                >
                  Falar no WhatsApp
                </WhatsAppButton>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/15 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.18)] aspect-video flex items-center justify-center">
              {/* ImageCard acting as the hero visual – use object-cover to avoid cropping */}
              <ImageCard 
                locationId="hero-main" 
                imageUrl={heroImageUrl} 
                publicId={heroPublicId}
                aspectRatio="video"
                className="w-full h-full object-contain rounded-none"
                priority={true}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
