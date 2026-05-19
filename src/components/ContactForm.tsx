'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Send, CheckCircle2 } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Integrar com Supabase e WhatsApp
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubmitted(true);
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="p-8 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 text-center">
        <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-2">Obrigado pelo contato!</h3>
        <p className="text-slate-300">
          Nossa equipe entrará em contato em breve para agendar o diagnóstico técnico.
        </p>
      </div>
    );
  }

  return (
    <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
      <h3 className="text-2xl font-bold mb-6">Agende seu Diagnóstico</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-slate-400 mb-2">Nome completo</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full h-12 px-4 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            placeholder="Seu nome"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-400 mb-2">E-mail</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full h-12 px-4 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
              placeholder="email@empresa.com"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-2">Telefone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full h-12 px-4 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
              placeholder="(11) 99999-9999"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-2">Empresa</label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className="w-full h-12 px-4 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            placeholder="Nome da empresa"
          />
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-2">Mensagem</label>
          <textarea
            required
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            rows={4}
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
            placeholder="Descreva seu projeto ou necessidade..."
          />
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
              Enviar Solicitação
              <Send className="w-5 h-5" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
