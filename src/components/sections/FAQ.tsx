
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import Reveal from '../ui/Reveal';

const faqItems = [
  {
    q: 'Como funciona a tecnologia Aquabion?',
    a: 'Sistema galvânico passivo que cria corrente microgalvânica na água, alterando a estrutura dos cristais de calcário, prevenindo incrustações sem usar químicos ou energia.',
  },
  {
    q: 'Qual a vida útil do equipamento?',
    a: 'O equipamento tem vida útil de dez anos, sem necessidade de manutenção contínua. É 100% passivo, sem partes móveis ou componentes eletrônicos.',
  },
  {
    q: 'Tem garantia?',
    a: 'Sim! Todos os nossos equipamentos contam com garantia. Para projetos comerciais e industriais, oferecemos garantia estendida.',
  },
  {
    q: 'Como é a instalação?',
    a: 'Instalação é rápida e simples, realizada por profissionais certificados, sem necessidade de obras complexas. Em média, 1 hora para instalação.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <Reveal className="text-center mb-16">
          <span className="text-sm font-semibold uppercase tracking-wider text-cyan-600">
            Dúvidas Comuns
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-slate-950">
            Perguntas frequentes
          </h2>
        </Reveal>

        <div className="space-y-4">
          {faqItems.map((item, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <motion.div
                className="border border-slate-200 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-slate-50 transition-colors"
                >
                  <span className="font-semibold text-slate-950 text-lg">
                    {item.q}
                  </span>
                  {openIndex === i ? (
                    <Minus className="w-6 h-6 text-cyan-600" />
                  ) : (
                    <Plus className="w-6 h-6 text-slate-400" />
                  )}
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-slate-600">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

