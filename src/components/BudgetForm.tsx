'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Send, CheckCircle2, MessageSquare, Loader2 } from 'lucide-react';
import WhatsAppButton from './WhatsAppButton';

interface BudgetFormProps {
  budgetType: 'residencial' | 'comercial' | 'industrial';
}

export default function BudgetForm({ budgetType }: BudgetFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    segment: '',
    city: '',
    state: '',
    message: '',
    budget_type: budgetType,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Nome completo é obrigatório';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'E-mail inválido';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Mensagem é obrigatória';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/crm/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (res.ok) {
        setIsSubmitted(true);
      } else {
        throw new Error('Falha ao enviar');
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      alert('Ocorreu um erro ao enviar. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    const fieldName = id.replace('budget-', '');
    setFormData(prev => ({ ...prev, [fieldName]: value }));
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: '' }));
    }
  };

  if (isSubmitted) {
    return (
      <div className="space-y-8">
        <div className="text-center py-10">
          <CheckCircle2 className="w-20 h-20 text-emerald-500 mx-auto mb-6" />
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-slate-950">Orçamento solicitado!</h3>
          <p className="text-base md:text-lg text-slate-600 mb-8">
            Recebemos sua solicitação. Nossa equipe entrará em contato em breve para apresentar a proposta.
          </p>
          <Link href="/">
            <button className="inline-flex items-center justify-center gap-2 h-12 px-8 bg-slate-950 text-white hover:bg-slate-800 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl">
              Voltar para a página inicial
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const budgetLabelMap = {
    residencial: 'Residencial',
    comercial: 'Comercial',
    industrial: 'Industrial',
  };

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
        <MessageSquare className="w-10 h-10 text-cyan-600 mb-4" />
        <h3 className="text-xl font-bold mb-2 text-slate-950">Orçamento {budgetLabelMap[budgetType]}</h3>
        <p className="text-slate-600 mb-5">
          Preencha os dados abaixo e entraremos em contato com a solução ideal para você.
        </p>
        <WhatsAppButton
          message={`Olá! Gostaria de solicitar um orçamento ${budgetLabelMap[budgetType]} da Aquabion.`}
          className="w-full h-12 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full transition-all shadow-md hover:shadow-lg"
        >
          Solicitar via WhatsApp
        </WhatsAppButton>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="budget-name" className="block text-sm font-semibold text-slate-800">
              Nome completo <span className="text-rose-500">*</span>
            </label>
            <input
              id="budget-name"
              type="text"
              autoComplete="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              aria-describedby={errors.name ? 'name-error' : undefined}
              aria-invalid={!!errors.name}
              className={`w-full h-12 px-4 rounded-2xl bg-white border transition-all duration-200 ${errors.name ? 'border-rose-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-100' : 'border-slate-200 text-slate-950 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100'}`}
              placeholder="Seu nome completo"
            />
            {errors.name && (
              <p id="name-error" className="text-xs text-rose-600 font-semibold">
                {errors.name}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="budget-email" className="block text-sm font-semibold text-slate-800">
              E-mail <span className="text-rose-500">*</span>
            </label>
            <input
              id="budget-email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              aria-describedby={errors.email ? 'email-error' : undefined}
              aria-invalid={!!errors.email}
              className={`w-full h-12 px-4 rounded-2xl bg-white border transition-all duration-200 ${errors.email ? 'border-rose-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-100' : 'border-slate-200 text-slate-950 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100'}`}
              placeholder="email@empresa.com"
            />
            {errors.email && (
              <p id="email-error" className="text-xs text-rose-600 font-semibold">
                {errors.email}
              </p>
            )}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="budget-phone" className="block text-sm font-semibold text-slate-800">
              Telefone
            </label>
            <input
              id="budget-phone"
              type="tel"
              autoComplete="tel"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full h-12 px-4 rounded-2xl bg-white border border-slate-200 text-slate-950 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 transition-all duration-200"
              placeholder="(43) 99917-1010"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="budget-company" className="block text-sm font-semibold text-slate-800">
              {budgetType === 'residencial' ? 'Condomínio (Opcional)' : 'Empresa'}
            </label>
            <input
              id="budget-company"
              type="text"
              autoComplete="organization"
              value={formData.company}
              onChange={handleInputChange}
              className="w-full h-12 px-4 rounded-2xl bg-white border border-slate-200 text-slate-950 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 transition-all duration-200"
              placeholder={budgetType === 'residencial' ? "Nome do condomínio" : "Nome da empresa"}
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="budget-city" className="block text-sm font-semibold text-slate-800">
              Cidade
            </label>
            <input
              id="budget-city"
              type="text"
              autoComplete="address-level2"
              value={formData.city}
              onChange={handleInputChange}
              className="w-full h-12 px-4 rounded-2xl bg-white border border-slate-200 text-slate-950 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 transition-all duration-200"
              placeholder="Sua cidade"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="budget-state" className="block text-sm font-semibold text-slate-800">
              Estado
            </label>
            <select
              id="budget-state"
              value={formData.state}
              onChange={handleInputChange}
              className="w-full h-12 px-4 rounded-2xl bg-white border border-slate-200 text-slate-950 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 transition-all duration-200"
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
        </div>

        {budgetType !== 'residencial' && (
          <div className="space-y-2">
            <label htmlFor="budget-segment" className="block text-sm font-semibold text-slate-800">
              Segmento
            </label>
            <select
              id="budget-segment"
              value={formData.segment}
              onChange={handleInputChange}
              className="w-full h-12 px-4 rounded-2xl bg-white border border-slate-200 text-slate-950 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 transition-all duration-200"
            >
              <option value="">Selecione um segmento</option>
              <option value="industria">Indústria</option>
              <option value="agro">Agronegócio</option>
              <option value="hospitalar">Hospitalar</option>
              <option value="hotelaria">Hotelaria</option>
              <option value="condominios">Condomínios comerciais</option>
              <option value="outro">Outro</option>
            </select>
          </div>
        )}

        <div className="space-y-2">
          <label htmlFor="budget-message" className="block text-sm font-semibold text-slate-800">
            Detalhes do Pedido <span className="text-rose-500">*</span>
          </label>
          <textarea
            id="budget-message"
            required
            value={formData.message}
            onChange={handleInputChange}
            rows={5}
            aria-describedby={errors.message ? 'message-error' : undefined}
            aria-invalid={!!errors.message}
            className={`w-full px-4 py-3 rounded-2xl bg-white border transition-all duration-200 resize-none ${errors.message ? 'border-rose-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-100' : 'border-slate-200 text-slate-950 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100'}`}
            placeholder="Forneça detalhes sobre a necessidade de tratamento de água..."
          />
          {errors.message && (
            <p id="message-error" className="text-xs text-rose-600 font-semibold">
              {errors.message}
            </p>
          )}
        </div>

        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            required
            id="privacy"
            className="mt-1 h-5 w-5 rounded-lg border-slate-300 bg-white text-cyan-500 focus:ring-cyan-500 cursor-pointer"
          />
          <label htmlFor="privacy" className="text-sm text-slate-600 cursor-pointer leading-relaxed">
            Li e concordo com a <Link href="/politica-privacidade" className="text-cyan-600 hover:text-cyan-700 underline font-semibold transition-colors">Política de Privacidade</Link> e os <Link href="/termos-de-uso" className="text-cyan-600 hover:text-cyan-700 underline font-semibold transition-colors">Termos de Uso</Link>.
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-14 text-base md:text-lg bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              Solicitar Orçamento
              <Send className="w-5 h-5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
