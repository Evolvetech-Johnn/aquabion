import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import BudgetForm from '@/components/BudgetForm';
import Reveal from '@/components/ui/Reveal';
import { Metadata } from 'next';

const validTypes = ['residencial', 'comercial', 'industrial'] as const;
type BudgetType = typeof validTypes[number];

export function generateStaticParams() {
  return validTypes.map((tipo) => ({
    tipo,
  }));
}

export async function generateMetadata(
  props: { params: Promise<{ tipo: string }> }
): Promise<Metadata> {
  const params = await props.params;
  const tipo = params.tipo;
  if (!validTypes.includes(tipo as BudgetType)) return {};
  
  const title = tipo.charAt(0).toUpperCase() + tipo.slice(1);
  return {
    title: `Orçamento ${title} | Aquabion Brasil`,
    description: `Solicite um orçamento ${tipo} para soluções de tratamento de água Aquabion.`,
  };
}

export default async function OrcamentoPage(
  props: { params: Promise<{ tipo: string }> }
) {
  const params = await props.params;
  const tipo = params.tipo as BudgetType;

  if (!validTypes.includes(tipo)) {
    notFound();
  }

  const titleMap = {
    residencial: 'Orçamento Residencial',
    comercial: 'Orçamento Comercial',
    industrial: 'Orçamento Industrial',
  };

  const descriptionMap = {
    residencial: 'Proteja sua casa ou apartamento com a tecnologia Aquabion. Ideal para residências e pequenos edifícios.',
    comercial: 'Soluções customizadas para hotéis, shoppings e comércios. Evite manutenções e paradas não programadas.',
    industrial: 'Alta performance para indústrias e usinas. Dimensionamento técnico para máxima eficiência e ROI rápido.',
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 pt-20">
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <Reveal>
            <Link href="/" className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 mb-8 transition-colors">
              <ChevronLeft className="w-4 h-4" />
              Voltar para a página inicial
            </Link>
          </Reveal>

          <div className="grid gap-10 lg:gap-14 lg:grid-cols-2 items-start">
            <Reveal>
              <div className="premium-card">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-cyan-600">
                  {titleMap[tipo]}
                </h1>
                <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-10 max-w-lg">
                  {descriptionMap[tipo]}
                </p>
                <div className="space-y-6 mt-8">
                  <h3 className="text-xl font-bold">Por que escolher Aquabion?</h3>
                  <ul className="space-y-4">
                    <li className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-700 font-bold shrink-0">✓</div>
                      <span className="text-slate-600">Zero energia e zero produtos químicos.</span>
                    </li>
                    <li className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-700 font-bold shrink-0">✓</div>
                      <span className="text-slate-600">Fácil instalação, sem interrupção de processos.</span>
                    </li>
                    <li className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-700 font-bold shrink-0">✓</div>
                      <span className="text-slate-600">Previne incrustações e reduz custos operacionais.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="premium-card bg-white shadow-xl">
                <BudgetForm budgetType={tipo} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
