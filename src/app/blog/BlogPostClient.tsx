'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Reveal from '@/components/ui/Reveal';
import AnimatedButton from '@/components/ui/AnimatedButton';

export interface BlogPostProps {
  title: string;
  subtitle: string;
  content: React.ReactNode;
}

export default function BlogPostClient({
  title,
  subtitle,
  content,
}: BlogPostProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 py-24">
      <div className="container mx-auto px-6">
        <Reveal className="max-w-4xl mx-auto rounded-[2rem] bg-white border border-slate-200 p-12 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.18)] mb-16">
          <Link href="/blog" className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 mb-6">
            ← Voltar para o blog
          </Link>
          <h1 className="text-4xl md:text-5xl font-semibold text-slate-950">
            {title}
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">{subtitle}</p>
        </Reveal>

        <Reveal className="max-w-3xl mx-auto space-y-8">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-10 shadow-sm">
            {content}
          </div>
        </Reveal>

        <Reveal className="mt-16" delay={0.5}>
          <div className="rounded-[2rem] border border-cyan-100 bg-cyan-50 p-10 text-center shadow-[0_30px_80px_-40px_rgba(14,165,233,0.18)]">
            <h2 className="text-3xl font-semibold text-slate-950 mb-4">
              Pronto para aplicar no seu negócio?
            </h2>
            <p className="max-w-2xl mx-auto text-lg leading-8 text-slate-600 mb-8">
              Nossa equipe está preparada para avaliar seu sistema hídrico e propor uma solução personalizada sem custo inicial.
            </p>
            <Link href="/contato">
              <AnimatedButton variant="primary" size="lg" showArrow>
                Solicitar análise técnica
              </AnimatedButton>
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
