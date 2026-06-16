'use client';

import Link from 'next/link';

export const metadata = {
  title: 'Página não encontrada | Aquabion Brasil',
  description: 'A página que você está procurando não existe. Explore nossos conteúdos e produtos.',
};

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-950">
      <h1 className="text-5xl font-bold mb-4">404 - Não encontrado</h1>
      <p className="text-lg mb-8">Desculpe, a página que você procura não foi encontrada.</p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-full bg-cyan-600 px-6 py-3 text-white hover:bg-cyan-500"
      >
        Voltar para a Home
      </Link>
    </div>
  );
}
