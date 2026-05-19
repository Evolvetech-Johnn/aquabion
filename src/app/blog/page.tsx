import Link from 'next/link';

export const metadata = {
  title: 'Blog | Aquabion Brasil',
  description: 'Insights e conteúdos sobre tratamento de água, sustentabilidade e tecnologia Aquabion.',
};

const posts = [
  {
    title: 'Como evitar incrustações sem usar química',
    excerpt: 'Entenda por que o tratamento passivo com Aquabion é uma alternativa sustentável e confiável para grandes operações.',
    href: '/blog/como-evitar-incrustacoes',
  },
  {
    title: 'O impacto da água limpa na indústria',
    excerpt: 'Veja como a qualidade da água influencia custos, eficiência e ciclos de manutenção em empresas de alto desempenho.',
    href: '/blog/impacto-agua-industria',
  },
  {
    title: 'Tecnologia alemã para processos mais previsíveis',
    excerpt: 'Conheça os princípios da tecnologia Aquabion e como ela entrega operação contínua sem energia ativa.',
    href: '/blog/tecnologia-alema',
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto rounded-[2rem] bg-white border border-slate-200 p-12 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.18)] text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-600">Blog Aquabion</p>
          <h1 className="mt-4 text-4xl md:text-5xl font-semibold text-slate-950">
            Conteúdo sobre água, sustentabilidade e eficiência industrial.
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Descubra artigos, análises e insights pensados para gestores de operações, engenheiros e times de manutenção.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.href} className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <h2 className="text-2xl font-semibold text-slate-950 mb-4">{post.title}</h2>
              <p className="text-slate-600 leading-7 mb-6">{post.excerpt}</p>
              <Link href={post.href} className="inline-flex items-center gap-2 text-cyan-600 font-semibold hover:text-cyan-700">
                Ler mais →
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link href="/contato" className="inline-flex items-center justify-center rounded-full bg-cyan-600 px-10 py-4 text-white text-lg font-semibold shadow-lg shadow-cyan-500/20 hover:bg-cyan-500">
            Converse com nossa equipe
          </Link>
        </div>
      </div>
    </div>
  );
}
