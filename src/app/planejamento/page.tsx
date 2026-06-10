import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Planejamento Estratégico',
  description: 'Planejamento estratégico da Aquabion Brasil para expansão 2026-2028.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function PlanejamentoPage() {
  return (
    <div className="font-sans antialiased">
      {/* CAPA */}
      <section className="py-24 bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-950 text-white">
        <div className="container mx-auto px-6">
          <Link href="/" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8">
            ← Voltar para a página inicial
          </Link>
          
          <div className="max-w-4xl">
            <div className="inline-block px-4 py-2 bg-white/10 rounded-full text-sm font-medium text-cyan-300 mb-6">
              Documento Estratégico Confidencial · 2026
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-6">
              Plano Estratégico<br />
              <span className="text-cyan-400">Aquabion Brasil</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-2xl">
              Expansão de tecnologia alemã de tratamento de água no Brasil<br />
              com foco inicial em Londrina — PR
            </p>
            
            <div className="flex flex-wrap gap-8 items-center">
              <div>
                <div className="text-sm text-slate-400 mb-1">Horizonte</div>
                <div className="text-2xl font-semibold">2026 – 2028</div>
              </div>
              <div className="w-px h-12 bg-slate-700" />
              <div>
                <div className="text-sm text-slate-400 mb-1">Fase Piloto</div>
                <div className="text-2xl font-semibold">Londrina, PR</div>
              </div>
              <div className="w-px h-12 bg-slate-700" />
              <div>
                <div className="text-sm text-slate-400 mb-1">Expansão</div>
                <div className="text-2xl font-semibold">Brasil Nacional</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ANÁLISE DE SITUAÇÃO */}
      <section className="py-24 bg-slate-950 text-white">
        <div className="container mx-auto px-6">
          <div className="text-sm uppercase tracking-[0.3em] text-cyan-400 mb-4">Diagnóstico</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6">Análise de Situação</h2>
          <p className="text-xl text-slate-400 max-w-3xl mb-12">
            A Aquabion chega ao Brasil com credenciais globais sólidas, mas enfrenta um mercado ainda desconhecedor
            da tecnologia galvânica passiva. Entender esse cenário é o ponto de partida do planejamento.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                label: 'Forças',
                color: 'border-emerald-500/30 bg-emerald-500/10',
                items: [
                  'Tecnologia patenteada com +25 anos de P&D alemão',
                  'Presença em +50 países e +100 mil instalações globais',
                  'Operação 100% passiva: zero energia, zero química, zero manutenção',
                  'ROI comprovado em menos de 24 meses',
                  'Sede brasileira em Londrina com presença em SP e SC',
                  'Site profissional com posicionamento B2B claro'
                ]
              },
              {
                label: 'Fraquezas',
                color: 'border-amber-500/30 bg-amber-500/10',
                items: [
                  'Tecnologia desconhecida no mercado brasileiro',
                  'Ausência de cases nacionais publicados no site',
                  'Equipe comercial possivelmente reduzida para expansão nacional',
                  'Ciclo de venda longo (decisão B2B técnica e financeira)',
                  'Necessidade de educar o mercado antes de vender'
                ]
              },
              {
                label: 'Oportunidades',
                color: 'border-cyan-500/30 bg-cyan-500/10',
                items: [
                  'Agronegócio paranaense e paulista de alto potencial',
                  'Crescente pressão por ESG e sustentabilidade nas empresas',
                  'Hospitais, frigoríficos e indústrias com alto consumo de água',
                  'Londrina como hub regional de serviços e saúde',
                  'Condomínios e hotéis premium em expansão no PR',
                  'Linhas de crédito verde (BNDES, Finam) disponíveis'
                ]
              },
              {
                label: 'Ameaças',
                color: 'border-rose-500/30 bg-rose-500/10',
                items: [
                  'Concorrência de tratamentos químicos com preço menor aparente',
                  'Ceticismo técnico de engenheiros habituados a soluções tradicionais',
                  'Ciclo econômico afetando capex industrial',
                  'Falsificações ou soluções similares de baixa qualidade'
                ]
              }
            ].map((item, i) => (
              <div key={i} className={`rounded-2xl border p-8 ${item.color}`}>
                <div className="text-xl font-semibold mb-4">{item.label}</div>
                <ul className="space-y-3 text-slate-300">
                  {item.items.map((point, j) => (
                    <li key={j} className="flex gap-3">
                      <span className="text-cyan-400 mt-1">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VISÃO, MISSÃO E VALORES */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-sm uppercase tracking-[0.3em] text-cyan-600 mb-4">Propósito</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-950 mb-12">Visão · Missão · Valores</h2>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: '◎',
                type: 'Visão',
                text: 'Ser a referência nacional em tratamento de água sustentável até 2030, com a Aquabion reconhecida como o padrão-ouro para indústrias, agronegócio e serviços que buscam eficiência hídrica sem química.'
              },
              {
                icon: '◈',
                type: 'Missão',
                text: 'Proteger infraestruturas hídricas com tecnologia galvânica passiva alemã, gerando economia real, aumentando a vida útil de equipamentos e contribuindo para um Brasil mais sustentável.'
              },
              {
                icon: '◇',
                type: 'Valores',
                text: 'Sustentabilidade acima do lucro imediato · Transparência técnica nas métricas · Excelência na entrega · Parceria de longo prazo com clientes · Educação de mercado como diferencial competitivo.'
              }
            ].map((item, i) => (
              <div key={i} className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="text-4xl text-cyan-500 mb-4">{item.icon}</div>
                <div className="text-lg font-semibold text-slate-950 mb-3">{item.type}</div>
                <p className="text-slate-600 leading-8">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OBJETIVOS ESTRATÉGICOS */}
      <section className="py-24 bg-slate-950 text-white">
        <div className="container mx-auto px-6">
          <div className="text-sm uppercase tracking-[0.3em] text-cyan-400 mb-4">O que precisa acontecer</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6">Objetivos Estratégicos</h2>
          <p className="text-xl text-slate-400 max-w-3xl mb-12">
            Seis objetivos fundamentais que determinam o sucesso total do projeto no Brasil.
          </p>

          <div className="space-y-8 max-w-4xl">
            {[
              {
                num: '01',
                title: 'Estabelecer autoridade técnica no mercado',
                text: 'O mercado brasileiro precisa confiar na tecnologia antes de comprar. Certificações, laudos técnicos nacionais, parceria com universidades (UEL, UEM) e publicações em revistas especializadas são essenciais para vencer o ceticismo de engenheiros e gestores técnicos.',
                kpi: 'KPI: 3 estudos de caso nacionais publicados até Dez/2026'
              },
              {
                num: '02',
                title: 'Conquistar os primeiros clientes-âncora em Londrina',
                text: 'Clientes-âncora são aqueles que emprestam credibilidade ao negócio. Um hospital de referência, uma grande indústria ou cooperativa agrícola com caso documentado valem mais do que 50 pequenas vendas. A conquista desses clientes deve ser a prioridade absoluta de 2026.',
                kpi: 'KPI: 5 instalações âncora em Londrina até Jun/2027'
              },
              {
                num: '03',
                title: 'Estruturar rede de parceiros e revendedores regionais',
                text: 'Um único time comercial não consegue cobrir o Brasil. É necessário criar um programa de parceiros técnicos — empresas de engenharia hidráulica, instaladores certificados e distribuidores industriais — que atuem como braço comercial da Aquabion em cada região.',
                kpi: 'KPI: 8 parceiros certificados no Paraná até Dez/2027'
              },
              {
                num: '04',
                title: 'Criar motor de geração de leads qualificados digital',
                text: 'O site atual é profissional mas passivo. É preciso transformá-lo em uma máquina de geração de demanda: SEO técnico para termos de incrustação e tratamento de água, conteúdo educativo (blog ativo), calculadora de ROI interativa e campanhas de anúncios direcionados ao B2B industrial.',
                kpi: 'KPI: 50 leads qualificados/mês até Mar/2027'
              },
              {
                num: '05',
                title: 'Atingir sustentabilidade financeira na operação brasileira',
                text: 'A operação brasileira precisa se autofinanciar até o fim de 2027. Isso exige pricing correto, mix de produtos (instalações grandes vs. pequenas), e controle rigoroso de custo de aquisição de cliente. Modelos de financiamento via leasing ou performance contracts devem ser explorados.',
                kpi: 'KPI: Break-even operacional até Dez/2027'
              },
              {
                num: '06',
                title: 'Expandir para os 3 principais mercados brasileiros',
                text: 'Após consolidar Londrina e o Paraná, a expansão para São Paulo (indústria e hospitais), Mato Grosso/MT (agronegócio) e Rio Grande do Sul (frigoríficos e agroindústria) deve ser executada com o modelo de parceiros já testado e validado.',
                kpi: 'KPI: Presença ativa em SP, MT e RS até Dez/2028'
              }
            ].map((obj, i) => (
              <div key={i} className="flex gap-6 items-start">
                <div className="text-4xl font-bold text-cyan-400 min-w-[80px]">{obj.num}</div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-semibold mb-3">{obj.title}</h3>
                  <p className="text-slate-300 leading-8 mb-4">{obj.text}</p>
                  <div className="inline-block px-4 py-2 bg-cyan-500/10 text-cyan-400 rounded-full text-sm font-medium">
                    {obj.kpi}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLANO DE AÇÃO: LONDRINA */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-sm uppercase tracking-[0.3em] text-cyan-600 mb-4">Fase 1 · 2026</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-950 mb-6">Plano de Ação: Londrina</h2>
          <p className="text-xl text-slate-600 max-w-3xl mb-12">
            Londrina é o epicentro. Capital regional do norte do Paraná, com forte presença industrial, agronegócio, saúde e serviços. Aqui se constrói o modelo replicável.
          </p>

          <div className="space-y-12 max-w-5xl">
            {[
              {
                tag: 'Q3 2026 · Meses 1–3',
                title: 'Fundação e Primeiros Contatos',
                actions: [
                  'Mapeamento de prospects em Londrina — Levantar lista das 50 maiores indústrias, hospitais, hotéis, condomínios e cooperativas agrícolas da região com decisores identificados (engenheiro de manutenção, gerente de facilities, diretor industrial).',
                  'Parceria com ACIL e ACIMAPAR — Ingressar nas associações comerciais e industriais de Londrina para acesso a rede de empresários e participação em eventos do setor.',
                  'Kit de vendas técnico nacional — Criar material de apresentação em português com dados de hardness da água de Londrina e Paraná, comparativos com tratamentos químicos locais e simulador de economia personalizado.',
                  'Aproximação com UEL (Universidade Estadual de Londrina) — Propor estudo técnico conjunto com departamentos de Engenharia Civil ou Química para validação científica da tecnologia nas condições locais.'
                ],
                meta: '🎯 Meta: 30 reuniões de diagnóstico agendadas'
              },
              {
                tag: 'Q4 2026 · Meses 4–6',
                title: 'Primeiras Instalações e Prova Social',
                actions: [
                  'Programa piloto com 3–5 clientes estratégicos — Oferecer condições comerciais especiais para primeiros clientes-âncora em troca de autorização para case documentado com antes/depois, fotos e métricas de economia.',
                  'Segmentos prioritários em Londrina: Hospital Universitário / Santa Casa (saúde); Frigoríficos e laticínios da região (agro-industrial); Hotéis e flats do centro (hospitalidade); Grandes condomínios no Gleba e Higienópolis (residencial).',
                  'Evento técnico presencial em Londrina — Organizar seminário de 2h com engenheiros e gestores, demonstração prática da tecnologia e apresentação de cases internacionais. Parceria com CREA-PR para contar como hora técnica.',
                  'Publicação de cases no site — Documentar as primeiras instalações com fotos, dados de qualidade da água e cálculo de economia gerada. Essencial para converter futuros leads.'
                ],
                meta: '🎯 Meta: 5 instalações realizadas · 2 cases publicados'
              },
              {
                tag: 'Q1–Q2 2027 · Meses 7–12',
                title: 'Escala Regional no Paraná',
                actions: [
                  'Recrutamento de parceiros técnicos — Selecionar 3–5 empresas de engenharia hidráulica ou manutenção industrial em Londrina, Maringá e Cascavel para atuar como revendedores certificados com treinamento técnico.',
                  'Atacar o agronegócio paranaense — Cooperativas como C.Vale, Cocamar, Copacol e Coopavel são alvos estratégicos. Apresentar ROI focado em irrigação, saúde animal e beneficiamento de grãos.',
                  'Participar de feiras regionais — Tecnoshow, Expoverde, Agrishow: eventos onde decisores do agronegócio concentram suas compras. Stand com demonstração ao vivo da tecnologia.',
                  'Plano de conteúdo digital em escala — Publicar 2 artigos técnicos/mês no blog, vídeos de instalação no YouTube, LinkedIn com cases e dados de ROI. Posicionar a Aquabion como educador do mercado.'
                ],
                meta: '🎯 Meta: 25 instalações no PR · 4 parceiros certificados'
              }
            ].map((phase, i) => (
              <div key={i} className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="flex items-center gap-4 mb-6 flex-wrap">
                  <div className="px-4 py-2 bg-cyan-50 text-cyan-700 rounded-full text-sm font-semibold">
                    {phase.tag}
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold text-slate-950">{phase.title}</h3>
                </div>
                <ul className="space-y-4 mb-6">
                  {phase.actions.map((action, j) => (
                    <li key={j} className="flex gap-4">
                      <span className="text-cyan-500 text-xl font-bold">▸</span>
                      <p className="text-slate-700 leading-8">{action}</p>
                    </li>
                  ))}
                </ul>
                <div className="inline-block px-6 py-3 bg-slate-100 rounded-full text-slate-800 font-medium">
                  {phase.meta}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ESTRATÉGIA DE MARKETING */}
      <section className="py-24 bg-slate-950 text-white">
        <div className="container mx-auto px-6">
          <div className="text-sm uppercase tracking-[0.3em] text-cyan-400 mb-4">Go-to-Market</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-12">Estratégia de Marketing e Vendas</h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                tag: 'Digital',
                title: 'SEO e Conteúdo Técnico',
                desc: 'Criar conteúdo otimizado para termos como "tratamento de incrustração industrial", "eliminação de calcário tubulação", "tratamento de água sem química". Blog ativo com 2 posts/mês, artigos técnicos em PDF para download (geração de leads).',
                horizon: 'Início: Imediato'
              },
              {
                tag: 'Digital',
                title: 'Calculadora de ROI Interativa',
                desc: 'Ferramenta no site onde o gestor insere dados da operação (consumo de água, tipo de equipamento, área, custo de energia) e recebe estimativa de economia em 12/24/36 meses. Principal gatilho de conversão para leads quentes.',
                horizon: 'Início: Mês 2'
              },
              {
                tag: 'Vendas',
                title: 'Diagnóstico Técnico Gratuito',
                desc: 'Transformar o "Agendar Diagnóstico" do site em um processo estruturado: visita técnica presencial, coleta de amostra da água local, análise de dureza e relatório personalizado com projeção de economia. Converte curiosos em compradores.',
                horizon: 'Início: Imediato'
              },
              {
                tag: 'Relacionamento',
                title: 'LinkedIn B2B e Autoridade',
                desc: 'Perfil da empresa ativo com publicações semanais sobre eficiência hídrica, ESG industrial e sustentabilidade. Foco em gestores industriais, engenheiros de manutenção e diretores de operações. Ads segmentados para Londrina e PR.',
                horizon: 'Início: Mês 1'
              },
              {
                tag: 'Parcerias',
                title: 'Engenheiros e Consultores',
                desc: 'Programa de indicação para engenheiros de manutenção, consultores de facilities e empresas de manutenção industrial. Comissão por indicação qualificada. Esses profissionais têm acesso privilegiado ao decisor de compra.',
                horizon: 'Início: Mês 3'
              },
              {
                tag: 'Eventos',
                title: 'Seminários Técnicos Regionais',
                desc: 'Evento próprio a cada 6 meses em Londrina. Formato: palestra técnica (45min) + demonstração + cases + networking. Parceria com CREA, SINDUSCON e ACIL para audiência qualificada de 50–100 decisores por evento.',
                horizon: 'Início: Mês 4'
              }
            ].map((item, i) => (
              <div key={i} className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
                <div className="inline-block px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-xs font-semibold mb-4">
                  {item.tag}
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-slate-300 leading-7 mb-4">{item.desc}</p>
                <div className="text-sm text-slate-400">{item.horizon}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEGMENTOS PRIORITÁRIOS */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-sm uppercase tracking-[0.3em] text-cyan-600 mb-4">Mercado</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-950 mb-12">Segmentos Prioritários em Londrina</h2>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left p-6 font-semibold text-slate-950">Segmento</th>
                  <th className="text-left p-6 font-semibold text-slate-950">Potencial</th>
                  <th className="text-left p-6 font-semibold text-slate-950">Dor Principal</th>
                  <th className="text-left p-6 font-semibold text-slate-950">Argumento de Venda</th>
                  <th className="text-left p-6 font-semibold text-slate-950">Ciclo de Venda</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { seg: 'Hospitais e Clínicas', pot: 'ALTO', color: 'bg-emerald-500/10 text-emerald-700', dor: 'Conformidade sanitária, alto custo de manutenção', arg: 'Sem química no sistema de água + redução de manutenção', ciclo: '3–6 meses' },
                  { seg: 'Frigoríficos e Laticínios', pot: 'ALTO', color: 'bg-emerald-500/10 text-emerald-700', dor: 'Incrustação em câmaras frias, consumo de energia', arg: 'Redução de energia + maior vida útil de equipamentos', ciclo: '2–4 meses' },
                  { seg: 'Hotéis e Resorts', pot: 'MÉDIO', color: 'bg-amber-500/10 text-amber-700', dor: 'Qualidade da água para hóspedes, piscinas', arg: 'Água de qualidade superior + redução de químicos em piscinas', ciclo: '1–3 meses' },
                  { seg: 'Condomínios Residenciais', pot: 'MÉDIO', color: 'bg-amber-500/10 text-amber-700', dor: 'Reclamação de moradores, bombas danificadas', arg: 'Redução de gastos do condomínio + menos manutenção', ciclo: '2–4 meses' },
                  { seg: 'Cooperativas Agrícolas', pot: 'ALTO', color: 'bg-emerald-500/10 text-emerald-700', dor: 'Entupimento de irrigação, saúde animal', arg: 'ROI em irrigação + redução de produtos químicos', ciclo: '3–6 meses' },
                  { seg: 'Indústrias Têxteis', pot: 'MÉDIO', color: 'bg-amber-500/10 text-amber-700', dor: 'Qualidade da água no processo produtivo', arg: 'Consistência do processo + economia de energia', ciclo: '3–5 meses' }
                ].map((row, i) => (
                  <tr key={i} className="border-b border-slate-100">
                    <td className="p-6 font-semibold text-slate-950">{row.seg}</td>
                    <td className="p-6">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${row.color}`}>
                        {row.pot}
                      </span>
                    </td>
                    <td className="p-6 text-slate-700">{row.dor}</td>
                    <td className="p-6 text-slate-700">{row.arg}</td>
                    <td className="p-6 text-slate-700">{row.ciclo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* METAS E KPIS */}
      <section className="py-24 bg-slate-950 text-white">
        <div className="container mx-auto px-6">
          <div className="text-sm uppercase tracking-[0.3em] text-cyan-400 mb-4">Métricas de Sucesso</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-12">Metas e KPIs por Período</h2>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                label: '2026 · Ano 1',
                title: 'Estabelecer',
                kpis: [
                  { val: '10', desc: 'instalações realizadas em Londrina' },
                  { val: '3', desc: 'cases documentados e publicados' },
                  { val: '1', desc: 'parceria universitária firmada (UEL)' },
                  { val: '50', desc: 'leads qualificados/mês via digital' },
                  { val: '2', desc: 'eventos técnicos realizados' }
                ]
              },
              {
                label: '2027 · Ano 2',
                title: 'Crescimento Regional',
                kpis: [
                  { val: '50', desc: 'instalações no Paraná' },
                  { val: '8', desc: 'parceiros técnicos certificados no PR' },
                  { val: 'Break-even', desc: 'operação financeiramente sustentável' },
                  { val: '3', desc: 'segmentos com pipeline maduro' },
                  { val: '200+', desc: 'leads qualificados/mês via digital' }
                ]
              },
              {
                label: '2028 · Ano 3',
                title: 'Expansão Nacional',
                kpis: [
                  { val: '200+', desc: 'instalações no Brasil' },
                  { val: '3', desc: 'novos estados com presença ativa (SP, MT, RS)' },
                  { val: '20+', desc: 'parceiros técnicos no Brasil' },
                  { val: 'Top 3', desc: 'ranking Google para termos de tratamento de água' },
                  { val: '+30%', desc: 'crescimento de receita anual' }
                ]
              }
            ].map((period, i) => (
              <div key={i} className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
                <div className="text-sm text-cyan-400 mb-2">{period.label}</div>
                <div className="text-xl md:text-2xl font-semibold mb-6">{period.title}</div>
                <ul className="space-y-4">
                  {period.kpis.map((kpi, j) => (
                    <li key={j} className="border-l-2 border-cyan-500 pl-4">
                      <div className="text-xl md:text-2xl font-bold mb-1">{kpi.val}</div>
                      <div className="text-sm text-slate-400">{kpi.desc}</div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RISCOS E MITIGAÇÕES */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-sm uppercase tracking-[0.3em] text-cyan-600 mb-4">Gestão de Riscos</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-950 mb-12">Riscos e Planos de Mitigação</h2>

          <div className="space-y-6 max-w-4xl">
            {[
              {
                level: 'Alto',
                color: 'border-l-emerald-500 bg-emerald-50',
                textColor: 'text-emerald-700',
                title: 'Resistência técnica do mercado à tecnologia desconhecida',
                scenario: 'Engenheiros e gestores rejeitam a proposta por desconhecimento ou ceticismo sobre tecnologia galvânica passiva.',
                mitigation: 'Investir pesado em educação técnica: parceria universitária, publicações no CREA, eventos com demonstração prática e política de "piloto com garantia de resultado".'
              },
              {
                level: 'Médio',
                color: 'border-l-amber-500 bg-amber-50',
                textColor: 'text-amber-700',
                title: 'Ciclo de venda longo consumindo caixa operacional',
                scenario: 'Vendas B2B industriais levam 3–6 meses para fechar, criando pressão de fluxo de caixa no início.',
                mitigation: 'Priorizar segmentos com ciclo menor (hotéis, condomínios) para gerar receita rápida enquanto amadurece pipeline industrial. Explorar financiamento via BRDE ou Desenvolve-PR.'
              },
              {
                level: 'Médio',
                color: 'border-l-amber-500 bg-amber-50',
                textColor: 'text-amber-700',
                title: 'Concorrência com tratamentos químicos estabelecidos',
                scenario: 'Fornecedores de biocidas e antiincrustantes reduzem preços ou reforçam marketing para reagir à Aquabion.',
                mitigation: 'Posicionar a Aquabion na dimensão de ESG e custo total de propriedade (TCO), não apenas preço de aquisição. Destacar a eliminação de custo contínuo de químicos.'
              },
              {
                level: 'Baixo',
                color: 'border-l-slate-500 bg-slate-50',
                textColor: 'text-slate-700',
                title: 'Dificuldade de manutenção técnica pós-venda',
                scenario: 'Com expansão regional, o suporte técnico se torna difícil de manter com qualidade.',
                mitigation: 'Criar rede de parceiros técnicos certificados com treinamento presencial e documentação técnica completa. O sistema passivo da Aquabion já minimiza demandas de pós-venda.'
              }
            ].map((risk, i) => (
              <div key={i} className={`rounded-2xl border-l-8 p-8 ${risk.color}`}>
                <div className="flex items-center gap-4 mb-4 flex-wrap">
                  <div className={`px-4 py-1 rounded-full text-sm font-semibold ${risk.textColor}`}>
                    {risk.level === 'Alto' ? '⚠ Alto' : risk.level === 'Médio' ? '◈ Médio' : '○ Baixo'}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-950">{risk.title}</h3>
                </div>
                <div className="grid gap-8 md:grid-cols-2">
                  <div>
                    <div className="text-sm font-semibold text-slate-800 mb-2">Cenário</div>
                    <p className="text-slate-700 leading-7">{risk.scenario}</p>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-800 mb-2">Mitigação</div>
                    <p className="text-slate-700 leading-7">{risk.mitigation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROADMAP VISUAL */}
      <section className="py-24 bg-slate-950 text-white">
        <div className="container mx-auto px-6">
          <div className="text-sm uppercase tracking-[0.3em] text-cyan-400 mb-4">Linha do Tempo</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-12">Roadmap Estratégico 2026–2028</h2>

          <div className="flex flex-col md:flex-row gap-8">
            {[
              {
                year: '2026',
                title: 'Consolidar Londrina',
                items: [
                  'Mapeamento de prospects e decisores locais',
                  'Parceria com UEL para validação técnica',
                  '10 primeiras instalações âncora',
                  '3 cases documentados publicados',
                  '2 eventos técnicos realizados',
                  'Motor digital ativado (SEO + LinkedIn)',
                  'Calculadora de ROI no site'
                ]
              },
              {
                year: '2027',
                title: 'Dominar o Paraná',
                items: [
                  'Expansão para Maringá e Cascavel',
                  '8 parceiros técnicos certificados',
                  '50 instalações no estado',
                  'Atacar cooperativas agrícolas paranaenses',
                  'Presença nas principais feiras regionais',
                  'Break-even operacional atingido',
                  '200 leads/mês via digital'
                ]
              },
              {
                year: '2028',
                title: 'Escalar o Brasil',
                items: [
                  'Abertura de operações em São Paulo',
                  'Entrada no agro de Mato Grosso',
                  'Presença em frigoríficos do RS',
                  '200+ instalações nacionais',
                  '20 parceiros certificados no Brasil',
                  'Referência nacional em tratamento sustentável',
                  '+30% crescimento de receita a.a.'
                ]
              }
            ].map((rm, i) => (
              <div key={i} className="flex-1 rounded-2xl border border-slate-800 bg-slate-900 p-8">
                <div className="text-cyan-400 font-semibold mb-2">{rm.year}</div>
                <div className="text-xl md:text-2xl font-semibold mb-6">{rm.title}</div>
                <ul className="space-y-3">
                  {rm.items.map((item, j) => (
                    <li key={j} className="flex gap-3 text-slate-300">
                      <span className="text-cyan-400 mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRÓXIMOS PASSOS */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-sm uppercase tracking-[0.3em] text-cyan-600 mb-4">Ação Imediata</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-950 mb-6">Próximos 30 Dias — Prioridades</h2>
          <p className="text-xl text-slate-600 max-w-3xl mb-12">
            Sem ação imediata, o planejamento é apenas papel. Estas são as cinco iniciativas que devem começar esta semana.
          </p>

          <div className="space-y-6 max-w-4xl">
            {[
              {
                num: 1,
                text: 'Construir lista de 50 prospects qualificados em Londrina com nome, cargo, empresa, telefone e e-mail do decisor de cada conta-alvo nos segmentos hospitalar, industrial e hoteleiro.'
              },
              {
                num: 2,
                text: 'Agendar reunião com ACIL (Associação Comercial e Industrial de Londrina) para apresentar a tecnologia e explorar parceria de divulgação junto aos associados.'
              },
              {
                num: 3,
                text: 'Ativar presença no LinkedIn com 3 posts/semana sobre eficiência hídrica, ESG industrial e incrustação. O mercado de Londrina e PR precisa ver a Aquabion como autoridade digital.'
              },
              {
                num: 4,
                text: 'Contatar departamento de Engenharia Civil ou Química da UEL com proposta de pesquisa conjunta para validação da tecnologia nas condições da água de Londrina. Isso gera credibilidade científica local imensurável.'
              },
              {
                num: 5,
                text: 'Desenvolver proposta de cliente-piloto com condições especiais — Identificar 2–3 prospects com maior probabilidade de fechamento e montar proposta com desconto em troca de documentação do caso para uso em marketing.'
              }
            ].map((step, i) => (
              <div key={i} className="flex gap-6 items-start rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="flex-shrink-0 w-14 h-14 rounded-full bg-cyan-500 text-white flex items-center justify-center text-2xl font-bold">
                  {step.num}
                </div>
                <p className="text-lg text-slate-800 leading-8">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
