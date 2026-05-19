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
      value: 'contato@aquabionbrasil.com.br',
    },
    {
      icon: Phone,
      title: 'Telefone',
      value: '(11) 99999-9999',
    },
    {
      icon: MapPin,
      title: 'Endereço',
      value: 'São Paulo, SP - Brasil',
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
        <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
          <div className="text-center py-12">
            <CheckCircle2 className="w-20 h-20 text-emerald-400 mx-auto mb-6" />
            <h3 className="text-3xl font-bold mb-4">Obrigado pelo contato!</h3>
            <p className="text-xl text-slate-400 mb-8">
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
          <h2 className="text-2xl font-semibold">Informações de Contato</h2>
          {contactInfo.map((item, index) => (
            <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
              <item.icon className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                <p className="text-slate-400">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30">
          <MessageSquare className="w-10 h-10 text-cyan-400 mb-4" />
          <h3 className="text-xl font-bold mb-2">Atendimento Rápido</h3>
          <p className="text-slate-300 mb-4">
            Nossa equipe técnica está disponível para agendar seu diagnóstico personalizado.
          </p>
          <Button className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950">
            Falar no WhatsApp
          </Button>
        </div>
      </div>

      <div className="lg:col-span-2">
        <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
          <h2 className="text-2xl font-bold mb-8">Envie sua Mensagem</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Nome completo *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full h-12 px-4 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="Seu nome"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  E-mail *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full h-12 px-4 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="email@empresa.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Telefone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full h-12 px-4 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="(11) 99999-9999"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Empresa
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full h-12 px-4 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="Nome da empresa"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">
                Segmento
              </label>
              <select
                value={formData.segment}
                onChange={(e) => setFormData({ ...formData, segment: e.target.value })}
                className="w-full h-12 px-4 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-500 transition-colors"
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
              <label className="block text-sm font-medium text-slate-400 mb-2">
                Mensagem *
              </label>
              <textarea
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={5}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                placeholder="Descreva seu projeto ou necessidade..."
              />
            </div>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                required
                id="privacy"
                className="mt-1 rounded border-white/20 bg-white/5 text-cyan-500 focus:ring-cyan-500"
              />
              <label htmlFor="privacy" className="text-sm text-slate-400">
                Li e concordo com a <Link href="/politica-privacidade" className="text-cyan-400 hover:text-cyan-300 underline">Política de Privacidade</Link> e os <Link href="/termos-de-uso" className="text-cyan-400 hover:text-cyan-300 underline">Termos de Uso</Link>.
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
