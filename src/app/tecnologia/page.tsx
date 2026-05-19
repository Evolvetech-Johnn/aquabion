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
      title: 'Ionização Galvânica',
      description: 'Células galvânicas criam um campo eletroquímico natural que modifica a estrutura dos minerais na água.',
      icon: Zap,
    },
    {
      number: '02',
      title: 'Transformação Cristalina',
      description: 'A calcita (que forma incrustações) é transformada em aragonita, uma estrutura não aderente que permanece em suspensão.',
      icon: Droplets,
    },
    {
      number: '03',
      title: 'Proteção Contínua',
      description: 'Sistema passivo funciona 24/7 sem energia, sem manutenção e sem produtos químicos.',
      icon: Shield,
    },
  ];

  return (
    <div className="min-h-screen bg-[#071B34] text-white py-24">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <Link href="/" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-6">
            ← Voltar para a página inicial
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Como Funciona a Tecnologia
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl">
            Engenharia galvânica passiva que transforma a estrutura dos minerais na água,
            eliminando incrustações e corrosão de forma 100% sustentável.
          </p>
        </div>

        <div className="space-y-12 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="grid lg:grid-cols-2 gap-12 items-center">
              <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="relative">
                  <div className="absolute -top-8 -left-4 text-8xl font-bold text-white/5">{step.number}</div>
                  <step.icon className="w-16 h-16 text-cyan-400 mb-6 relative z-10" />
                  <h3 className="text-3xl font-bold mb-4 relative z-10">{step.title}</h3>
                  <p className="text-lg text-slate-400 leading-relaxed relative z-10">
                    {step.description}
                  </p>
                </div>
              </div>
              <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="aspect-square rounded-3xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center">
                  <Leaf className="w-32 h-32 text-cyan-400/50" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-12 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Sistema Passivo, Resultados Ativos
          </h2>
          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Sem energia, sem manutenção, sem produtos químicos. Apenas resultados.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              { title: 'Zero Energia', desc: 'Funciona sem consumo elétrico' },
              { title: 'Zero Manutenção', desc: 'Nenhuma intervenção necessária' },
              { title: 'Zero Química', desc: '100% sustentável' },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-xl bg-white/5 border border-white/10">
                <h3 className="text-xl font-bold text-emerald-400 mb-2">{item.title}</h3>
                <p className="text-slate-400">{item.desc}</p>
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
