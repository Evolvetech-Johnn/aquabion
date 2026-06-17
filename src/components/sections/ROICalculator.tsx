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
    <section className="py-32 bg-gradient-to-b from-[#F8FBFF] to-[#EEF5FF] relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute left-0 top-1/3 w-96 h-96 bg-cyan-500/10 blur-3xl" />
      <div className="absolute right-0 bottom-1/3 w-96 h-96 bg-emerald-500/10 blur-3xl" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#F5F5F7] mb-6">
            Calculadora de <span className="gradient-text">ROI e Sustentabilidade</span>
          </h2>
          <p className="text-xl text-[#86868B] max-w-2xl mx-auto">
            Descubra quanto sua operação pode economizar com a tecnologia Aquabion em 5 anos.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-7xl mx-auto">
          {/* Left Side: Inputs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className=""
          >
            <h3 className="text-2xl font-bold text-[#F5F5F7] mb-10 flex items-center gap-3">
              <Zap className="w-6 h-6 text-cyan-400" />
              Dados da Sua Operação
            </h3>

            <div className="space-y-10">
              {/* Operation Type */}
              <div className="space-y-4">
                <label className="block text-lg font-medium text-[#F5F5F7]">
                  Tipo de Operação
                </label>
                <select
                  value={operationType}
                  onChange={handleOperationTypeChange}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-[#F5F5F7] focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all duration-300"
                >
                  {OPERATION_TYPES.map((type) => (
                    <option key={type.id} value={type.id} className="bg-[#071B34]">
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Monthly Energy Cost */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-lg font-medium text-[#F5F5F7]">
                    Gasto Mensal com Energia Elétrica
                  </label>
                  <span className="text-cyan-400 font-bold text-xl">
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
                  className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-cyan-400 hover:accent-cyan-300 transition-all duration-300"
                />
                <div className="flex justify-between text-sm text-[#86868B]">
                  <span>R$ 5.000</span>
                  <span>R$ 200.000+</span>
                </div>
              </div>

              {/* Annual Chemical Cost */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-lg font-medium text-[#F5F5F7]">
                    Gasto Anual com Químicos e Manutenção
                  </label>
                  <span className="text-emerald-400 font-bold text-xl">
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
                  className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-emerald-400 hover:accent-emerald-300 transition-all duration-300"
                />
                <div className="flex justify-between text-sm text-[#86868B]">
                  <span>R$ 2.000</span>
                  <span>R$ 100.000+</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Results */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <PremiumCard className="border-cyan-500/20 p-6">
              <h3 className="text-2xl font-bold text-[#F5F5F7] mb-10 flex items-center gap-3">
                <DollarSign className="w-6 h-6 text-emerald-400" />
                Resultados Projetados
              </h3>

              <div className="space-y-8">
                {/* Perda Energética Anual */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-wider text-[#86868B] mb-2">
                        Perda Energética Anual Evitada
                      </p>
                      <motion.p
                        key={calculations.annualEnergyLoss}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl font-black text-cyan-400"
                      >
                        {formatCurrency(calculations.annualEnergyLoss)}
                      </motion.p>
                    </div>
                    <Zap className="w-12 h-12 text-cyan-400/20" />
                  </div>
                </div>

                {/* CO₂ Evitado */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-wider text-[#86868B] mb-2">
                        Toneladas de CO₂ Evitadas/ano
                      </p>
                      <motion.p
                        key={calculations.annualCo2SavedTons}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl font-black text-emerald-400"
                      >
                        {calculations.annualCo2SavedTons.toFixed(2)}
                      </motion.p>
                    </div>
                    <Leaf className="w-12 h-12 text-emerald-400/20" />
                  </div>
                </div>

                {/* Payback */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-wider text-[#86868B] mb-2">
                        Prazo de Payback
                      </p>
                      <motion.p
                        key={calculations.paybackMonths}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl font-black text-[#F5F5F7]"
                      >
                        {calculations.paybackMonths} <span className="text-2xl font-medium">meses</span>
                      </motion.p>
                    </div>
                    <Clock className="w-12 h-12 text-[#86868B]/30" />
                  </div>
                </div>

                {/* Total Saved in 5 Years */}
                <div className="bg-gradient-to-br from-cyan-500/10 to-emerald-500/10 border border-cyan-400/20 rounded-2xl p-8">
                  <div className="text-center">
                    <p className="text-sm uppercase tracking-wider text-[#86868B] mb-3">
                      Economia Total Projetada em 5 Anos
                    </p>
                    <motion.p
                      key={calculations.totalSaved5y}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.6 }}
                      className="text-5xl md:text-6xl font-black gradient-text"
                    >
                      {formatCurrency(Math.max(calculations.totalSaved5y, 0))}
                    </motion.p>
                  </div>
                </div>

                {/* CTA Button */}
                <Link href="/contato" className="block">
                  <Button className="w-full bg-gradient-to-r from-[#0A4FAF] to-[#0E73D8] text-xl py-8 gap-2 hover:scale-103 hover:shadow-[0_0_10px_rgba(10,79,175,0.4)] transition-transform duration-300">
                    Agendar Diagnóstico para Validar ROI
                    <ArrowRight className="w-6 h-6" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
