
import Link from 'next/link';
import { Zap, Droplets, Shield, ChevronLeft } from 'lucide-react';
import ImageCard from '@/components/ImageCard';
import Reveal from '@/components/ui/Reveal';
import AnimatedCTA from '@/components/AnimatedCTA';
import { getPageImages } from '@/services/media.service';





export default async function TechnologyPage() {
  const pageImages = await getPageImages();

  const steps = [
    {
      number: '01',
      title: 'Ionização galvânica',
      description: 'Células galvânicas criam um campo eletroquímico natural que modifica a estrutura dos minerais na água.',
      icon: Zap,
      locationId: 'tech_step_1',
    },
    {
      number: '02',
      title: 'Transformação cristalina',
      description: 'A calcita se transforma em aragonita, uma estrutura não aderente que permanece em suspensão.',
      icon: Droplets,
      locationId: 'tech_step_2',
    },
    {
      number: '03',
      title: 'Proteção contínua',
      description: 'Sistema passivo funciona 24/7 sem energia, manutenção ou produtos químicos.',
      icon: Shield,
      locationId: 'tech_step_3',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 pt-20">
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <Reveal>
            <Link href="/" className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 mb-8">
              <ChevronLeft className="w-4 h-4" />
              Voltar para a página inicial
            </Link>
          </Reveal>

          <Reveal>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Como funciona a tecnologia Aquabion
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl">
              Engenharia galvânica passiva que transforma a estrutura dos minerais na água, eliminando incrustações e corrosão de forma 100% sustentável.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Vídeo Demonstrativo */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <Reveal>
            <div className="premium-card overflow-hidden p-0">
              <div className="aspect-video w-full relative bg-slate-950">
                <video 
                  src="https://res.cloudinary.com/dipz2qnny/video/upload/v1779909307/aquabion_site/hdodorfdi1euyvauaivv.mp4"
                  controls
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 md:p-12 text-center max-w-3xl mx-auto">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-600 mb-3">Demonstração Prática</p>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-950 mb-4">
                  Veja a tecnologia Aquabion em ação
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  Assista ao vídeo institucional e entenda como a ionização galvânica patenteada atua na prevenção e remoção de incrustações calcárias em tubulações e equipamentos industriais.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Passos da Tecnologia */}
      <section className="py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="space-y-20">
            {steps.map((step, index) => (
              <Reveal key={index} delay={index * 0.15}>
                <div className="grid gap-12 lg:grid-cols-2 items-center">
                  <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="premium-card relative overflow-hidden">
                      <span className="absolute -top-10 -left-2 text-9xl font-black text-slate-200/40 select-none">{step.number}</span>
                      <step.icon className="w-16 h-16 text-cyan-600 mb-8 relative z-10" />
                      <h3 className="text-3xl font-bold text-slate-950 mb-5 relative z-10">{step.title}</h3>
                      <p className="text-lg text-slate-600 leading-relaxed relative z-10">{step.description}</p>
                    </div>
                  </div>
                  <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <ImageCard
                      locationId={step.locationId}
                      imageUrl={pageImages[step.locationId]?.url}
                      publicId={pageImages[step.locationId]?.publicId}
                      aspectRatio="square"
                      className="w-full"
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <Reveal>
            <div className="premium-card text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-950 mb-6">Sistema passivo, resultados ativos</h2>
              <p className="text-lg text-slate-600 mb-10 max-w-3xl mx-auto">
                Sem energia, sem manutenção e sem produtos químicos. Apenas previsibilidade operacional e proteção contínua.
              </p>
              <div className="grid gap-6 md:grid-cols-3 mb-10">
                {[
                  { title: 'Zero energia', desc: 'Operação sem consumo elétrico' },
                  { title: 'Zero manutenção', desc: 'Nenhuma intervenção regular necessária' },
                  { title: 'Zero química', desc: '100% sustentável e segura' },
                ].map((item, i) => (
                  <div key={i} className="p-8 bg-slate-50 rounded-2xl border border-slate-200">
                    <h3 className="text-xl font-bold text-slate-950 mb-2">{item.title}</h3>
                    <p className="text-slate-600">{item.desc}</p>
                  </div>
                ))}
              </div>
              <AnimatedCTA />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
