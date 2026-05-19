import PremiumHero from '@/components/PremiumHero';
import AnimatedSection from '@/components/AnimatedSection';
import PremiumStats from '@/components/PremiumStats';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { TrendingUp, Droplets, Zap, Leaf, Shield, Clock, ArrowRight } from 'lucide-react';

export default function Home() {
  const stats = [
    { value: '+50', label: 'Países' },
    { value: '25+', label: 'Anos de Experiência' },
    { value: '100K+', label: 'Instalações' },
    { value: '100%', label: 'Sustentável' },
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: 'Redução de Custos',
      description: 'Economia de até 50% no consumo energético e eliminação de custos com manutenção.',
    },
    {
      icon: Droplets,
      title: 'Zero Desperdício',
      description: 'Nenhuma água desperdiçada, diferente de outras tecnologias como osmose reversa.',
    },
    {
      icon: Zap,
      title: 'Zero Energia',
      description: 'Sistema passivo que funciona sem consumo elétrico de nenhum tipo.',
    },
    {
      icon: Leaf,
      title: '100% Sustentável',
      description: 'Nenhum produto químico, impacto ambiental positivo e créditos de carbono.',
    },
    {
      icon: Shield,
      title: 'Proteção Total',
      description: 'Protege equipamentos contra incrustações e corrosão, aumentando vida útil.',
    },
    {
      icon: Clock,
      title: 'ROI Rápido',
      description: 'Retorno do investimento em menos de 24 meses, com resultados imediatos.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#071B34] text-white">
      <PremiumHero />

      <AnimatedSection className="section-padding container-padding">
        <div className="container mx-auto">
          <PremiumStats stats={stats} />
        </div>
      </AnimatedSection>

      <AnimatedSection className="section-padding container-padding bg-[#0A2342]">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              O Problema Invisível
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Incrustações custam bilhões anualmentes em energia perdida e manutenção.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { number: '10%', text: 'Aumento de consumo energético por 1mm de calcário' },
              { number: '50%', text: 'Redução da vida útil dos equipamentos' },
              { number: '3x', text: 'Mais custos com manutenção e limpeza' },
            ].map((item, index) => (
              <div key={index} className="premium-card">
                <div className="text-5xl font-bold text-cyan-400 mb-4">{item.number}</div>
                <p className="text-lg text-slate-300">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="section-padding container-padding">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Benefícios da Tecnologia
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Resultados mensuráveis que transformam a operação e o balanço da sua empresa.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="premium-card">
                <benefit.icon className="w-12 h-12 text-cyan-400 mb-6" />
                <h3 className="text-2xl font-bold mb-4">{benefit.title}</h3>
                <p className="text-slate-400 text-lg">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="section-padding container-padding bg-gradient-to-br from-[#0A2342] to-[#071B34]">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            O Futuro da Engenharia
            <span className="gradient-text block">Não Combate a Natureza</span>
          </h2>
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
            Trabalha com ela. Tecnologia galvânica passiva que transforma a estrutura dos minerais na água.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contato">
              <Button size="lg" className="btn-premium h-16 px-10 text-lg">
                Agendar Diagnóstico Técnico
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/tecnologia">
              <Button size="lg" className="btn-outline h-16 px-10 text-lg">
                Conhecer a Tecnologia
              </Button>
            </Link>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
