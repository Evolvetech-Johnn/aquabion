import Link from 'next/link';
import { CheckCircle, TrendingUp, Droplets, Award } from 'lucide-react';
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
    <div className="min-h-screen bg-[#071B34] text-white py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Link href="/" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-6">
            ← Voltar para a página inicial
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Cases de Sucesso
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Milhares de empresas ao redor do mundo já transformaram sua gestão hídrica
            com a tecnologia Aquabion.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {cases.map((caseStudy, index) => (
            <div key={index} className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all duration-300">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{caseStudy.company}</h3>
                  <p className="text-slate-400">{caseStudy.location}</p>
                  <span className="inline-block mt-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-sm">
                    {caseStudy.segment}
                  </span>
                </div>
                <Award className="w-10 h-10 text-amber-400" />
              </div>

              <div className="mb-6 space-y-3">
                {caseStudy.results.map((result, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
                    <span className="text-slate-300">{result}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-emerald-400" />
                  <div>
                    <p className="text-slate-400 text-sm">Economia Anual Estimada</p>
                    <p className="text-2xl font-bold text-white">{caseStudy.savings}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center p-12 rounded-3xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {[
              { number: '+50', label: 'Países Atendidos' },
              { number: '100K+', label: 'Instalações Globais' },
              { number: '25+', label: 'Anos de Mercado' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-5xl font-bold text-cyan-400 mb-2">{stat.number}</div>
                <div className="text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>

          <h2 className="text-3xl font-bold mb-6">
            Seja o Próximo Case de Sucesso
          </h2>
          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Agende seu diagnóstico técnico e descubra quanto sua empresa pode economizar
            com a tecnologia Aquabion.
          </p>
          <Link href="/contato">
            <Button size="lg" className="h-14 px-10 text-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold">
              Agendar Diagnóstico
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
