import Link from 'next/link';
import { CheckCircle, TrendingUp, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Cases de Sucesso | Aquabion Brasil',
  description: 'Cases de sucesso da tecnologia Aquabion ao redor do mundo',
};

export default function CasesPage() {
  const cases = [
    {
      company: 'Fábrica de Bebidas',
      location: 'São Paulo, Brasil',
      segment: 'Indústria',
      results: [
        'Redução de 42% no consumo energético',
        'Eliminação de custos com limpeza química',
        'Aumento de 3x na vida útil das caldeiras',
      ],
      savings: 'R$ 1,2M / ano',
    },
    {
      company: 'Hotel Resort 5 Estrelas',
      location: 'Rio de Janeiro, Brasil',
      segment: 'Hotelaria',
      results: [
        'Redução de 35% nos custos de manutenção',
        'Eliminação de incrustações nas duchas',
        'Melhoria significativa na experiência do hóspede',
      ],
      savings: 'R$ 450K / ano',
    },
    {
      company: 'Hospital Geral',
      location: 'Belo Horizonte, Brasil',
      segment: 'Hospitalar',
      results: [
        'Conformidade total com normas sanitárias',
        'Redução de 50% na manutenção preventiva',
        'Proteção completa de equipamentos médicos',
      ],
      savings: 'R$ 800K / ano',
    },
    {
      company: 'Complexo Industrial',
      location: 'Munique, Alemanha',
      segment: 'Indústria',
      results: [
        'Redução de 48% no consumo de energia',
        'ROI em 18 meses',
        'Certificação ambiental premium',
      ],
      savings: '€ 320K / ano',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto rounded-[2rem] bg-white border border-slate-200 p-12 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.18)] text-center mb-16">
          <Link href="/" className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 mb-6">
            ← Voltar para a página inicial
          </Link>
          <h1 className="text-4xl md:text-6xl font-semibold mb-6">Cases de sucesso</h1>
          <p className="text-lg leading-8 text-slate-600 mx-auto max-w-3xl">
            Empresas de alto impacto já reduziram custos e ampliaram eficiência com Aquabion.
          </p>
        </div>

        {/* Cases Grid */}
        <div className="grid gap-8 md:grid-cols-2 mb-16">
          {cases.map((caseStudy, index) => (
            <div
              key={index}
              className="relative rounded-[1.75rem] bg-white/30 backdrop-blur-xl border border-white/20 p-8 shadow-lg transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="flex items-start justify-between mb-6 gap-6">
                <div>
                  <h3 className="text-2xl font-semibold mb-2 text-slate-950 font-inter">{caseStudy.company}</h3>
                  <p className="text-slate-600 mb-2 font-inter">{caseStudy.location}</p>
                  <span className="inline-flex rounded-full bg-cyan-50 px-3 py-1 text-sm font-medium text-cyan-700">{caseStudy.segment}</span>
                </div>
                <Award className="w-10 h-10 text-amber-500" />
              </div>

              <div className="mb-6 space-y-3 text-slate-600">
                {caseStudy.results.map((result, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-1" />
                    <span className="font-inter">{result}</span>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5 backdrop-filter backdrop-blur-lg">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-emerald-500" />
                  <div>
                    <p className="text-sm text-slate-600 font-inter">Economia anual estimada</p>
                    <p className="text-2xl font-semibold text-slate-950 font-inter">{caseStudy.savings}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-r from-cyan-100 to-cyan-200 p-12 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.18)] text-center">
          <div className="grid gap-8 md:grid-cols-3 mb-8">
            {[
              { number: '+50', label: 'Países atendidos' },
              { number: '100K+', label: 'Instalações globais' },
              { number: '25+', label: 'Anos de mercado' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-semibold text-cyan-600 mb-2 font-inter">{stat.number}</div>
                <div className="text-slate-600 font-inter">{stat.label}</div>
              </div>
            ))}
          </div>
          <h2 className="text-3xl font-semibold mb-6">Seja o próximo case de sucesso</h2>
          <p className="text-lg leading-8 text-slate-600 mb-8 max-w-3xl mx-auto font-inter">
            Agende seu diagnóstico técnico e descubra como sua empresa pode economizar com água mais limpa e processos mais confiáveis.
          </p>
          <Link href="/contato">
            <Button size="lg" className="h-14 px-10 text-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition-colors">
              Agendar diagnóstico
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
