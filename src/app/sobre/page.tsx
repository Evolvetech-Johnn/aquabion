import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Globe, Award, Shield, TrendingUp } from 'lucide-react';

export const metadata = {
  title: 'Sobre Nós | Aquabion Brasil',
  description: 'Conheça a história e a missão da Aquabion Brasil',
};

export default function AboutPage() {
  const stats = [
    { number: '+50', label: 'Países' },
    { number: '25+', label: 'Anos de Experiência' },
    { number: '100K+', label: 'Instalações' },
    { number: '100%', label: 'Sustentável' },
  ];

  return (
    <div className="min-h-screen bg-[#071B34] text-white">
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="mb-12">
            <Link href="/" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-6">
              ← Voltar para a página inicial
            </Link>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              A Nova Engenharia da Água
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl">
              Tecnologia alemã patenteada que revoluciona a gestão hídrica sem química,
              sem energia e sem manutenção.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center">
                <div className="text-5xl font-bold text-cyan-400 mb-2">{stat.number}</div>
                <div className="text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#0A2342]">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Nossa História
              </h2>
              <p className="text-lg text-slate-400 mb-6 leading-relaxed">
                A Aquabion nasceu da visão de criar uma tecnologia que trabalhe com a natureza,
                não contra ela. Com mais de 25 anos de pesquisa e desenvolvimento na Alemanha,
                nossa tecnologia galvânica passiva transformou a forma como o mundo lida com
                incrustações e corrosão.
              </p>
              <p className="text-lg text-slate-400 leading-relaxed">
                Hoje, presente em mais de 50 países com mais de 100 mil instalações, continuamos
                comprometidos em oferecer soluções sustentáveis que geram economia real e
                impacto ambiental positivo.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30">
                <Award className="w-10 h-10 text-cyan-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Tecnologia Patenteada</h3>
                <p className="text-slate-400 text-sm">Inovação alemã certificada internacionalmente</p>
              </div>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30">
                <Shield className="w-10 h-10 text-emerald-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Zero Química</h3>
                <p className="text-slate-400 text-sm">Solução 100% sustentável e segura</p>
              </div>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30">
                <TrendingUp className="w-10 h-10 text-amber-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">ROI Rápido</h3>
                <p className="text-slate-400 text-sm">Retorno em menos de 24 meses</p>
              </div>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30">
                <Globe className="w-10 h-10 text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Presença Global</h3>
                <p className="text-slate-400 text-sm">+50 países atendidos</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nossos Valores</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Princípios que guiam todas as nossas decisões e ações
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Sustentabilidade',
                desc: 'Trabalhar com a natureza, não contra ela. Soluções que regeneram, não danificam.',
              },
              {
                title: 'Excelência Técnica',
                desc: 'Engenharia de elite, padrão internacional. Qualidade que inspira confiança.',
              },
              {
                title: 'Transparência',
                desc: 'Resultados mensuráveis, ROI real. Nossos clientes sempre sabem o que estão investindo.',
              },
            ].map((value, index) => (
              <div key={index} className="p-8 rounded-2xl bg-white/5 border border-white/10">
                <h3 className="text-2xl font-bold mb-4 text-cyan-400">{value.title}</h3>
                <p className="text-slate-400 text-lg leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#0A2342]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Junte-se à Revolução
          </h2>
          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Milhares de empresas ao redor do mundo já transformaram sua gestão hídrica
            com a tecnologia Aquabion.
          </p>
          <Link href="/contato">
            <Button size="lg" className="h-14 px-10 text-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold">
              Agendar Diagnóstico
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
