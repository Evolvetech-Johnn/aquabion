"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, Droplets, Zap, Leaf, Shield, Clock, ArrowRight, 
  CheckCircle2, Building2, Hotel, 
  ShieldAlert, ShieldCheck,
  ChevronDown, ChevronUp
} from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';

export default function LandingPageContent() {
  const [formData, setFormData] = useState({
    nome: '',
    empresa: '',
    cargo: '',
    telefone: '',
    email: '',
    cidade: '',
    estado: '',
    tipoEmpreendimento: '',
    numeroUnidades: '',
    comentarios: '',
  });

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const [calculatorData, setCalculatorData] = useState({
    quantidadeUnidades: '',
    quantidadeChuveiros: '',
    numeroAquecedores: '',
    gastosManutencao: '',
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCalculatorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCalculatorData({ ...calculatorData, [e.target.name]: e.target.value });
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const calculateEconomy = () => {
    const manutencao = Number(calculatorData.gastosManutencao) || 10000;
    const economiaAnual = Math.round(manutencao * 0.35);
    const reducaoManutencao = Math.round(manutencao * 0.4);
    const roi = 24;
    return { economiaAnual, reducaoManutencao, roi };
  };

  const economia = calculateEconomy();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Obrigado! Entraremos em contato em breve.');
  };

  const faqItems = [
    { question: 'O Aquabion substitui abrandadores?', answer: 'Não. O Aquabion não remove o calcário da água, mas altera sua estrutura cristalina para que ele não se incrusta nas superfícies.' },
    { question: 'O Aquabion utiliza energia elétrica?', answer: 'Não. É um sistema galvânico passivo que funciona sem energia elétrica ativa.' },
    { question: 'O Aquabion usa produtos químicos?', answer: 'Não. A tecnologia é 100% sustentável e sem adição de produtos químicos.' },
    { question: 'Funciona em condomínios?', answer: 'Sim. Ideal para condomínios de qualquer porte, com resultados comprovados em redução de manutenção.' },
    { question: 'Funciona em hotéis?', answer: 'Perfeitamente. Reduz entupimentos de duchas e incrustações em boilers, aumentando a eficiência.' },
    { question: 'Qual a vida útil?', answer: 'A tecnologia alemã tem vida útil de até 20 anos ou mais.' },
    { question: 'Como é feita a instalação?', answer: 'Instalação rápida e simples, sem necessidade de paradas prolongadas.' },
    { question: 'Precisa de manutenção?', answer: 'Não, o sistema é passivo e requer zero manutenção regular.' },
    { question: 'Garante resultados?', answer: 'Sim, com casos de sucesso em mais de 50 países e 100 mil instalações.' },
    { question: 'Reduz custos de energia?', answer: 'Sim, a redução de incrustações melhora a eficiência de aquecedores em até 30%.' },
    { question: 'É seguro para moradores?', answer: 'Totalmente. Não altera a composição química da água.' },
    { question: 'Atende a normas brasileiras?', answer: 'Sim, a tecnologia é aprovada internacionalmente e atende a requisitos de segurança.' },
    { question: 'Tem garantia?', answer: 'Sim, o equipamento com garantia de qualidade da Aquabion.' },
    { question: 'Quanto tempo para ver resultados?', answer: 'Resultados visíveis em poucos meses após instalação.' },
    { question: 'Tem atendimento em todo o Brasil?', answer: 'Sim, temos representantes em todo o território nacional.' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white pt-24 pb-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <AnimatedSection>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-400/30 rounded-full text-cyan-300 text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Tecnologia Alemã com Resultados Comprovados</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
                Reduza Custos de Manutenção e Proteja Seu Patrimônio Contra os Danos do Calcário
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed">
                A tecnologia alemã Aquabion protege tubulações, boilers, aquecedores e sistemas hidráulicos sem utilizar energia elétrica, sal ou produtos químicos.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contato">
                  <Button size="lg" className="h-16 px-8 bg-cyan-600 hover:bg-cyan-500 shadow-xl shadow-cyan-500/40 text-white">
                    Solicitar Diagnóstico Gratuito
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="h-16 px-8 border-slate-600 text-white hover:bg-slate-800">
                  Falar com Especialista
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-800">
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-cyan-400">+50</p>
                  <p className="text-sm text-slate-400">Países atendidos</p>
                </div>
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-cyan-400">25+</p>
                  <p className="text-sm text-slate-400">Anos de experiência</p>
                </div>
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-cyan-400">100k+</p>
                  <p className="text-sm text-slate-400">Instalações</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-[2rem] overflow-hidden border border-slate-700 shadow-[0_20px_80px_rgba(0,0,0,0.5)] bg-gradient-to-br from-slate-800 to-slate-900 p-8">
                <div className="aspect-video bg-slate-900 rounded-2xl flex items-center justify-center border border-slate-700">
                  <Building2 className="w-32 h-32 text-cyan-500 opacity-50" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl" />
                <div className="absolute -top-4 -right-4 w-32 h-32 bg-slate-600/20 rounded-full blur-3xl" />
              </div>
            </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* SEÇÃO DE PROBLEMAS */}
      <AnimatedSection className="py-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-600 mb-4">Os Custos Silenciosos</p>
            <h2 className="text-4xl md:text-5xl font-semibold text-slate-950">
              O Calcário Está Custando Dinheiro Para Sua Operação
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Resistências queimadas', icon: ShieldAlert, color: 'text-red-500' },
              { title: 'Boilers com incrustação', icon: Zap, color: 'text-orange-500' },
              { title: 'Entupimento de duchas', icon: Droplets, color: 'text-cyan-500' },
              { title: 'Aumento do consumo energético', icon: TrendingUp, color: 'text-amber-500' },
              { title: 'Manutenções recorrentes', icon: Clock, color: 'text-slate-500' },
              { title: 'Redução da vida útil dos equipamentos', icon: ShieldCheck, color: 'text-purple-500' },
            ].map((item, i) => (
              <div key={i} className="premium-card bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
                <item.icon className={`w-12 h-12 ${item.color} mb-6`} />
                <h3 className="text-2xl font-semibold text-slate-950 mb-3">{item.title}</h3>
                <p className="text-slate-600">
                  Cada problema tem custos repetitivos que impactam diretamente a operação diária.
                </p>
              </div>
            ))}
          </div>
          </div>
      </AnimatedSection>

      {/* SEÇÃO DE IMPACTO FINANCEIRO */}
      <AnimatedSection className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-600 mb-4">Calculadora de Economia</p>
            <h2 className="text-4xl md:text-5xl font-semibold text-slate-950">
              Quanto o Calcário Está Custando Todos os Anos?
            </h2>
          </div>
          <div className="bg-slate-50 rounded-[2rem] border border-slate-200 p-12">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-semibold text-slate-700 mb-2">Quantidade de apartamentos ou quartos</label>
                  <input
                    type="number"
                    name="quantidadeUnidades"
                    placeholder="Ex: 50"
                    value={calculatorData.quantidadeUnidades}
                    onChange={handleCalculatorChange}
                    className="w-full h-14 px-6 rounded-xl border border-slate-300 bg-white text-slate-950"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700 mb-2">Quantidade de chuveiros</label>
                  <input
                    type="number"
                    name="quantidadeChuveiros"
                    placeholder="Ex: 100"
                    value={calculatorData.quantidadeChuveiros}
                    onChange={handleCalculatorChange}
                    className="w-full h-14 px-6 rounded-xl border border-slate-300 bg-white text-slate-950"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700 mb-2">Número de aquecedores</label>
                  <input
                    type="number"
                    name="numeroAquecedores"
                    placeholder="Ex: 10"
                    value={calculatorData.numeroAquecedores}
                    onChange={handleCalculatorChange}
                    className="w-full h-14 px-6 rounded-xl border border-slate-300 bg-white text-slate-950"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700 mb-2">Gastos anuais com manutenção</label>
                  <input
                    type="number"
                    name="gastosManutencao"
                    placeholder="Ex: 50000"
                    value={calculatorData.gastosManutencao}
                    onChange={handleCalculatorChange}
                    className="w-full h-14 px-6 rounded-xl border border-slate-300 bg-white text-slate-950"
                  />
                </div>
              </div>
              <div className="space-y-6">
                <div className="p-6 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-2xl border border-cyan-200">
                  <p className="text-sm font-semibold text-cyan-800 mb-1">Economia potencial anual</p>
                  <p className="text-4xl font-bold text-cyan-950">
                    R$ {economia.economiaAnual.toLocaleString('pt-BR')}
                  </p>
                </div>
                <div className="p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl border border-emerald-200">
                  <p className="text-sm font-semibold text-emerald-800 mb-1">Redução estimada de manutenção</p>
                  <p className="text-4xl font-bold text-emerald-950">
                    R$ {economia.reducaoManutencao.toLocaleString('pt-BR')}
                  </p>
                </div>
                <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border border-purple-200">
                  <p className="text-sm font-semibold text-purple-800 mb-1">Retorno sobre investimento estimado</p>
                  <p className="text-4xl font-bold text-purple-950">
                    {economia.roi} meses
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* COMO FUNCIONA */}
      <AnimatedSection className="py-24 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-600 mb-4">Tecnologia Galvânica</p>
            <h2 className="text-4xl md:text-5xl font-semibold text-slate-950">
              Como Funciona a Tecnologia Aquabion
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { title: 'Tecnologia galvânica', description: 'Processo eletroquímico passivo sem energia elétrica ativa.' },
              { title: 'Alteração da cristalização', description: 'Modifica a estrutura do carbonato de cálcio.' },
              { title: 'Redução da aderência', description: 'Incrustações perdem capacidade de se fixar nas superfícies.' },
              { title: 'Proteção contínua', description: 'Tubulações e equipamentos protegidos 24/7.' },
            ].map((item, i) => (
              <div key={i} className="text-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-100 to-cyan-200 flex items-center justify-center mx-auto">
                  <span className="text-3xl font-bold text-cyan-600">{i + 1}</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-950">{item.title}</h3>
                <p className="text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* BENEFÍCIOS */}
      <AnimatedSection className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-600 mb-4">Vantagens Reais</p>
            <h2 className="text-4xl md:text-5xl font-semibold text-slate-950">
              Por Que Escolher a Aquabion?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Leaf, title: 'Sem produtos químicos', color: 'text-emerald-500' },
              { icon: Zap, title: 'Sem eletricidade', color: 'text-yellow-500' },
              { icon: Clock, title: 'Sem manutenção', color: 'text-blue-500' },
              { icon: ShieldCheck, title: 'Instalação rápida', color: 'text-cyan-500' },
              { icon: Building2, title: 'Tecnologia alemã', color: 'text-slate-700' },
              { icon: Leaf, title: 'Sustentável', color: 'text-green-500' },
              { icon: Shield, title: 'Proteção contínua', color: 'text-purple-500' },
              { icon: TrendingUp, title: 'Redução de custos', color: 'text-emerald-600' },
            ].map((item, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-[2rem] p-8 text-center">
                  <item.icon className={`w-16 h-16 ${item.color} mx-auto mb-6`} />
                  <h3 className="text-xl font-semibold text-slate-950">✓ {item.title}</h3>
                </div>
              ))}
          </div>
        </div>
      </AnimatedSection>

      {/* SEÇÃO ESPECÍFICA PARA CONDOMÍNIOS */}
      <AnimatedSection className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-600 mb-4">Para Seu Condomínio</p>
            <h2 className="text-4xl md:text-5xl font-semibold text-slate-950">
              A Solução Ideal Para Condomínios
            </h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-6 h-6 text-cyan-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-950">Menos reclamações dos moradores</h3>
                  <p className="text-slate-600">Menos problemas com duchas entupidas e água quente insuficiente.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-6 h-6 text-cyan-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-950">Menos manutenção corretiva</h3>
                  <p className="text-slate-600">Menos trocas de resistências e reparos emergenciais.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-cyan-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-950">Maior vida útil do sistema hidráulico</h3>
                  <p className="text-slate-600">Protege investimento em tubulações e equipamentos.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-cyan-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-950">Redução de custos condominiais</h3>
                  <p className="text-slate-600">Menos gastos com manutenção e energia.</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-[2rem] bg-slate-50 border border-slate-200 aspect-square">
                <div className="aspect-square rounded-[1.5rem] bg-gradient-to-br from-cyan-50 to-slate-100 flex items-center justify-center">
                  <Building2 className="w-48 h-48 text-cyan-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* SEÇÃO ESPECÍFICA PARA HOTÉIS */}
      <AnimatedSection className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-600 mb-4">Para Seu Hotel</p>
            <h2 className="text-4xl md:text-5xl font-semibold text-slate-950">
              Mais Eficiência e Menos Custos Para Hotéis
            </h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="rounded-[2rem] bg-white border border-slate-200 aspect-square">
                <div className="aspect-square rounded-[1.5rem] bg-gradient-to-br from-purple-50 to-slate-100 flex items-center justify-center">
                  <Hotel className="w-48 h-48 text-purple-400" />
                </div>
              </div>
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-950">Proteção de boilers</h3>
                  <p className="text-slate-600">Menos incrustações, mais eficiência.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <Droplets className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-950">Proteção de duchas</h3>
                  <p className="text-slate-600">Menos entupimentos, mais satisfação dos hóspedes.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-950">Menor consumo energético</h3>
                  <p className="text-slate-600">Maior eficiência dos aquecedores.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-950">Menos interrupções operacionais</h3>
                  <p className="text-slate-600">Operação suave sem paradas inesperadas.</p>
                </div>
              </div>
            </div>
          </div>
          </div>
      </AnimatedSection>

      {/* PROVA SOCIAL */}
      <AnimatedSection className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-600 mb-4">Confiança do Mercado</p>
            <h2 className="text-4xl md:text-5xl font-semibold text-slate-950">
              Clientes que Já Confiam na Aquabion
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-slate-50 border border-slate-200 rounded-[2rem] p-8">
                <div className="text-yellow-500 flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-slate-600 mb-6">
                  A Aquabion transformou a operação do nosso condomínio, reduzindo drasticamente os custos de manutenção.
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-300" />
                  <div>
                    <p className="font-semibold text-slate-950">Cliente Satisfeito</p>
                    <p className="text-sm text-slate-500">São Paulo, SP</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* CERTIFICAÇÕES */}
      <AnimatedSection className="py-24 bg-gradient-to-br from-slate-900 to-slate-950 text-white">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400 mb-4">Credibilidade Global</p>
          <h2 className="text-4xl md:text-5xl font-semibold mb-12">
            Certificações e Aprovações
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Tecnologia Alemã', icon: Building2 },
              { label: 'Certificado ISO', icon: Shield },
              { label: 'Aprovação Técnica', icon: CheckCircle2 },
              { label: 'Sustentabilidade', icon: Leaf },
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-[2rem] bg-white/5 backdrop-blur-sm border border-white/10">
                <item.icon className="w-16 h-16 mx-auto mb-4 text-cyan-400" />
                <p className="font-semibold text-lg">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* FORMULÁRIO DE LEADS */}
      <AnimatedSection className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-600 mb-4">Próximo Passo</p>
            <h2 className="text-4xl md:text-5xl font-semibold text-slate-950">
              Solicite um Diagnóstico Técnico Gratuito
            </h2>
          </div>
          <form onSubmit={handleFormSubmit} className="bg-slate-50 rounded-[2rem] border border-slate-200 p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-2">Nome</label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleFormChange}
                  required
                  className="w-full h-14 px-6 rounded-xl border border-slate-300 bg-white text-slate-950"
                  placeholder="Seu nome completo"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-2">Empresa</label>
                <input
                  type="text"
                  name="empresa"
                  value={formData.empresa}
                  onChange={handleFormChange}
                  className="w-full h-14 px-6 rounded-xl border border-slate-300 bg-white text-slate-950"
                  placeholder="Nome da empresa"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-2">Cargo</label>
                <input
                  type="text"
                  name="cargo"
                  value={formData.cargo}
                  onChange={handleFormChange}
                  className="w-full h-14 px-6 rounded-xl border border-slate-300 bg-white text-slate-950"
                  placeholder="Seu cargo"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-2">Telefone</label>
                <input
                  type="tel"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleFormChange}
                  required
                  className="w-full h-14 px-6 rounded-xl border border-slate-300 bg-white text-slate-950"
                  placeholder="(00) 00000-0000"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-2">E-mail</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                  className="w-full h-14 px-6 rounded-xl border border-slate-300 bg-white text-slate-950"
                  placeholder="email@empresa.com.br"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-2">Cidade</label>
                <input
                  type="text"
                  name="cidade"
                  value={formData.cidade}
                  onChange={handleFormChange}
                  className="w-full h-14 px-6 rounded-xl border border-slate-300 bg-white text-slate-950"
                  placeholder="Sua cidade"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-2">Estado</label>
                <select
                  name="estado"
                  value={formData.estado}
                  onChange={handleFormChange}
                  className="w-full h-14 px-6 rounded-xl border border-slate-300 bg-white text-slate-950"
                >
                  <option value="">Selecione um estado</option>
                  <option value="AC">Acre</option>
                  <option value="AL">Alagoas</option>
                  <option value="AP">Amapá</option>
                  <option value="AM">Amazonas</option>
                  <option value="BA">Bahia</option>
                  <option value="CE">Ceará</option>
                  <option value="DF">Distrito Federal</option>
                  <option value="ES">Espírito Santo</option>
                  <option value="GO">Goiás</option>
                  <option value="MA">Maranhão</option>
                  <option value="MT">Mato Grosso</option>
                  <option value="MS">Mato Grosso do Sul</option>
                  <option value="MG">Minas Gerais</option>
                  <option value="PA">Pará</option>
                  <option value="PB">Paraíba</option>
                  <option value="PR">Paraná</option>
                  <option value="PE">Pernambuco</option>
                  <option value="PI">Piauí</option>
                  <option value="RJ">Rio de Janeiro</option>
                  <option value="RN">Rio Grande do Norte</option>
                  <option value="RS">Rio Grande do Sul</option>
                  <option value="RO">Rondônia</option>
                  <option value="RR">Roraima</option>
                  <option value="SC">Santa Catarina</option>
                  <option value="SP">São Paulo</option>
                  <option value="SE">Sergipe</option>
                  <option value="TO">Tocantins</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-2">Tipo de empreendimento</label>
                <select
                  name="tipoEmpreendimento"
                  value={formData.tipoEmpreendimento}
                  onChange={handleFormChange}
                  className="w-full h-14 px-6 rounded-xl border border-slate-300 bg-white text-slate-950"
                >
                  <option value="">Selecione</option>
                  <option value="condominio">Condomínio</option>
                  <option value="hotel">Hotel</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-2">Número de unidades</label>
                <input
                  type="number"
                  name="numeroUnidades"
                  value={formData.numeroUnidades}
                  onChange={handleFormChange}
                  className="w-full h-14 px-6 rounded-xl border border-slate-300 bg-white text-slate-950"
                  placeholder="Ex: 100"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-semibold text-slate-700 mb-2">Comentários</label>
                <textarea
                  name="comentarios"
                  value={formData.comentarios}
                  onChange={handleFormChange}
                  rows={4}
                  className="w-full px-6 py-4 rounded-xl border border-slate-300 bg-white text-slate-950"
                  placeholder="Conte mais sobre suas necessidades"
                />
              </div>
              <div className="md:col-span-2">
                <Button type="submit" size="lg" className="w-full h-16 bg-cyan-600 hover:bg-cyan-500">
                  Enviar Solicitação
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </form>
        </div>
      </AnimatedSection>

      {/* FAQ SEO */}
      <AnimatedSection className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-600 mb-4">Dúvidas Comuns</p>
            <h2 className="text-4xl md:text-5xl font-semibold text-slate-950">
              Perguntas Frequentes
            </h2>
          </div>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="bg-white rounded-[1.5rem] border border-slate-200 overflow-hidden">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-8 py-6 text-left flex justify-between items-center"
                >
                  <h3 className="text-xl font-semibold text-slate-950">{item.question}</h3>
                  {openFaq === index ? (
                    <ChevronUp className="w-6 h-6 text-cyan-600" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-slate-400" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-8 pb-6 text-slate-600">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* CTA FINAL */}
      <section className="py-24 bg-gradient-to-br from-cyan-600 to-cyan-700 text-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Pronto para Proteger Seu Empreendimento?
          </h2>
          <p className="text-xl text-cyan-100 mb-10">
            Solicite seu diagnóstico técnico gratuito hoje mesmo!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contato">
              <Button size="lg" className="h-16 bg-white text-cyan-700 hover:bg-cyan-50">
                Agendar Reunião
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="h-16 border-white text-white hover:bg-cyan-800">
              Baixar Catálogo
            </Button>
          </div>
          </div>
      </section>
    </div>
  );
}
