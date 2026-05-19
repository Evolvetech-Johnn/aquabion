import Link from 'next/link';
import ContactForm from '@/components/ContactForm';

export const metadata = {
  title: 'Contato | Aquabion Brasil',
  description: 'Entre em contato com a Aquabion Brasil para agendar seu diagnóstico técnico',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#071B34] text-white py-24">
      <div className="container mx-auto px-6">
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-6">
            ← Voltar para a página inicial
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Entre em Contato
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl">
            Estamos prontos para ajudar você a transformar a gestão da água na sua empresa.
          </p>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
