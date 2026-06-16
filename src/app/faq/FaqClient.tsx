'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import AnimatedButton from '@/components/ui/AnimatedButton';

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

export default function FaqClient() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 py-24">
      <div className="container mx-auto px-6">
        <Reveal className="max-w-4xl mx-auto rounded-[2rem] bg-white border border-slate-200 p-12 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.18)] mb-16">
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
        </Reveal>

        <div className="space-y-6 max-w-4xl mx-auto">
          {faqs.map((item, index) => (
            <Reveal key={index} delay={index * 0.1}>
              <motion.div
                className="rounded-[1.75rem] border border-slate-200 bg-white overflow-hidden shadow-sm"
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-8 text-left bg-white hover:bg-slate-50 transition-colors"
                >
                  <h2 className="text-2xl font-semibold text-slate-950">{item.question}</h2>
                  {openIndex === index ? (
                    <Minus className="w-6 h-6 text-cyan-600" />
                  ) : (
                    <Plus className="w-6 h-6 text-slate-400" />
                  )}
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="px-8 pb-8 text-slate-600 leading-8">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16" delay={0.5}>
          <div className="rounded-[2rem] border border-cyan-100 bg-cyan-50 p-10 text-center shadow-[0_30px_80px_-40px_rgba(14,165,233,0.18)]">
            <h2 className="text-3xl font-semibold text-slate-950 mb-4">Ainda tem dúvidas?</h2>
            <p className="max-w-2xl mx-auto text-lg leading-8 text-slate-600 mb-8">
              Nossa equipe técnica está pronta para responder qualquer pergunta sobre aplicação, instalação e resultados em operações críticas.
            </p>
            <Link href="/contato">
              <AnimatedButton variant="primary" size="lg" showArrow>
                Falar com o time técnico
              </AnimatedButton>
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
