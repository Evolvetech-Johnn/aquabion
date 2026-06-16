
'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Reveal from '@/components/ui/Reveal';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { ArrowRight } from 'lucide-react';

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
        <Reveal className="max-w-4xl mx-auto rounded-[2rem] bg-white border border-slate-200 p-12 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.18)] text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-600">Blog Aquabion</p>
          <h1 className="mt-4 text-4xl md:text-5xl font-semibold text-slate-950">
            Conteúdo sobre água, sustentabilidade e eficiência industrial.
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Descubra artigos, análises e insights pensados para gestores de operações, engenheiros e times de manutenção.
          </p>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-3">
          {posts.map((post, index) => (
            <Reveal key={post.href} delay={index * 0.1}>
              <motion.article
                className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm"
                whileHover={{ y: -8, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                transition={{ type: "spring" }}
              >
                <h2 className="text-2xl font-semibold text-slate-950 mb-4">{post.title}</h2>
                <p className="text-slate-600 leading-7 mb-6">{post.excerpt}</p>
                <Link href={post.href} className="inline-flex items-center gap-2 text-cyan-600 font-semibold hover:text-cyan-700 group">
                  <span>Ler mais</span>
                  <motion.span
                    initial={{ x: 0 }}
                    whileHover={{ x: 4 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </Link>
              </motion.article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 text-center" delay={0.4}>
          <Link href="/contato">
            <AnimatedButton variant="primary" size="lg" showArrow>
              Converse com nossa equipe
            </AnimatedButton>
          </Link>
        </Reveal>
      </div>
    </div>
  );
}
