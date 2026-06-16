import BlogPostClient from '../BlogPostClient';

export const metadata = {
  title: 'O impacto da água limpa na indústria | Aquabion Brasil',
  description:
    'Veja como a qualidade da água influencia custos, eficiência e ciclos de manutenção em empresas de alto desempenho.',
};

export default function ImpactoAguaPage() {
  return (
    <BlogPostClient
      title="O impacto da água limpa na indústria"
      subtitle="Veja como a qualidade da água influencia custos, eficiência e ciclos de manutenção em empresas de alto desempenho."
      content={
        <div className="space-y-6 text-slate-700 leading-relaxed">
          <p>
            A água é um insumo estratégico em quase todos os setores industriais — desde alimentício até farmacêutico,
            passando por química, siderurgia e geração de energia. Mas sua influência vai muito além de simples
            disponibilidade: a qualidade da água afeta diretamente a competitividade e a longevidade das plantas.
          </p>
          <h3 className="text-xl font-semibold text-slate-900">Por que incrustações são um risco crítico?</h3>
          <p>
            Mesmo uma camada fina de calcário pode causar:
          </p>
          <ul className="list-disc ml-6 space-y-2">
            <li><strong>Perda de eficiência de troca térmica</strong> — até 30% de aumento no consumo de energia em caldeiras;</li>
            <li><strong>Redução da vida útil dos equipamentos</strong> — acelerando desgaste e corrosão;</li>
            <li><strong>Downtime programado</strong> — horas paradas para limpeza periódica;</li>
            <li><strong>Risco de falha catastrófica</strong> — especialmente em sistemas de alta pressão e temperatura.</li>
          </ul>
          <p>
            Tudo isso se transforma em custos diretos e indiretos que muitas vezes passam despercebidos.
          </p>
          <h3 className="text-xl font-semibold text-slate-900">O que água tratada significa para sua operação</h3>
          <p>
            Quando a água é tratada passivamente com o Aquabion, observa-se:
          </p>
          <ul className="list-disc ml-6 space-y-2">
            <li><strong>Menor consumo de energia</strong> — equipamentos operam em temperatura ideal;</li>
            <li><strong>Menos manutenção corretiva</strong> — redução de interrupções não planejadas;</li>
            <li><strong>Menos custos com limpeza</strong> — intervalos entre manutenções aumentam drasticamente;</li>
            <li><strong>Prolongamento da vida útil das instalações</strong> — investimento que se paga ao longo dos anos.</li>
          </ul>
          <p>
            Em resumo: investir em tratamento de água não é gasto, é proteção do seu ativo mais estratégico.
          </p>
        </div>
      }
    />
  );
}
