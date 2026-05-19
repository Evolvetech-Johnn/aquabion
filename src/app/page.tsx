import PremiumHero from '@/components/PremiumHero';
import AnimatedSection from '@/components/AnimatedSection';
import PremiumStats from '@/components/PremiumStats';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { TrendingUp, Droplets, Zap, Leaf, Shield, Clock, ArrowRight } from 'lucide-react';

export default function Home() {
  const stats = [
    { value: '+50', label: 'Países atendidos' },
    { value: '25+', label: 'Anos de experiência' },
    { value: '100k+', label: 'Instalações entregues' },
    { value: '100%', label: 'Operação sustentável' },
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: 'Redução real de custos',
      description: 'Tecnologia passiva que reduz custos de energia e manutenção sem comprometer resultados.',
    },
    {
      icon: Droplets,
      title: 'Água preservada',
      description: 'Proteção contra incrustações sem gerar rejeitos químicos ou consumo adicional.',
    },
    {
      icon: Zap,
      title: 'Operação sem energia',
      description: 'Sistema autônomo que funciona sem demanda elétrica ativa e sem controles complexos.',
    },
    {
      icon: Leaf,
      title: 'Sustentabilidade real',
      description: 'Assegura água e equipamento mais limpos com impacto ambiental positivo contínuo.',
    },
    {
      icon: Shield,
      title: 'Proteção contínua',
      description: 'Aumenta vida útil de bombas, trocadores e tubulações sem paradas inesperadas.',
    },
    {
      icon: Clock,
      title: 'Retorno rápido',
      description: 'Economia comprovada que se paga em menos de 24 meses via redução de custos.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <PremiumHero />

      <AnimatedSection className="section-padding container-padding">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-600">Números que inspiram confiança</p>
            <h2 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight text-slate-950">
              Presença global com resultados previsíveis.
            </h2>
          </div>
          <PremiumStats stats={stats} />
        </div>
      </AnimatedSection>

      <AnimatedSection className="section-padding container-padding bg-slate-100">
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-600">O Desafio Invisível</p>
              <h2 className="mt-4 text-4xl md:text-5xl font-semibold text-slate-950">
                Incrustação apresenta riscos silenciosos para grandes operações.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                Cada milímetro de incrustação reduz eficiência, eleva custos e acelera desgaste de equipamentos críticos.
                A Aquabion atua antes do problema se tornar uma parada de produção.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {[
                { number: '10%', text: 'Energia perdida por 1mm de incrustação' },
                { number: '50%', text: 'Vida útil reduzida de equipamentos' },
                { number: '3x', text: 'Aumento de custos de manutenção' },
                { number: '0%', text: 'Aditivos químicos necessários' },
              ].map((item, index) => (
                <div key={index} className="rounded-[2rem] border border-cyan-100/70 bg-white/90 p-8 shadow-[0_20px_60px_-30px_rgba(14,165,233,0.25)]">
                  <div className="text-4xl md:text-5xl font-semibold text-slate-950 mb-3">
                    {item.number}
                  </div>
                  <p className="text-slate-600 leading-7">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="section-padding container-padding">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-600">Design inspirado em simplicidade</p>
            <h2 className="mt-4 text-4xl md:text-5xl font-semibold text-slate-950">
              Tecnologia clara, entrega consistente.
            </h2>
            <p className="mt-6 mx-auto max-w-2xl text-lg leading-8 text-slate-600">
              Oferecemos um caminho seguro para instalações mais eficientes, com solução passiva e gerenciamento pequeno, ideal para operações sensíveis.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <div key={index} className="premium-card">
                <benefit.icon className="w-12 h-12 text-cyan-600 mb-6" />
                <h3 className="text-2xl font-semibold mb-4 text-slate-950">{benefit.title}</h3>
                <p className="text-slate-600 text-base leading-7">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="section-padding container-padding bg-gradient-to-r from-cyan-100 via-cyan-200 to-slate-950/90 text-slate-950">
        <div className="container mx-auto max-w-5xl text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-700">Solução para operações de alto nível</p>
          <h2 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight text-slate-950">
            Segurança, eficiência e confiança em cada etapa.
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-700">
            De hospitais a indústrias, Aquabion entrega água mais limpa, menos falhas e processos mais previsíveis sem intervenção química.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contato">
              <Button size="lg" className="h-16 bg-cyan-600 text-white shadow-xl shadow-cyan-200/40 hover:bg-cyan-500">
                Agendar Diagnóstico Técnico
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/tecnologia">
              <Button size="lg" variant="outline" className="h-16 border-cyan-600 text-cyan-700 hover:bg-cyan-50">
                Conhecer a Tecnologia
              </Button>
            </Link>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
