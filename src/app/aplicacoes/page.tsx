import Link from 'next/link';
import { Factory, Sprout, Home, Building2, Sun, Droplets, Thermometer, Hotel } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
      icon: Sun,
      title: 'Energia solar',
      description: 'Preservação de sistemas solares térmicos e coletores fotovoltaicos.',
      benefits: ['Maior eficiência', 'Menos limpeza', 'Mais durabilidade'],
    },
    {
      icon: Droplets,
      title: 'Irrigação',
      description: 'Soluções para irrigação agrícola, paisagismo e áreas esportivas.',
      benefits: ['Distribuição uniforme', 'Menos entupimento', 'Redução de custos'],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto rounded-[2rem] bg-white border border-slate-200 p-12 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.18)] text-center mb-16">
          <Link href="/" className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 mb-6">
            ← Voltar para a página inicial
          </Link>
          <h1 className="text-4xl md:text-6xl font-semibold mb-6">Nossas aplicações</h1>
          <p className="text-lg leading-8 text-slate-600 mx-auto max-w-3xl">
            Soluções personalizadas para segmentos que exigem operação segura, sustentável e de alta performance.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {applications.map((app, index) => (
            <div key={index} className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1">
              <app.icon className="w-12 h-12 text-cyan-600 mb-6" />
              <h3 className="text-2xl font-semibold mb-4 text-slate-950">{app.title}</h3>
              <p className="text-slate-600 text-lg mb-6">{app.description}</p>
              <div className="space-y-3 text-slate-600">
                {app.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-cyan-600 flex-shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            Não encontrou seu segmento? Entre em contato com nossa equipe para uma solução sob medida.
          </p>
          <Link href="/contato">
            <Button size="lg" className="h-14 px-10 text-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold">
              Falar com nossa equipe
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
