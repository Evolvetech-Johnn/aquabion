
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';
import Reveal from '@/components/ui/Reveal';
import { ChevronLeft } from 'lucide-react';

export const metadata = {
  title: 'Contato | Aquabion Brasil',
  description: 'Entre em contato com a Aquabion Brasil para agendar seu diagnóstico técnico',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 pt-20">
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <Reveal>
            <Link href="/" className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 mb-8 transition-colors">
              <ChevronLeft className="w-4 h-4" />
              Voltar para a página inicial
            </Link>
          </Reveal>

          <div className="grid gap-10 lg:gap-14 lg:grid-cols-2 items-start">
            <Reveal>
              <div className="premium-card">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                  Entre em contato
                </h1>
                <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-10 max-w-lg">
                  Estamos prontos para ajudar você a transformar a gestão da água da sua empresa com soluções confiáveis e sustentáveis.
                </p>
                <ContactForm />
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="space-y-8">
                <div className="premium-card">
                  <h2 className="text-2xl font-bold text-slate-950 mb-8">Informações de contato</h2>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4 p-6 rounded-3xl bg-cyan-50 border border-cyan-100">
                      <div className="w-14 h-14 bg-cyan-100 rounded-2xl flex items-center justify-center text-cyan-700 flex-shrink-0">
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-slate-950 mb-1">E-mail</h3>
                        <a href="mailto:contato@aquabion.com.br" className="text-slate-600 hover:text-cyan-700 transition-colors break-all">
                          contato@aquabion.com.br
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-6 rounded-3xl bg-cyan-50 border border-cyan-100">
                      <div className="w-14 h-14 bg-cyan-100 rounded-2xl flex items-center justify-center text-cyan-700 flex-shrink-0">
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-slate-950 mb-1">Telefone</h3>
                        <a href="tel:+5543999171010" className="text-slate-600 hover:text-cyan-700 transition-colors">
                          (43) 99917-1010
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-6 rounded-3xl bg-cyan-50 border border-cyan-100">
                      <div className="w-14 h-14 bg-cyan-100 rounded-2xl flex items-center justify-center text-cyan-700 flex-shrink-0">
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-slate-950 mb-1">Localização</h3>
                        <p className="text-slate-600 whitespace-pre-line">
                          Londrina, PR - Brasil
                          <br />Balneário Camboriú, SC - Brasil
                          <br />São Paulo - Capital, SP - Brasil
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-6 rounded-3xl bg-cyan-50 border border-cyan-100">
                      <div className="w-14 h-14 bg-cyan-100 rounded-2xl flex items-center justify-center text-cyan-700 flex-shrink-0">
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-slate-950 mb-1">Horário de atendimento</h3>
                        <p className="text-slate-600">
                          Seg - Sex: 08h às 18h
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
