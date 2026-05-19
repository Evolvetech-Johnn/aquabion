import Link from 'next/link';
import { TrendingUp, Droplets, Zap, Shield, Leaf, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Benefícios | Aquabion Brasil',
  description: 'Todos os benefícios da tecnologia Aquabion - Economia, sustentabilidade e performance',
};

export default function BenefitsPage() {
  const benefits = [
    {
      icon: TrendingUp,
      title: 'Redução de Custos',
      description: 'Economia de até 50% no consumo energético e eliminação de custos com produtos químicos e manutenção.',
    },
    {
      icon: Droplets,
      title: 'Zero Desperdício Hídrico',
      description: 'Nenhuma água é desperdiçada no processo, diferente de outras tecnologias como osmose reversa.',
    },
    {
      icon: Zap,
      title: 'Aumento de Vida Útil',
      description: 'Equipamentos duram de 5 a 10 vezes mais, protegidos contra incrustações e corrosão.',
    },
    {
      icon: Shield,
      title: 'Manutenção Zero',
      description: 'Sistema passivo sem necessidade de intervenções, reposição de peças ou manutenção contínua.',
    },
    {
      icon: Leaf,
      title: '100% Sustentável',
      description: 'Nenhum produto químico, zero energia, impacto ambiental positivo e créditos de carbono.',
    },
    {
      icon: Clock,
      title: 'ROI Rápido',
      description: 'Retorno do investimento em menos de 24 meses, com resultados imediatos.',
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
            Benefícios da Tecnologia
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Resultados mensuráveis que transformam a operação e o balanço da sua empresa.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div key={index} className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/50 hover:bg-white/10 transition-all duration-300">
              <benefit.icon className="w-12 h-12 text-cyan-400 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold mb-4">{benefit.title}</h3>
              <p className="text-slate-400 text-lg leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="p-12 rounded-3xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Comparativo de Mercado
              </h2>
              <p className="text-lg text-slate-400 mb-8">
                Veja como a tecnologia Aquabion se compara a outras soluções do mercado:
              </p>
              <ul className="space-y-4">
                {[
                  'CAPEX médio, OPEX zero',
                  'Zero consumo de água',
                  'Zero manutenção',
                  'Impacto ambiental positivo',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6 rounded-2xl bg-white/10 border border-white/20">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="py-4 px-4 text-cyan-400 font-bold">Critério</th>
                    <th className="py-4 px-4 text-emerald-400 font-bold text-center">Aquabion</th>
                  </tr>
                </thead>
                <tbody className="text-slate-400">
                  {['OPEX', 'Consumo Água', 'Manutenção', 'Impacto Ambiental'].map((row, i) => (
                    <tr key={i} className="border-b border-white/10">
                      <td className="py-4 px-4">{row}</td>
                      <td className="py-4 px-4 text-center font-semibold text-white">Zero</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <Link href="/contato">
            <Button size="lg" className="h-14 px-10 text-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold">
              Agendar Diagnóstico Técnico
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
