import Link from 'next/link';
import { TrendingUp, Droplets, Zap, Shield, Leaf, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ImageCard from '@/components/ImageCard';
import { getPageImages, getPageImageUrl } from '@/services/media.service';

export const metadata = {
  title: 'Benefícios | Aquabion Brasil',
  description: 'Todos os benefícios da tecnologia Aquabion - Economia, sustentabilidade e performance',
};

export const revalidate = 60;

export default async function BenefitsPage() {
  const pageImages = await getPageImages();
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
    <div className="min-h-screen bg-slate-50 text-slate-950 py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto rounded-[2rem] bg-white border border-slate-200 p-12 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.18)] text-center mb-16">
          <Link href="/" className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 mb-6">
            ← Voltar para a página inicial
          </Link>
          <h1 className="text-4xl md:text-6xl font-semibold mb-6">Benefícios da tecnologia Aquabion</h1>
          <p className="text-lg leading-8 text-slate-600 mx-auto max-w-3xl">
            Resultados mensuráveis com menor custo, maior confiabilidade e impacto ambiental reduzido.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
          {benefits.map((benefit, index) => (
            <div key={index} className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1">
              <benefit.icon className="w-12 h-12 text-cyan-600 mb-6" />
              <h3 className="text-2xl font-semibold mb-4 text-slate-950">{benefit.title}</h3>
              <p className="text-slate-600 leading-7">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Showcase Image */}
        <div className="mb-16 relative">
          <ImageCard 
            locationId="benefits_showcase"
            imageUrl={getPageImageUrl('benefits_showcase', pageImages)}
            publicId={pageImages['benefits_showcase']?.publicId}
            aspectRatio="video"
            className="w-full max-h-[450px] object-cover"
          />
          <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-cyan-100/50 rounded-full blur-3xl -z-10 pointer-events-none" />
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-12 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.18)] mb-16">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold mb-6">Comparativo de mercado</h2>
              <p className="text-lg leading-8 text-slate-600 mb-8">
                Veja como a solução Aquabion entrega desempenho superior sem custos adicionais ou riscos ambientais.
              </p>
              <ul className="space-y-4 text-slate-600">
                {[
                  'CAPEX médio, OPEX reduzido',
                  'Zero consumo de água extra',
                  'Sem manutenção frequente',
                  'Impacto ambiental positivo',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="py-4 px-4 text-cyan-600 font-semibold">Critério</th>
                    <th className="py-4 px-4 text-cyan-950 font-semibold text-center">Aquabion</th>
                  </tr>
                </thead>
                <tbody className="text-slate-600">
                  {['OPEX', 'Consumo de água', 'Manutenção', 'Impacto ambiental'].map((row, i) => (
                    <tr key={i} className="border-b border-slate-200">
                      <td className="py-4 px-4">{row}</td>
                      <td className="py-4 px-4 text-center font-semibold text-slate-950">Zero</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link href="/contato">
            <Button size="lg" className="h-14 px-10 text-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold">
              Agendar Diagnóstico Técnico
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
