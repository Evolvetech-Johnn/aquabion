
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
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

  const refLeft = useRef(null);
  const refRight = useRef(null);
  const isInViewLeft = useInView(refLeft, { once: true, margin: "-100px" });
  const isInViewRight = useInView(refRight, { once: true, margin: "-100px" });

  return (
    <section className="relative overflow-hidden bg-[#071B34] animated-gradient">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-cyan-500/10 to-transparent pointer-events-none" />
      <div className="absolute right-20 top-32 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="absolute left-20 bottom-20 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />

      <div className="container mx-auto container-padding section-padding relative">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            ref={refLeft}
            initial={{ opacity: 0, y: 40 }}
            animate={isInViewLeft ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="space-y-10">
              <div className="flex flex-wrap gap-4">
                {badges.map((badge, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-2 hero-pill"
                  >
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    {badge.text}
                  </span>
                ))}
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight text-[#F5F5F7]">
                A solução de água mais moderna para operações que exigem
                <span className="gradient-text"> confiança absoluta</span>.
              </h1>
              <p className="text-lg md:text-xl text-[#86868B] leading-relaxed max-w-2xl">
                Aquabion transforma água e infraestrutura com um sistema galvânico passivo, sem energia ativa, sem química e com performance comprovada.
              </p>

              <div className="flex flex-col sm:flex-row gap-5 items-start">
                <Link href="/contato">
                  <Button className="btn-primary flex items-center gap-2 h-16 px-10">
                    Agendar Diagnóstico Técnico
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/tecnologia">
                  <Button className="btn-outline flex items-center gap-2 h-16 px-10">
                    <PlayCircle className="w-5 h-5" />
                    Ver Como Funciona
                  </Button>
                </Link>
              </div>

              <WhatsAppButton
                message="Olá! Gostaria de agendar um diagnóstico técnico."
                className="h-16 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Falar no WhatsApp
              </WhatsAppButton>
            </div>
          </motion.div>

          <motion.div
            ref={refRight}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={isInViewRight ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="premium-card overflow-hidden min-h-[400px] md:min-h-[500px]">
              {/* ImageCard acting as the hero visual */}
              <ImageCard
                locationId="hero-main"
                imageUrl={heroImageUrl}
                publicId={heroPublicId}
                aspectRatio="video"
                className="w-full h-full"
                priority={true}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
