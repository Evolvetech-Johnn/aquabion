'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';
import Image from 'next/image';
import { Menu, X, ChevronRight } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Sobre', href: '/sobre' },
    { name: 'Tecnologia', href: '/tecnologia' },
    { name: 'Benefícios', href: '/beneficios' },
    { name: 'Aplicações', href: '/aplicacoes' },
    { name: 'Cases', href: '/cases' },
    { name: 'Blog', href: '/blog' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Termos de Uso', href: '/termos-de-uso' },
    { name: 'Contato', href: '/contato' },
  ];

  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl shadow-sm">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3" aria-label="Aquabion Brasil - Página Inicial">
            <Image src="/logoaquabion.png" alt="Aquabion Brasil" width={54} height={54} className="w-[54px] h-[54px] object-contain" />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const isLegal = link.href === '/termos-de-uso';
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-slate-600 transition-colors ${
                    isActive
                      ? 'rounded-full border border-slate-200/90 bg-slate-100 px-3 py-1 text-slate-950 shadow-sm'
                      : isLegal
                      ? 'rounded-full border border-slate-200/80 bg-slate-100 px-3 py-1 hover:bg-slate-200'
                      : 'hover:text-slate-950'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <Link href="/contato">
              <Button size="lg" variant="default" className="shadow-none">
                Agendar Diagnóstico
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <button
            className="md:hidden text-slate-900"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div id="mobile-menu" className="md:hidden bg-white border-t border-slate-200/80 shadow-sm">
          <div className="container mx-auto px-6 py-4 space-y-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`block rounded-2xl px-3 py-2 transition-all ${
                    isActive
                      ? 'bg-slate-100 text-slate-950 shadow-sm'
                      : 'text-slate-700 hover:text-slate-950 hover:bg-slate-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              );
            })}
            <Link href="/contato" onClick={() => setIsMenuOpen(false)}>
              <Button size="lg" className="w-full shadow-none">
                Agendar Diagnóstico
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
