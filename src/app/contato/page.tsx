import Link from 'next/link';
import ContactForm from '@/components/ContactForm';
import WhatsAppButton from '@/components/WhatsAppButton';

export const metadata = {
  title: 'Contato | Aquabion Brasil',
  description: 'Entre em contato com a Aquabion Brasil para agendar seu diagnóstico técnico',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 py-24">
      <div className="container mx-auto px-6">
        <div className="mb-12 max-w-4xl rounded-[2rem] bg-white border border-slate-200 p-12 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.18)]">
          <Link href="/" className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 mb-6">
            ← Voltar para a página inicial
          </Link>
          <h1 className="text-4xl md:text-5xl font-semibold mb-4">
            Entre em contato
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mb-6">
            Estamos prontos para ajudar você a transformar a gestão da água da sua empresa com soluções confiáveis e sustentáveis.
          </p>
          <WhatsAppButton
            message="Olá! Entre em contato com a Aquabion Brasil."
            className="h-14 px-8 text-base font-semibold"
          >
            Falar no WhatsApp
          </WhatsAppButton>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.18)]">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
