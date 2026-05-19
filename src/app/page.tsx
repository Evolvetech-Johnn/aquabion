'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Zap, Droplets, Leaf, Shield, TrendingUp, Award, Globe, MessageSquare, Calendar, ChevronDown } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#071B34] text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#071B34] via-[#0A2342] to-[#071B34]"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              <span className="text-sm text-slate-300">Tecnologia Alemã Patenteada</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
              A Nova Engenharia
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                da Água
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              Tecnologia alemã patenteada que elimina incrustações sem química,
              sem energia e sem manutenção.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Button size="lg" className="h-14 px-8 text-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold">
                Agendar Diagnóstico Técnico
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-white/20 hover:border-white/40 hover:bg-white/5">
                Ver Como Funciona
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-8 text-slate-400">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <span>Certificado TÜV</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-cyan-400" />
                <span>+50 Países</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-emerald-400" />
                <span>Zero Química</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-8 h-8 text-slate-500" />
        </motion.div>
      </section>

      {/* Problema Invisível */}
      <section className="py-24 bg-[#0A2342]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">O Problema Invisível</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Incrustações custam bilhões anualmentes em perdas energéticas e manutenção
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Zap, title: 'Perda Energética', desc: '1mm de calcário = +10% consumo', color: 'text-amber-400' },
              { icon: Shield, title: 'Corrosão', desc: 'Degradação prematura de equipamentos', color: 'text-red-400' },
              { icon: Droplets, title: 'Desperdício Hídrico', desc: 'Ineficiência em sistemas de água', color: 'text-cyan-400' },
              { icon: TrendingUp, title: 'Custos Operacionais', desc: 'Manutenção constante e produtos químicos', color: 'text-orange-400' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300"
              >
                <item.icon className={`w-12 h-12 ${item.color} mb-4`} />
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-slate-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-24 bg-[#071B34]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Como a Tecnologia Funciona</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Engenharia galvânica passiva que transforma a estrutura dos minerais
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Ionização Galvânica',
                desc: 'Células galvânicas criam um campo eletroquímico natural',
              },
              {
                step: '02',
                title: 'Transformação Cristalina',
                desc: 'Calcita se transforma em aragonita, não aderente',
              },
              {
                step: '03',
                title: 'Proteção Contínua',
                desc: 'Sistema passivo funciona 24/7 sem energia ou manutenção',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative"
              >
                <div className="absolute -top-4 -left-4 text-8xl font-bold text-white/5">{item.step}</div>
                <div className="relative p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10">
                  <h3 className="text-2xl font-bold mb-4 mt-4">{item.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparativo */}
      <section className="py-24 bg-[#0A2342]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Comparativo de Mercado</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Veja por que Aquabion é a escolha superior
            </p>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4 text-slate-400 font-medium">Critério</th>
                  <th className="text-center p-4 bg-cyan-500/20 text-cyan-400 font-bold rounded-tl-lg">Aquabion</th>
                  <th className="text-center p-4 text-slate-400 font-medium">Abrandadores</th>
                  <th className="text-center p-4 text-slate-400 font-medium">Osmose Reversa</th>
                  <th className="text-center p-4 text-slate-400 font-medium rounded-tr-lg">Químicos</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { crit: 'CAPEX (Investimento)', aquabion: 'Médio', outros: ['Alto', 'Muito Alto', 'Baixo'] },
                  { crit: 'OPEX (Operação)', aquabion: 'Zero', outros: ['Alto', 'Muito Alto', 'Contínuo'] },
                  { crit: 'Consumo Água', aquabion: 'Zero', outros: ['Alto', 'Muito Alto', 'Zero'] },
                  { crit: 'Manutenção', aquabion: 'Zero', outros: ['Contínua', 'Contínua', 'Contínua'] },
                  { crit: 'Impacto Ambiental', aquabion: 'Positivo', outros: ['Negativo', 'Negativo', 'Negativo'] },
                ].map((row, idx) => (
                  <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4 text-slate-300">{row.crit}</td>
                    <td className="text-center p-4">
                      <span className="inline-flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-emerald-400" />
                        <span className="font-semibold text-emerald-400">{row.aquabion}</span>
                      </span>
                    </td>
                    {row.outros.map((val, i) => (
                      <td key={i} className="text-center p-4 text-slate-500">{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ROI */}
      <section className="py-24 bg-[#071B34]">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">ROI e Economia Real</h2>
              <p className="text-xl text-slate-400 mb-8 leading-relaxed">
                Calcule a economia potencial para sua operação. O retorno do investimento
                geralmente acontece em menos de 24 meses.
              </p>

              <div className="space-y-4">
                <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-4xl font-bold text-cyan-400 mb-2">30-50%</div>
                  <div className="text-slate-400">Redução no consumo energético</div>
                </div>
                <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-4xl font-bold text-emerald-400 mb-2">5-10x</div>
                  <div className="text-slate-400">Aumento da vida útil dos equipamentos</div>
                </div>
                <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-4xl font-bold text-amber-400 mb-2">100%</div>
                  <div className="text-slate-400">Eliminação de custos com químicos</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10"
            >
              <h3 className="text-2xl font-bold mb-6">Calculadora de Economia</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Consumo Energético Mensal (kWh)</label>
                  <div className="h-12 rounded-lg bg-white/5 border border-white/10"></div>
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Gastos com Manutenção Anual</label>
                  <div className="h-12 rounded-lg bg-white/5 border border-white/10"></div>
                </div>
                <Button size="lg" className="w-full h-14 text-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold">
                  Calcular Economia
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Aplicações */}
      <section className="py-24 bg-[#0A2342]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Casos e Aplicações</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Soluções para diversos segmentos industriais e comerciais
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              'Indústrias',
              'Agronegócio',
              'Hospitais',
              'Hotéis',
              'Condomínios',
              'Sistemas HVAC',
              'Energia Solar',
              'Irrigação',
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 p-8 hover:border-cyan-500/50 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold group-hover:text-cyan-400 transition-colors">{item}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustentabilidade */}
      <section className="py-24 bg-[#071B34]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Leaf className="w-16 h-16 text-emerald-400 mx-auto mb-6" />
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Sustentabilidade e ESG</h2>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                Engenharia regenerativa que trabalha com a natureza, não contra ela
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Droplets,
                title: 'Economia Hídrica',
                desc: 'Zero desperdício de água no processo',
              },
              {
                icon: Leaf,
                title: 'Zero Química',
                desc: 'Nenhum produto tóxico ou prejudicial',
              },
              {
                icon: Globe,
                title: 'Créditos de Carbono',
                desc: 'Redução significativa de emissões',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="text-center p-8"
              >
                <item.icon className="w-16 h-16 text-emerald-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-slate-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Prova Social */}
      <section className="py-24 bg-[#0A2342]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Autoridade Global</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Presente em mais de 50 países com certificações internacionais
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
            {['TÜV', 'ISO', 'CE', 'FDA', 'EPA'].map((logo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-4xl font-bold text-white"
              >
                {logo}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-32 bg-gradient-to-b from-[#071B34] to-[#0A2342] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              O Futuro da Engenharia Não Combate a Natureza.
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                Trabalha com Ela.
              </span>
            </h2>

            <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
              Agende um diagnóstico técnico sem compromisso e descubra
              quanto você pode economizar com a tecnologia Aquabion.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="h-16 px-10 text-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold shadow-2xl shadow-cyan-500/25">
                <Calendar className="w-6 h-6" />
                Agendar Visita Técnica
              </Button>
              <Button size="lg" variant="outline" className="h-16 px-10 text-xl border-white/20 hover:border-white/40">
                <MessageSquare className="w-6 h-6" />
                Falar no WhatsApp
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 bg-[#071B34]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Aquabion Brasil
            </div>
            <div className="text-slate-500 text-sm">
              © 2025 Aquabion Brasil. Todos os direitos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
