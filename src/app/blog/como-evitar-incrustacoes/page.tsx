import BlogPostClient from '../BlogPostClient';

export const metadata = {
  title: 'Como evitar incrustações sem usar química | Aquabion Brasil',
  description:
    'Entenda por que o tratamento passivo com Aquabion é uma alternativa sustentável e confiável para grandes operações.',
};

export default function IncrustacoesPage() {
  return (
    <BlogPostClient
      title="Como evitar incrustações sem usar química"
      subtitle="Entenda por que o tratamento passivo com Aquabion é uma alternativa sustentável e confiável para grandes operações."
      content={
        <div className="space-y-6 text-slate-700 leading-relaxed">
          <p>
            Incrustações são um dos problemas mais comuns em sistemas de água, seja em indústrias, shoppings, hotéis ou
            residências. Formadas por deposições de carbonato de cálcio (CaCO₃) em superfícies quentes, elas afetam a
            eficiência de equipamentos como caldeiras, trocadores de calor e torres de resfriamento — elevando os custos
            operacionais e riscos de downtime não programado.
          </p>
          <h3 className="text-xl font-semibold text-slate-900">O que a indústria normalmente faz?</h3>
          <p>
            A solução tradicional para incrustações geralmente envolve:
          </p>
          <ul className="list-disc ml-6 space-y-2">
            <li>Tratamento químico com anti-incrustantes e dispersantes;</li>
            <li>Amaciadores de água baseados em troca iônica com resinas, que exigem sal e regeneração frequente;</li>
            <li>Limpeza física periódica, muitas vezes com ácidos ou jatos d&apos;água de alta pressão.</li>
          </ul>
          <p>
            Todas essas opções funcionam, mas têm custos recorrentes, riscos ambientais ou dependência de fornecedores.
          </p>
          <h3 className="text-xl font-semibold text-slate-900">
            Como o Aquabion resolve o problema sem química?
          </h3>
          <p>
            A tecnologia Aquabion é um tratamento físico/galvânico. Quando a água passa pelo equipamento, o ânodo de
            zinco-patenteado cria um campo eletroquímico que nucleia o cálcio dissolvido em microcristais de aragonita.
          </p>
          <ul className="list-disc ml-6 space-y-2">
            <li>Esses cristais são <strong>quimicamente inertes</strong> — não se depositam em superfícies;</li>
            <li>Permanecem em suspensão na água e são arrastados pelo fluxo;</li>
            <li>A água continua com todos os minerais essenciais (permanece potável);</li>
            <li>Não há adição de sódio, fosfatos ou qualquer outro produto químico.</li>
          </ul>
          <p>
            O resultado é um sistema limpo por anos, sem gastos mensais com insumos, sem manutenção complicada e sem
            impacto negativo sobre a qualidade da água.
          </p>
        </div>
      }
    />
  );
}
