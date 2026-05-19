import Link from 'next/link';
import { Zap, Droplets, Leaf, Shield, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Tecnologia | Aquabion Brasil',
  description: 'Como funciona a tecnologia patenteada Aquabion - Engenharia galvânica passiva',
};

export default function TechnologyPage() {
  const steps = [
    {
      number: '01',
      title: 'Ionização galvânica',
      description: 'Células galvânicas criam um campo eletroquímico natural que modifica a estrutura dos minerais na água.',
      icon: Zap,
    },
    {
      number: '02',
      title: 'Transformação cristalina',
      description: 'A calcita se transforma em aragonita, uma estrutura não aderente que permanece em suspensão.',
      icon: Droplets,
    },
    {
      number: '03',
      title: 'Proteção contínua',
      description: 'Sistema passivo funciona 24/7 sem energia, manutenção ou produtos químicos.',
      icon: Shield,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 py-24">
      <div className="container mx-auto px-6">
        <div className="mb-16 max-w-4xl rounded-[2rem] bg-white border border-slate-200 p-12 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.18)]">
          <Link href="/" className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 mb-6">
            ← Voltar para a página inicial
          </Link>
          <h1 className="text-4xl md:text-6xl font-semibold mb-6">
            Como funciona a tecnologia Aquabion
          </h1>
          <p className="text-lg leading-8 text-slate-600 max-w-3xl">
            Engenharia galvânica passiva que transforma a estrutura dos minerais na água, eliminando incrustações e corrosão de forma 100% sustentável.
          </p>
        </div>

        <div className="space-y-12 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="grid gap-12 lg:grid-cols-2 items-center">
              <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="relative rounded-[2rem] border border-slate-200 bg-white p-10 shadow-sm">
                  <span className="absolute -top-6 left-0 text-8xl font-bold text-slate-900/5">{step.number}</span>
                  <step.icon className="w-16 h-16 text-cyan-600 mb-6 relative z-10" />
                  <h3 className="text-3xl font-semibold mb-4 relative z-10">{step.title}</h3>
                  <p className="text-lg leading-8 text-slate-600 relative z-10">{step.description}</p>
                </div>
              </div>
              <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="aspect-square rounded-[2rem] border border-slate-200 bg-slate-100 flex items-center justify-center shadow-sm">
                  <Leaf className="w-32 h-32 text-cyan-500/50" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-12 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.18)]">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">Sistema passivo, resultados ativos</h2>
          <p className="text-lg leading-8 text-slate-600 mb-8 max-w-3xl">
            Sem energia, sem manutenção e sem produtos químicos. Apenas previsibilidade operacional e proteção contínua.
          </p>
          <div className="grid gap-6 md:grid-cols-3 mb-8">
            {[
              { title: 'Zero energia', desc: 'Operação sem consumo elétrico' },
              { title: 'Zero manutenção', desc: 'Nenhuma intervenção regular necessária' },
              { title: 'Zero química', desc: '100% sustentável e segura' },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-slate-950 mb-2">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
          <Link href="/contato">
            <Button size="lg" className="h-14 px-10 text-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold">
              Agendar Diagnóstico Técnico
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
