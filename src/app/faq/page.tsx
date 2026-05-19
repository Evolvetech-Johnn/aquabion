import Link from 'next/link';

export const metadata = {
  title: 'FAQ Técnico | Aquabion Brasil',
  description: 'Perguntas frequentes sobre a tecnologia Aquabion, seu funcionamento, manutenção e segurança da água.',
};

const faqs = [
  {
    question: 'O Aquabion é um amaciador de água tradicional?',
    answer:
      'Não. Ao contrário dos amaciadores convencionais, o Aquabion não utiliza sal, resinas ou produtos químicos. Ele é um sistema galvânico. Ele não remove o cálcio e o magnésio, mas os transforma em cristais de aragonita de tamanho micrométrico, que são quimicamente inertes e não aderem às superfícies.',
  },
  {
    question: 'Qual é a durabilidade do equipamento e como funciona a manutenção?',
    answer:
      'Este é o nosso maior diferencial. O Aquabion tem uma vida útil média de 7 a 10 anos (dependendo da qualidade e volume da água). Ele é um sistema "instale e esqueça": não requer eletricidade, não exige manutenção mensal e não precisa de reposição de insumos.',
  },
  {
    question: 'A tecnologia altera o sabor ou a potabilidade da água?',
    answer:
      'Absolutamente não. Como não adicionamos sódio nem substâncias químicas, a água permanece 100% potável e com seus minerais essenciais preservados. Isso é vital para indústrias alimentícias e residências que prezam pela saúde.',
  },
  {
    question: 'Como ele protege contra a corrosão?',
    answer:
      'O ânodo de zinco patenteado dentro do Aquabion libera uma quantidade ínfima de íons de zinco que criam uma camada protetora nas paredes das tubulações. Isso interrompe o processo de corrosão e protege o patrimônio metálico da empresa ou do edifício.',
  },
  {
    question: 'Existe comprovação da eficácia alemã?',
    answer:
      'Sim. O Aquabion possui certificações rigorosas internacionalmente e foi testado em laboratórios independentes na Europa. A tecnologia de Düsseldorf é utilizada por gigantes globais que exigem o mais alto padrão de eficiência industrial.',
  },
];

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto rounded-[2rem] bg-white border border-slate-200 p-12 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.18)] mb-16">
          <Link href="/" className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 mb-6">
            ← Voltar para a página inicial
          </Link>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-600">FAQ Técnico</p>
          <h1 className="mt-4 text-4xl md:text-5xl font-semibold text-slate-950">
            Perguntas frequentes sobre a tecnologia Aquabion
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Entenda como funciona a solução alemã, por que ela não usa química e como garante proteção sem comprometer a água.
          </p>
        </div>

        <div className="grid gap-6 max-w-4xl mx-auto">
          {faqs.map((item, index) => (
            <article key={index} className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-950 mb-4">{item.question}</h2>
              <p className="text-slate-600 leading-8">{item.answer}</p>
            </article>
          ))}
        </div>

        <div className="mt-16 rounded-[2rem] border border-cyan-100 bg-cyan-50 p-10 text-center shadow-[0_30px_80px_-40px_rgba(14,165,233,0.18)]">
          <h2 className="text-3xl font-semibold text-slate-950 mb-4">Ainda tem dúvidas?</h2>
          <p className="max-w-2xl mx-auto text-lg leading-8 text-slate-600 mb-8">
            Nossa equipe técnica está pronta para responder qualquer pergunta sobre aplicação, instalação e resultados em operações críticas.
          </p>
          <Link
            href="/contato"
            className="inline-flex items-center justify-center rounded-full bg-cyan-600 px-10 py-4 text-white text-lg font-semibold shadow-lg shadow-cyan-500/20 hover:bg-cyan-500"
          >
            Falar com o time técnico
          </Link>
        </div>
      </div>
    </div>
  );
}
