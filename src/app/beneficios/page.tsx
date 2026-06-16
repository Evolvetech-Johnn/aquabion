
import Link from 'next/link';
import { TrendingUp, Droplets, Zap, Shield, Leaf, Clock, ChevronLeft } from 'lucide-react';
import ImageCard from '@/components/ImageCard';
import Reveal from '@/components/ui/Reveal';
import AnimatedCTA from '@/components/AnimatedCTA';
import AnimatedCard from '@/components/ui/AnimatedCard';
import { getPageImages } from '@/services/media.service';
const pageImages = await getPageImages();

export default async function BenefitsPage() {







  const benefits = [
    {
      icon: TrendingUp,
      title: 'Redução de custos',
      description: 'Economia de até 50% no consumo energético e eliminação de custos com produtos químicos e manutenção.',
      slotId: 'benefit-1',
      bg: 'bg-cyan-50',
      color: 'text-cyan-500'
    },
    {
      icon: Droplets,
      title: 'Zero desperdício hídrico',
      description: 'Nenhuma água é desperdiçada no processo, diferente de outras tecnologias como osmose reversa.',
      slotId: 'benefit-2',
      bg: 'bg-blue-50',
      color: 'text-blue-500'
    },
    {
      icon: Zap,
      title: 'Aumento de vida útil',
      description: 'Equipamentos duram mais, protegidos contra incrustações e corrosão.',
      slotId: 'benefit-3',
      bg: 'bg-emerald-50',
      color: 'text-emerald-500'
    },
    {
      icon: Shield,
      title: 'Manutenção reduzida',
      description: 'Sistema passivo sem necessidade de intervenções frequentes.',
      slotId: 'benefit-4',
      bg: 'bg-purple-50',
      color: 'text-purple-500'
    },
    {
      icon: Leaf,
      title: '100% sustentável',
      description: 'Nenhum produto químico, zero energia ativa e impacto ambiental positivo.',
      slotId: 'benefit-5',
      bg: 'bg-green-50',
      color: 'text-green-500'
    },
    {
      icon: Clock,
      title: 'ROI claro',
      description: 'Retorno do investimento em menos de 22 meses com resultados imediatos.',
      slotId: 'benefit-6',
      bg: 'bg-yellow-50',
      color: 'text-yellow-500'
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
                <AnimatedCard className="h-full flex flex-col group">
                  <div className="mb-6 relative">
                    <ImageCard
                      locationId={benefit.slotId}
                      imageUrl={pageImages[benefit.slotId]?.url}
                      publicId={pageImages[benefit.slotId]?.publicId}
                      aspectRatio="video"
                      className="w-full rounded-2xl overflow-hidden"
                    />
                    <div className={`absolute -bottom-4 -right-2 w-14 h-14 rounded-2xl ${benefit.bg} ${benefit.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg border-4 border-white`}>
                      <benefit.icon className="w-7 h-7" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-950 mb-4 mt-4">{benefit.title}</h3>
                  <p className="text-slate-600 leading-relaxed flex-grow">{benefit.description}</p>
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

      {/* Comparativo */}
      <section className="py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <Reveal>
            <div className="premium-card">
              <div className="grid gap-12 lg:grid-cols-2 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-950 mb-6">Comparativo de mercado</h2>
                  <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                    Veja como a solução Aquabion entrega desempenho superior sem custos adicionais ou riscos ambientais.
                  </p>
                  <ul className="space-y-4 text-slate-600">
                    {[
                      'CAPEX médio, OPEX reduzido',
                      'Zero consumo de água extra',
                      'Sem manutenção frequente',
                      'Impacto ambiental positivo',
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-lg">
                        <div className="w-3 h-3 rounded-full bg-cyan-600" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="premium-card bg-slate-50 p-6 md:p-8">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="py-4 px-2 text-cyan-600 font-bold text-lg">Critério</th>
                        <th className="py-4 px-2 text-slate-950 font-bold text-center text-lg">Aquabion</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-600">
                      {['OPEX', 'Consumo de água', 'Manutenção', 'Impacto ambiental'].map((row, i) => (
                        <tr key={i} className="border-b border-slate-200">
                          <td className="py-4 px-2 text-lg">{row}</td>
                          <td className="py-4 px-2 text-center font-bold text-slate-950 text-lg">Zero</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-12 md:py-24">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <Reveal>
              <AnimatedCTA />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
