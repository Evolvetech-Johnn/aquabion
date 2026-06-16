import BlogPostClient from '../BlogPostClient';

export const metadata = {
  title: 'Tecnologia alemã para processos mais previsíveis | Aquabion Brasil',
  description:
    'Conheça os princípios da tecnologia Aquabion e como ela entrega operação contínua sem energia ativa.',
};

export default function TecnologiaAlemaPage() {
  return (
    <BlogPostClient
      title="Tecnologia alemã para processos mais previsíveis"
      subtitle="Conheça os princípios da tecnologia Aquabion e como ela entrega operação contínua sem energia ativa."
      content={
        <div className="space-y-6 text-slate-700 leading-relaxed">
          <p>
            Originária de Düsseldorf, na Alemanha, a tecnologia Aquabion é um exemplo clássico de engenharia minimalista e
            altamente eficaz: resolve um problema complexo sem adição de energia, produtos químicos ou manutenção
            recorrente.
          </p>
          <h3 className="text-xl font-semibold text-slate-900">Princípios fundamentais do Aquabion</h3>
          <p>
            O coração do equipamento é um ânodo de zinco com liga metálica especial, patenteada. Quando a água flui pelo
            reator:
          </p>
          <ul className="list-disc ml-6 space-y-2">
            <li>O contato entre a água e a liga metálica induz uma corrente galvânica de baixo potencial;</li>
            <li>Essa corrente nucleia os íons de cálcio em microcristais de aragonita, com tamanho micrométrico;</li>
            <li>A mesma corrente libera íons de zinco em doses mínimas, que protegem as tubulações contra corrosão.</li>
          </ul>
          <p>
            Todo o processo é físico-químico, passivo, e depende apenas do fluxo da água.
          </p>
          <h3 className="text-xl font-semibold text-slate-900">Por que a confiabilidade alemã importa?</h3>
          <p>
            A Aquabion é certificada e testada por laboratórios independentes europeus, garantindo:
          </p>
          <ul className="list-disc ml-6 space-y-2">
            <li><strong>Segurança sanitária</strong> — permanece potável para consumo humano;</li>
            <li><strong>Consistência de performance</strong> — operação segura ao longo de anos;</li>
            <li><strong>Durabilidade</strong> — vida útil média de 7 a 10 anos, dependendo da água e do volume;</li>
            <li><strong>Baixo custo total de propriedade</strong> — sem insumos, sem manutenção programada.</li>
          </ul>
          <p>
            É por isso que a tecnologia é escolhida por operações globais que não toleram surpresas em seu fluxo de
            produção.
          </p>
        </div>
      }
    />
  );
}
