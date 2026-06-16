
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Reveal from '../ui/Reveal';
import AnimatedButton from '../ui/AnimatedButton';

const plans = [
  {
    name: 'Residencial',
    price: 'Sob Consulta',
    features: ['Para apartamentos e casas', 'Instalação em até 1 hora', 'Proteção contra incrustações', 'Suporte técnico'],
  },
  {
    name: 'Comercial',
    price: 'Sob Consulta',
    features: ['Para hotéis e comércios', 'Projetos personalizados', 'Relatórios técnicos', 'Garantia de 2 anos'],
    popular: true,
  },
  {
    name: 'Industrial',
    price: 'Sob Consulta',
    features: ['Para fábricas e usinas', 'Dimensionamento completo', 'ROI em até 24 meses', 'Garantia estendida'],
  },
];

export default function Pricing() {
  return (
    <section className="py-24 md:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Reveal className="text-center mb-16">
          <span className="text-sm font-semibold uppercase tracking-wider text-cyan-600">
            Soluções Customizadas
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-slate-950">
            Planos para qualquer necessidade
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <Reveal key={i} delay={i * 0.15}>
              <motion.div
                whileHover={{ y: -8 }}
                className={`relative rounded-[2rem] p-8 transition-all duration-300 ${
                  plan.popular
                    ? 'bg-slate-950 text-white border-2 border-cyan-500 shadow-premium'
                    : 'bg-white border border-slate-200 shadow-sm'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyan-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                    Mais Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className={`text-xl font-bold ${plan.popular ? 'text-white' : 'text-slate-950'}`}>
                    {plan.name}
                  </h3>
                  <div className="mt-4">
                    <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-slate-950'}`}>
                      {plan.price}
                    </span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <Check className={`w-5 h-5 shrink-0 ${plan.popular ? 'text-cyan-400' : 'text-cyan-600'}`} />
                      <span className={`text-sm ${plan.popular ? 'text-slate-300' : 'text-slate-600'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <AnimatedButton
                  variant={plan.popular ? 'primary' : 'outline'}
                  className="w-full"
                >
                  Solicitar Orçamento
                </AnimatedButton>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

