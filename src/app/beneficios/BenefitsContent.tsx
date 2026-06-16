/* src/app/beneficios/BenefitsContent.tsx */
'use client';

import Link from 'next/link';
import { TrendingUp, Droplets, Zap, Shield, Leaf, Clock, ChevronLeft } from 'lucide-react';
import ImageCard from '@/components/ImageCard';
import Reveal from '@/components/ui/Reveal';
import AnimatedButton from '@/components/ui/AnimatedButton';
import AnimatedCard from '@/components/ui/AnimatedCard';

// Define a minimal type for page images passed from server
export type PageImagesData = Record<string, { url: string; publicId?: string }>; // eslint-disable-line @typescript-eslint/no-explicit-any

interface BenefitsContentProps {
  pageImages: PageImagesData;
}

export default function BenefitsContent({ pageImages }: BenefitsContentProps) {
  const benefits = [
    {
      icon: TrendingUp,
      title: 'Redução de custos',
      description: 'Economia de até 50% no consumo energético e eliminação de custos com produtos químicos e manutenção.',
    },
    {
      icon: Droplets,
      title: 'Zero desperdício hídrico',
      description: 'Nenhuma água é desperdiçada no processo, diferente de outras tecnologias como osmose reversa.',
    },
    {
      icon: Zap,
      title: 'Aumento de vida útil',
      description: 'Equipamentos duram mais, protegidos contra incrustações e corrosão.',
    },
    {
      icon: Shield,
      title: 'Manutenção reduzida',
      description: 'Sistema passivo sem necessidade de intervenções frequentes.',
    },
    {
      icon: Leaf,
      title: '100% sustentável',
      description: 'Nenhum produto químico, zero energia ativa e impacto ambiental positivo.',
    },
    {
      icon: Clock,
      title: 'ROI claro',
      description: 'Retorno do investimento em menos de 24 meses com resultados imediatos.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 pt-20">
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <Reveal>
            <Link href="/" className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 mb-8">
              <ChevronLeft className="w-4 h-4" />
              Voltar para a página inicial
            </Link>
          </Reveal>

          <Reveal>
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Benefícios da tecnologia Aquabion
              </h1>
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Resultados mensuráveis com menor custo, maior confiabilidade e impacto ambiental reduzido.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <Reveal key={index} delay={index * 0.1}>
                <AnimatedCard>
                  <benefit.icon className="w-14 h-14 text-cyan-600 mb-6" />
                  <h3 className="text-2xl font-bold text-slate-950 mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </AnimatedCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase Image */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <Reveal>
            <div className="relative">
              <ImageCard
                locationId="benefits_showcase"
                imageUrl={pageImages['benefits_showcase']?.url}
                publicId={pageImages['benefits_showcase']?.publicId}
                aspectRatio="video"
                className="w-full"
              />
              <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-cyan-100/50 rounded-full blur-3xl -z-10" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-12 md:py-24">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <Reveal>
            <div className="premium-card">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-950 mb-6">
                Sistema passivo, resultados ativos
              </h2>
              <p className="text-lg text-slate-600 mb-10 max-w-3xl mx-auto">
                Sem energia, sem manutenção e sem produtos químicos. Apenas previsibilidade operacional e proteção contínua.
              </p>
              <div className="grid gap-6 md:grid-cols-3 mb-10">
                {[
                  { title: 'Zero energia', desc: 'Operação sem consumo elétrico' },
                  { title: 'Zero manutenção', desc: 'Nenhuma intervenção regular necessária' },
                  { title: 'Zero química', desc: '100% sustentável e segura' },
                ].map((item, i) => (
                  <div key={i} className="p-8 bg-slate-50 rounded-2xl border border-slate-200">
                    <h3 className="text-xl font-bold text-slate-950 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-slate-600">{item.desc}</p>
                  </div>
                ))}
              </div>
              <Link href="/contato">
                <AnimatedButton size="lg" showArrow>
                  Agendar Diagnóstico Técnico
                </AnimatedButton>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
