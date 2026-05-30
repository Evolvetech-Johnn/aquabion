import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Globe, Award, Shield, TrendingUp } from 'lucide-react';
import ImageCard from '@/components/ImageCard';
import { getPageImages, getPageImageUrl } from '@/services/media.service';

export const metadata: Metadata = {
  title: 'Sobre Nós',
  description: 'Conheça a história, valores e presença global da Aquabion Brasil. Tecnologia alemã patenteada com mais de 25 anos de experiência.',
  openGraph: {
    title: 'Sobre Nós | Aquabion Brasil',
    description: 'Conheça a história, valores e presença global da Aquabion Brasil.',
    url: 'https://aquabion.com.br/sobre',
  },
  alternates: {
    canonical: 'https://aquabion.com.br/sobre',
  },
};

export const revalidate = 60;

export default async function AboutPage() {
  const pageImages = await getPageImages();

  const stats = [
    { number: '+50', label: 'Países atendidos' },
    { number: '25+', label: 'Anos de experiência' },
    { number: '100k+', label: 'Instalações realizadas' },
    { number: '100%', label: 'Operação sustentável' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl rounded-[2rem] bg-white shadow-[0_30px_80px_-40px_rgba(15,23,42,0.18)] border border-slate-200 p-12">
            <Link href="/" className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 mb-6">
              ← Voltar para a página inicial
            </Link>
            <h1 className="text-4xl md:text-6xl font-semibold leading-tight mb-6">
              A nova engenharia da água para operações que exigem confiança absoluta.
            </h1>
            <p className="text-lg leading-8 text-slate-600 max-w-3xl">
              Tecnologia alemã patenteada que revoluciona a gestão hídrica sem química, sem energia ativa e sem manutenção frequente.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="rounded-[1.75rem] border border-slate-200 bg-white p-8 text-center shadow-sm">
                <div className="text-4xl md:text-5xl font-semibold text-slate-950 mb-2">{stat.number}</div>
                <div className="text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Showcase Image */}
          <div className="mt-16 relative">
            <ImageCard 
              locationId="about_showcase"
              imageUrl={pageImages['about_showcase']?.url}
              publicId={pageImages['about_showcase']?.publicId}
              aspectRatio="video"
              className="w-full max-h-[450px] object-cover"
            />
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-cyan-100/50 rounded-full blur-3xl -z-10 pointer-events-none" />
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-600 mb-4">Nossa história</p>
              <h2 className="text-3xl md:text-4xl font-semibold text-slate-950 mb-6">Criada para proteger água e equipamentos com a máxima eficiência.</h2>
              <p className="text-lg leading-8 text-slate-600 mb-6">
                A Aquabion nasceu da visão de trabalhar com a natureza, não contra ela. Com mais de 25 anos de pesquisa e desenvolvimento na Alemanha, nossa tecnologia galvânica passiva mudou a forma como o setor trata incrustações e corrosão.
              </p>
              <p className="text-lg leading-8 text-slate-600">
                Presente em mais de 50 países e mais de 100 mil instalações, seguimos comprometidos com soluções sustentáveis que geram economia real e maior previsibilidade para grandes operações.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
                <Award className="w-10 h-10 text-cyan-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-slate-950">Tecnologia patenteada</h3>
                <p className="text-slate-600 text-sm">Inovação alemã certificada internacionalmente.</p>
              </div>
              <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
                <Shield className="w-10 h-10 text-emerald-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-slate-950">Zero química</h3>
                <p className="text-slate-600 text-sm">Solução 100% sustentável e segura.</p>
              </div>
              <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
                <TrendingUp className="w-10 h-10 text-amber-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-slate-950">ROI rápido</h3>
                <p className="text-slate-600 text-sm">Retorno em menos de 24 meses com resultados comprovados.</p>
              </div>
              <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
                <Globe className="w-10 h-10 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-slate-950">Presença global</h3>
                <p className="text-slate-600 text-sm">Atuação em mais de 50 países.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-600 mb-4">Nossos valores</p>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-950 mb-4">Princípios claros que orientam cada projeto.</h2>
            <p className="mx-auto max-w-2xl text-lg leading-8 text-slate-600">
              Sustentabilidade, excelência técnica e transparência em todas as etapas da jornada do cliente.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: 'Sustentabilidade',
                desc: 'Trabalhar com a natureza e regenerar recursos, não esgotá-los.',
              },
              {
                title: 'Excelência técnica',
                desc: 'Engenharia de elite e precisão alemã para resultados previsíveis.',
              },
              {
                title: 'Transparência',
                desc: 'Comunicação honesta e métricas claras para cada etapa do projeto.',
              },
            ].map((value, index) => (
              <div key={index} className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
                <h3 className="text-2xl font-semibold mb-4 text-slate-950">{value.title}</h3>
                <p className="text-slate-600 leading-7">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="rounded-[2rem] bg-slate-950 px-10 py-16 text-center text-white shadow-[0_30px_80px_-40px_rgba(15,23,42,0.18)]">
            <h2 className="text-3xl md:text-4xl font-semibold mb-6">Junte-se à revolução da água.</h2>
            <p className="mx-auto max-w-2xl text-lg leading-8 text-slate-300 mb-8">
              Empresas líderes já estão reduzindo custos e riscos com a tecnologia Aquabion.
            </p>
            <Link href="/contato">
              <Button size="lg" className="h-14 px-10 text-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold">
                Agendar Diagnóstico
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
