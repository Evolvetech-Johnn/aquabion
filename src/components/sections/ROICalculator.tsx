'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import PremiumCard from '@/components/ui/PremiumCard';
import { Button } from '@/components/ui/button';
import { ArrowRight, Leaf, Zap, DollarSign, Clock } from 'lucide-react';

const OPERATION_TYPES = [
  { id: 'industria', label: 'Indústria/Manufatura', defaultChemical: 25000 },
  { id: 'hotel', label: 'Hotéis/Hospitais', defaultChemical: 15000 },
  { id: 'condominio', label: 'Condomínios Residenciais', defaultChemical: 5000 },
  { id: 'agro', label: 'Agronegócio', defaultChemical: 10000 },
];

const CO2_FACTOR_KG_PER_KWH = 0.47; // Fator médio brasileiro (ANEEL)
const AVG_KWH_COST = 0.70; // Custo médio por kWh em R$
const AQUABION_COST = 60000;

export default function ROICalculator() {
  const [operationType, setOperationType] = useState(OPERATION_TYPES[0].id);
  const [monthlyEnergyCost, setMonthlyEnergyCost] = useState(25000);
  const [annualChemicalCost, setAnnualChemicalCost] = useState(25000);

  // Update default chemical cost when operation type changes
  const handleOperationTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value;
    setOperationType(type);
    const defaultVal = OPERATION_TYPES.find(t => t.id === type)?.defaultChemical || 5000;
    setAnnualChemicalCost(defaultVal);
  };

  const calculations = useMemo(() => {
    // 1. Perda Energética Anual (10% do gasto anual de energia)
    const annualEnergyCost = monthlyEnergyCost * 12;
    const annualEnergyLoss = annualEnergyCost * 0.1;

    // 2. Economia Total em 5 anos
    const totalEnergySaved5y = annualEnergyLoss * 5;
    const totalChemicalSaved5y = annualChemicalCost * 5;
    const totalSaved5y = totalEnergySaved5y + totalChemicalSaved5y - AQUABION_COST;

    // 3. Payback em Meses
    const monthlySavings = (annualEnergyLoss / 12) + (annualChemicalCost / 12);
    const paybackMonths = monthlySavings > 0 ? Math.ceil(AQUABION_COST / monthlySavings) : 0;

    // 4. CO₂ Evitado (toneladas/ano)
    const annualKwh = annualEnergyCost / AVG_KWH_COST;
    const annualKwhSaved = annualKwh * 0.1;
    const annualCo2SavedKg = annualKwhSaved * CO2_FACTOR_KG_PER_KWH;
    const annualCo2SavedTons = annualCo2SavedKg / 1000;

    return {
      annualEnergyLoss,
      totalSaved5y,
      paybackMonths,
      annualCo2SavedTons,
    };
  }, [monthlyEnergyCost, annualChemicalCost]);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <section className="py-16 md:py-32 bg-gradient-to-b from-[#E0E8F5] to-[#D1DFF0] relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute left-0 top-1/3 w-96 h-96 bg-cyan-500/5 blur-3xl" />
      <div className="absolute right-0 bottom-1/3 w-96 h-96 bg-emerald-500/5 blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-4 md:mb-6 leading-tight">
            Calculadora de <span className="bg-gradient-to-r from-[#0A4FAF] to-[#16A34A] bg-clip-text text-transparent">ROI e Sustentabilidade</span>
          </h2>
          <p className="text-base md:text-xl text-slate-600 max-w-2xl mx-auto">
            Descubra quanto sua operação pode economizar com a tecnologia Aquabion em 5 anos.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start max-w-7xl mx-auto">
          {/* Left Side: Inputs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <PremiumCard className="p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-6 md:mb-8 flex items-center gap-3">
                <Zap className="w-6 h-6 text-[#0A4FAF]" />
                Dados da Sua Operação
              </h3>

              <div className="space-y-6 md:space-y-8">
                {/* Operation Type */}
                <div className="space-y-3">
                  <label className="block text-base md:text-lg font-semibold text-slate-900">
                    Tipo de Operação
                  </label>
                  <select
                    value={operationType}
                    onChange={handleOperationTypeChange}
                    className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 text-slate-950 focus:outline-none focus:border-[#0A4FAF] focus:ring-1 focus:ring-[#0A4FAF] transition-all duration-300"
                  >
                    {OPERATION_TYPES.map((type) => (
                      <option key={type.id} value={type.id} className="bg-white text-slate-950">
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Monthly Energy Cost */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center flex-wrap gap-2">
                    <label className="text-base md:text-lg font-semibold text-slate-900">
                      Gasto Mensal com Energia Elétrica
                    </label>
                    <span className="text-[#0A4FAF] font-bold text-lg md:text-xl">
                      {formatCurrency(monthlyEnergyCost)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5000"
                    max="200000"
                    step="5000"
                    value={monthlyEnergyCost}
                    onChange={(e) => setMonthlyEnergyCost(Number(e.target.value))}
                    className="w-full h-2 bg-slate-100 rounded-full appearance-none cursor-pointer accent-[#0A4FAF] hover:accent-[#0E73D8] transition-all duration-300"
                  />
                  <div className="flex justify-between text-xs md:text-sm text-slate-500 font-medium">
                    <span>R$ 5.000</span>
                    <span>R$ 200.000+</span>
                  </div>
                </div>

                {/* Annual Chemical Cost */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center flex-wrap gap-2">
                    <label className="text-base md:text-lg font-semibold text-slate-900">
                      Gasto Anual com Químicos e Manutenção
                    </label>
                    <span className="text-[#16A34A] font-bold text-lg md:text-xl">
                      {formatCurrency(annualChemicalCost)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="2000"
                    max="100000"
                    step="2000"
                    value={annualChemicalCost}
                    onChange={(e) => setAnnualChemicalCost(Number(e.target.value))}
                    className="w-full h-2 bg-slate-100 rounded-full appearance-none cursor-pointer accent-[#16A34A] hover:accent-[#10B981] transition-all duration-300"
                  />
                  <div className="flex justify-between text-xs md:text-sm text-slate-500 font-medium">
                    <span>R$ 2.000</span>
                    <span>R$ 100.000+</span>
                  </div>
                </div>
              </div>
            </PremiumCard>
          </motion.div>

          {/* Right Side: Results */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <PremiumCard className="p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-6 md:mb-8 flex items-center gap-3">
                <DollarSign className="w-6 h-6 text-[#16A34A]" />
                Resultados Projetados
              </h3>

              <div className="space-y-6 md:space-y-8">
                {/* Perda Energética Anual */}
                <div className="bg-white border border-slate-100 rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs md:text-sm uppercase tracking-wider text-slate-500 font-semibold mb-1 md:mb-2">
                        Perda Energética Anual Evitada
                      </p>
                      <motion.p
                        key={calculations.annualEnergyLoss}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl md:text-4xl font-black text-slate-900"
                      >
                        {formatCurrency(calculations.annualEnergyLoss)}
                      </motion.p>
                    </div>
                    <Zap className="w-10 h-10 md:w-12 md:h-12 text-[#0A4FAF]/20 shrink-0" />
                  </div>
                </div>

                {/* CO₂ Evitado */}
                <div className="bg-white border border-slate-100 rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs md:text-sm uppercase tracking-wider text-slate-500 font-semibold mb-1 md:mb-2">
                        Toneladas de CO₂ Evitadas/ano
                      </p>
                      <motion.p
                        key={calculations.annualCo2SavedTons}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl md:text-4xl font-black text-slate-900"
                      >
                        {calculations.annualCo2SavedTons.toFixed(2)}
                      </motion.p>
                    </div>
                    <Leaf className="w-10 h-10 md:w-12 md:h-12 text-[#16A34A]/20 shrink-0" />
                  </div>
                </div>

                {/* Payback */}
                <div className="bg-white border border-slate-100 rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs md:text-sm uppercase tracking-wider text-slate-500 font-semibold mb-1 md:mb-2">
                        Prazo de Payback
                      </p>
                      <motion.p
                        key={calculations.paybackMonths}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl md:text-4xl font-black text-slate-900"
                      >
                        {calculations.paybackMonths} <span className="text-xl md:text-2xl font-medium text-slate-500">meses</span>
                      </motion.p>
                    </div>
                    <Clock className="w-10 h-10 md:w-12 md:h-12 text-slate-400/30 shrink-0" />
                  </div>
                </div>

                {/* Total Saved in 5 Years */}
                <div className="bg-gradient-to-br from-[#0A4FAF]/5 to-[#16A34A]/5 border border-[#0A4FAF]/10 rounded-2xl p-6 md:p-8 shadow-sm">
                  <div className="text-center">
                    <p className="text-xs md:text-sm uppercase tracking-wider text-slate-500 font-semibold mb-2 md:mb-3">
                      Economia Total Projetada em 5 Anos
                    </p>
                    <motion.p
                      key={calculations.totalSaved5y}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.6 }}
                      className="text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-[#0A4FAF] to-[#16A34A] bg-clip-text text-transparent"
                    >
                      {formatCurrency(Math.max(calculations.totalSaved5y, 0))}
                    </motion.p>
                  </div>
                </div>

                {/* CTA Button */}
                <Link href="/contato" className="block">
                  <Button className="w-full bg-gradient-to-r from-[#0A4FAF] to-[#0E73D8] hover:from-[#0E73D8] hover:to-[#0A4FAF] text-base sm:text-lg md:text-xl py-5 md:py-7 gap-2 hover:scale-[1.02] active:scale-[0.98] hover:shadow-[0_10px_25px_rgba(10,79,175,0.25)] transition-all duration-300 rounded-2xl text-white">
                    Agendar Diagnóstico para Validar ROI
                    <ArrowRight className="w-5 h-5 md:w-6 md:h-6 shrink-0" />
                  </Button>
                </Link>
              </div>
            </PremiumCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
