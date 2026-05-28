'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Send, CheckCircle2, Mail, Phone, MapPin, Clock, MessageSquare } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    segment: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubmitted(true);
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'E-mail',
      value: 'contato@aquabion.com.br',
    },
    {
      icon: Phone,
      title: 'Telefone',
      value: '(43) 99917-1010',
    },
    {
      icon: MapPin,
      title: 'Endereço',
      value: 'Londrina, PR - Brasil\nBauneário Camboriú, SC - Brasil\nSão Paulo - Capital, SP - Brasil',
    },
    {
      icon: Clock,
      title: 'Horário de Atendimento',
      value: 'Seg-Sex: 08h às 18h',
    },
  ];

  if (isSubmitted) {
    return (
      <div className="lg:col-span-2">
        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
          <div className="text-center py-12">
            <CheckCircle2 className="w-20 h-20 text-emerald-500 mx-auto mb-6" />
            <h3 className="text-3xl font-semibold mb-4 text-slate-950">Obrigado pelo contato!</h3>
            <p className="text-lg text-slate-600 mb-8">
              Nossa equipe entrará em contato em breve para agendar seu diagnóstico técnico.
            </p>
            <Link href="/">
              <Button size="lg" className="bg-cyan-500 hover:bg-cyan-400 text-slate-950">
                Voltar para a página inicial
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-12">
      <div className="lg:col-span-1 space-y-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-slate-950">Informações de Contato</h2>
          {contactInfo.map((item, index) => (
            <div key={index} className="flex items-start gap-4 p-5 rounded-3xl bg-white border border-slate-200 shadow-sm">
              <item.icon className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-slate-950 mb-1">{item.title}</h3>
                <p className="text-slate-600 whitespace-pre-line">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
          <MessageSquare className="w-10 h-10 text-cyan-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-slate-950">Atendimento rápido</h3>
          <p className="text-slate-600 mb-4">
            Nossa equipe técnica está disponível para agendar seu diagnóstico personalizado.
          </p>
          <Button className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950">
            Falar no WhatsApp
          </Button>
        </div>
      </div>

      <div className="lg:col-span-2">
        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-950 mb-8">Envie sua mensagem</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium text-slate-700 mb-2">
                  Nome completo *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  autoComplete="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-950 placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="Seu nome"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-slate-700 mb-2">
                  E-mail *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-950 placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="email@empresa.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="contact-phone" className="block text-sm font-medium text-slate-700 mb-2">
                  Telefone
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-950 placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="(43) 99917-1010"
                />
              </div>
              <div>
                <label htmlFor="contact-company" className="block text-sm font-medium text-slate-700 mb-2">
                  Empresa
                </label>
                <input
                  id="contact-company"
                  type="text"
                  autoComplete="organization"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-950 placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="Nome da empresa"
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact-segment" className="block text-sm font-medium text-slate-700 mb-2">
                Segmento
              </label>
              <select
                id="contact-segment"
                value={formData.segment}
                onChange={(e) => setFormData({ ...formData, segment: e.target.value })}
                className="w-full h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-950 focus:outline-none focus:border-cyan-500 transition-colors"
              >
                <option value="">Selecione um segmento</option>
                <option value="industria">Indústria</option>
                <option value="agro">Agronegócio</option>
                <option value="hospitalar">Hospitalar</option>
                <option value="hotelaria">Hotelaria</option>
                <option value="condominios">Condomínios</option>
                <option value="outro">Outro</option>
              </select>
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-sm font-medium text-slate-700 mb-2">
                Mensagem *
              </label>
              <textarea
                id="contact-message"
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={5}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-950 placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                placeholder="Descreva seu projeto ou necessidade..."
              />
            </div>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                required
                id="privacy"
                className="mt-1 h-4 w-4 rounded border-slate-300 bg-white text-cyan-500 focus:ring-cyan-500"
              />
              <label htmlFor="privacy" className="text-sm text-slate-600">
                Li e concordo com a <Link href="/politica-privacidade" className="text-cyan-600 hover:text-cyan-700 underline">Política de Privacidade</Link> e os <Link href="/termos-de-uso" className="text-cyan-600 hover:text-cyan-700 underline">Termos de Uso</Link>.
              </label>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              size="lg"
              className="w-full h-14 text-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold"
            >
              {isSubmitting ? (
                'Enviando...'
              ) : (
                <>
                  Enviar Mensagem
                  <Send className="w-5 h-5" />
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
