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
      description: 'Proteção de caldeiras, trocadores de calor, torres de resfriamento e sistemas de água industrial.',
      benefits: ['Redução energética até 50%', 'Aumento vida útil equipamentos', 'Eliminação de paradas para limpeza'],
    },
    {
      icon: Sprout,
      title: 'Agronegócio',
      description: 'Irrigação, sistemas de água para animais, estufas e agroindústria em geral.',
      benefits: ['Maior eficiência irrigação', 'Menor incidência de entupimento', 'Saúde animal superior'],
    },
    {
      icon: Building2,
      title: 'Hospitais e Clínicas',
      description: 'Proteção de sistemas de água quente, esterilizadores, autoclaves e equipamentos médicos.',
      benefits: ['Conformidade sanitária total', 'Redução manutenção preventiva', 'Maior vida útil equipamentos'],
    },
    {
      icon: Hotel,
      title: 'Hotéis e Resorts',
      description: 'Sistemas de água quente, duchas, piscinas, spas e infraestrutura hoteleira.',
      benefits: ['Experiência do cliente superior', 'Redução custos operacionais', 'Manutenção mínima'],
    },
    {
      icon: Home,
      title: 'Condomínios e Edifícios',
      description: 'Sistemas de água predial, aquecimento central, torres de resfriamento e sistemas HVAC.',
      benefits: ['Redução gastos comuns', 'Maior durabilidade tubulações', 'Menor manutenção'],
    },
    {
      icon: Thermometer,
      title: 'Sistemas HVAC',
      description: 'Aquecimento, ventilação e ar condicionado. Proteção de serpentinas e trocadores de calor.',
      benefits: ['Eficiência energética máxima', 'Redução custos de energia', 'Menor desgaste equipamentos'],
    },
    {
      icon: Sun,
      title: 'Energia Solar',
      description: 'Proteção de placas solares, sistemas de aquecimento solar e tanques de armazenamento.',
      benefits: ['Maior eficiência painéis', 'Redução manutenção limpeza', 'Longevidade sistema solar'],
    },
    {
      icon: Droplets,
      title: 'Irrigação',
      description: 'Sistemas de irrigação agrícola, paisagismo, campos esportivos e áreas verdes.',
      benefits: ['Menor entupimento gotejadores', 'Distribuição uniforme', 'Redução custos manutenção'],
    },
  ];

  return (
    <div className="min-h-screen bg-[#071B34] text-white py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Link href="/" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-6">
            ← Voltar para a página inicial
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Nossas Aplicações
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Soluções personalizadas para cada segmento, sempre com resultados mensuráveis.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {applications.map((app, index) => (
            <div key={index} className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all duration-300">
              <app.icon className="w-12 h-12 text-cyan-400 mb-6" />
              <h3 className="text-2xl font-bold mb-4">{app.title}</h3>
              <p className="text-slate-400 text-lg mb-6">{app.description}</p>
              <div className="space-y-2">
                {app.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                    <span className="text-slate-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-xl text-slate-400 mb-8">
            Não encontrou seu segmento? Entre em contato conosco para uma solução personalizada.
          </p>
          <Link href="/contato">
            <Button size="lg" className="h-14 px-10 text-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold">
              Falar com Nossa Equipe
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
