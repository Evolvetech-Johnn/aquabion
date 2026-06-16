
import Link from 'next/link';
import { Factory, Sprout, Home, Building2, Droplets, Thermometer, Hotel, ChevronLeft } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import AnimatedButton from '@/components/ui/AnimatedButton';
import AnimatedCard from '@/components/ui/AnimatedCard';

export const metadata = {
  title: 'Aplicações | Aquabion Brasil',
  description: 'Todas as aplicações da tecnologia Aquabion - Indústria, agronegócio, hospitais, hotéis e mais',
};

export default function ApplicationsPage() {
  const applications = [
    {
      icon: Factory,
      title: 'Indústrias',
      description: 'Proteção de caldeiras, trocadores de calor e sistemas de água industrial.',
      benefits: ['Redução de energia', 'Maior vida útil', 'Menos paradas'],
    },
    {
      icon: Sprout,
      title: 'Agronegócio',
      description: 'Melhora de irrigação, controle de entupimento e saúde animal.',
      benefits: ['Eficiência no uso da água', 'Menos entupimentos', 'Melhor produtividade'],
    },
    {
      icon: Building2,
      title: 'Hospitais e clínicas',
      description: 'Proteção de água quente, autoclaves e sistemas médicos críticos.',
      benefits: ['Conformidade sanitária', 'Menos manutenção', 'Mais segurança'],
    },
    {
      icon: Hotel,
      title: 'Hotéis e resorts',
      description: 'Água mais limpa em piscinas, spas e sistemas prediais.',
      benefits: ['Melhor experiência', 'Redução de custos', 'Maior confiabilidade'],
    },
    {
      icon: Home,
      title: 'Condomínios',
      description: 'Água predial confiável para torres de resfriamento e sistemas HVAC.',
      benefits: ['Menos reclamações', 'Redução de gastos', 'Mais durabilidade'],
    },
    {
      icon: Thermometer,
      title: 'HVAC',
      description: 'Proteção de serpentinas e trocadores de calor em sistemas de climatização.',
      benefits: ['Eficiência energética', 'Menor desgaste', 'Menos manutenção'],
    },
    {
      icon: Droplets,
      title: 'Irrigação',
      description: 'Soluções para irrigação agrícola, paisagismo e áreas esportivas.',
      benefits: ['Distribuição uniforme', 'Menos entupimento', 'Redução de custos'],
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
                Nossas aplicações
              </h1>
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Soluções personalizadas para segmentos que exigem operação segura, sustentável e de alta performance.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Applications Grid */}
      <section className="py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {applications.map((app, index) => (
              <Reveal key={index} delay={index * 0.1}>
                <AnimatedCard className="h-full">
                  <app.icon className="w-14 h-14 text-cyan-600 mb-6" />
                  <h3 className="text-2xl font-bold text-slate-950 mb-4">{app.title}</h3>
                  <p className="text-slate-600 text-lg mb-6">{app.description}</p>
                  <div className="space-y-3 text-slate-600">
                    {app.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="mt-1.5 h-2.5 w-2.5 rounded-full bg-cyan-600 flex-shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </AnimatedCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-12 md:py-24">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <Reveal>
            <div className="premium-card">
              <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                Não encontrou seu segmento? Entre em contato com nossa equipe para uma solução sob medida.
              </p>
              <Link href="/contato">
                <AnimatedButton size="lg" showArrow>
                  Falar com nossa equipe
                </AnimatedButton>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
